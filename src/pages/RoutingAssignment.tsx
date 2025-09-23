import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Route, 
  Settings, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  MapPin,
  User
} from 'lucide-react';
import { mockDepartments, jharkhandWards } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const RoutingAssignment = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('Road Repair');
  const [selectedWard, setSelectedWard] = useState('Hinoo');
  const [autoRouting, setAutoRouting] = useState(true);

  const categories = ['Road Repair', 'Water Supply', 'Electricity', 'Waste Management', 'Street Lighting', 'Drainage', 'Park Maintenance', 'Traffic Issues'];

  const routingRules = [
    { id: 1, category: 'Road Repair', ward: 'All Wards', dept: 'PWD', priority: 'High', autoAssign: true },
    { id: 2, category: 'Water Supply', ward: 'All Wards', dept: 'PHE', priority: 'Critical', autoAssign: true },
    { id: 3, category: 'Electricity', ward: 'All Wards', dept: 'ELE', priority: 'Critical', autoAssign: true },
    { id: 4, category: 'Waste Management', ward: 'Central Areas', dept: 'UDD', priority: 'Medium', autoAssign: false },
    { id: 5, category: 'Street Lighting', ward: 'All Wards', dept: 'ELE', priority: 'Low', autoAssign: true },
  ];

  const pendingAssignments = [
    { id: 'JH202510045', category: 'Road Repair', ward: 'Hinoo', priority: 'High', waitTime: '15 mins', needsApproval: false },
    { id: 'JH202510046', category: 'Water Supply', ward: 'Lalpur', priority: 'Critical', waitTime: '8 mins', needsApproval: true },
    { id: 'JH202510047', category: 'Electricity', ward: 'Kadru', priority: 'Medium', waitTime: '22 mins', needsApproval: false },
  ];

  const escalationRules = [
    { level: 1, condition: 'No acknowledgment in 2 hours', action: 'Notify Department Head', active: true },
    { level: 2, condition: 'No progress in 24 hours', action: 'Escalate to District Collector', active: true },
    { level: 3, condition: 'SLA breach (Critical issues)', action: 'SMS to Chief Secretary', active: false },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.routing')}
          </h1>
          <p className="text-muted-foreground">
            Configure automatic routing and assignment rules for efficient issue resolution
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch checked={autoRouting} onCheckedChange={setAutoRouting} />
            <Label>Auto-routing Enabled</Label>
          </div>
          <Badge variant={autoRouting ? "default" : "secondary"}>
            {autoRouting ? 'Active' : 'Manual Mode'}
          </Badge>
        </div>
      </div>

      {/* System Status Alert */}
      <Alert>
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-700">
          Routing system is operational. 94% of issues auto-assigned successfully in the last 24 hours.
          <Button variant="link" className="ml-2 p-0 h-auto text-green-700 underline">
            View detailed metrics
          </Button>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routing Rules Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Route className="w-5 h-5 text-primary" />
                <span>Routing Rules Configuration</span>
              </CardTitle>
              <CardDescription>
                Define how issues are automatically assigned to departments based on category and location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedWard} onValueChange={setSelectedWard}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Ward" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Wards">All Wards</SelectItem>
                      {jharkhandWards.map(ward => (
                        <SelectItem key={ward.id} value={ward.name}>{ward.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Update Rule
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Ward/Zone</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Auto-Assign</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {routingRules.map((rule) => (
                        <TableRow key={rule.id}>
                          <TableCell className="font-medium">{rule.category}</TableCell>
                          <TableCell>{rule.ward}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{rule.dept}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              rule.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                              rule.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                              rule.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            }>
                              {rule.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch checked={rule.autoAssign} />
                          </TableCell>
                          <TableCell>
                            <Button size="sm" variant="ghost">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Escalation Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>SLA Escalation Rules</span>
              </CardTitle>
              <CardDescription>
                Automatic escalation when service level agreements are at risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalationRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-orange-600">L{rule.level}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{rule.condition}</p>
                        <p className="text-xs text-muted-foreground">
                          <ArrowRight className="w-3 h-3 inline mr-1" />
                          {rule.action}
                        </p>
                      </div>
                    </div>
                    <Switch checked={rule.active} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Pending Assignments & Department Status */}
        <div className="space-y-6">
          {/* Pending Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Pending Assignments</span>
              </CardTitle>
              <CardDescription>
                Issues awaiting automatic or manual assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">{assignment.id}</span>
                    <Badge className={
                      assignment.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      assignment.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }>
                      {assignment.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {assignment.ward} • {assignment.category}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Waiting: {assignment.waitTime}
                    </span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Auto-assign
                      </Button>
                      {assignment.needsApproval && (
                        <Button size="sm" variant="default" className="h-6 text-xs">
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Department Workload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Department Workload</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockDepartments.slice(0, 5).map((dept) => {
                const activeIssues = Math.floor(Math.random() * 50) + 10;
                const capacity = dept.activeStaff * 2;
                const utilization = Math.round((activeIssues / capacity) * 100);
                
                return (
                  <div key={dept.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{dept.code}</div>
                      <div className="text-xs text-muted-foreground">
                        {activeIssues} active issues
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{utilization}%</div>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            utilization > 90 ? 'bg-red-500' :
                            utilization > 70 ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <User className="w-4 h-4 mr-2" />
                Bulk Assignment Tool
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure SLA Targets
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Override
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoutingAssignment;