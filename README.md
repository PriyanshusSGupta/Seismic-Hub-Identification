# Seismic Hub Identification

## Overview
The **Seismic Hub Identification** project is a full-stack web application designed to analyze and visualize the central hub in a seismic network. By computing node centrality based on distinct shortest paths, this tool helps researchers and geophysicists better understand seismic connectivity and activity.

## Features
- **Data Upload:** Users can upload their seismic datasets to the `/data` folder.
- **Network Centrality Analysis:** Identifies key nodes in the seismic network.
- **Interactive Visualization:** Uses D3.js to display seismic connectivity.
- **Flask API Backend:** Processes data and serves results to the frontend.
- **React Frontend:** Provides an intuitive user interface.
- **Modular & Extendable:** Easily adaptable for additional features and enhancements.

## File Structure
```
/ (Root)
│-- backend/            # Flask API backend
│   ├── app.py          # Main API server
│   ├── models/         # Data processing and network algorithms
│   ├── requirements.txt # Python dependencies
│-- frontend/           # React UI
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── App.js      # Main frontend app
│   ├── package.json    # Frontend dependencies
│-- data/               # Central folder for seismic data uploads
│-- Dockerfile          # Containerization setup
│-- README.md           # Project documentation
│-- deployment/         # GitHub deployment setup
```

## Installation
### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **Docker** (optional, for containerized deployment)

### Backend Setup
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

### Running with Docker
```sh
docker-compose up --build
```

## Data Upload Guidelines
- All seismic data should be placed in the `/data/` directory.
- Data must be in a structured format (e.g., JSON, CSV) with required fields.
- The system will automatically process new data upon upload.

## Deployment
- **Local Development:** Run backend and frontend separately as described above.
- **GitHub Deployment:** Configure GitHub Actions for CI/CD.
- **Cloud Deployment:** Compatible with AWS, Azure, and Google Cloud.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes and push (`git push origin feature-name`).
4. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Contact
For any issues or suggestions, feel free to open an issue or reach out!