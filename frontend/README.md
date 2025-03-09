# Seismic Hub Identification Frontend

This document provides instructions for setting up and running the frontend of the Seismic Hub Identification project.

## Overview

The frontend is built using React and provides an intuitive user interface for uploading seismic datasets and visualizing network centrality. The application is designed to be modular and extendable, allowing for future enhancements such as additional visualization features and algorithms.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/seismic-hub-identification.git
   ```

2. Navigate to the frontend directory:

   ```
   cd seismic-hub-identification/frontend
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

## Running the Application

To start the development server, run:

```
npm start
```

This will launch the application in your default web browser at `http://localhost:3000`.

## File Structure

- **public/**: Contains static files such as `index.html` and `manifest.json`.
- **src/**: Contains the source code for the React application.
  - **components/**: Contains React components for the application.
    - `App.js`: Main application component.
    - `Upload.js`: Component for handling file uploads.
    - `Visualization.js`: Component for visualizing seismic data.
  - `App.css`: Styles for the main application component.
  - `index.css`: Global styles for the application.
  - `index.js`: Entry point for the React application.

## Data Upload

Users can upload their seismic datasets through the Upload component. The application expects the datasets to be structured according to the specifications outlined in the backend's data README.

## Error Handling

The application includes user-friendly error messages for incorrect or missing data uploads. Ensure that the uploaded datasets meet the required format to avoid errors.

## Future Enhancements

The application is designed to be modular, allowing for easy integration of additional features such as:

- Enhanced data visualization using D3.js.
- Additional network algorithms for analysis.
- AI-based predictions for seismic data.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.