// Mock data for Civic Issue Central System - Government of Jharkhand

export interface Issue {
  id: string;
  reportId: string;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Acknowledged' | 'In Progress' | 'Resolved' | 'Closed';
  ward: string;
  zone: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  assignedDept: string;
  assignedTo?: string;
  reportedBy: {
    name: string;
    contact: string;
    isAnonymous: boolean;
  };
  images?: string[];
  createdAt: string;
  updatedAt: string;
  slaTarget: string;
  statusHistory: {
    status: string;
    timestamp: string;
    updatedBy: string;
    notes?: string;
  }[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  contact: string;
  head: string;
  activeStaff: number;
}

export interface Ward {
  id: string;
  name: string;
  zone: string;
  population: number;
  area: string;
  councillor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Department Admin' | 'Field Staff' | 'Viewer';
  department?: string;
  phone: string;
  lastLogin: string;
}

// Mock data generation
export const mockDepartments: Department[] = [
  { id: 'PWD001', name: 'Public Works Department', code: 'PWD', contact: '0651-2445678', head: 'Rajesh Kumar Singh', activeStaff: 45 },
  { id: 'UDD001', name: 'Urban Development', code: 'UDD', contact: '0651-2445679', head: 'Priya Sharma', activeStaff: 32 },
  { id: 'PHE001', name: 'Public Health Engineering', code: 'PHE', contact: '0651-2445680', head: 'Amit Gupta', activeStaff: 28 },
  { id: 'ELE001', name: 'Electricity Department', code: 'ELE', contact: '0651-2445681', head: 'Sunita Devi', activeStaff: 38 },
  { id: 'ENV001', name: 'Environment & Pollution', code: 'ENV', contact: '0651-2445682', head: 'Dr. Vikram Sinha', activeStaff: 22 },
  { id: 'TRA001', name: 'Transport Department', code: 'TRA', contact: '0651-2445683', head: 'Manoj Tiwari', activeStaff: 41 },
];

export const jharkhandWards: Ward[] = [
  { id: 'RAN001', name: 'Hinoo', zone: 'Central Ranchi', population: 15000, area: '2.5 sq km', councillor: 'Anita Kumari' },
  { id: 'RAN002', name: 'Lalpur', zone: 'North Ranchi', population: 18000, area: '3.2 sq km', councillor: 'Rajesh Singh' },
  { id: 'RAN003', name: 'Kadru', zone: 'South Ranchi', population: 22000, area: '4.1 sq km', councillor: 'Meera Devi' },
  { id: 'DHA001', name: 'Jharia', zone: 'Central Dhanbad', population: 25000, area: '5.5 sq km', councillor: 'Suresh Mahto' },
  { id: 'DHA002', name: 'Hirapur', zone: 'East Dhanbad', population: 14000, area: '2.8 sq km', councillor: 'Kavita Singh' },
  { id: 'BOK001', name: 'City Centre', zone: 'Central Bokaro', population: 20000, area: '3.5 sq km', councillor: 'Arun Kumar' },
  { id: 'JAM001', name: 'Sakchi', zone: 'West Jamshedpur', population: 35000, area: '6.2 sq km', councillor: 'Deepak Pandey' },
  { id: 'JAM002', name: 'Bistupur', zone: 'Central Jamshedpur', population: 28000, area: '4.8 sq km', councillor: 'Ritu Sharma' },
];

export const mockUsers: User[] = [
  { id: 'USR001', name: 'Rajesh Kumar Singh', email: 'rajesh.singh@gov.jh.in', role: 'Super Admin', phone: '+91-9431234567', lastLogin: '2025-01-20T10:30:00Z' },
  { id: 'USR002', name: 'Priya Sharma', email: 'priya.sharma@udd.jh.in', role: 'Department Admin', department: 'UDD001', phone: '+91-9431234568', lastLogin: '2025-01-20T09:15:00Z' },
  { id: 'USR003', name: 'Amit Gupta', email: 'amit.gupta@phe.jh.in', role: 'Field Staff', department: 'PHE001', phone: '+91-9431234569', lastLogin: '2025-01-20T08:45:00Z' },
  { id: 'USR004', name: 'Sunita Devi', email: 'sunita.devi@ele.jh.in', role: 'Department Admin', department: 'ELE001', phone: '+91-9431234570', lastLogin: '2025-01-19T16:20:00Z' },
];

// Generate comprehensive mock issues
const categories = ['Road Repair', 'Water Supply', 'Electricity', 'Waste Management', 'Street Lighting', 'Drainage', 'Park Maintenance', 'Traffic Issues'];
const priorities = ['Low', 'Medium', 'High', 'Critical'] as const;
const statuses = ['New', 'Acknowledged', 'In Progress', 'Resolved', 'Closed'] as const;

const generateMockIssue = (index: number): Issue => {
  const ward = jharkhandWards[index % jharkhandWards.length];
  const category = categories[index % categories.length];
  const priority = priorities[index % priorities.length];
  const status = statuses[index % statuses.length];
  const dept = mockDepartments[index % mockDepartments.length];
  
  const baseDate = new Date('2024-12-01');
  const createdDate = new Date(baseDate.getTime() + (index * 3600000)); // 1 hour apart
  
  return {
    id: `ISS${String(index + 1).padStart(6, '0')}`,
    reportId: `JH2025${String(10000 + index)}`,
    title: `${category} issue in ${ward.name}`,
    description: `Citizen reported ${category.toLowerCase()} problem requiring immediate attention. Location: ${ward.name}, ${ward.zone}`,
    category,
    priority,
    status,
    ward: ward.name,
    zone: ward.zone,
    location: {
      address: `${ward.name}, ${ward.zone}, Jharkhand`,
      lat: 23.3441 + (Math.random() - 0.5) * 0.1, // Ranchi vicinity
      lng: 85.3096 + (Math.random() - 0.5) * 0.1,
    },
    assignedDept: dept.code,
    assignedTo: index % 3 === 0 ? mockUsers[1 + (index % 3)].name : undefined,
    reportedBy: {
      name: index % 4 === 0 ? 'Anonymous' : `Citizen ${index + 1}`,
      contact: index % 4 === 0 ? '' : `+91-94312${String(30000 + index).slice(-5)}`,
      isAnonymous: index % 4 === 0,
    },
    images: index % 3 === 0 ? [`/api/images/issue-${index + 1}-1.jpg`, `/api/images/issue-${index + 1}-2.jpg`] : undefined,
    createdAt: createdDate.toISOString(),
    updatedAt: new Date(createdDate.getTime() + (index % 5) * 86400000).toISOString(), // Random updates
    slaTarget: category === 'Electricity' ? '4 hours' : category === 'Water Supply' ? '8 hours' : '24 hours',
    statusHistory: [
      {
        status: 'New',
        timestamp: createdDate.toISOString(),
        updatedBy: 'System',
        notes: 'Issue automatically created from citizen report'
      },
      ...(status !== 'New' ? [{
        status: 'Acknowledged',
        timestamp: new Date(createdDate.getTime() + 3600000).toISOString(),
        updatedBy: dept.head,
        notes: 'Issue acknowledged and assigned for review'
      }] : []),
      ...(status === 'In Progress' || status === 'Resolved' || status === 'Closed' ? [{
        status: 'In Progress',
        timestamp: new Date(createdDate.getTime() + 7200000).toISOString(),
        updatedBy: mockUsers[1 + (index % 3)].name,
        notes: 'Field team dispatched to location'
      }] : []),
      ...(status === 'Resolved' || status === 'Closed' ? [{
        status: 'Resolved',
        timestamp: new Date(createdDate.getTime() + 86400000).toISOString(),
        updatedBy: mockUsers[1 + (index % 3)].name,
        notes: 'Issue resolved and verified'
      }] : []),
      ...(status === 'Closed' ? [{
        status: 'Closed',
        timestamp: new Date(createdDate.getTime() + 172800000).toISOString(),
        updatedBy: 'System',
        notes: 'Issue closed after 48 hours of resolution'
      }] : []),
    ]
  };
};

export const mockIssues: Issue[] = Array.from({ length: 250 }, (_, index) => generateMockIssue(index));

// Dashboard statistics
export const getDashboardStats = () => {
  const total = mockIssues.length;
  const newToday = mockIssues.filter(issue => {
    const today = new Date().toDateString();
    return new Date(issue.createdAt).toDateString() === today;
  }).length;
  const pending = mockIssues.filter(issue => !['Resolved', 'Closed'].includes(issue.status)).length;
  const resolved = mockIssues.filter(issue => issue.status === 'Resolved').length;
  const slaBreaches = mockIssues.filter(issue => {
    const created = new Date(issue.createdAt);
    const targetHours = issue.slaTarget.includes('4') ? 4 : issue.slaTarget.includes('8') ? 8 : 24;
    const targetTime = new Date(created.getTime() + targetHours * 3600000);
    return new Date() > targetTime && !['Resolved', 'Closed'].includes(issue.status);
  }).length;

  return {
    totalReports: total,
    newToday,
    pendingIssues: pending,
    resolvedIssues: resolved,
    slaBreaches,
    resolutionRate: Math.round((resolved / total) * 100),
  };
};

// Language support
export const translations = {
  en: {
    'app.title': 'Civic Issue Central System',
    'app.subtitle': 'Powered by Jharkhand Portal',
    'header.title': 'Govt. of Jharkhand — Civic Issue Tracker',
    'nav.dashboard': 'Dashboard',
    'nav.issues': 'Issue Management',
    'nav.routing': 'Assignment & Routing',
    'nav.analytics': 'Analytics & Reports',
    'nav.notifications': 'Notifications',
    'nav.system': 'System Management',
    'stats.total': 'Total Reports',
    'stats.new': 'New Today',
    'stats.pending': 'Pending Issues',
    'stats.resolved': 'Resolved Issues',
    'stats.sla': 'SLA Breaches',
    'footer.copyright': '© Government of Jharkhand — Reserved 2025',
    'footer.contact': 'Contact: 1800-123-4567',
    'footer.helpdesk': 'Helpdesk: helpdesk@jharkhand.gov.in',
    'footer.privacy': 'Privacy Policy | Terms of Service',
  },
  hi: {
    'app.title': 'नागरिक समस्या केंद्रीय प्रणाली',
    'app.subtitle': 'झारखंड पोर्टल द्वारा संचालित',
    'header.title': 'झारखंड सरकार — नागरिक समस्या ट्रैकर',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.issues': 'समस्या प्रबंधन',
    'nav.routing': 'असाइनमेंट और रूटिंग',
    'nav.analytics': 'एनालिटिक्स और रिपोर्ट',
    'nav.notifications': 'सूचनाएं',
    'nav.system': 'सिस्टम प्रबंधन',
    'stats.total': 'कुल रिपोर्ट',
    'stats.new': 'आज नई',
    'stats.pending': 'लंबित समस्याएं',
    'stats.resolved': 'हल की गई समस्याएं',
    'stats.sla': 'SLA उल्लंघन',
    'footer.copyright': '© झारखंड सरकार — आरक्षित 2025',
    'footer.contact': 'संपर्क: 1800-123-4567',
    'footer.helpdesk': 'हेल्पडेस्क: helpdesk@jharkhand.gov.in',
    'footer.privacy': 'गोपनीयता नीति | सेवा की शर्तें',
  }
};