import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, AlertTriangle, Download, Eye, Loader2, MapPin } from 'lucide-react';

interface AOIBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface ChangeDetectionOverlayProps {
  showHeatmap?: boolean;
  selectedAOI?: AOIBounds | null;
  isLoading?: boolean;
}

const ChangeDetectionOverlay = ({ 
  showHeatmap = true, 
  selectedAOI,
  isLoading = false 
}: ChangeDetectionOverlayProps) => {
  const changeCategories = [
    { name: 'Deforestation', color: 'bg-red-500', area: 156, percentage: 36.5, severity: 'high' },
    { name: 'Urban Growth', color: 'bg-yellow-500', area: 182, percentage: 42.6, severity: 'medium' },
    { name: 'Water Bodies', color: 'bg-blue-500', area: 89, percentage: 20.9, severity: 'low' },
  ];

  // Show message if no AOI selected
  if (!selectedAOI && !isLoading) {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg border border-border/30 flex flex-col items-center justify-center space-y-4">
        <MapPin className="w-16 h-16 text-muted-foreground/50" />
        <div className="text-center space-y-2">
          <p className="font-montserrat text-lg font-medium text-foreground">No AOI Selected</p>
          <p className="font-montserrat text-sm text-muted-foreground max-w-md">
            Please select an Area of Interest from the AOI Selection tab to view change detection analysis
          </p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg border border-border/30 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <div className="text-center space-y-2">
          <p className="font-montserrat text-lg font-medium text-foreground">Processing Change Detection</p>
          <p className="font-montserrat text-sm text-muted-foreground">
            Analyzing satellite imagery for the selected area...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Heatmap Overlay Visualization */}
      <div className="relative aspect-video bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/30 overflow-hidden">
        {/* Base Satellite Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-900/50">
          {/* Grid pattern to simulate satellite imagery */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Change Detection Heatmap Overlay */}
        {showHeatmap && (
          <>
            {/* Red zones - Deforestation */}
            <div className="absolute top-[20%] left-[15%] w-[30%] h-[25%] bg-red-500/40 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-[30%] left-[20%] w-[20%] h-[20%] bg-red-600/50 rounded-full blur-xl"></div>
            
            {/* Yellow zones - Urban Growth */}
            <div className="absolute top-[50%] right-[20%] w-[35%] h-[30%] bg-yellow-500/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-[55%] right-[25%] w-[25%] h-[20%] bg-yellow-600/50 rounded-full blur-xl"></div>
            
            {/* Blue zones - Water Bodies */}
            <div className="absolute bottom-[15%] left-[40%] w-[25%] h-[20%] bg-blue-500/40 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </>
        )}

        {/* Info Badge */}
        <Badge className="absolute top-4 left-4 glass-card bg-background/90 border-primary/30 font-montserrat text-xs">
          <Activity className="w-3 h-3 mr-1 animate-pulse" />
          Change Detection Active
        </Badge>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 glass-card p-3 space-y-2">
          <p className="font-montserrat text-xs font-semibold text-foreground mb-2">Change Intensity</p>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-red-500/60 rounded"></div>
              <div className="w-4 h-4 bg-yellow-500/60 rounded"></div>
              <div className="w-4 h-4 bg-blue-500/60 rounded"></div>
            </div>
            <span className="font-montserrat text-xs text-muted-foreground">High → Low</span>
          </div>
        </div>
      </div>

      {/* Change Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {changeCategories.map((category, index) => (
          <Card key={index} className="glass-card border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                  <span className="font-montserrat text-sm font-medium text-foreground">{category.name}</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    category.severity === 'high' ? 'bg-red-500/20 text-red-300' : 
                    category.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-blue-500/20 text-blue-300'
                  }`}
                >
                  {category.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                  <span className="font-orbitron text-2xl font-bold text-foreground">{category.area}</span>
                  <span className="font-montserrat text-sm text-muted-foreground">km²</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>{category.percentage}% of total change</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="glass-card">
          <Eye className="w-4 h-4 mr-2" />
          Toggle Overlay
        </Button>
        <Button className="bg-gradient-cosmic">
          <Download className="w-4 h-4 mr-2" />
          Export Analysis
        </Button>
      </div>
    </div>
  );
};

export default ChangeDetectionOverlay;
