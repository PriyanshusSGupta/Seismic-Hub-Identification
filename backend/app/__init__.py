from flask import Flask
from flask_cors import CORS
from app.routes import register_routes

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for frontend interaction

    # Register routes
    register_routes(app)

    return app
