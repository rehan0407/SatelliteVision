import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Image, 
  Layers, 
  Activity
} from 'lucide-react';
import MapAOISelector from './MapAOISelector';
import ImageComparison from './ImageComparison';
import ChangeDetectionOverlay from './ChangeDetectionOverlay';

interface AOIBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

const VisualizationSection = () => {
  const [activeTab, setActiveTab] = useState('aoi');
  const [selectedAOI, setSelectedAOI] = useState<AOIBounds | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const visualizationFeatures = [
    {
      id: 'aoi',
      title: 'AOI Selection',
      icon: MapPin,
      description: 'Select Area of Interest on the map for analysis'
    },
    {
      id: 'imagery',
      title: 'LISS-IV Images',
      icon: Layers,
      description: 'Display before/after satellite imagery comparison'
    },
    {
      id: 'detection',
      title: 'Change Detection',
      icon: Activity,
      description: 'Heatmap overlay showing detected changes'
    }
  ];

  const handleAOISelected = (bounds: AOIBounds | null) => {
    if (bounds) {
      setIsLoading(true);
      setSelectedAOI(bounds);
      console.log('AOI Selected:', bounds);
      
      // Simulate data fetching (replace with actual backend call later)
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setSelectedAOI(null);
      setIsLoading(false);
    }
  };

  return (
    <section id="visualization" className="py-24 space-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6">
            <Image className="w-4 h-4 text-accent" />
            <span className="font-montserrat text-sm font-medium text-muted-foreground">
              Visualization Engine
            </span>
          </div>
          
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-6">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Interactive Analysis
            </span>
          </h2>
          
          <p className="font-montserrat text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive workflow: Select AOI → Load LISS-IV imagery → Analyze changes → View results
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {visualizationFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Button
                key={feature.id}
                variant={activeTab === feature.id ? "default" : "outline"}
                className={`glass-card font-montserrat font-medium transition-all duration-300 ${
                  activeTab === feature.id 
                    ? 'bg-gradient-cosmic shadow-glow-primary' 
                    : 'border-border/50 hover:border-primary/50'
                }`}
                onClick={() => setActiveTab(feature.id)}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {feature.title}
              </Button>
            );
          })}
        </div>

        {/* Main Visualization Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization Display */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-orbitron font-semibold text-xl text-foreground mb-2">
                      {visualizationFeatures.find(f => f.id === activeTab)?.title}
                    </CardTitle>
                    <CardDescription className="font-montserrat text-muted-foreground">
                      {visualizationFeatures.find(f => f.id === activeTab)?.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isLoading && activeTab !== 'aoi' && (
                      <Badge variant="secondary" className="glass-card font-montserrat text-xs bg-primary/20 text-primary">
                        Loading...
                      </Badge>
                    )}
                    {selectedAOI && !isLoading && activeTab !== 'aoi' && (
                      <Badge variant="secondary" className="glass-card font-montserrat text-xs bg-success/20 text-success">
                        AOI Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Content based on active tab */}
                {activeTab === 'aoi' && (
                  <div className="h-[500px] rounded-lg overflow-hidden">
                    <MapAOISelector onAOISelected={handleAOISelected} />
                  </div>
                )}
                
                {activeTab === 'imagery' && (
                  <ImageComparison selectedAOI={selectedAOI} isLoading={isLoading} />
                )}
                
                {activeTab === 'detection' && (
                  <ChangeDetectionOverlay selectedAOI={selectedAOI} isLoading={isLoading} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Statistics Card */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron font-semibold text-lg text-foreground">
                  Analysis Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Total Area</span>
                  <span className="font-montserrat font-semibold text-foreground">2,847 km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Changes Detected</span>
                  <span className="font-montserrat font-semibold text-warning">427 km²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Confidence Level</span>
                  <span className="font-montserrat font-semibold text-success">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Processing Time</span>
                  <span className="font-montserrat font-semibold text-primary">3.2 min</span>
                </div>
              </CardContent>
            </Card>

            {/* Change Types */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron font-semibold text-lg text-foreground">
                  Change Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-montserrat text-sm text-muted-foreground">Deforestation</span>
                  </div>
                  <span className="font-montserrat text-sm font-semibold">156 km²</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-montserrat text-sm text-muted-foreground">Water Bodies</span>
                  </div>
                  <span className="font-montserrat text-sm font-semibold">89 km²</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-montserrat text-sm text-muted-foreground">Urban Growth</span>
                  </div>
                  <span className="font-montserrat text-sm font-semibold">182 km²</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-montserrat text-sm text-muted-foreground">Agriculture</span>
                  </div>
                  <span className="font-montserrat text-sm font-semibold">0 km²</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualizationSection;