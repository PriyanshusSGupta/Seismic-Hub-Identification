# Seismic Hub Identification Backend

This document provides instructions for setting up and running the backend of the Seismic Hub Identification project. The backend is built using Flask and is responsible for handling data uploads, processing seismic datasets, and serving results to the frontend.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.7 or higher
- pip (Python package installer)
- Docker (optional, for containerized deployment)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/seismic-hub-identification.git
   cd seismic-hub-identification/backend
   ```

2. **Install dependencies:**

   You can install the required Python packages using pip. It is recommended to use a virtual environment.

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

## Running the Application

To run the Flask application, use the following command:

```bash
export FLASK_APP=app
export FLASK_ENV=development  # Optional: for development mode
flask run
```

The application will start on `http://127.0.0.1:5000/` by default.

## API Endpoints

- **Upload Seismic Data:**
  - `POST /upload`
  - Description: Upload seismic datasets for processing.
  
- **Get Results:**
  - `GET /results`
  - Description: Retrieve processed results based on uploaded data.

## Data Structure

The backend expects seismic datasets to be uploaded in a specific format. Please refer to the `backend/data/README.md` for detailed information on the expected structure and format of the datasets.

## Error Handling

The backend includes error handling for various scenarios, including:

- Invalid data format
- Missing required fields
- Processing errors

User-friendly error messages will be returned in the API responses.

## Docker Deployment

To deploy the backend using Docker, you can build the Docker image with the following command:

```bash
docker build -t seismic-hub-backend .
```

Then run the container:

```bash
docker run -p 5000:5000 seismic-hub-backend
```

## Future Enhancements

The backend is designed to be modular and extendable. Future enhancements may include:

- Additional network algorithms for seismic data analysis
- Integration of AI-based predictions for seismic events

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.