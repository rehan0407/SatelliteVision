import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Square } from 'lucide-react';

// Fix leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapAOISelectorProps {
  onAOISelected?: (bounds: any) => void;
}

const MapAOISelector = ({ onAOISelected }: MapAOISelectorProps) => {
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [aoiCoordinates, setAOICoordinates] = useState<any>(null);

  const calculateArea = (bounds: L.LatLngBounds) => {
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    
    // Approximate area calculation in km²
    const latDiff = northEast.lat - southWest.lat;
    const lngDiff = northEast.lng - southWest.lng;
    const area = Math.abs(latDiff * lngDiff * 111 * 111 * Math.cos((northEast.lat + southWest.lat) / 2 * Math.PI / 180));
    
    return area.toFixed(2);
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    const bounds = layer.getBounds();
    const area = calculateArea(bounds);
    
    setSelectedArea(parseFloat(area));
    setAOICoordinates(bounds);
    
    if (onAOISelected) {
      onAOISelected(bounds);
    }
  };

  const handleEdited = (e: any) => {
    const layers = e.layers;
    layers.eachLayer((layer: any) => {
      const bounds = layer.getBounds();
      const area = calculateArea(bounds);
      setSelectedArea(parseFloat(area));
      setAOICoordinates(bounds);
    });
  };

  const handleDeleted = () => {
    setSelectedArea(null);
    setAOICoordinates(null);
  };

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
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
            draw={{
              rectangle: {
                shapeOptions: {
                  color: '#3b82f6',
                  weight: 2,
                  fillOpacity: 0.2
                }
              },
              polygon: {
                shapeOptions: {
                  color: '#3b82f6',
                  weight: 2,
                  fillOpacity: 0.2
                }
              },
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapAOISelector;
