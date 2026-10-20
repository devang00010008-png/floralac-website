import React from 'react';
import { Sparkles, History, Compass } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Editorial Quote */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-3 block">
            Our Purpose & Heritage
          </span>
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1E22] font-normal leading-[1.25] italic">
            &ldquo;Floralac explores how materials that would otherwise be discarded can inspire a second life.&rdquo;
          </blockquote>
          <div className="w-16 h-0.5 bg-[#C85A32] mx-auto mt-6" />
        </div>

        {/* 2-Column Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual & Historical Context */}
          <div className="space-y-6 text-left">
            <div className="relative rounded-3xl overflow-hidden border border-[#EADFD5] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80"
                alt="Artisanal book and natural materials"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#E27E58]">
                  Historical Foundation
                </span>
                <h4 className="font-serif text-2xl font-bold">The Renaissance of Galalith</h4>
                <p className="text-xs text-stone-200 mt-1 max-w-md">
                  In 1897, scientists discovered that milk casein could be cured into an odorless, lustrous bio-plastic termed &lsquo;milk stone&rsquo;. Floralac brings this forgotten chemistry to contemporary sustainable lifestyle goods.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-[#EADFD5]">
                <div className="flex items-center gap-2 text-[#5B6E4E] text-xs font-bold uppercase mb-1">
                  <History className="w-4 h-4" />
                  <span>Time-Tested</span>
                </div>
                <p className="text-xs text-[#4A4850] font-light">
                  Non-flammable, biodegradable, and free of petroleum monomers.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#EADFD5]">
                <div className="flex items-center gap-2 text-[#C85A32] text-xs font-bold uppercase mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Petal Alchemy</span>
                </div>
                <p className="text-xs text-[#4A4850] font-light">
                  Natural floral tannins and carotenoids color each material without synthetic azo dyes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6 text-left">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-semibold">
              From temple steps to modern vanity and everyday carry.
            </h3>

            <p className="text-base text-[#4A4850] font-light leading-relaxed">
              Every morning across thousands of temples in India, fragrant marigolds, holy basil, and velvety hibiscus are offered with devotion. By afternoon, tons of spent floral wealth are discarded.
            </p>

            <p className="text-base text-[#4A4850] font-light leading-relaxed">
              Rather than viewing this as waste, Floralac treats each sacred petal as a precious reservoir of natural dyes, active botanical flavonoids, and fibrous cellulose. Combined with dairy casein derived from dairy industry surplus, we unlock three complementary material pathways:
            </p>

            <ul className="space-y-3 pt-2 text-sm text-[#1E1E22]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EBF0E6] text-[#5B6E4E] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </span>
                <span>
                  <strong className="font-semibold text-[#1E1E22]">Scalp & Hair Care:</strong> Botanical masks utilizing cold-extracted flower nutrients emulsified in conditioning casein lipids.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EBF0E6] text-[#5B6E4E] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </span>
                <span>
                  <strong className="font-semibold text-[#1E1E22]">Floral Eco-Leather:</strong> Tough, flexible sheets where real petals create a unique natural grain pattern in every wallet, tote, or notebook wrap.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#EBF0E6] text-[#5B6E4E] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </span>
                <span>
                  <strong className="font-semibold text-[#1E1E22]">Botanical Jewelry:</strong> Polished cured casein pendants, bangles, and hairpins holding consecrated florals suspended like ancient amber.
                </span>
              </li>
            </ul>

            <div className="pt-4 flex items-center gap-3 text-xs text-[#6B6875]">
              <Compass className="w-4 h-4 text-[#C85A32]" />
              <span>Rooted in sacred devotion • Handcrafted with pride in India</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
