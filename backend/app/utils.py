import networkx as nx
import pandas as pd
from geopy.distance import geodesic

def create_seismic_graph(edges):
    """Create a graph from seismic station connections."""
    G = nx.Graph()
    G.add_edges_from(edges)
    return G

def calculate_central_hub(G):
    """Calculate the most central node based on betweenness centrality."""
    centrality = nx.betweenness_centrality(G)
    hub = max(centrality, key=centrality.get) if centrality else None
    return hub, centrality.get(hub, 0)

def create_graph_from_csv(filepath):
    """Read CSV and create a seismic station graph."""
    df = pd.read_csv(filepath)

    # Identify relevant columns
    col_names = list(df.columns)
    lat_col = next((col for col in col_names if "lat" in col.lower()), None)
    lon_col = next((col for col in col_names if "lon" in col.lower()), None)
    station_col = next((col for col in col_names if "station" in col.lower()), col_names[0])

    if not lat_col or not lon_col:
        raise ValueError("Missing Latitude or Longitude column")

    # Convert Latitude and Longitude to numeric
    df[lat_col] = pd.to_numeric(df[lat_col], errors="coerce")
    df[lon_col] = pd.to_numeric(df[lon_col], errors="coerce")
    df_cleaned = df[[station_col, lat_col, lon_col]].dropna()

    # Compute edges based on 1000 km radius
    stations = df_cleaned[[station_col, lat_col, lon_col]].values
    edges = []

    for i in range(len(stations)):
        for j in range(i + 1, len(stations)):
            station1, lat1, lon1 = stations[i]
            station2, lat2, lon2 = stations[j]

            if geodesic((lat1, lon1), (lat2, lon2)).km <= 1000:
                edges.append((station1, station2))
    
    return create_seismic_graph(edges)


def get_site_name(csv_filepath, hub_station):
    """
    Retrieves the site name for a given station ID from the CSV file.
    
    Args:
        csv_filepath (str): Path to the CSV file.
        hub_station (str): The station ID whose site name is to be retrieved.
    
    Returns:
        str: The site name if found, otherwise "Unknown".
    """
    try:
        df = pd.read_csv(csv_filepath)

        # Check if required columns exist
        if "Station" not in df.columns or "SiteName" not in df.columns:
            return "Unknown"

        # Search for the site name corresponding to the hub station
        row = df[df["Station"] == hub_station]

        if not row.empty:
            return row.iloc[0]["SiteName"]  # Return the first matched site name
        else:
            return "Unknown"
    
    except Exception as e:
        return "Unknown"  # Fallback in case of an error

