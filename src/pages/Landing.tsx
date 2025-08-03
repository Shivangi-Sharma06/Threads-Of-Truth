import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Users, Zap, Clock, MapPin, Camera } from "lucide-react";
import heroImage from "@/assets/hero-handloom.jpg";

const Landing = () => {
  const features = [
    {
      icon: Camera,
      title: "Live Product Capture",
      description: "Capture authentic handloom products with live camera verification"
    },
    {
      icon: MapPin,
      title: "Geo-tagged Authentication",
      description: "Location-based verification ensures product origin authenticity"
    },
    {
      icon: Clock,
      title: "Timestamp Verification",
      description: "Immutable timestamps create a permanent record of creation"
    },
    {
      icon: Shield,
      title: "Oracle-Verified Metadata",
      description: "Chainlink Functions verify all data before blockchain storage"
    },
    {
      icon: Users,
      title: "Artisan Identity",
      description: "Wallet-based artisan verification and role management"
    },
    {
      icon: Zap,
      title: "Smart Contract Proofs",
      description: "Secure on-chain storage of verification hashes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                  <span className="text-primary font-medium">Crafted to Preserve India's Handloom Legacy</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Authenticating{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Handloom Heritage
                  </span>{" "}
                  with Blockchain
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Empowering artisans and customers with verifiable product authenticity 
                  through oracle-signed metadata and smart contract verification.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/verify">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    <Shield className="w-5 h-5 mr-2" />
                    Verify Product
                  </Button>
                </Link>
                <Link to="/artisan">
                  <Button variant="elegant" size="xl" className="w-full sm:w-auto">
                    <Users className="w-5 h-5 mr-2" />
                    Join as Artisan
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Traditional handloom weaving with blockchain technology"
                className="relative rounded-2xl shadow-elegant w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How <span className="bg-gradient-primary bg-clip-text text-transparent">Threads of Truth</span> Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our blockchain-powered platform creates an immutable record of handloom product authenticity 
              through advanced oracle verification and smart contract technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Protect Your Handloom Heritage?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of artisans and customers who trust blockchain technology 
              to verify authentic handloom products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/artisan">
                <Button variant="hero" size="xl">
                  Start Creating Proofs
                </Button>
              </Link>
              <Link to="/thread-guru">
                <Button variant="elegant" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;