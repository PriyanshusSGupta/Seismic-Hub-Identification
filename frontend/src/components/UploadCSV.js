import { useState } from "react";
import axios from "axios";
import Button from "./common/Button";
import Card from "./common/Card";
import Loading from "./common/Loading";
import GraphVisualization from "./GraphVisualization";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      <Card 
        title="Upload Seismic Data"
        subtitle="Select a CSV file containing seismic station data to analyze."
      >
        <div className="upload-form">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            className="file-input text-sm" 
          />
          <Button 
            onClick={handleUpload} 
            disabled={loading}
            variant="primary"
            size="medium"
          >
            {loading ? <Loading size="small" /> : 'Upload'}
          </Button>
        </div>
        {error && <p className="error-message text-sm">{error}</p>}
      </Card>

      {result && (
        <Card title="Results">
          <div className="results-info">
            <p className="text-lg">
              <span className="font-medium">Hub:</span> {result.hub}
            </p>
            <p className="text-lg">
              <span className="font-medium">Site Name:</span> {result.hub_site}
            </p>
            <p>
              <span className="font-medium">Centrality Score:</span> 
              <span className="text-mono">{result.centrality_score.toFixed(4)}</span>
            </p>
            <p>
              <span className="font-medium">Total Nodes:</span> {result.total_nodes}
            </p>
            <p>
              <span className="font-medium">Total Edges:</span> {result.total_edges}
            </p>
          </div>
          <div className="visualization-container">
            <GraphVisualization 
              graphData={{
                nodes: result.graph.nodes,
                edges: result.graph.edges,
                hub: result.hub
              }} 
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default UploadCSV;
