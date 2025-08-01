import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Bot, HelpCircle, Scale, Shield, AlertTriangle } from "lucide-react";

const ThreadGuru = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Welcome to Thread Guru! I'm here to help you with handloom policies, legal rights, and the latest updates in the textile industry. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickActions = [
    { label: "Legal Rights", icon: Scale },
    { label: "Recent Updates", icon: AlertTriangle },
    { label: "Verification Help", icon: Shield },
    { label: "General FAQ", icon: HelpCircle }
  ];

  const recentUpdates = [
    {
      title: "New GST Benefits for Handloom Artisans",
      date: "2025-01-15",
      category: "Policy",
      priority: "high"
    },
    {
      title: "Digital India Initiative for Weavers",
      date: "2025-01-12",
      category: "Technology",
      priority: "medium"
    },
    {
      title: "Export Incentive Scheme Extended",
      date: "2025-01-10",
      category: "Trade",
      priority: "high"
    },
    {
      title: "Skill Development Programs Launched",
      date: "2025-01-08",
      category: "Education",
      priority: "medium"
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: "bot" as const,
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("legal") || message.includes("rights")) {
      return "As a handloom artisan, you have several legal rights: 1) Right to fair pricing for your products, 2) Protection under the Handlooms (Reservation of Articles for Production) Act, 3) Access to government schemes and subsidies, 4) Intellectual property protection for traditional designs. Would you like me to explain any specific right in detail?";
    }
    
    if (message.includes("gst") || message.includes("tax")) {
      return "Good news! The recent GST amendments provide significant benefits: Handloom products are exempt from GST, weavers with turnover below ₹40 lakhs are exempt from registration, and there are special composition schemes available. This helps reduce your tax burden significantly.";
    }
    
    if (message.includes("verify") || message.includes("blockchain")) {
      return "Our blockchain verification system uses Chainlink oracles to verify your product metadata. Simply connect your wallet, upload product photos with location data, and submit the form. The oracle verifies everything and creates an immutable proof on the blockchain. This helps customers trust your products!";
    }
    
    if (message.includes("export") || message.includes("international")) {
      return "The Export Promotion Council for Handicrafts (EPCH) offers great opportunities! Recent schemes include: 1) Market Development Assistance up to 90%, 2) Zero duty on raw materials, 3) Quality certification support, 4) Digital marketing assistance. These can help you reach global markets.";
    }
    
    return "I understand your question about handloom matters. Let me help you with accurate information. Could you please be more specific about what you'd like to know? I can assist with legal rights, government policies, verification processes, or general handloom industry guidance.";
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(`Tell me about ${action.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <MessageCircle className="inline-block w-10 h-10 mr-3 mb-1" />
              Thread Guru
            </h1>
            <p className="text-xl text-muted-foreground">
              Your AI assistant for handloom policies, legal rights, and industry updates
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-primary/20 h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    Chat with Thread Guru
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4 pr-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              msg.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background/50 border border-primary/20"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {msg.type === "bot" && (
                                <Bot className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                              )}
                              {msg.type === "user" && (
                                <User className="w-5 h-5 mt-0.5 text-primary-foreground flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm">{msg.message}</p>
                                <p className="text-xs opacity-60 mt-2">
                                  {msg.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <Button
                            key={action.label}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.label)}
                          >
                            <Icon className="w-4 h-4 mr-1" />
                            {action.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about handloom policies, rights, or verification..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="bg-background/50"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Latest Updates */}
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Latest Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUpdates.map((update, index) => (
                      <div
                        key={index}
                        className="p-3 bg-background/50 rounded-lg border border-primary/10"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm leading-tight">{update.title}</h4>
                          <Badge
                            variant={update.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs ml-2"
                          >
                            {update.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {update.category}
                          </Badge>
                          <span>{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Help Topics */}
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Popular Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      "GST benefits for artisans",
                      "Export licensing procedures",
                      "Quality certification process",
                      "Digital marketing support",
                      "Skill development programs",
                      "Financial assistance schemes"
                    ].map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(`Tell me about ${topic}`)}
                        className="w-full text-left p-2 rounded-lg hover:bg-primary/10 transition-colors text-sm"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gradient-card border-primary/20">
                <CardHeader>
                  <CardTitle>Need Human Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For complex legal matters, connect with our expert advisors.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Expert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadGuru;