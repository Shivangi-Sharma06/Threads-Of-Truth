import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Camera, MapPin, Clock, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ArtisanPortal = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wallet, setWallet] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    technique: "",
    description: "",
    materials: "",
    image: null as File | null,
    location: "",
  });
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  const connectWallet = async () => {
    // Simulate MetaMask connection
    setTimeout(() => {
      setIsConnected(true);
      setWallet("0x742d35Cc6775C06aA6A7e3cB8DfF0000000000");
      toast.success("Wallet connected successfully!");
    }, 1000);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      toast.success("Image uploaded successfully!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission process
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Artisan Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              Create verifiable proofs for your handloom products
            </p>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <Card className="bg-gradient-card border-primary/20 mb-8">
              <CardContent className="flex flex-col items-center space-y-6 py-12">
                <Wallet className="w-16 h-16 text-primary" />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
                  <p className="text-muted-foreground mb-6">
                    Connect your MetaMask wallet to start creating product proofs
                  </p>
                  <Button onClick={connectWallet} size="lg">
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Wallet Status */}
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
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Verified Artisan
                  </Badge>
                </CardContent>
              </Card>

              {/* Product Metadata Form */}
              <Card className="bg-gradient-card border-primary/20 mb-8">
                <CardHeader>
                  <CardTitle>Product Metadata Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="e.g., Banarasi Silk Saree"
                          value={formData.productName}
                          onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                          className="bg-background/50"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productType">Product Type</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, productType: value }))}>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saree">Saree</SelectItem>
                            <SelectItem value="dupatta">Dupatta</SelectItem>
                            <SelectItem value="fabric">Fabric</SelectItem>
                            <SelectItem value="shawl">Shawl</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="technique">Weaving Technique</Label>
                      <Input
                        id="technique"
                        placeholder="e.g., Traditional Handloom, Jacquard"
                        value={formData.technique}
                        onChange={(e) => setFormData(prev => ({ ...prev, technique: e.target.value }))}
                        className="bg-background/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Product Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your handloom product..."
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-background/50 min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="materials">Materials Used</Label>
                      <Input
                        id="materials"
                        placeholder="e.g., Pure Silk, Cotton, Zari"
                        value={formData.materials}
                        onChange={(e) => setFormData(prev => ({ ...prev, materials: e.target.value }))}
                        className="bg-background/50"
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label>Product Image</Label>
                      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center">
                        <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Take a live photo of your product
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Capture Photo
                        </Button>
                        {formData.image && (
                          <p className="text-sm text-green-400 mt-2">
                            ✓ Image captured: {formData.image.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="location"
                          placeholder="Location coordinates or address"
                          value={formData.location}
                          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                          className="bg-background/50 flex-1"
                          required
                        />
                        <Button type="button" variant="outline" onClick={getCurrentLocation}>
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Submitting to Oracle...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Submit for Verification
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Submission Result */}
              {submissionResult && (
                <Card className="bg-gradient-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Product Submitted Successfully
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Product ID:</span>
                        <span className="font-mono">{submissionResult.productId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timestamp:</span>
                        <span className="text-sm">{new Date(submissionResult.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">Oracle Verification Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your product metadata has been verified by Chainlink Functions and stored on-chain:
                      </p>
                      <code className="block bg-background/50 p-2 rounded text-xs font-mono">
                        {submissionResult.proofHash}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanPortal;