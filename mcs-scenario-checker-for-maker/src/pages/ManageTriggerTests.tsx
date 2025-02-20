import React, { useState, useEffect } from 'react';
import { CosmosClient } from '@azure/cosmos';

const ManageTriggerTests: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [items, setItems] = useState<any[]>([]);
    const [itemId, setItemId] = useState<string>('');

    useEffect(() => {
        fetchItems();
    }, []);

    const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(event.target.value);
    };

    const validateJson = (jsonString: string) => {
        try {
            JSON.parse(jsonString);
            console.log('Trigger query test case is valid:', jsonString);
            return true;
        } catch (e) {
            return false;
        }
    };

    const getClient = () => {
        return new CosmosClient({
            endpoint: process.env.REACT_APP_COSMOS_DB_ENDPOINT!,
            key: process.env.REACT_APP_COSMOS_DB_KEY!
        });
    };

    const getContainer = () => {
        const client = getClient();
        const database = client.database(process.env.REACT_APP_COSMOS_DB_DATABASE_NAME!);
        return database.container(process.env.REACT_APP_COSMOS_DB_CONTAINER_NAME!);
    };

    const handleSubmit = async () => {
        if (validateJson(jsonInput)) {
            try {
                const container = getContainer();
                const { resource: createdItem } = await container.items.create(JSON.parse(jsonInput));
                console.log('Created item:', createdItem);
                setError('');
                setSuccess('JSON submitted successfully');
                fetchItems();
            } catch (error) {
                let errorMessage = (error as any).message;
                console.error('Error submitting JSON:', error);
                setError('Error submitting JSON');
            }
        } else {
            setError('Invalid JSON format');
        }
    };

    const fetchItems = async () => {
        try {
            const container = getContainer();
            const { resources } = await container.items.readAll().fetchAll();
            setItems(resources);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Error fetching items');
        }
    };

    const handleUpdate = async () => {
        if (validateJson(jsonInput) && itemId) {
            try {
                const container = getContainer();
                const { resource: updatedItem } = await container.item(itemId).replace(JSON.parse(jsonInput));
                console.log('Updated item:', updatedItem);
                setError('');
                setSuccess('JSON updated successfully');
                fetchItems();
            } catch (error) {
                let errorMessage = (error as any).message;
                console.error('Error updating JSON:', error);
                setError('Error updating JSON');
            }
        } else {
            setError('Invalid JSON format or missing item ID');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const container = getContainer();
            await container.item(id).delete();
            console.log('Deleted item with ID:', id);
            setError('');
            setSuccess('Item deleted successfully');
            fetchItems();
        } catch (error) {
            let errorMessage = (error as any).message;
            console.error('Error deleting item:', error);
            setError('Error deleting item');
        }
    };

    return (
        <div>
            <h2>Manage Trigger Tests</h2>
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
            <button onClick={handleSubmit}>Create</button>
            <button onClick={handleUpdate}>Update</button>
            <br />
            <h3>Existing Items</h3>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {JSON.stringify(item)}
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        <button onClick={() => setItemId(item.id)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageTriggerTests;