import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Camera, MapPin, Clock, Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Credits from "./Credits"; // Adjust path if needed

// CameraCapture component for multiple images
const CameraCapture = ({
  onCapture,
  onClose,
}: {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const startCamera = async () => {
      setError(null);
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (err) {
        setError("Unable to access camera. Please ensure your device has a camera and permission is granted.");
      }
    };
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      // Don't close the camera after capture, allow multiple captures
      onCapture(imageData);
      toast.success("Photo captured!");
    }
  };

  const handleCancel = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center space-y-4">
        <h2 className="text-lg font-bold">Capture Live Photo</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <video
          ref={videoRef}
          className="w-full rounded-lg border border-gray-300"
          autoPlay
          playsInline
        />
        <div className="flex space-x-2 mt-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleCapture}
          >
            Capture Photo
          </button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={handleCancel}
          >
            Done
          </button>
        </div>
        <div className="text-xs text-gray-500">Click "Done" when finished capturing all images.</div>
      </div>
    </div>
  );
};

const existingProductIDs = ["PROD001", "PROD002", "PROD003"]; // Example product IDs

const ArtisanPortal = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");
  const [formData, setFormData] = useState({
    productID: "",
    productType: "",
    technique: "",
    description: "",
    materials: "",
    images: [] as string[], // Multiple images
    location: "",
  });
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
        setIsConnected(true);
        toast.success("Wallet connected successfully!");
      } catch (error) {
        toast.error("User rejected the request or there was an error.");
      }
    } else {
      toast.error("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setIsConnected(false);
    toast("Wallet disconnected.");
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          toast.success("Location captured successfully!");
        },
        () => {
          toast.error("Unable to get location. Please enter manually.");
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmissionResult({
        status: "success",
        productId: "THT-2025-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        proofHash: "0x" + Math.random().toString(36).substr(2, 40),
        timestamp: new Date().toISOString(),
        oracleVerified: true
      });
      setIsSubmitting(false);
      toast.success("Product metadata submitted successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Artisan Portal</h1>
            <p className="text-xl text-muted-foreground">Create verifiable proofs for your handloom products</p>
          </div>

          {!isConnected ? (
            <Card className="bg-gradient-card border-primary/20 mb-8">
              <CardContent className="flex flex-col items-center space-y-6 py-12">
                <Wallet className="w-16 h-16 text-primary" />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Connect Your Wallet </h2>
                  <p className="text-muted-foreground mb-6">Connect your MetaMask wallet to start creating product proofs</p>
                  <Button onClick={connectWallet} size="lg">
                    <Wallet className="w-5 h-5 mr-2" /> Connect MetaMask
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="bg-gradient-card border-primary/20 mb-8">
                <CardContent className="flex items-center justify-between py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Wallet Connected</h3>
                      <p className="text-sm text-muted-foreground font-mono">{wallet}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified Artisan</Badge>
                    <Button variant="outline" size="sm" onClick={disconnectWallet}>Disconnect</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle>Product Metadata Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Wallet Address Dropdown */}
                    <div className="space-y-2">
                      <Label htmlFor="wallet">Select the Wallet Address</Label>
                      <Select
                        value={wallet || ""}
                        onValueChange={(value) => setWallet(value)}
                        disabled={!wallet}
                      >
                        <SelectTrigger className="font-mono text-blue-700 bg-transparent cursor-not-allowed">
                          <SelectValue placeholder="Connect MetaMask to autofill wallet address" />
                        </SelectTrigger>
                        <SelectContent>
                          {wallet && <SelectItem value={wallet}>{wallet}</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Role Dropdown */}
                    <div className="space-y-2">
                      <Label htmlFor="role">Select Your Role</Label>
                      <Select value={role} onValueChange={setRole} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiber_producer">Fiber Producer</SelectItem>
                          <SelectItem value="spinner">Spinner</SelectItem>
                          <SelectItem value="dyer">Dyer</SelectItem>
                          <SelectItem value="weaver">Weaver</SelectItem>
                          <SelectItem value="tailor">Tailor</SelectItem>
                          <SelectItem value="packager">Packager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Product ID input for all roles */}
                    {role && (
                      <div className="space-y-2">
                        <Label htmlFor="productID">Product ID</Label>
                        <Input
                          id="productID"
                          value={formData.productID}
                          onChange={(e) => setFormData(prev => ({ ...prev, productID: e.target.value }))}
                          required
                          placeholder="Enter product ID"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="productType">Product Type</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saree">Saree</SelectItem>
                          <SelectItem value="dupatta">Dupatta</SelectItem>
                          <SelectItem value="fabric">Fabric</SelectItem>
                          <SelectItem value="shawl">Shawl</SelectItem>
                          <SelectItem value="hankerchief">Hankerchief</SelectItem>
                          <SelectItem value="bedsheet">Bedsheet</SelectItem>
                          <SelectItem value="curtain">Curtain</SelectItem>
                          <SelectItem value="tablecloth">Tablecloth</SelectItem>
                          <SelectItem value="cushion_cover">Cushion Cover</SelectItem>
                          <SelectItem value="kurta">Kurta</SelectItem>
                          <SelectItem value="carpet">Carpet</SelectItem>
                          <SelectItem value="dhoti">Dhoti</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="technique">Weaving Technique</Label>
                      <Input
                        id="technique"
                        value={formData.technique}
                        onChange={(e) => setFormData(prev => ({ ...prev, technique: e.target.value }))}
                        required
                        placeholder="Enter weaving technique"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Product Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                        placeholder="Enter product description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="materials">Materials Used</Label>
                      <Input
                        id="materials"
                        value={formData.materials}
                        onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                        required
                        placeholder="List materials"
                      />
                    </div>

                    {/* Image capture */}
                    <div className="space-y-2">
                      <Label>Product Images</Label>
                      <div className="flex space-x-2 flex-wrap">
                        {formData.images.length > 0 &&
                          formData.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt={`Product Image ${idx + 1}`}
                              className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                          ))}
                        <Button
                          onClick={() => setShowCamera(true)}
                          variant="outline"
                          className="flex items-center space-x-2"
                          type="button"
                        >
                          <Camera className="w-5 h-5" />
                          <span>Add Photo</span>
                        </Button>
                      </div>
                    </div>

                    {/* Location input with auto fill */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Latitude, Longitude)</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter location or click the location icon"
                      />
                      <Button
                        variant="ghost"
                        className="mt-1"
                        onClick={getCurrentLocation}
                        type="button"
                      >
                        <MapPin className="w-5 h-5" />
                        <span className="sr-only">Get Current Location</span>
                      </Button>
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Metadata"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Show submission result */}
              {submissionResult && (
                <Card className="bg-gradient-card border-primary/20 mb-8">
                  <CardHeader>
                    <CardTitle>Submission Successful</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 font-mono">
                    <p><strong>Product ID:</strong> {submissionResult.productId}</p>
                    <p><strong>Proof Hash:</strong> {submissionResult.proofHash}</p>
                    <p><strong>Timestamp:</strong> {new Date(submissionResult.timestamp).toLocaleString()}</p>
                    <p><strong>Oracle Verified:</strong> {submissionResult.oracleVerified ? "Yes" : "No"}</p>
                  </CardContent>
                </Card>
              )}

              <Credits productId={submissionResult?.productId} />
            </>
          )}
        </div>
      </div>

      {/* Camera capture modal */}
      {showCamera && (
        <CameraCapture
          onCapture={(imageDataUrl) =>
            setFormData(prev => ({ ...prev, images: [...prev.images, imageDataUrl] }))
          }
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default ArtisanPortal;
