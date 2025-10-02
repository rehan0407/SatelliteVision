import React, { useState } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents } from 'react-leaflet';
import { LatLngBounds, LatLng, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { MapPin, Square } from 'lucide-react';

interface MapAOISelectorProps {
  onAOISelected?: (bounds: { west: number; south: number; east: number; north: number }) => void;
}

const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // India [lat, lng]
const DEFAULT_ZOOM = 5;

interface DrawingHandlerProps {
  onAOISelected?: (bounds: { west: number; south: number; east: number; north: number }) => void;
  onAreaCalculated: (area: number) => void;
  onRectangleChange: (bounds: LatLngBounds | null) => void;
}

const DrawingHandler: React.FC<DrawingHandlerProps> = ({ onAOISelected, onAreaCalculated, onRectangleChange }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);

  const map = useMapEvents({
    mousedown: (e: LeafletMouseEvent) => {
      setIsDrawing(true);
      setStartPoint(e.latlng);
      onRectangleChange(null);
    },
    mousemove: (e: LeafletMouseEvent) => {
      if (isDrawing && startPoint) {
        const bounds = new LatLngBounds(startPoint, e.latlng);
        onRectangleChange(bounds);
      }
    },
    mouseup: (e: LeafletMouseEvent) => {
      if (isDrawing && startPoint) {
        setIsDrawing(false);
        const bounds = new LatLngBounds(startPoint, e.latlng);
        onRectangleChange(bounds);

        const west = Math.min(startPoint.lng, e.latlng.lng);
        const east = Math.max(startPoint.lng, e.latlng.lng);
        const south = Math.min(startPoint.lat, e.latlng.lat);
        const north = Math.max(startPoint.lat, e.latlng.lat);

        // Calculate area in km²
        const latMid = (south + north) / 2;
        const dLatKm = Math.abs(north - south) * 111;
        const dLngKm = Math.abs(east - west) * 111 * Math.cos((latMid * Math.PI) / 180);
        const area = Number((dLatKm * dLngKm).toFixed(2));
        
        onAreaCalculated(area);
        onAOISelected?.({ west, south, east, north });
      }
    },
  });

  return null;
};

const MapAOISelector: React.FC<MapAOISelectorProps> = ({ onAOISelected }) => {
  const [rectangleBounds, setRectangleBounds] = useState<LatLngBounds | null>(null);
  const [areaKm2, setAreaKm2] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-[1001] space-y-2">
        <Badge className="glass-card font-montserrat text-xs bg-background/90 border-primary/30">
          <MapPin className="w-3 h-3 mr-1" />
          AOI Selection (Drag to draw)
        </Badge>
        {areaKm2 !== null && (
          <Badge className="glass-card font-montserrat text-xs bg-primary/20 border-primary/50">
            <Square className="w-3 h-3 mr-1" />
            Area: {areaKm2} km²
          </Badge>
        )}
      </div>

      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="absolute inset-0 rounded-lg shadow-lg z-0"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* @ts-expect-error react-leaflet context expects a render function child in this build */}
        {(_ctx: any) => (
          <>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <DrawingHandler
              onAOISelected={onAOISelected}
              onAreaCalculated={setAreaKm2}
              onRectangleChange={setRectangleBounds}
            />

            {rectangleBounds && (
              <Rectangle
                bounds={rectangleBounds}
                pathOptions={{
                  color: 'rgba(59, 130, 246, 0.9)',
                  fillColor: 'rgba(59, 130, 246, 0.15)',
                  weight: 2,
                  dashArray: '5, 5',
                }}
              />
            )}
          </>
        )}
      </MapContainer>

      {/* Gradient overlay to blend with theme */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg z-[1000]" />
    </div>
  );
};

export default MapAOISelector;
