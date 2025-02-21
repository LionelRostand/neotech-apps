
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClose?: () => void;
}

const SidebarHeader = ({ isCollapsed, onToggleCollapse, onClose }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6">
      <h1 className={`text-2xl font-bold text-neotech-600 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
        NEOTECH
      </h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hidden lg:flex"
          title={isCollapsed ? "Déplier" : "Réduire"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default SidebarHeader;
