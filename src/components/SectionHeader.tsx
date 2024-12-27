import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { helpContent } from '@/config/helpContent';

interface SectionHeaderProps {
  title: string;
  helpKey?: keyof typeof helpContent;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, helpKey }) => {
  const help = helpKey ? helpContent[helpKey] : null;

  return (
    <div className="flex items-center gap-2 font-medium mb-3">
      <h3>{title}</h3>
      {help && (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <HelpCircle size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" align="start" className="max-w-sm">
              <div className="space-y-2">
                <h4 className="font-medium">{help.title}</h4>
                <div className="text-sm">{help.content}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default SectionHeader;