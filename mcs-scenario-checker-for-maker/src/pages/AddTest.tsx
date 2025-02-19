// filepath: /Users/ajitpawar/microsoft/bap/POCs/Scenario_checker_for_maker/mcs-scenario-checker-for-maker/src/pages/AddTest.tsx
import React, { useState } from 'react';
import { CosmosClient } from '@azure/cosmos';

const AddTest: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(event.target.value);
    };

    const validateJson = (jsonString: string) => {
        alert('validateJson');
        try {
            JSON.parse(jsonString);
            console.log('Trigger query test case is valid:', jsonString);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async () => {
        alert('handleSubmit');
        if (validateJson(jsonInput)) {
            try {
                alert('endpoint: ' + process.env.REACT_APP_COSMOS_DB_ENDPOINT!);
                alert('key: ' + process.env.REACT_APP_COSMOS_DB_KEY!);
                alert('database: ' + process.env.REACT_APP_COSMOS_DB_DATABASE_NAME!);
                alert('container: ' + process.env.REACT_APP_COSMOS_DB_CONTAINER_NAME!);
                console.log('Getting cosmos DB client');
                const client = new CosmosClient({
                    endpoint: process.env.REACT_APP_COSMOS_DB_ENDPOINT!,
                    key: process.env.REACT_APP_COSMOS_DB_KEY!
                });

                const database = client.database(process.env.REACT_APP_COSMOS_DB_DATABASE_NAME!);
                const container = database.container(process.env.REACT_APP_COSMOS_DB_CONTAINER_NAME!);

                console.log('container: ', container);
                alert('got container client');

                const { resource: createdItem } = await container.items.create(JSON.parse(jsonInput));
                console.log('Created item:', createdItem);
                alert('createdItem: ' + createdItem);

                setError('');
                setSuccess('JSON submitted successfully');
            } catch (error) {
                alert('error');
                let errorMessage = (error as any).message;
                alert('errorMessage: ' + errorMessage);
                console.error('Error submitting JSON:', error);
                setError('Error submitting JSON');
            }
        } else {
            setError('Invalid JSON format');
        }
    };

    const handleBatchImport = async () => {
        // Logic for batch import of multiple test cases
        console.log('Batch import initiated');
        // Add your batch import logic here
    };

    return (
        <div>
            <h2>Add Test</h2>
            <textarea
                rows={10}
                cols={50}
                value={jsonInput}
                onChange={handleJsonChange}
                placeholder="Enter JSON payload here"
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleBatchImport}>Batch Import</button>
        </div>
    );
};

export default AddTest;