import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { MapPin, Square } from 'lucide-react';
interface MapAOISelectorProps {
  onAOISelected?: (bounds: {
    west: number;
    south: number;
    east: number;
    north: number;
  }) => void;
}
const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]; // India [lat, lng]
const DEFAULT_ZOOM = 5;
const MapAOISelector: React.FC<MapAOISelectorProps> = ({
  onAOISelected
}) => {
  const [areaKm2, setAreaKm2] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const rectLayerRef = useRef<L.Rectangle | null>(null);
  const startPointRef = useRef<L.LatLng | null>(null);
  const isDrawingRef = useRef(false);
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: L.latLng(DEFAULT_CENTER[0], DEFAULT_CENTER[1]),
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      scrollWheelZoom: true
    });
    mapRef.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const onMouseDown = (e: L.LeafletMouseEvent) => {
      isDrawingRef.current = true;
      startPointRef.current = e.latlng;
      if (rectLayerRef.current) {
        map.removeLayer(rectLayerRef.current);
        rectLayerRef.current = null;
      }
    };
    const onMouseMove = (e: L.LeafletMouseEvent) => {
      if (!isDrawingRef.current || !startPointRef.current) return;
      const bounds = L.latLngBounds(startPointRef.current, e.latlng);
      if (rectLayerRef.current) {
        rectLayerRef.current.setBounds(bounds);
      } else {
        rectLayerRef.current = L.rectangle(bounds, {
          color: 'rgba(59, 130, 246, 0.9)',
          weight: 2,
          fillColor: 'rgba(59, 130, 246, 0.15)',
          dashArray: '5, 5'
        }).addTo(map);
      }
    };
    const onMouseUp = (e: L.LeafletMouseEvent) => {
      if (!isDrawingRef.current || !startPointRef.current) return;
      isDrawingRef.current = false;
      const start = startPointRef.current;
      const west = Math.min(start.lng, e.latlng.lng);
      const east = Math.max(start.lng, e.latlng.lng);
      const south = Math.min(start.lat, e.latlng.lat);
      const north = Math.max(start.lat, e.latlng.lat);
      const latMid = (south + north) / 2;
      const dLatKm = Math.abs(north - south) * 111;
      const dLngKm = Math.abs(east - west) * 111 * Math.cos(latMid * Math.PI / 180);
      const area = Number((dLatKm * dLngKm).toFixed(2));
      setAreaKm2(area);
      onAOISelected?.({
        west,
        south,
        east,
        north
      });
    };
    map.on('mousedown', onMouseDown);
    map.on('mousemove', onMouseMove);
    map.on('mouseup', onMouseUp);
    return () => {
      map.off('mousedown', onMouseDown);
      map.off('mousemove', onMouseMove);
      map.off('mouseup', onMouseUp);
      if (rectLayerRef.current) {
        map.removeLayer(rectLayerRef.current);
        rectLayerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, [onAOISelected]);
  return <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-[1001] space-y-2">
        <Badge className="glass-card font-montserrat text-xs border-primary/30 bg-red-300">
          <MapPin className="w-3 h-3 mr-1" />
          AOI Selection (Drag to draw)
        </Badge>
        {areaKm2 !== null && <Badge className="glass-card font-montserrat text-xs bg-primary/20 border-primary/50">
            <Square className="w-3 h-3 mr-1" />
            Area: {areaKm2} km²
          </Badge>}
      </div>

      <div ref={containerRef} className="absolute inset-0 rounded-lg shadow-lg z-0" />

      {/* Gradient overlay to blend with theme */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg z-[1000]" />
    </div>;
};
export default MapAOISelector;