import React from 'react';

interface Log {
  status: string;
  verifierRole: string;
  message: string;
  txHash: string;
  timestamp: string;
  artisanName: string;
  wallet: string;
  location: string;
  photo: string;
  credits: number;
}

interface CreditsProps {
  productId?: string;
}

// Hardcoded example logs for demonstration
const HARDCODED_LOGS: Log[] = [
  {
    status: "Verified",
    verifierRole: "Weaver",
    message: "Product handloomed and verified on-chain.",
    txHash: "0xabc123def4567890",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 min ago
    artisanName: "Priya Sharma",
    wallet: "0x742d35Cc6775C06aA6A7e3cB8DfF0000000000",
    location: "Varanasi, Uttar Pradesh, India",
    photo: "banarasi_silk_saree.jpg",
    credits: 12,
  },
  {
    status: "Verified",
    verifierRole: "Dyer",
    message: "Natural dyeing process completed and verified.",
    txHash: "0xdef789abc1234567",
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 min ago
    artisanName: "Amit Kumar",
    wallet: "0x8ee7D9235e01e6B42345120b5d270bdb763624C7",
    location: "Surat, Gujarat, India",
    photo: "dyed_thread.jpg",
    credits: 8,
  },
  {
    status: "Verified",
    verifierRole: "Spinner",
    message: "Spinning completed and verified.",
    txHash: "0x9876fedcba543210",
    timestamp: new Date(Date.now() - 6 * 60 * 1000).toISOString(), // 6 min ago
    artisanName: "Sunita Devi",
    wallet: "0x3f5CE5FBFe3E9af3971dD833D26BA9b5C936f0bE",
    location: "Panipat, Haryana, India",
    photo: "spun_yarn.jpg",
    credits: 6,
  },
];

const Credits = ({ productId }: CreditsProps) => {
  // Filter logs by productId if you want, or just show all for demo
  const logs = HARDCODED_LOGS;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Verification Logs & Artisan Credits</h2>
      {logs.length === 0 ? (
        <p>No logs found for this product.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span>
                  <strong>{log.artisanName}</strong> ({log.verifierRole})
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                  Credits: {log.credits}
                </span>
              </div>
              <p><strong>Status:</strong> {log.status}</p>
              <p><strong>Wallet:</strong> <span className="font-mono">{log.wallet}</span></p>
              <p><strong>Message:</strong> {log.message}</p>
              <p><strong>Tx Hash:</strong> <span className="font-mono">{log.txHash}</span></p>
              <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
              <p><strong>Location:</strong> {log.location}</p>
              <p><strong>Photo Metadata:</strong> {log.photo}</p>
              <p>
                <strong>Oracle:</strong>{" "}
                <span className="text-green-600 font-semibold">Chainlink Verified</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Credits;