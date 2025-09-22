import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Settings,
  Filter,
  Download,
  Zap,
  MapPin,
  Calendar
} from 'lucide-react';

const AlertsSection = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Deforestation Detected',
      location: 'Amazon Basin, Sector 7-A',
      area: '23.4 km²',
      confidence: 96.8,
      timestamp: '2024-01-15 14:23:17',
      description: 'Significant forest loss detected in protected area. Immediate investigation required.',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Urban Expansion Alert',
      location: 'Mumbai Metropolitan Area',
      area: '8.7 km²',
      confidence: 89.2,
      timestamp: '2024-01-15 12:45:33',
      description: 'Rapid urban development detected near coastal conservation zone.',
      status: 'acknowledged'
    },
    {
      id: 3,
      type: 'info',
      title: 'Seasonal Water Level Change',
      location: 'Brahmaputra River Delta',
      area: '145.8 km²',
      confidence: 94.1,
      timestamp: '2024-01-15 09:12:45',
      description: 'Normal seasonal flooding patterns observed in delta region.',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'critical',
      title: 'Wildfire Spread Detected',
      location: 'Western Ghats, Kerala',
      area: '5.2 km²',
      confidence: 98.5,
      timestamp: '2024-01-15 16:07:22',
      description: 'Active wildfire spreading towards populated areas. Emergency response initiated.',
      status: 'active'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [newAlert, setNewAlert] = useState(false);

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNewAlert(true);
        setTimeout(() => setNewAlert(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'acknowledged': return 'default';
      case 'resolved': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter || alert.status === filter);

  return (
    <section id="alerts" className="py-24 space-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-6">
            <Bell className={`w-4 h-4 ${newAlert ? 'text-destructive animate-pulse' : 'text-warning'}`} />
            <span className="font-montserrat text-sm font-medium text-muted-foreground">
              Alert System
            </span>
            {newAlert && (
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            )}
          </div>
          
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl mb-6">
            <span className="bg-gradient-cosmic bg-clip-text text-transparent">
              Real-Time Monitoring
            </span>
          </h2>
          
          <p className="font-montserrat text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Intelligent alert system providing instant notifications for critical changes 
            detected in your monitored areas with customizable thresholds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Alert Controls */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-border/50 mb-6">
              <CardHeader>
                <CardTitle className="font-orbitron font-semibold text-lg text-foreground">
                  Alert Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="font-montserrat text-sm font-medium text-muted-foreground">
                    Filter Alerts
                  </label>
                  <div className="space-y-2">
                    {['all', 'critical', 'warning', 'info', 'active', 'resolved'].map((filterOption) => (
                      <Button
                        key={filterOption}
                        variant={filter === filterOption ? "default" : "outline"}
                        size="sm"
                        className={`w-full justify-start glass-card font-montserrat text-xs ${
                          filter === filterOption ? 'bg-gradient-cosmic' : ''
                        }`}
                        onClick={() => setFilter(filterOption)}
                      >
                        <Filter className="w-3 h-3 mr-2" />
                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/30">
                  <Button variant="outline" size="sm" className="w-full glass-card font-montserrat">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Alert Statistics */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="font-orbitron font-semibold text-lg text-foreground">
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Active Alerts</span>
                  <span className="font-montserrat font-semibold text-destructive">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">This Week</span>
                  <span className="font-montserrat font-semibold text-warning">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Resolution Rate</span>
                  <span className="font-montserrat font-semibold text-success">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat text-sm text-muted-foreground">Avg Response</span>
                  <span className="font-montserrat font-semibold text-primary">12 min</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron font-semibold text-xl text-foreground">
                Recent Alerts ({filteredAlerts.length})
              </h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="glass-card font-montserrat">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <div className={`w-2 h-2 rounded-full ${
                  newAlert ? 'bg-destructive animate-pulse' : 'bg-success'
                }`}></div>
                <span className="font-montserrat text-sm text-muted-foreground">
                  {newAlert ? 'New Alert' : 'System Online'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="glass-card border-border/50 hover:shadow-glow-soft transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                          alert.type === 'critical' ? 'bg-destructive/20' :
                          alert.type === 'warning' ? 'bg-warning/20' :
                          'bg-primary/20'
                        }`}>
                          {alert.type === 'critical' ? (
                            <AlertTriangle className={`w-5 h-5 ${getAlertColor(alert.type)}`} />
                          ) : alert.type === 'warning' ? (
                            <Bell className={`w-5 h-5 ${getAlertColor(alert.type)}`} />
                          ) : (
                            <CheckCircle className={`w-5 h-5 ${getAlertColor(alert.type)}`} />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="font-orbitron font-semibold text-lg text-foreground">
                              {alert.title}
                            </CardTitle>
                            <Badge 
                              variant={getAlertBadgeVariant(alert.status)}
                              className="font-montserrat text-xs"
                            >
                              {alert.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground font-montserrat mb-2">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-montserrat font-semibold text-lg text-foreground mb-1">
                          {alert.confidence}%
                        </div>
                        <div className="font-montserrat text-xs text-muted-foreground">
                          Confidence
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="font-montserrat text-muted-foreground mb-4">
                      {alert.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-montserrat">
                          <span className="text-muted-foreground">Affected Area: </span>
                          <span className="font-semibold text-foreground">{alert.area}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="glass-card font-montserrat">
                          View Details
                        </Button>
                        {alert.status === 'active' && (
                          <Button variant="default" size="sm" className="bg-gradient-cosmic font-montserrat">
                            <Zap className="w-3 h-3 mr-1" />
                            Respond
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;