import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Square, X } from 'lucide-react';
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
    const startDrawing = (latlng: L.LatLng) => {
      isDrawingRef.current = true;
      startPointRef.current = latlng;
      
      // Disable map interactions during drawing
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.getContainer().style.cursor = 'crosshair';
      
      // Remove existing rectangle
      if (rectLayerRef.current) {
        map.removeLayer(rectLayerRef.current);
        rectLayerRef.current = null;
      }
      setAreaKm2(null);
    };

    const onMouseDown = (e: L.LeafletMouseEvent) => {
      startDrawing(e.latlng);
    };
    const updateDrawing = (latlng: L.LatLng) => {
      if (!isDrawingRef.current || !startPointRef.current) return;
      const bounds = L.latLngBounds(startPointRef.current, latlng);
      if (rectLayerRef.current) {
        rectLayerRef.current.setBounds(bounds);
      } else {
        rectLayerRef.current = L.rectangle(bounds, {
          color: '#3b82f6',
          weight: 2,
          fillColor: '#3b82f6',
          fillOpacity: 0.15,
          dashArray: '5, 5'
        }).addTo(map);
      }
    };

    const onMouseMove = (e: L.LeafletMouseEvent) => {
      updateDrawing(e.latlng);
    };
    const finishDrawing = (latlng: L.LatLng) => {
      if (!isDrawingRef.current || !startPointRef.current) return;
      
      isDrawingRef.current = false;
      
      // Re-enable map interactions
      map.dragging.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.getContainer().style.cursor = '';
      
      const start = startPointRef.current;
      const west = Math.min(start.lng, latlng.lng);
      const east = Math.max(start.lng, latlng.lng);
      const south = Math.min(start.lat, latlng.lat);
      const north = Math.max(start.lat, latlng.lat);
      
      // Ignore zero-area selections
      if (west === east || south === north) {
        if (rectLayerRef.current) {
          map.removeLayer(rectLayerRef.current);
          rectLayerRef.current = null;
        }
        return;
      }
      
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
      
      // Fit map to selected bounds
      if (rectLayerRef.current) {
        map.fitBounds(rectLayerRef.current.getBounds(), { padding: [50, 50] });
      }
    };

    const onMouseUp = (e: L.LeafletMouseEvent) => {
      finishDrawing(e.latlng);
    };
    // Touch event handlers using DOM events
    const container = map.getContainer();
    
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const containerRect = container.getBoundingClientRect();
        const point = map.containerPointToLatLng([
          touch.clientX - containerRect.left,
          touch.clientY - containerRect.top
        ]);
        startDrawing(point);
        e.preventDefault();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const containerRect = container.getBoundingClientRect();
        const point = map.containerPointToLatLng([
          touch.clientX - containerRect.left,
          touch.clientY - containerRect.top
        ]);
        updateDrawing(point);
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const containerRect = container.getBoundingClientRect();
        const point = map.containerPointToLatLng([
          touch.clientX - containerRect.left,
          touch.clientY - containerRect.top
        ]);
        finishDrawing(point);
        e.preventDefault();
      }
    };

    map.on('mousedown', onMouseDown);
    map.on('mousemove', onMouseMove);
    map.on('mouseup', onMouseUp);
    
    // Add touch event listeners to container
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: false });
    
    return () => {
      map.off('mousedown', onMouseDown);
      map.off('mousemove', onMouseMove);
      map.off('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      if (rectLayerRef.current) {
        map.removeLayer(rectLayerRef.current);
        rectLayerRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
  }, [onAOISelected]);

  const handleClearAOI = () => {
    if (rectLayerRef.current && mapRef.current) {
      mapRef.current.removeLayer(rectLayerRef.current);
      rectLayerRef.current = null;
    }
    setAreaKm2(null);
    onAOISelected?.(null as any);
  };

  return <div className="relative w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-[1001] space-y-2">
        <Badge className="glass-card font-montserrat text-xs border-primary/30 bg-primary/10">
          <MapPin className="w-3 h-3 mr-1" />
          Drag to select area
        </Badge>
        {areaKm2 !== null && (
          <>
            <Badge className="glass-card font-montserrat text-xs bg-primary/20 border-primary/50">
              <Square className="w-3 h-3 mr-1" />
              Area: {areaKm2} km²
            </Badge>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleClearAOI}
              className="w-full text-xs h-7"
            >
              <X className="w-3 h-3 mr-1" />
              Clear AOI
            </Button>
          </>
        )}
      </div>

      <div ref={containerRef} className="absolute inset-0 rounded-lg shadow-lg z-0" />

      {/* Gradient overlay to blend with theme */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg z-[1000]" />
    </div>;
};
export default MapAOISelector;