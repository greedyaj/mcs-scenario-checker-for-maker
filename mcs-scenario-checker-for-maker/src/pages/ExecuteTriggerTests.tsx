import React, { useState, useEffect } from 'react';
import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

const ExecuteTriggerTests: React.FC = () => {
    const [testResults, setTestResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchTestResults();
    }, []);

    const fetchTestResults = async () => {
        setLoading(true);
        try {
            const keys = await redis.keys('*');
            const results = await Promise.all(keys.map(async key => {
                const item = await redis.get(key);
                return JSON.parse(item!);
            }));
            setTestResults(results);
        } catch (error) {
            console.error('Error fetching test results:', error);
        } finally {
            setLoading(false);
        }
    };

    const executeTest = async (testId: string) => {
        try {
            const response = await fetch(`https://api.example.com/execute-test/${testId}`, { method: 'POST' });
            const result = await response.json();
            // Update the testResults state with the new result
            setTestResults(prevResults => 
                prevResults.map(test => 
                    test.id === testId ? { ...test, status: result.status } : test
                )
            );
        } catch (error) {
            console.error('Error executing test:', error);
        }
    };

    const executeAllTests = async () => {
        const batchSize = 10;
        for (let i = 0; i < testResults.length; i += batchSize) {
            const batch = testResults.slice(i, i + batchSize);
            await Promise.all(batch.map(test => executeTest(test.id)));
        }
    };

    return (
        <div>
            <h1>Execute Trigger Tests</h1>
            <button onClick={executeAllTests}>Execute All Tests</button>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Test ID</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResults.map(test => (
                            <tr key={test.id}>
                                <td>{test.id}</td>
                                <td>{test.description}</td>
                                <td>{test.status}</td>
                                <td>
                                    <button onClick={() => executeTest(test.id)}>Execute</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ExecuteTriggerTests;