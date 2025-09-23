import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Users, 
  MapPin, 
  Building2, 
  UserPlus, 
  Edit, 
  Trash2,
  Shield,
  Activity,
  Database,
  FileText,
  Download,
  Clock
} from 'lucide-react';
import { mockDepartments, jharkhandWards, mockUsers } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const SystemManagement = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('departments');

  const auditLogs = [
    {
      id: 'AL001',
      timestamp: '2025-01-20T15:30:00Z',
      user: 'Rajesh Kumar Singh',
      action: 'Issue Assigned',
      details: 'Assigned JH202510045 to PWD department',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AL002',
      timestamp: '2025-01-20T15:15:00Z',
      user: 'Priya Sharma',
      action: 'Status Update',
      details: 'Changed status of JH202510042 to Resolved',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'AL003',
      timestamp: '2025-01-20T14:45:00Z',
      user: 'System',
      action: 'Auto Assignment',
      details: 'Auto-assigned 5 new issues based on routing rules',
      ipAddress: 'system'
    },
  ];

  const slaRules = [
    { category: 'Electricity', priority: 'Critical', target: '4 hours', escalation: '2 hours' },
    { category: 'Water Supply', priority: 'High', target: '8 hours', escalation: '4 hours' },
    { category: 'Road Repair', priority: 'Medium', target: '24 hours', escalation: '12 hours' },
    { category: 'Street Lighting', priority: 'Low', target: '72 hours', escalation: '48 hours' },
  ];

  const systemStats = {
    totalUsers: 45,
    activeSessions: 12,
    dbSize: '2.4 GB',
    lastBackup: '2025-01-20T02:00:00Z',
    uptime: '99.8%',
    avgResponseTime: '1.2s'
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.system')}
          </h1>
          <p className="text-muted-foreground">
            System administration and configuration management
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="px-3 py-1">
            System Health: Excellent
          </Badge>
          <Button>
            <Database className="w-4 h-4 mr-2" />
            Backup Now
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-lg font-bold">{systemStats.totalUsers}</div>
                <div className="text-xs text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-lg font-bold">{systemStats.activeSessions}</div>
                <div className="text-xs text-muted-foreground">Active Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-purple-600" />
              <div>
                <div className="text-lg font-bold">{systemStats.dbSize}</div>
                <div className="text-xs text-muted-foreground">Database Size</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-orange-600" />
              <div>
                <div className="text-lg font-bold">{systemStats.uptime}</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-red-600" />
              <div>
                <div className="text-lg font-bold">{systemStats.avgResponseTime}</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <div>
                <div className="text-lg font-bold">2h ago</div>
                <div className="text-xs text-muted-foreground">Last Backup</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="wards">Wards & Zones</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="sla">SLA Rules</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>Department Management</span>
                  </CardTitle>
                  <CardDescription>Manage government departments and their configurations</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Department
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Active Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDepartments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{dept.code}</Badge>
                      </TableCell>
                      <TableCell>{dept.head}</TableCell>
                      <TableCell>{dept.contact}</TableCell>
                      <TableCell>{dept.activeStaff}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wards" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>Ward & Zone Management</span>
                  </CardTitle>
                  <CardDescription>Manage administrative boundaries and electoral wards</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Ward
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ward Name</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Councillor</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jharkhandWards.map((ward) => (
                    <TableRow key={ward.id}>
                      <TableCell className="font-medium">{ward.name}</TableCell>
                      <TableCell>{ward.zone}</TableCell>
                      <TableCell>{ward.population.toLocaleString()}</TableCell>
                      <TableCell>{ward.area}</TableCell>
                      <TableCell>{ward.councillor}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span>User Account Management</span>
                  </CardTitle>
                  <CardDescription>Manage system users and their permissions</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={
                          user.role === 'Super Admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'Department Admin' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'Field Staff' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department || '-'}</TableCell>
                      <TableCell>{formatTimestamp(user.lastLogin)}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sla" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span>SLA Rules Configuration</span>
                  </CardTitle>
                  <CardDescription>Configure service level agreement targets and escalation rules</CardDescription>
                </div>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add SLA Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Target Time</TableHead>
                    <TableHead>Escalation Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slaRules.map((rule, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{rule.category}</TableCell>
                      <TableCell>
                        <Badge className={
                          rule.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                          rule.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          rule.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {rule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.target}</TableCell>
                      <TableCell>{rule.escalation}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    <span>Audit Log Viewer</span>
                  </CardTitle>
                  <CardDescription>System activity logs and user actions</CardDescription>
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{log.id}</Badge>
                        <span className="font-medium text-sm">{log.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>User: {log.user}</span>
                      <span>IP: {log.ipAddress}</span>
                    </div>
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

export default SystemManagement;