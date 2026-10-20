import React from 'react';
import { Waves, Sparkles, Scale, Info } from 'lucide-react';

export const SustainabilitySection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5EFEB] border-y border-[#EADFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#5B6E4E]/10 text-[#4A5A3F] border border-[#5B6E4E]/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Info className="w-3.5 h-3.5 text-[#5B6E4E]" />
            <span>Conscious Ecological Design</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal">
            Conscious Material Transparency
          </h2>
          <p className="mt-3 text-base text-[#6B6875] font-light leading-relaxed">
            Floralac models environmental value through circular resource efficiency. All figures shown are transparent design targets for our Year 1 pilot scale.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="bg-white p-7 rounded-3xl border border-[#EADFD5] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#5B6E4E]/10 text-[#5B6E4E] flex items-center justify-center mb-5">
              <Waves className="w-5 h-5 text-[#5B6E4E]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1E22] mb-2">
              River Eutrophication Prevention
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4850] font-light leading-relaxed">
              When temple flowers decay in rivers, rotting organic matter strips dissolved oxygen, asphyxiating aquatic biomes. Intercepting floral offerings preserves river ecosystems.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F5EFEB]">
              <span className="text-xs text-[#5B6E4E] font-semibold">Target: 4+ Temple Collection Hubs</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EADFD5] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center mb-5">
              <Scale className="w-5 h-5 text-[#C85A32]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1E22] mb-2">
              Petrochemical Replacement
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4850] font-light leading-relaxed">
              Mainstream vegan leather relies heavily on polyurethane (PU) and PVC, releasing microplastics. Floralac utilizes natural casein protein cross-linked with plant waxes.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F5EFEB]">
              <span className="text-xs text-[#C85A32] font-semibold">Zero Petroleum Polymer Objective</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EADFD5] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#4A4850]/10 text-[#1E1E22] flex items-center justify-center mb-5">
              <Sparkles className="w-5 h-5 text-[#1E1E22]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E1E22] mb-2">
              Agritech Dairy Valorization
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4850] font-light leading-relaxed">
              Surplus paneer whey and dairy processing residues are rich in usable casein protein. Utilizing this waste valorizes a burdensome dairy effluent into high-grade biopolymer.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F5EFEB]">
              <span className="text-xs text-[#4A4850] font-semibold">Local Dairy Cooperative Synergy</span>
            </div>
          </div>

        </div>

        {/* Authentic Material Transparency Banner */}
        <div className="mt-12 bg-white/70 border border-[#D4C5B5] rounded-2xl p-4 sm:p-5 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[#6B6875] font-medium leading-relaxed">
            <strong className="text-[#1E1E22]">Authentic Material Transparency:</strong> Floralac is founded on radical honesty. While biological casein and temple flora diversion have demonstrated laboratory viability, our metrics reflect our targeted circular models for Year 1 scale rather than commercially certified carbon offsets.
          </p>
        </div>

      </div>
    </section>
  );
};
