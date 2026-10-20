import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AnnouncementBarProps {
  onExploreClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onExploreClick }) => {
  return (
    <div className="bg-[#2C2B30] text-[#FAF8F5] text-xs sm:text-sm py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-[#C85A32] text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span className="font-light tracking-wide text-[#FAF8F5]/90">
            <strong className="font-semibold text-white">Giving temple flowers a second life.</strong> Circular bio-based scalp care, eco-leather & jewelry.
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-[#FAF8F5]/80">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200 border border-white/15">
            Small Batch Studio
          </span>
          {onExploreClick && (
            <button 
              onClick={onExploreClick}
              className="hover:text-[#E27E58] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
