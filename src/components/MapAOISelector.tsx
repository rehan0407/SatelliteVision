import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Rectangle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { MapPin, Square } from 'lucide-react';

interface MapAOISelectorProps {
  onAOISelected?: (bounds: any) => void;
}

// Component to handle drawing on the map
const DrawControl = ({ onAOISelected, setSelectedArea }: any) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<L.LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<L.LatLng | null>(null);
  const [rectangle, setRectangle] = useState<L.LatLngBounds | null>(null);

  const calculateArea = (bounds: L.LatLngBounds) => {
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    
    // Approximate area calculation in km²
    const latDiff = northEast.lat - southWest.lat;
    const lngDiff = northEast.lng - southWest.lng;
    const area = Math.abs(latDiff * lngDiff * 111 * 111 * Math.cos((northEast.lat + southWest.lat) / 2 * Math.PI / 180));
    
    return area.toFixed(2);
  };

  useMapEvents({
    click(e) {
      if (!isDrawing) {
        // Start drawing
        setIsDrawing(true);
        setStartPoint(e.latlng);
        setEndPoint(e.latlng);
      } else {
        // Finish drawing
        setIsDrawing(false);
        if (startPoint && endPoint) {
          const bounds = L.latLngBounds(startPoint, endPoint);
          setRectangle(bounds);
          const area = calculateArea(bounds);
          setSelectedArea(parseFloat(area));
          if (onAOISelected) {
            onAOISelected(bounds);
          }
        }
      }
    },
    mousemove(e) {
      if (isDrawing && startPoint) {
        setEndPoint(e.latlng);
      }
    }
  });

  if (rectangle) {
    return (
      <Rectangle
        bounds={rectangle}
        pathOptions={{ color: '#3b82f6', weight: 2, fillOpacity: 0.2 }}
      />
    );
  }

  if (isDrawing && startPoint && endPoint) {
    return (
      <Rectangle
        bounds={L.latLngBounds(startPoint, endPoint)}
        pathOptions={{ color: '#3b82f6', weight: 2, fillOpacity: 0.1, dashArray: '5, 5' }}
      />
    );
  }

  return null;
};

const MapAOISelector = ({ onAOISelected }: MapAOISelectorProps) => {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full">
      {/* Map Info Overlay */}
      <div className="absolute top-4 left-4 z-[1000] space-y-2">
        <Badge className="glass-card font-montserrat text-xs bg-background/90 border-primary/30">
          <MapPin className="w-3 h-3 mr-1" />
          ISRO AOI Selection
        </Badge>
        {selectedArea && (
          <Badge className="glass-card font-montserrat text-xs bg-primary/20 border-primary/50">
            <Square className="w-3 h-3 mr-1" />
            Area: {selectedArea} km²
          </Badge>
        )}
      </div>

      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DrawControl onAOISelected={onAOISelected} setSelectedArea={setSelectedArea} />
      </MapContainer>
    </div>
  );
};

export default MapAOISelector;
