import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Maximize2, Loader2, MapPin } from 'lucide-react';

interface AOIBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface ImageComparisonProps {
  beforeImage?: string;
  afterImage?: string;
  beforeDate?: string;
  afterDate?: string;
  selectedAOI?: AOIBounds | null;
  isLoading?: boolean;
}

const ImageComparison = ({ 
  beforeImage, 
  afterImage,
  beforeDate = '2023-06-15',
  afterDate = '2024-01-15',
  selectedAOI,
  isLoading = false
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // Show message if no AOI selected
  if (!selectedAOI && !isLoading) {
    return (
      <div className="aspect-video bg-muted/20 rounded-lg border border-border/30 flex flex-col items-center justify-center space-y-4">
        <MapPin className="w-16 h-16 text-muted-foreground/50" />
        <div className="text-center space-y-2">
          <p className="font-montserrat text-lg font-medium text-foreground">No AOI Selected</p>
          <p className="font-montserrat text-sm text-muted-foreground max-w-md">
            Please select an Area of Interest from the AOI Selection tab to view satellite imagery comparison
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
          <p className="font-montserrat text-lg font-medium text-foreground">Loading Satellite Imagery</p>
          <p className="font-montserrat text-sm text-muted-foreground">
            Fetching LISS-IV images for selected area...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Comparison Viewer */}
      <div className="relative aspect-video bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-border/30 overflow-hidden">
        {/* Before Image (Background) */}
        <div className="absolute inset-0">
          {beforeImage ? (
            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-700/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto opacity-50" />
                <p className="font-montserrat text-sm text-blue-300/70">LISS-IV Image (Before)</p>
                <p className="font-montserrat text-xs text-muted-foreground">{beforeDate}</p>
              </div>
            </div>
          )}
          <Badge className="absolute top-4 left-4 glass-card bg-blue-500/20 border-blue-400/30 text-blue-200 font-montserrat text-xs">
            Before: {beforeDate}
          </Badge>
        </div>

        {/* After Image (Clipped) */}
        <div 
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {afterImage ? (
            <img src={afterImage} alt="After" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-700/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Calendar className="w-12 h-12 text-red-400 mx-auto opacity-50" />
                <p className="font-montserrat text-sm text-red-300/70">LISS-IV Image (After)</p>
                <p className="font-montserrat text-xs text-muted-foreground">{afterDate}</p>
              </div>
            </div>
          )}
          <Badge className="absolute top-4 right-4 glass-card bg-red-500/20 border-red-400/30 text-red-200 font-montserrat text-xs">
            After: {afterDate}
          </Badge>
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-0.5 h-4 bg-gray-600"></div>
              <div className="w-0.5 h-4 bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="glass-card">
            <Maximize2 className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
          <Button variant="outline" size="sm" className="glass-card">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="text-xs font-montserrat text-muted-foreground">
          Resolution: 5.8m | Sensor: LISS-IV
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;
