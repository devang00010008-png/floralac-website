import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Leaf, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onProcessClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onProcessClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EADFD5] bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F5EFEB]">
      {/* Decorative botanical ambient blur */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#5B6E4E]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF0E6] text-[#4A5A3F] border border-[#5B6E4E]/20 text-xs font-semibold tracking-wide uppercase">
              <Leaf className="w-3.5 h-3.5 text-[#5B6E4E]" />
              <span>Bio-Circular Material Innovation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1E1E22] leading-[1.12] font-normal">
              Flowers once offered.{' '}
              <span className="italic font-normal block text-[#C85A32]">
                Given a second life.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4A4850] font-light leading-relaxed max-w-2xl">
              From sacred floral waste to thoughtfully designed bio-based products. Floralac binds temple flower cellulose with dairy casein to pioneer restorative scalp care, durable floral eco-leather goods, and artisanal botanical jewelry.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34720] text-white px-7 py-4 rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onProcessClick}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#FAF8F5] text-[#1E1E22] border border-[#D4C5B5] hover:border-[#1E1E22] px-7 py-4 rounded-full font-medium text-base transition-all cursor-pointer"
              >
                <span>Discover Our Process</span>
                <Sparkles className="w-4 h-4 text-[#C85A32]" />
              </button>
            </div>

            {/* Brand Proof Points */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EADFD5] text-[#1E1E22]">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E22]">17</p>
                <p className="text-xs text-[#6B6875] font-medium uppercase tracking-wider mt-0.5">
                  Artisanal Creations
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#5B6E4E]">100%</p>
                <p className="text-xs text-[#6B6875] font-medium uppercase tracking-wider mt-0.5">
                  Bio-Based Vision
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C85A32]">₹29+</p>
                <p className="text-xs text-[#6B6875] font-medium uppercase tracking-wider mt-0.5">
                  Accessible Luxury
                </p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase (3-in-1 Category Collage) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 border border-[#EADFD5] shadow-xl editorial-shadow">
                
                {/* 3 Categories Grid Preview */}
                <div className="grid grid-cols-2 gap-2.5 rounded-2xl overflow-hidden">
                  
                  {/* Category 1: Scalp Care */}
                  <div className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer" onClick={onExploreClick}>
                    <img
                      src="/images/products/hibiscus-marigold-scalp-mask.jpg"
                      alt="Floralac Hair and Scalp Mask"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                          target.src = '/images/products/fallback-product.svg';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#FAF8F5]/80">Formulations</span>
                      <h4 className="font-serif text-sm font-semibold">Hair & Scalp Masks</h4>
                      <p className="text-[11px] text-[#FAF8F5]/90">From ₹29</p>
                    </div>
                  </div>

                  {/* Category 2: Eco-Leather */}
                  <div className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer" onClick={onExploreClick}>
                    <img
                      src="/images/products/floral-card-holder.jpg"
                      alt="Floral Eco Leather Goods"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                          target.src = '/images/products/fallback-product.svg';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#FAF8F5]/80">Material Sheets</span>
                      <h4 className="font-serif text-sm font-semibold">Floral Eco-Leather</h4>
                      <p className="text-[11px] text-[#FAF8F5]/90">From ₹249</p>
                    </div>
                  </div>

                  {/* Category 3: Botanical Jewelry */}
                  <div className="col-span-2 relative h-40 overflow-hidden rounded-xl group cursor-pointer" onClick={onExploreClick}>
                    <img
                      src="/images/products/floral-earrings.jpg"
                      alt="Floralac Botanical Jewelry"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                          target.src = '/images/products/fallback-product.svg';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#FAF8F5]/80">Artisanal Cured Stone</span>
                      <h4 className="font-serif text-base font-semibold">Casein Botanical Jewelry</h4>
                      <p className="text-[11px] text-[#FAF8F5]/90">Pendants, Drops & Bangles from ₹79</p>
                    </div>
                  </div>
                </div>

                {/* Floating Studio Badge */}
                <div className="absolute -bottom-5 -left-4 bg-[#FAF8F5] border border-[#EADFD5] p-3 rounded-2xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-left pr-2">
                    <p className="text-xs font-bold text-[#1E1E22]">Temple Flowers + Casein</p>
                    <p className="text-[11px] text-[#5B6E4E] font-medium">Dual-waste circular synthesis</p>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -top-4 -right-4 bg-white border border-[#EADFD5] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs text-[#1E1E22] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#5B6E4E]" />
                  <span>Conscious Indian Craft</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
