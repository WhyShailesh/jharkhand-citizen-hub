import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText,
  MapPin,
  Users,
  Target,
  Wifi,
  WifiOff
} from 'lucide-react';
import { getDashboardStats } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import InteractiveMap from '@/components/InteractiveMap';

const Dashboard = () => {
  const { t } = useLanguage();
  const [lowBandwidth, setLowBandwidth] = useState(false);
  const stats = getDashboardStats();

  const statCards = [
    {
      title: t('stats.total'),
      value: stats.totalReports.toLocaleString(),
      icon: FileText,
      trend: '+12%',
      trendUp: true,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('stats.new'),
      value: stats.newToday.toString(),
      icon: Clock,
      trend: '+3',
      trendUp: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('stats.pending'),
      value: stats.pendingIssues.toString(),
      icon: AlertTriangle,
      trend: '-8%',
      trendUp: false,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('stats.resolved'),
      value: stats.resolvedIssues.toString(),
      icon: CheckCircle2,
      trend: '+15%',
      trendUp: true,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('stats.sla'),
      value: stats.slaBreaches.toString(),
      icon: Target,
      trend: '-5%',
      trendUp: false,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.dashboard')}
          </h1>
          <p className="text-muted-foreground">
            Real-time overview of civic issues across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLowBandwidth(!lowBandwidth)}
            className="flex items-center space-x-2"
          >
            {lowBandwidth ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span>{lowBandwidth ? 'Low Bandwidth' : 'High Quality'}</span>
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            Last Updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      {/* Alert Banner */}
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800">System Notice</AlertTitle>
        <AlertDescription className="text-orange-700">
          Scheduled maintenance window: Tonight 11:00 PM - 2:00 AM IST. Emergency reporting will remain available.
          <Button variant="link" className="ml-2 p-0 h-auto text-orange-700 underline">
            View Details
          </Button>
        </AlertDescription>
      </Alert>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`w-3 h-3 ${
                    stat.trendUp ? 'text-green-500' : 'text-red-500'
                  } ${!stat.trendUp && 'rotate-180'}`} />
                  <span className={`text-xs font-medium ${
                    stat.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend}
                  </span>
                  <span className="text-xs text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Heatmap Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Jharkhand Issues Heatmap</span>
                </CardTitle>
                <CardDescription>
                  Geographic distribution of civic issues across districts
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Live Data</Badge>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Updated 2m ago</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <InteractiveMap lowBandwidth={lowBandwidth} />
          </CardContent>
        </Card>

        {/* Recent Activities & Quick Actions */}
        <div className="space-y-6">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Department Performance</CardTitle>
              <CardDescription>Resolution rates this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { dept: 'PWD', rate: 94, color: 'bg-green-500' },
                { dept: 'PHE', rate: 87, color: 'bg-blue-500' },
                { dept: 'ELE', rate: 91, color: 'bg-primary' },
                { dept: 'UDD', rate: 78, color: 'bg-orange-500' },
                { dept: 'ENV', rate: 82, color: 'bg-purple-500' },
              ].map((dept) => (
                <div key={dept.dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 ${dept.color} rounded-full`}></div>
                    <span className="font-medium text-sm">{dept.dept}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{dept.rate}%</div>
                    <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${dept.color} transition-all duration-500`}
                        style={{ width: `${dept.rate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Create New Issue Report
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Monthly Report
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Department Status Check
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;