import React, { useState } from 'react';

const FileUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle file submission logic here
        if (selectedFile) {
            // Perform actions with the selected file
            console.log('Selected file:', selectedFile);
        } else {
            console.log('No file selected');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FileUploadForm;