import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatLike, Map as MapboxMap, MapMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Square, KeyRound } from 'lucide-react';

interface MapAOISelectorProps {
  onAOISelected?: (bounds: { west: number; south: number; east: number; north: number }) => void;
}

const DEFAULT_CENTER: LngLatLike = [78.9629, 20.5937]; // India

const MapAOISelector: React.FC<MapAOISelectorProps> = ({ onAOISelected }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);

  const [token, setToken] = useState('');
  const [hasMap, setHasMap] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(null);
  const [areaKm2, setAreaKm2] = useState<number | null>(null);

  // Initialize map when token and container are ready
  useEffect(() => {
    if (!containerRef.current || !token || hasMap) return;

    try {
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: DEFAULT_CENTER,
        zoom: 4.5,
        projection: { name: 'globe' },
        pitch: 45,
      });

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');
      map.scrollZoom.disable();

      map.on('style.load', () => {
        map.setFog({
          color: 'rgb(0, 0, 0)',
          'high-color': 'rgb(100, 120, 180)',
          'horizon-blend': 0.2,
        });
      });

      // Mouse events for drag-to-select rectangle
      const onMouseDown = (e: MapMouseEvent) => {
        setIsDrawing(true);
        setStartPoint({ x: e.point.x, y: e.point.y });
        setEndPoint({ x: e.point.x, y: e.point.y });
      };

      const onMouseMove = (e: MapMouseEvent) => {
        if (!isDrawing) return;
        setEndPoint({ x: e.point.x, y: e.point.y });
      };

      const onMouseUp = (e: MapMouseEvent) => {
        if (!isDrawing || !startPoint) return;
        setIsDrawing(false);
        const end = { x: e.point.x, y: e.point.y };
        setEndPoint(end);

        // Compute bounds in lng/lat
        const minX = Math.min(startPoint.x, end.x);
        const minY = Math.min(startPoint.y, end.y);
        const maxX = Math.max(startPoint.x, end.x);
        const maxY = Math.max(startPoint.y, end.y);

        const sw = map.unproject([minX, maxY]);
        const ne = map.unproject([maxX, minY]);

        const west = sw.lng;
        const south = sw.lat;
        const east = ne.lng;
        const north = ne.lat;

        // Approximate area in km^2
        const latMid = (south + north) / 2;
        const dLatKm = Math.abs(north - south) * 111; // km per degree latitude
        const dLngKm = Math.abs(east - west) * 111 * Math.cos((latMid * Math.PI) / 180);
        const area = Number((dLatKm * dLngKm).toFixed(2));
        setAreaKm2(area);

        onAOISelected?.({ west, south, east, north });
      };

      map.on('mousedown', onMouseDown);
      map.on('mousemove', onMouseMove);
      map.on('mouseup', onMouseUp);

      mapRef.current = map;
      setHasMap(true);

      return () => {
        map.off('mousedown', onMouseDown);
        map.off('mousemove', onMouseMove);
        map.off('mouseup', onMouseUp);
        map.remove();
        mapRef.current = null;
        setHasMap(false);
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Map init error', err);
    }
  }, [token, hasMap, onAOISelected]);

  // Draw selection rectangle overlay
  const selectionStyle: React.CSSProperties | undefined = (() => {
    if (!startPoint || !endPoint || !isDrawing) return undefined;
    const left = Math.min(startPoint.x, endPoint.x);
    const top = Math.min(startPoint.y, endPoint.y);
    const width = Math.abs(startPoint.x - endPoint.x);
    const height = Math.abs(startPoint.y - endPoint.y);
    return {
      position: 'absolute',
      left,
      top,
      width,
      height,
      border: '2px dashed rgba(59, 130, 246, 0.9)',
      background: 'rgba(59, 130, 246, 0.15)',
      pointerEvents: 'none',
      zIndex: 1000,
    } as React.CSSProperties;
  })();

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

      {/* Token Input */}
      {!hasMap && (
        <div className="absolute top-4 right-4 z-[1001] glass-card p-2 flex items-center space-x-2">
          <KeyRound className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Enter Mapbox public token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-64"
          />
          <Button onClick={() => setToken((t) => t.trim())}>Load</Button>
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0 rounded-lg shadow-lg" />

      {/* Selection overlay */}
      {selectionStyle && <div style={selectionStyle} />}

      {/* Gradient overlay to blend with theme */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default MapAOISelector;
