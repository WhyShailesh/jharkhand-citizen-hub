import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  PieChart,
  Target,
  Clock,
  MapPin,
  Users,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Analytics = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('last-30');
  const [reportType, setReportType] = useState('monthly');

  const performanceMetrics = [
    { label: 'Average Resolution Time', value: '18.5 hours', trend: '-12%', trendUp: true },
    { label: 'First Response Time', value: '2.3 hours', trend: '-8%', trendUp: true },
    { label: 'Citizen Satisfaction', value: '87%', trend: '+5%', trendUp: true },
    { label: 'SLA Compliance', value: '94%', trend: '+2%', trendUp: true },
  ];

  const departmentStats = [
    { dept: 'PWD', resolved: 145, pending: 23, avgTime: '16h', satisfaction: 89 },
    { dept: 'PHE', resolved: 98, pending: 34, avgTime: '22h', satisfaction: 85 },
    { dept: 'ELE', resolved: 167, pending: 12, avgTime: '8h', satisfaction: 92 },
    { dept: 'UDD', resolved: 76, pending: 45, avgTime: '28h', satisfaction: 78 },
    { dept: 'ENV', resolved: 54, pending: 18, avgTime: '24h', satisfaction: 83 },
  ];

  const categoryDistribution = [
    { category: 'Road Repair', count: 89, percentage: 32 },
    { category: 'Water Supply', count: 67, percentage: 24 },
    { category: 'Electricity', count: 45, percentage: 16 },
    { category: 'Waste Management', count: 38, percentage: 14 },
    { category: 'Street Lighting', count: 23, percentage: 8 },
    { category: 'Others', count: 16, percentage: 6 },
  ];

  const monthlyTrend = [
    { month: 'Oct', total: 234, resolved: 201, pending: 33 },
    { month: 'Nov', total: 278, resolved: 245, pending: 33 },
    { month: 'Dec', total: 312, resolved: 287, pending: 25 },
    { month: 'Jan', total: 298, resolved: 276, pending: 22 },
  ];

  const generateReport = () => {
    // Mock report generation
    const reportData = {
      reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      totalIssues: 1247,
      resolvedIssues: 1089,
      avgResolutionTime: '18.5 hours'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `civic-issues-${reportType}-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.analytics')}
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and reporting for civic issue management
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7">Last 7 days</SelectItem>
              <SelectItem value="last-30">Last 30 days</SelectItem>
              <SelectItem value="last-90">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={generateReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="flex items-center space-x-1">
                <TrendingUp className={`w-3 h-3 ${
                  metric.trendUp ? 'text-green-500' : 'text-red-500 rotate-180'
                }`} />
                <span className={`text-xs font-medium ${
                  metric.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Monthly Issue Trend</span>
                </CardTitle>
                <CardDescription>Issue creation and resolution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrend.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{data.month} 2025</span>
                        <span className="text-muted-foreground">{data.total} total</span>
                      </div>
                      <div className="flex space-x-1 h-6 bg-muted rounded overflow-hidden">
                        <div 
                          className="bg-green-500 transition-all duration-500"
                          style={{ width: `${(data.resolved / data.total) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-orange-500 transition-all duration-500"
                          style={{ width: `${(data.pending / data.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Resolved: {data.resolved}</span>
                        <span>Pending: {data.pending}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  <span>Issue Categories</span>
                </CardTitle>
                <CardDescription>Distribution of issues by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-orange-500' :
                          index === 3 ? 'bg-purple-500' :
                          index === 4 ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-sm font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{item.count}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>Department Performance Analysis</span>
              </CardTitle>
              <CardDescription>Detailed performance metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="font-medium">{dept.dept}</Badge>
                        <span className="font-semibold text-lg">{dept.resolved + dept.pending} total issues</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Satisfaction: {dept.satisfaction}%</div>
                        <div className="text-xs text-muted-foreground">Avg: {dept.avgTime}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{dept.resolved}</div>
                        <div className="text-xs text-muted-foreground">Resolved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{dept.pending}</div>
                        <div className="text-xs text-muted-foreground">Pending</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.round((dept.resolved / (dept.resolved + dept.pending)) * 100)}%
                        </div>
                        <div className="text-xs text-muted-foreground">Resolution Rate</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{ width: `${(dept.resolved / (dept.resolved + dept.pending)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Geographic Analysis</span>
              </CardTitle>
              <CardDescription>Issue distribution across wards and zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Geographic Analytics</h3>
                <p className="mb-4">Interactive maps and ward-wise statistics will be displayed here</p>
                <Badge variant="secondary">Feature available in full implementation</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Report Generation</span>
              </CardTitle>
              <CardDescription>Generate and download detailed reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Summary</SelectItem>
                    <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                    <SelectItem value="department">Department Performance</SelectItem>
                    <SelectItem value="sla">SLA Compliance Report</SelectItem>
                    <SelectItem value="citizen">Citizen Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={generateReport} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                </Button>
              </div>

              <div className="grid gap-3">
                {[
                  { name: 'Monthly Summary - December 2024', date: '2025-01-15', size: '2.4 MB' },
                  { name: 'Quarterly Analysis - Q4 2024', date: '2025-01-01', size: '5.1 MB' },
                  { name: 'SLA Compliance Report - December', date: '2024-12-31', size: '1.8 MB' },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-sm">{report.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Generated: {report.date} • {report.size}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;