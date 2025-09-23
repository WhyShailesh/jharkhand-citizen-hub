import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, Filter } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  lowBandwidth?: boolean;
}

const InteractiveMap = ({ lowBandwidth = false }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Jharkhand coordinates and mock data
  const jharkhandCenter: [number, number] = [23.6102, 85.2799];
  const mockIssues = [
    { lat: 23.3441, lng: 85.3096, count: 45, city: 'Ranchi', severity: 'high' },
    { lat: 23.7957, lng: 86.4304, count: 67, city: 'Jamshedpur', severity: 'critical' },
    { lat: 23.8315, lng: 86.1842, count: 23, city: 'Dhanbad', severity: 'medium' },
    { lat: 24.7913, lng: 85.0002, count: 18, city: 'Darbhanga', severity: 'low' },
    { lat: 23.4559, lng: 85.0893, count: 34, city: 'Hazaribagh', severity: 'medium' },
    { lat: 24.6291, lng: 85.1022, count: 29, city: 'Gaya', severity: 'medium' },
  ];

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map
    mapRef.current = L.map(mapContainer.current).setView(jharkhandCenter, 7);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add markers for mock issues
    mockIssues.forEach((issue) => {
      const color = 
        issue.severity === 'critical' ? '#DC2626' :
        issue.severity === 'high' ? '#EA580C' :
        issue.severity === 'medium' ? '#D97706' : '#65A30D';

      const marker = L.circleMarker([issue.lat, issue.lng], {
        radius: Math.sqrt(issue.count) * 2,
        fillColor: color,
        color: color,
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.6
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div class="p-2">
          <h4 class="font-bold text-sm">${issue.city}</h4>
          <p class="text-xs text-gray-600">${issue.count} active issues</p>
          <p class="text-xs capitalize">Priority: ${issue.severity}</p>
        </div>
      `);
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (lowBandwidth) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-3">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-sm font-medium">Static Map Mode</p>
          <p className="text-xs text-muted-foreground">Interactive map disabled for low bandwidth</p>
          <div className="space-y-2 pt-2">
            {mockIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between text-xs bg-background/50 rounded px-2 py-1">
                <span>{issue.city}</span>
                <Badge variant="outline" className="text-xs">{issue.count}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold text-sm mb-2 flex items-center">
            <Layers className="w-3 h-3 mr-1" />
            Legend
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Critical (50+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span>High (30-49)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span>Medium (15-29)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Low (&lt;15)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter */}
      <div className="absolute bottom-4 left-4">
        <Button variant="outline" size="sm" className="bg-white/95 backdrop-blur-sm">
          <Filter className="w-3 h-3 mr-1" />
          Filters
        </Button>
      </div>
    </div>
  );
};

export default InteractiveMap;