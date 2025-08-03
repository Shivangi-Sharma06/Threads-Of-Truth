import React, { useEffect, useState } from 'react';

const Credits = ({ productId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/logs/${productId}`);
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchLogs(); // only call when productId is there
  }, [productId]);

  if (loading) return <p>Loading logs...</p>;
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Verification Logs</h2>
      {logs.length === 0 ? (
        <p>No logs found for this product.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <p><strong>Status:</strong> {log.status}</p>
              <p><strong>Role:</strong> {log.verifierRole}</p>
              <p><strong>Message:</strong> {log.message}</p>
              <p><strong>Tx Hash:</strong> {log.txHash}</p>
              <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Credits;
