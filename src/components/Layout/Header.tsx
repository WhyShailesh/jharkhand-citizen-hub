import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Bell, Search, Globe, User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="gov-header border-b h-16 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {/* Government Emblem */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="text-white">
            <h1 className="text-lg font-bold leading-tight">
              {t('header.title')}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
        {/* Global Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by Report ID, location, or keyword..."
            className="pl-10 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Language Toggle */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="text-white hover:bg-white/20"
        >
          <Globe className="w-4 h-4 mr-1" />
          {language === 'en' ? 'हिं' : 'EN'}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 relative">
          <Bell className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white border-white">
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-white/20 h-auto p-2">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-white text-primary text-sm font-semibold">
                    {user?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-white/70">{user?.role}</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {user?.role}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              System Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;