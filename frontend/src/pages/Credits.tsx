import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, MapPin, User, Zap, CheckCircle } from "lucide-react";

const Credits = () => {
  const authenticatedProducts = [
    {
      id: "THT-2025-001",
      name: "Royal Banarasi Silk Saree",
      type: "Saree",
      artisan: "Priya Sharma",
      location: "Varanasi, Uttar Pradesh",
      date: "2025-01-15",
      technique: "Traditional Handloom",
      status: "verified"
    },
    {
      id: "THT-2025-002", 
      name: "Pashmina Shawl",
      type: "Shawl",
      artisan: "Raj Kumar",
      location: "Kashmir, J&K",
      date: "2025-01-14",
      technique: "Hand-spun Pashmina",
      status: "verified"
    },
    {
      id: "THT-2025-003",
      name: "Khadi Cotton Fabric",
      type: "Fabric",
      artisan: "Meera Devi",
      location: "Gujarat",
      date: "2025-01-13",
      technique: "Charkha Spinning",
      status: "verified"
    },
    {
      id: "THT-2025-004",
      name: "Ikat Silk Dupatta",
      type: "Dupatta",
      artisan: "Krishna Rao",
      location: "Telangana",
      date: "2025-01-12",
      technique: "Ikat Weaving",
      status: "verified"
    },
    {
      id: "THT-2025-005",
      name: "Chanderi Saree",
      type: "Saree", 
      artisan: "Sunita Jain",
      location: "Madhya Pradesh",
      date: "2025-01-11",
      technique: "Chanderi Handloom",
      status: "verified"
    }
  ];

  const stats = [
    { label: "Total Products Verified", value: "1,247", icon: CheckCircle },
    { label: "Verified Artisans", value: "342", icon: User },
    { label: "States Covered", value: "18", icon: MapPin },
    { label: "Verification Success Rate", value: "99.8%", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <Award className="inline-block w-10 h-10 mr-3 mb-1" />
              Verification Credits
            </h1>
            <p className="text-xl text-muted-foreground">
              Digital proof of experience for every authenticated handloom product
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-card border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="text-2xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Products List */}
          <Card className="bg-gradient-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Recently Authenticated Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {authenticatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-background/50 rounded-lg p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Artisan:</span>
                            <span>{product.artisan}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Location:</span>
                            <span>{product.location}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Date:</span>
                            <span>{new Date(product.date).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Technique:</span>
                            <span>{product.technique}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{product.type}</Badge>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Product ID</div>
                          <div className="font-mono text-sm">{product.id}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Digital Proof Section */}
          <Card className="bg-gradient-card border-primary/20 mt-8">
            <CardHeader>
              <CardTitle>Digital Proof of Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">Handloom Heritage Certified</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    This digital certificate serves as immutable proof of participation in the 
                    Threads of Truth blockchain verification system. Every product listed above 
                    represents authentic handloom craftsmanship verified through advanced 
                    oracle technology and stored on the blockchain.
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Blockchain Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Oracle Authenticated</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-accent" />
                      <span>Hackathon 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Credits;