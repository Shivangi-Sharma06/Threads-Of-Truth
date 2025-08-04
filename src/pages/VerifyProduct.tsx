import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertCircle, MapPin, Clock, User, Hash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const VerifyProduct = () => {
  const [productHash, setProductHash] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      if (productHash.toLowerCase().includes("valid")) {
        setVerificationResult({
          status: "verified",
          productId: "THT-2025-001",
          artisan: {
            wallet: "0x742d35Cc6775C06aA6A7e3cB8DfF0000000000",
            name: "Priya Sharma",
            role: "Master Weaver"
          },
          metadata: {
            location: "Varanasi, Uttar Pradesh, India",
            timestamp: "2025-01-15T10:30:00Z",
            productType: "Banarasi Silk Saree",
            technique: "Traditional Handloom"
          },
          proofHash: "0xabc123...def456"
        });
      } else {
        setVerificationResult({
          status: "invalid",
          error: "Product hash not found or invalid"
        });
      }
      setIsVerifying(false);
    }, 2000);
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
    setFeedback("");
    // You can add logic here to send feedback to your backend or API
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <Shield className="inline-block w-10 h-10 mr-3 mb-1" />
              Verify Product Authenticity
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter the product hash to verify its authenticity and view detailed metadata
            </p>
          </div>

          {/* Verification Form */}
          <Card className="bg-gradient-card border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="w-5 h-5 mr-2" />
                Product Hash Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productHash">Product Hash</Label>
                <Input
                  id="productHash"
                  placeholder="Enter product hash (e.g., 0xabc123...def456)"
                  value={productHash}
                  onChange={(e) => setProductHash(e.target.value)}
                  className="bg-background/50"
                />
                <p className="text-sm text-muted-foreground">
                  Try entering "valid123" to see a successful verification
                </p>
              </div>

              <Button
                onClick={handleVerify}
                disabled={!productHash || isVerifying}
                className="w-full"
                size="lg"
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Verify Product
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Verification Results */}
          {verificationResult && (
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {verificationResult.status === "verified" ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Product Verified
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 mr-2 text-destructive" />
                      Verification Failed
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {verificationResult.status === "verified" ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Authentic
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Product Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">
                          Product Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Product ID:</span>
                            <span className="font-mono text-sm">{verificationResult.productId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{verificationResult.metadata.productType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Technique:</span>
                            <span>{verificationResult.metadata.technique}</span>
                          </div>
                        </div>
                      </div>

                      {/* Artisan Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">
                          Artisan Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span>{verificationResult.artisan.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Role:</span>
                            <Badge variant="secondary">{verificationResult.artisan.role}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Wallet:</span>
                            <span className="font-mono text-xs">{verificationResult.artisan.wallet}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">
                        Verification Metadata
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">Location</div>
                            <div className="text-sm text-muted-foreground">{verificationResult.metadata.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <div className="font-medium">Created</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(verificationResult.metadata.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-medium">Blockchain Proof</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        This product's authenticity has been verified on the blockchain:
                      </p>
                      <code className="block bg-background/50 p-2 rounded text-xs font-mono">
                        {verificationResult.proofHash}
                      </code>
                    </div>

                    {/* Feedback Section */}
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="feedback">Customer Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your feedback about this product or verification experience..."
                        rows={3}
                        className="bg-background/50"
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        disabled={feedbackSubmitted}
                      />
                      <Button
                        className="mt-2"
                        type="button"
                        disabled={!feedback || feedbackSubmitted}
                        onClick={handleFeedbackSubmit}
                      >
                        {feedbackSubmitted ? "Feedback Submitted" : "Submit Feedback"}
                      </Button>
                      {feedbackSubmitted && (
                        <div className="text-green-600 text-sm mt-1">
                          Thank you for your feedback!
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Verification Failed</p>
                    <p className="text-muted-foreground">{verificationResult.error}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};