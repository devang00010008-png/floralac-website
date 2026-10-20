import React from 'react';
import { RefreshCw, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

export const WasteToWonder: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5EFEB] border-y border-[#EADFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B6E4E] mb-2 block">
            The Ecological Dilemma & Opportunity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal">
            From Sacred Offering to Circular Material
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6B6875] font-light leading-relaxed">
            In India, flowers are revered in prayer, yet millions of kilograms end up discarded into sacred waterways every day. Floralac pairs this rich botanical resource with surplus dairy casein protein to create regenerative biomaterials.
          </p>
        </div>

        {/* Dual Waste Streams Synthesis Graphic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Stream 1: Temple Flora */}
          <div className="bg-white p-8 rounded-3xl border border-[#EADFD5] shadow-sm text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center mb-6">
              <span className="text-xl">🌸</span>
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-[#C85A32]">Input Stream 01</span>
            <h3 className="font-serif text-2xl font-bold text-[#1E1E22] mt-1 mb-3">
              Discarded Temple Flora
            </h3>
            <p className="text-sm text-[#4A4850] font-light leading-relaxed mb-4">
              Over 8 million metric tonnes of devotional flowers (marigold, rose, jasmine, hibiscus) are cast into rivers yearly, depleting dissolved oxygen and disturbing freshwater biomes.
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-xl text-xs text-[#5B6E4E] font-medium flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#5B6E4E] shrink-0 mt-0.5" />
              <span>Rich in natural pigments, antioxidants, and durable cellulosic fiber.</span>
            </div>
          </div>

          {/* Center Connection / Synthesis */}
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1E1E22] text-white flex items-center justify-center shadow-lg">
              <RefreshCw className="w-7 h-7 text-[#E27E58]" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#1E1E22]">Bio-Polymer Synthesis</h4>
              <p className="text-xs text-[#6B6875] max-w-xs mt-1">
                Micronized petal matrices are emulsified or cross-linked with casein curds under gentle heat and safe bio-hardening agents.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EADFD5] text-[11px] font-semibold text-[#1E1E22]">
              <span>Zero Petrochemicals</span>
              <span>•</span>
              <span>100% Bio-Based</span>
            </div>
          </div>

          {/* Stream 2: Dairy Casein */}
          <div className="bg-white p-8 rounded-3xl border border-[#EADFD5] shadow-sm text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#5B6E4E]/10 text-[#5B6E4E] flex items-center justify-center mb-6">
              <Droplets className="w-6 h-6 text-[#5B6E4E]" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-[#5B6E4E]">Input Stream 02</span>
            <h3 className="font-serif text-2xl font-bold text-[#1E1E22] mt-1 mb-3">
              Dairy Casein Protein
            </h3>
            <p className="text-sm text-[#4A4850] font-light leading-relaxed mb-4">
              Acidic dairy whey and surplus milk protein contain casein, a proven natural structural polymer used historically since the 1890s in galalith (milk stone).
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-xl text-xs text-[#5B6E4E] font-medium flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#5B6E4E] shrink-0 mt-0.5" />
              <span>Provides structural tensile strength, moisture binding, and moldable matrix.</span>
            </div>
          </div>

        </div>

        {/* Brand Transparency Notice */}
        <div className="mt-12 bg-[#FAF8F5] border border-[#EADFD5] rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto flex items-start gap-3 text-left">
          <ShieldCheck className="w-5 h-5 text-[#5B6E4E] shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#1E1E22]">
              Material Integrity & Honest Science
            </h5>
            <p className="text-xs text-[#6B6875] mt-0.5 leading-relaxed">
              Floralac champions genuine sustainable innovation. While casein-based polymers (galalith) and temple floral upcycling are well-documented in scientific literature, our proprietary blends are continuously undergoing testing to optimize durability, flexibility, and skin compatibility before full-scale commercialization.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
