import React from 'react';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © Government of Jharkhand — Civic Issue Central System | Powered by Jharkhand Portal | Reserved 2025
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Contact: 0651-2234567</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Helpdesk: 1800-123-4567</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs">Privacy Policy</span>
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-border/50">
          <p className="text-xs text-center text-muted-foreground">
            Department of Information Technology & E-Governance, Government of Jharkhand
            <span className="mx-2">•</span>
            Version 2.1.0
            <span className="mx-2">•</span>
            Last Updated: January 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;