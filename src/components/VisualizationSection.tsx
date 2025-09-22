import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image, 
  Layers, 
  BarChart3, 
  Download, 
  Play, 
  Pause,
  ZoomIn,
  Filter
} from 'lucide-react';

const VisualizationSection = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isPlaying, setIsPlaying] = useState(false);

  const visualizationFeatures = [
    {
      id: 'upload',
      title: 'Image Upload & Selection',
      icon: Upload,
      description: 'Upload satellite imagery or select from our extensive database'
    },
    {
      id: 'comparison',
      title: 'Before & After Comparison',
      icon: Layers,
      description: 'Interactive slider for temporal change visualization'
    },
    {
      id: 'analysis',
      title: 'Change Detection Results',
      icon: BarChart3,
      description: 'Heatmaps and highlighted areas showing detected changes'
    },
    {
      id: 'export',
      title: 'Data Export & Reports',
      icon: Download,
      description: 'Generate detailed reports and export analysis results'
    }
  ];

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
            Advanced visualization tools for comprehensive satellite imagery analysis 
            and change detection results presentation.
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
                      Satellite Imagery Analysis
                    </CardTitle>
                    <CardDescription className="font-montserrat text-muted-foreground">
                      {visualizationFeatures.find(f => f.id === activeTab)?.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="glass-card font-montserrat text-xs">
                      Live Demo
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Demo Visualization Area */}
                <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/30 flex items-center justify-center relative overflow-hidden">
                  {/* Simulated satellite imagery background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-success/20"></div>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                       radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
                    }}></div>
                  </div>
                  
                  {/* Content based on active tab */}
                  <div className="relative z-10 text-center">
                    {activeTab === 'upload' && (
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 text-primary mx-auto opacity-60" />
                        <p className="font-montserrat text-muted-foreground">
                          Upload satellite imagery or select from database
                        </p>
                        <Button variant="outline" className="glass-card border-primary/30">
                          <Upload className="w-4 h-4 mr-2" />
                          Select Images
                        </Button>
                      </div>
                    )}
                    
                    {activeTab === 'comparison' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-24 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded border border-blue-400/30 flex items-center justify-center">
                            <span className="font-montserrat text-xs text-blue-300">Before</span>
                          </div>
                          <Layers className="w-8 h-8 text-accent" />
                          <div className="w-24 h-16 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded border border-red-400/30 flex items-center justify-center">
                            <span className="font-montserrat text-xs text-red-300">After</span>
                          </div>
                        </div>
                        <p className="font-montserrat text-muted-foreground">
                          Interactive comparison slider for temporal analysis
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'analysis' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-16 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded border border-green-400/30 flex items-center justify-center">
                            <span className="font-montserrat text-xs text-green-300">No Change: 85%</span>
                          </div>
                          <div className="h-16 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded border border-red-400/30 flex items-center justify-center">
                            <span className="font-montserrat text-xs text-red-300">Change: 15%</span>
                          </div>
                        </div>
                        <p className="font-montserrat text-muted-foreground">
                          AI-powered change detection with confidence scores
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'export' && (
                      <div className="space-y-4">
                        <Download className="w-16 h-16 text-success mx-auto opacity-60" />
                        <p className="font-montserrat text-muted-foreground">
                          Generate comprehensive analysis reports
                        </p>
                        <div className="flex justify-center space-x-2">
                          <Button variant="outline" size="sm" className="glass-card">PDF</Button>
                          <Button variant="outline" size="sm" className="glass-card">CSV</Button>
                          <Button variant="outline" size="sm" className="glass-card">GeoJSON</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-card"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="glass-card">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="glass-card">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm font-montserrat text-muted-foreground">
                    Resolution: 10m | Date: 2024-01-15
                  </div>
                </div>
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