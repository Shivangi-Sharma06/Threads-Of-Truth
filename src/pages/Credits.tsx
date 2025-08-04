import React, { useEffect, useState } from 'react';

interface CreditsProps {
  productId?: string;
}

const Credits = ({ productId }: CreditsProps) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      if (!productId) {
        console.warn("No productId passed.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching logs for productId:", productId);
        const res = await fetch(`http://localhost:5000/api/logs/${productId}`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Logs fetched from backend:", data);

        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.warn("Expected array from API, got:", typeof data);
          setLogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch logs:", err);
        setError("Could not load logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [productId]);

  if (loading) return <p>Loading logs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!productId) return <p className="text-yellow-500">No product selected.</p>;

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
