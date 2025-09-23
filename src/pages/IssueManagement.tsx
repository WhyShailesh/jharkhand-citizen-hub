import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  UserPlus,
  MoreHorizontal,
  Calendar,
  MapPin,
  Phone,
  AlertTriangle
} from 'lucide-react';
import { mockIssues, Issue } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';

const statusColors = {
  'New': 'bg-blue-100 text-blue-800 border-blue-200',
  'Acknowledged': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
  'Resolved': 'bg-green-100 text-green-800 border-green-200',
  'Closed': 'bg-gray-100 text-gray-600 border-gray-200',
};

const priorityColors = {
  'Low': 'bg-slate-100 text-slate-600',
  'Medium': 'bg-blue-100 text-blue-700',
  'High': 'bg-orange-100 text-orange-700',
  'Critical': 'bg-red-100 text-red-700',
};

const IssueManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'createdAt' | 'priority' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = mockIssues.filter(issue => {
      const matchesSearch = searchTerm === '' || 
        issue.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
      const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, categoryFilter, priorityFilter, sortBy, sortOrder]);

  const handleSelectIssue = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIssues.length === filteredAndSortedIssues.length) {
      setSelectedIssues([]);
    } else {
      setSelectedIssues(filteredAndSortedIssues.map(issue => issue.id));
    }
  };

  const categories = [...new Set(mockIssues.map(issue => issue.category))];
  const uniqueStatuses = [...new Set(mockIssues.map(issue => issue.status))];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSLAStatus = (issue: Issue) => {
    const created = new Date(issue.createdAt);
    const targetHours = issue.slaTarget.includes('4') ? 4 : issue.slaTarget.includes('8') ? 8 : 24;
    const targetTime = new Date(created.getTime() + targetHours * 3600000);
    const now = new Date();
    
    if (issue.status === 'Resolved' || issue.status === 'Closed') {
      return 'met';
    } else if (now > targetTime) {
      return 'breached';
    } else {
      const hoursLeft = Math.max(0, Math.floor((targetTime.getTime() - now.getTime()) / (1000 * 60 * 60)));
      return hoursLeft <= 2 ? 'warning' : 'normal';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('nav.issues')}
          </h1>
          <p className="text-muted-foreground">
            Manage and track civic issues across Jharkhand
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Badge variant="secondary" className="px-3 py-1">
            {filteredAndSortedIssues.length} issues
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [newSortBy, newSortOrder] = value.split('-');
              setSortBy(newSortBy as any);
              setSortOrder(newSortOrder as any);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt-desc">Newest First</SelectItem>
                <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                <SelectItem value="priority-desc">High Priority First</SelectItem>
                <SelectItem value="priority-asc">Low Priority First</SelectItem>
                <SelectItem value="status-asc">Status A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIssues.length > 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {selectedIssues.length} issue{selectedIssues.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Bulk Assign
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Change Status
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Selected
                  </Button>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedIssues([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Issues Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIssues.length === filteredAndSortedIssues.length && filteredAndSortedIssues.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Issue Details</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>SLA Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedIssues.map((issue) => {
                  const slaStatus = getSLAStatus(issue);
                  return (
                    <TableRow key={issue.id} className="hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedIssues.includes(issue.id)}
                          onCheckedChange={() => handleSelectIssue(issue.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm font-medium">
                          {issue.reportId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm mb-1">{issue.title}</div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {issue.category}
                          </div>
                          {!issue.reportedBy.isAnonymous && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Phone className="w-3 h-3 mr-1" />
                              {issue.reportedBy.contact}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="text-sm">
                            <div className="font-medium">{issue.ward}</div>
                            <div className="text-xs text-muted-foreground">{issue.zone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${priorityColors[issue.priority]} border`}>
                          {issue.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[issue.status]} border`}>
                          {issue.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{issue.assignedDept}</div>
                          {issue.assignedTo && (
                            <div className="text-xs text-muted-foreground">
                              {issue.assignedTo}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {slaStatus === 'breached' && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                          <div className="text-xs">
                            <div className={`font-medium ${
                              slaStatus === 'breached' ? 'text-red-600' :
                              slaStatus === 'warning' ? 'text-orange-600' :
                              slaStatus === 'met' ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              {slaStatus === 'breached' ? 'SLA Breached' :
                               slaStatus === 'warning' ? 'SLA Warning' :
                               slaStatus === 'met' ? 'SLA Met' : 'Within SLA'}
                            </div>
                            <div className="text-muted-foreground">
                              Target: {issue.slaTarget}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(issue.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredAndSortedIssues.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No issues found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IssueManagement;