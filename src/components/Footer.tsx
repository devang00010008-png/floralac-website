import React from 'react';
import { Sparkles, Heart, Globe, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#1E1E22] text-[#FAF8F5] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => onNavigate('home')} className="block text-left cursor-pointer">
              <img
                src="/images/floralac-logo.png"
                alt="Floralac - Second Life Materials"
                className="h-16 sm:h-20 w-auto object-contain rounded-xl"
              />
            </button>

            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              &ldquo;Flowers once offered, given a second life.&rdquo; Pioneering circular bio-materials by binding temple floral waste with dairy casein protein.
            </p>

            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E27E58]" />
              <span>Bio-Circular Material Studio</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('hair-care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hair & Scalp Masks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('eco-leather')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Floral Eco-Leather
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jewelry')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Botanical Jewelry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Studio Creations
                </button>
              </li>
            </ul>
          </div>

          {/* Innovation & Story */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Our Vision
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Origin Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('material-lab')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Material Lab Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Impact Model
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Contact / Studio Metadata */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Artisan Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Varanasi & New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>hello@floralac.eco</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>www.floralac.eco</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Floralac. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#C85A32] fill-current" /> for a Regenerative Tomorrow
            </span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-stone-400 hover:text-[#E27E58] border-b border-stone-700 hover:border-[#E27E58] pb-0.5 transition-colors cursor-pointer text-[11px]"
              >
                Studio Operations
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
