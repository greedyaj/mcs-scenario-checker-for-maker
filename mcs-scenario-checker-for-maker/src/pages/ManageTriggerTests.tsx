import React, { useState, useEffect } from 'react';
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

const CACHE_EXPIRY = 10 * 24 * 60 * 60; // 10 days in seconds

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

    const handleSubmit = async () => {
        if (validateJson(jsonInput)) {
            try {
                const item = JSON.parse(jsonInput);
                await redis.set(item.id, JSON.stringify(item), 'EX', CACHE_EXPIRY);
                console.log('Created item:', item);
                setError('');
                setSuccess('JSON submitted successfully');
                fetchItems();
            } catch (error) {
                console.error('Error submitting JSON:', error);
                setError('Error submitting JSON');
            }
        } else {
            setError('Invalid JSON format');
        }
    };

    const fetchItems = async () => {
        try {
            const keys = await redis.keys('*');
            const items = await Promise.all(keys.map(async key => {
                const item = await redis.get(key);
                return JSON.parse(item!);
            }));
            setItems(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Error fetching items');
        }
    };

    const handleUpdate = async () => {
        if (validateJson(jsonInput) && itemId) {
            try {
                const item = JSON.parse(jsonInput);
                await redis.set(itemId, JSON.stringify(item), 'EX', CACHE_EXPIRY);
                console.log('Updated item:', item);
                setError('');
                setSuccess('JSON updated successfully');
                fetchItems();
            } catch (error) {
                console.error('Error updating JSON:', error);
                setError('Error updating JSON');
            }
        } else {
            setError('Invalid JSON format or missing item ID');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await redis.del(id);
            console.log('Deleted item with ID:', id);
            setError('');
            setSuccess('Item deleted successfully');
            fetchItems();
        } catch (error) {
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