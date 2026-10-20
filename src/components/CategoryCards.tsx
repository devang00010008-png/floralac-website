import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ProductCategory } from '../types/product';

interface CategoryCardsProps {
  onSelectCategory: (categoryId: ProductCategory) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-2 block">
            Three Circular Horizons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal tracking-tight">
            Designed from discarded offerings.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6B6875] font-light leading-relaxed">
            By coupling sacred temple floral cellulose with dairy casein polymer, Floralac transforms biological surplus into three high-value consumer applications.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EADFD5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col card-hover-lift"
            >
              {/* Image Preview with overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                      target.src = '/images/products/fallback-product.svg';
                    }
                  }}
                />
                
                {/* Fallback pattern in case image is loading or offline */}
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${cat.fallbackColor} opacity-70`} />

                {/* Starting Price Pill */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#1E1E22] shadow-sm">
                  Starting at <span className="text-[#C85A32]">{cat.priceStarting}</span>
                </div>

                {/* Category Count */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E27E58]" />
                  <span>{cat.count}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1E1E22] group-hover:text-[#C85A32] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-medium text-[#5B6E4E] mt-1">
                    {cat.tagline}
                  </p>
                  <p className="mt-3 text-sm text-[#4A4850] font-light leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-4 border-t border-[#F5EFEB]">
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="w-full inline-flex items-center justify-between text-sm font-semibold text-[#1E1E22] group-hover:text-[#C85A32] transition-colors cursor-pointer py-1"
                  >
                    <span>View {cat.title}</span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#C85A32] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
