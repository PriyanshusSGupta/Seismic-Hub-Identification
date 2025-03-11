import csv
import os
import pandas as pd 
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from app.utils import create_seismic_graph, calculate_central_hub, create_graph_from_csv, get_site_name

api = Blueprint("api", __name__)
main = Blueprint('main', __name__)

# Allowed file extensions and data directory
ALLOWED_EXTENSIONS = {"csv"}
DATA_DIR = "backend/data"

def allowed_file(filename):
    """Check if the file extension is allowed."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@api.route("/upload-csv", methods=["POST"])
def upload_csv():
    """
    API endpoint to upload and process a CSV file containing seismic stations.
    Computes and returns the central hub.
    """
    try:
        os.makedirs(DATA_DIR, exist_ok=True)

        # Validate file upload
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
        
        print(f"Received file: {file.filename}")  # Debugging line

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type. Only CSV files are allowed"}), 400

        # Save the uploaded file
        filename = secure_filename(file.filename)
        filepath = os.path.join(DATA_DIR, filename)
        file.save(filepath)

        print(f"Saved file to: {filepath}")  # Debugging line

        # Process CSV and Compute Centrality
        try:
            G = create_graph_from_csv(filepath)  # Create graph from CSV

            # Compute the most central hub
            hub, centrality_score = calculate_central_hub(G)

            # Retrieve the Site Name using the function
            hub_site = get_site_name(filepath, hub)

            print(f"Hub: {hub}, Centrality Score: {centrality_score}")  # Debugging line

            # Convert graph to JSON format
            graph_data = {
                "nodes": [{"id": node, "label": node} for node in G.nodes()],
                "edges": [{"source": u, "target": v} for u, v in G.edges()]
            }

            return jsonify({
                "hub": hub,
                "hub_site": hub_site,   # Correct key for Site Name
                "centrality_score": centrality_score,
                "total_nodes": G.number_of_nodes(),
                "total_edges": G.number_of_edges(),
                "graph": graph_data
            })

        except Exception as e:
            return jsonify({"error": f"Error processing CSV: {str(e)}"}), 500

    except Exception as e:
        current_app.logger.error(f"Error processing upload: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@main.route('/')
def index():
    """Main route providing API information."""
    return jsonify({
        "message": "Welcome to Seismic Hub Identification API",
        "version": "1.0.0",
        "endpoints": {
            "GET /": "API information",
            "POST /api/upload-csv": "Upload and process seismic network data (CSV format)"
        }
    })

def register_routes(app):
    """Register API blueprints with the Flask app."""
    app.register_blueprint(main)
    app.register_blueprint(api, url_prefix='/api')

@api.route("/process-seismic-network", methods=["POST"])
def process_seismic_network():
    """
    API endpoint to process real seismic network data from CSV and find the central hub.
    """
    try:
        csv_file = os.path.join(DATA_DIR, "seismic_stations.csv")
        
        if not os.path.exists(csv_file):
            return jsonify({
                "error": "Seismic stations data not found. Please upload data first."
            }), 404

        G = create_graph_from_csv(csv_file)
        hub, centrality_score = calculate_central_hub(G)

        return jsonify({
            "hub": hub,
            "centrality_score": centrality_score,
            "total_nodes": G.number_of_nodes(),
            "total_edges": G.number_of_edges(),
            "data_file": os.path.basename(csv_file)
        })

    except Exception as e:
        current_app.logger.error(f"Error processing seismic network: {str(e)}")
        return jsonify({"error": str(e)}), 500