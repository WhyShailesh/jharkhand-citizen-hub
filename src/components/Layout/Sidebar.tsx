import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Home, 
  Route, 
  Settings, 
  Bell,
  Users,
  MapPin 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const navigationItems = [
  { 
    path: '/dashboard', 
    icon: Home, 
    labelKey: 'nav.dashboard',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    roles: ['Super Admin', 'Department Admin', 'Field Staff', 'Viewer']
  },
  { 
    path: '/issues', 
    icon: FileText, 
    labelKey: 'nav.issues',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    badge: '45',
    roles: ['Super Admin', 'Department Admin', 'Field Staff']
  },
  { 
    path: '/routing', 
    icon: Route, 
    labelKey: 'nav.routing',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    roles: ['Super Admin', 'Department Admin']
  },
  { 
    path: '/analytics', 
    icon: BarChart3, 
    labelKey: 'nav.analytics',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    roles: ['Super Admin', 'Department Admin', 'Viewer']
  },
  { 
    path: '/notifications', 
    icon: Bell, 
    labelKey: 'nav.notifications',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    badge: '3',
    roles: ['Super Admin', 'Department Admin', 'Field Staff']
  },
  { 
    path: '/system', 
    icon: Settings, 
    labelKey: 'nav.system',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    roles: ['Super Admin']
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  
  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-foreground">
              {t('app.title')}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t('app.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${active 
                  ? `${item.bgColor} ${item.color} shadow-sm font-medium` 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${active ? item.color : 'text-gray-500'}`} />
              <span className="font-medium text-sm">
                {t(item.labelKey)}
              </span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Cards */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">System Status</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-3">
            <div className="text-xs font-medium text-foreground mb-1">Active Issues</div>
            <div className="w-full bg-background/30 rounded-full h-1.5 mb-1">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="text-xs font-bold text-primary">127</div>
          </div>
          
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg p-3">
            <div className="text-xs font-medium text-foreground mb-1">Response Rate</div>
            <div className="w-full bg-background/30 rounded-full h-1.5 mb-1">
              <div className="bg-secondary h-1.5 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="text-xs font-bold text-secondary">94%</div>
          </div>
          
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-3 col-span-2">
            <div className="text-xs font-medium text-foreground mb-1">Avg. Resolution Time</div>
            <div className="w-full bg-background/30 rounded-full h-1.5 mb-1">
              <div className="bg-accent h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="text-xs font-bold text-accent">18h</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;