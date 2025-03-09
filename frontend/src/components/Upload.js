import React, { useState } from 'react';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please upload a valid CSV file.');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('No file selected. Please choose a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed. Please try again.');
            }

            const result = await response.json();
            console.log('Upload successful:', result);
            // Handle successful upload (e.g., redirect or display results)
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Seismic Dataset</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Upload;