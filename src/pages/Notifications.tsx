import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Phone, 
  Send, 
  Settings,
  Clock,
  Check,
  AlertTriangle,
  Eye,
  Globe
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Notifications = () => {
  const { t, language } = useLanguage();
  const [selectedTemplate, setSelectedTemplate] = useState('status-update');
  const [messageType, setMessageType] = useState('sms');

  const notificationHistory = [
    {
      id: 'NT001',
      type: 'SMS',
      recipient: '+91-94312xxxxx',
      message: 'Your complaint JH202510045 has been acknowledged. Field team assigned.',
      status: 'Delivered',
      timestamp: '2025-01-20T14:30:00Z',
      reportId: 'JH202510045'
    },
    {
      id: 'NT002',
      type: 'Push',
      recipient: 'Citizen App User',
      message: 'Road repair work completed at Hinoo Ward. Please verify resolution.',
      status: 'Delivered',
      timestamp: '2025-01-20T13:15:00Z',
      reportId: 'JH202510042'
    },
    {
      id: 'NT003',
      type: 'Email',
      recipient: 'citizen@example.com',
      message: 'Monthly civic update: 95% issues resolved in your area.',
      status: 'Failed',
      timestamp: '2025-01-20T12:00:00Z',
      reportId: null
    },
  ];

  const messageTemplates = {
    'status-update': {
      en: 'Your complaint {{reportId}} status updated to {{status}}. {{additionalInfo}}',
      hi: 'आपकी शिकायत {{reportId}} की स्थिति {{status}} में अपडेट की गई। {{additionalInfo}}'
    },
    'assignment': {
      en: 'Your complaint {{reportId}} assigned to {{department}}. Expected resolution: {{timeline}}',
      hi: 'आपकी शिकायत {{reportId}} को {{department}} को सौंपा गया। अपेक्षित समाधान: {{timeline}}'
    },
    'completion': {
      en: 'Work completed for complaint {{reportId}}. Please verify and provide feedback.',
      hi: 'शिकायत {{reportId}} का काम पूरा हो गया। कृपया सत्यापित करें और फीडबैक दें।'
    },
    'follow-up': {
      en: 'Follow-up on complaint {{reportId}}. Rate our service: {{feedbackLink}}',
      hi: 'शिकायत {{reportId}} का फॉलो-अप। हमारी सेवा को रेट करें: {{feedbackLink}}'
    }
  };

  const systemAlerts = [
    {
      id: 'SA001',
      type: 'SLA Breach',
      message: '3 issues have exceeded SLA targets in PWD department',
      priority: 'High',
      timestamp: '2025-01-20T15:45:00Z',
      actionRequired: true
    },
    {
      id: 'SA002',
      type: 'System Health',
      message: 'All notification services operational. 99.8% delivery rate.',
      priority: 'Info',
      timestamp: '2025-01-20T15:00:00Z',
      actionRequired: false
    },
    {
      id: 'SA003',
      type: 'Citizen Feedback',
      message: 'New negative feedback received for complaint JH202510040',
      priority: 'Medium',
      timestamp: '2025-01-20T14:20:00Z',
      actionRequired: true
    }
  ];

  const sendTestMessage = () => {
    // Mock sending functionality
    alert(`Test ${messageType.toUpperCase()} sent successfully using template: ${selectedTemplate}`);
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
            {t('nav.notifications')}
          </h1>
          <p className="text-muted-foreground">
            Manage citizen communication and system notifications
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="px-3 py-1">
            Delivery Rate: 98.5%
          </Badge>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>Message Template Editor</span>
                </CardTitle>
                <CardDescription>Create and edit bilingual message templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Template Type</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status-update">Status Update</SelectItem>
                        <SelectItem value="assignment">Assignment Notice</SelectItem>
                        <SelectItem value="completion">Work Completion</SelectItem>
                        <SelectItem value="follow-up">Follow-up Request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Message Type</Label>
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <span>English Template</span>
                      <Badge variant="outline">EN</Badge>
                    </Label>
                    <Textarea
                      value={messageTemplates[selectedTemplate as keyof typeof messageTemplates]?.en || ''}
                      placeholder="Enter English message template..."
                      className="min-h-20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <span>Hindi Template</span>
                      <Badge variant="outline">हिं</Badge>
                    </Label>
                    <Textarea
                      value={messageTemplates[selectedTemplate as keyof typeof messageTemplates]?.hi || ''}
                      placeholder="हिंदी संदेश टेम्प्लेट दर्ज करें..."
                      className="min-h-20"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Available Variables:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Badge variant="outline">{'{{reportId}}'}</Badge>
                    <Badge variant="outline">{'{{status}}'}</Badge>
                    <Badge variant="outline">{'{{department}}'}</Badge>
                    <Badge variant="outline">{'{{timeline}}'}</Badge>
                    <Badge variant="outline">{'{{citizenName}}'}</Badge>
                    <Badge variant="outline">{'{{location}}'}</Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={sendTestMessage} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Test Message
                  </Button>
                  <Button variant="outline">Save Template</Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  <span>Template Preview</span>
                </CardTitle>
                <CardDescription>Preview how messages will appear to citizens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      {messageType === 'sms' && <Phone className="w-4 h-4 text-blue-600" />}
                      {messageType === 'push' && <Bell className="w-4 h-4 text-blue-600" />}
                      {messageType === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      <span className="text-sm font-medium text-blue-800">
                        {messageType.toUpperCase()} Preview (English)
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      {messageTemplates[selectedTemplate as keyof typeof messageTemplates]?.en
                        .replace('{{reportId}}', 'JH202510045')
                        .replace('{{status}}', 'In Progress')
                        .replace('{{department}}', 'PWD')
                        .replace('{{timeline}}', '24 hours')
                        .replace('{{additionalInfo}}', 'Field team dispatched to location.')}
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        {messageType.toUpperCase()} Preview (Hindi)
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      {messageTemplates[selectedTemplate as keyof typeof messageTemplates]?.hi
                        .replace('{{reportId}}', 'JH202510045')
                        .replace('{{status}}', 'प्रगति में')
                        .replace('{{department}}', 'PWD')
                        .replace('{{timeline}}', '24 घंटे')
                        .replace('{{additionalInfo}}', 'फील्ड टीम स्थान पर भेजी गई।')}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Message Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">98.5%</div>
                      <div className="text-xs text-green-700">Delivery Rate</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">2.3s</div>
                      <div className="text-xs text-blue-700">Avg. Delivery Time</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Notification History</span>
              </CardTitle>
              <CardDescription>Recent messages sent to citizens and officials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notificationHistory.map((notification) => (
                  <div key={notification.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          notification.type === 'SMS' ? 'bg-blue-100 text-blue-700' :
                          notification.type === 'Push' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }>
                          {notification.type}
                        </Badge>
                        <span className="font-mono text-sm">{notification.id}</span>
                        {notification.reportId && (
                          <Badge variant="outline">{notification.reportId}</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          notification.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          notification.status === 'Failed' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }>
                          <Check className="w-3 h-3 mr-1" />
                          {notification.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground mb-1">
                        To: {notification.recipient}
                      </p>
                      <p className="text-sm">{notification.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>System Alerts & Notifications</span>
              </CardTitle>
              <CardDescription>Important system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${
                    alert.priority === 'High' ? 'border-red-200 bg-red-50' :
                    alert.priority === 'Medium' ? 'border-orange-200 bg-orange-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          alert.priority === 'High' ? 'bg-red-100 text-red-700' :
                          alert.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-blue-100 text-blue-700'
                        }>
                          {alert.type}
                        </Badge>
                        <Badge variant="outline" className={
                          alert.priority === 'High' ? 'border-red-300 text-red-700' :
                          alert.priority === 'Medium' ? 'border-orange-300 text-orange-700' :
                          'border-blue-300 text-blue-700'
                        }>
                          {alert.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-3">{alert.message}</p>
                    
                    {alert.actionRequired && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant={alert.priority === 'High' ? 'default' : 'outline'}>
                          Take Action
                        </Button>
                        <Button size="sm" variant="ghost">
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure notification delivery settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">SMS Notifications</Label>
                      <p className="text-xs text-muted-foreground">Send SMS updates to citizens</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Mobile app push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Email updates and reports</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Auto-translate Messages</Label>
                      <p className="text-xs text-muted-foreground">Automatic Hindi translation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>Configure timing and retry policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Retry Interval</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Rate Limiting</Label>
                  <Input placeholder="Messages per minute" defaultValue="100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;