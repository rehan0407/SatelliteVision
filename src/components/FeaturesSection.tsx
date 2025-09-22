import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  Eye, 
  Bell, 
  Target, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe 
} from 'lucide-react';

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Eye,
      title: "Advanced Change Detection",
      description: "AI-powered algorithms analyze multi-temporal satellite imagery to identify precise changes in land use, vegetation, and infrastructure.",
      tags: ["AI/ML", "Computer Vision", "Deep Learning"],
      color: "text-primary",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Bell,
      title: "Real-Time Alert System",
      description: "Instant notifications when significant changes are detected in your monitored areas, with customizable threshold settings.",
      tags: ["Real-Time", "Notifications", "Automation"],
      color: "text-warning",
      gradient: "from-warning/20 to-warning/5"
    },
    {
      icon: Target,
      title: "User-Defined AOI Selection",
      description: "Intuitive interface for drawing and managing custom Areas of Interest with precise coordinate-based boundary definition.",
      tags: ["Interactive", "Geospatial", "Custom Zones"],
      color: "text-accent",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: BarChart3,
      title: "Comprehensive Monitoring",
      description: "Continuous surveillance of environmental changes, urban development, and natural disasters across multiple time periods.",
      tags: ["Monitoring", "Analytics", "Temporal Analysis"],
      color: "text-success",
      gradient: "from-success/20 to-success/5"
    },
    {
      icon: Shield,
      title: "Data Security & Integrity",
      description: "Enterprise-grade security protocols ensure your sensitive geospatial data remains protected and accessible only to authorized users.",
      tags: ["Security", "Privacy", "Compliance"],
      color: "text-destructive",
      gradient: "from-destructive/20 to-destructive/5"
    },
    {
      icon: Zap,
      title: "High-Performance Processing",
      description: "Optimized algorithms process large satellite datasets efficiently, delivering results in minutes rather than hours.",
      tags: ["Performance", "Scalability", "Cloud Computing"],
      color: "text-primary",
      gradient: "from-primary/20 to-primary/5"
    }
  ];

  return (
    <section id="features" className="py-24 space-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6">
            <Satellite className="w-4 h-4 text-primary" />
            <span className="font-montserrat text-sm font-medium text-muted-foreground">
              Platform Capabilities
            </span>
          </div>
          
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-6">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Advanced Features
            </span>
          </h2>
          
          <p className="font-montserrat text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Cutting-edge satellite imagery analysis powered by artificial intelligence, 
            designed for precision monitoring and instant change detection.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`glass-card border-border/50 transition-all duration-300 hover:scale-105 cursor-pointer group ${
                  hoveredCard === index ? 'shadow-glow-soft' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-4">
                  <div className={`inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <CardTitle className="font-orbitron font-semibold text-xl text-foreground mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="font-montserrat text-muted-foreground text-sm leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="glass-card border-border/30 font-montserrat text-xs font-medium"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Specifications */}
        <div className="mt-20">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-orbitron font-semibold text-2xl text-foreground mb-4">
                Technical Specifications
              </h3>
              <p className="font-montserrat text-muted-foreground">
                Built with cutting-edge technology for maximum performance and reliability
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-orbitron font-semibold text-lg mb-2">Satellite Data</h4>
                <p className="font-montserrat text-sm text-muted-foreground">
                  Multi-spectral imagery from Sentinel-2, Landsat, and ISRO satellites
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-orbitron font-semibold text-lg mb-2">Resolution</h4>
                <p className="font-montserrat text-sm text-muted-foreground">
                  Sub-meter accuracy with 10m spatial resolution capabilities
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-success/20 to-success/5 rounded-lg mx-auto mb-4">
                  <Zap className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-orbitron font-semibold text-lg mb-2">Processing Speed</h4>
                <p className="font-montserrat text-sm text-muted-foreground">
                  Real-time analysis with results delivered in under 5 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;