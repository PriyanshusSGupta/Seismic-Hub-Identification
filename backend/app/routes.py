from flask import Blueprint, request, jsonify
from .utils import process_seismic_data, validate_data

bp = Blueprint('api', __name__)

@bp.route('/upload', methods=['POST'])
def upload_data():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        data = validate_data(file)
        results = process_seismic_data(data)
        return jsonify(results), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing the data'}), 500

@bp.route('/results', methods=['GET'])
def get_results():
    # Placeholder for retrieving processed results
    return jsonify({'message': 'Results retrieval not implemented yet'}), 501