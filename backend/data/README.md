# Seismic Hub Identification Data Structure

This directory is intended for storing seismic datasets that users can upload for processing and analysis. Below are the guidelines and expectations for the data files.

## Expected Data Format

1. **File Types**: Users should upload datasets in CSV format. Other formats may not be supported.
  
2. **Required Columns**:
   - `timestamp`: The time of the seismic event (ISO 8601 format).
   - `latitude`: Latitude of the seismic station (decimal degrees).
   - `longitude`: Longitude of the seismic station (decimal degrees).
   - `magnitude`: Magnitude of the seismic event (float).
   - `depth`: Depth of the seismic event (in kilometers).

3. **Example Data Structure**:
   ```
   timestamp,latitude,longitude,magnitude,depth
   2023-01-01T00:00:00Z,34.0522,-118.2437,5.1,10.0
   2023-01-01T01:00:00Z,34.0522,-118.2437,4.8,12.0
   ```

## Upload Instructions

- Place your CSV files in the `/data` directory.
- Ensure that the file names are descriptive and include the date of the data (e.g., `seismic_data_2023-01-01.csv`).
- After uploading, use the web interface to process and visualize the data.

## Error Handling

If the uploaded data does not meet the required structure or contains invalid entries, appropriate error messages will be displayed in the web application. Please ensure your data adheres to the specified format to avoid processing issues.

## Additional Notes

- Future enhancements may include support for additional data formats and more complex data structures.
- For any questions or issues, please refer to the main project documentation or contact the project maintainers.