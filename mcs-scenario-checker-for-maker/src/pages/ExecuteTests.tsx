import React, { useState, useEffect } from 'react';

const ExecuteTests: React.FC = () => {
    const [testResults, setTestResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTestResults = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.example.com/test-results'); // Replace with actual API endpoint
            const data = await response.json();
            setTestResults(data);
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

    useEffect(() => {
        fetchTestResults();
    }, []);

    return (
        <div>
            <h1>Execute Tests</h1>
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

export default ExecuteTests;