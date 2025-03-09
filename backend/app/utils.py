def validate_seismic_data(data):
    """
    Validate the uploaded seismic data to ensure it meets the required structure.
    
    Parameters:
        data (dict): The seismic data to validate.
        
    Returns:
        bool: True if the data is valid, False otherwise.
        str: An error message if the data is invalid.
    """
    required_fields = ['timestamp', 'magnitude', 'location', 'depth']
    
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Additional validation logic can be added here
    
    return True, "Data is valid"


def process_seismic_data(data):
    """
    Process the seismic data to extract relevant information for analysis.
    
    Parameters:
        data (dict): The seismic data to process.
        
    Returns:
        dict: Processed data containing centrality metrics and other analysis results.
    """
    # Placeholder for processing logic
    processed_data = {
        'centrality': calculate_centrality(data),
        'summary': generate_summary(data)
    }
    
    return processed_data


def calculate_centrality(data):
    """
    Calculate centrality metrics based on the seismic network data.
    
    Parameters:
        data (dict): The seismic data to analyze.
        
    Returns:
        dict: Centrality metrics.
    """
    # Placeholder for centrality calculation logic
    return {}


def generate_summary(data):
    """
    Generate a summary of the seismic data.
    
    Parameters:
        data (dict): The seismic data to summarize.
        
    Returns:
        dict: Summary of the seismic data.
    """
    # Placeholder for summary generation logic
    return {}