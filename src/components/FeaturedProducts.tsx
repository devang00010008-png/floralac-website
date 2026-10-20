import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product, ProductCategory } from '../types/product';
import { ShoppingBag, Heart, Star, Sparkles, Check, ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  onAddToCart: (product: Product, variantId?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onViewProduct?: (product: Product) => void;
  onViewAll?: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onViewProduct,
  onViewAll,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Featured' },
    { id: 'hair-care', label: 'Hair & Scalp' },
    { id: 'eco-leather', label: 'Floral Eco-Leather' },
    { id: 'jewelry', label: 'Botanical Jewelry' },
  ];

  // Filter products by category, prioritizing featured items
  const filteredProducts = (
    selectedCategory === 'all'
      ? PRODUCTS.filter((p) => p.isFeatured)
      : PRODUCTS.filter((p) => p.category === (selectedCategory as ProductCategory))
  ).slice(0, 8);

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice((curr) => (curr === product.name ? null : curr));
    }, 2200);
  };

  return (
    <section id="collection-section" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-2 block">
              Curated Botanical Studio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal">
              Featured Bio-Based Creations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B6875] font-light max-w-xl">
              From ₹29 trial scalp sachets to durable floral card holders, totes, and hand-cured casein stone jewelry.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E1E22] text-white shadow-xs'
                    : 'bg-white border border-[#EADFD5] text-[#4A4850] hover:border-[#1E1E22] hover:text-[#1E1E22]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Toast if added */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E22] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/10">
            <div className="w-6 h-6 rounded-full bg-[#5B6E4E] text-white flex items-center justify-center">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs">
              <p className="font-semibold">{addedNotice}</p>
              <p className="text-stone-300">Added to your shopping selection</p>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#EADFD5] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 card-hover-lift"
              >
                {/* Image Container */}
                <div
                  onClick={() => onViewProduct && onViewProduct(product)}
                  className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                        target.src = '/images/products/fallback-product.svg';
                      }
                    }}
                  />
                  
                  {/* Fallback pattern */}
                  <div className={`absolute inset-0 -z-10 ${product.fallbackGradient}`} />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#5B6E4E] uppercase tracking-wide shadow-xs">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:text-[#C85A32] shadow-xs transition-colors cursor-pointer"
                    aria-label="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#C85A32] text-[#C85A32]' : ''
                      }`}
                    />
                  </button>

                  {/* Status Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-medium text-white flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#E27E58]" />
                      <span>{product.statusLabel}</span>
                    </span>

                    <span className="text-[10px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      ★ {product.rating}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Review count without demo word */}
                    <div className="flex items-center gap-1.5 mb-1.5 text-xs text-[#6B6875]">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="font-semibold text-[#1E1E22]">{product.rating}</span>
                      <span className="text-[11px]">({product.reviewCount} customer reviews)</span>
                    </div>

                    <h3
                      onClick={() => onViewProduct && onViewProduct(product)}
                      className="font-serif text-lg font-bold text-[#1E1E22] group-hover:text-[#C85A32] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#4A4850] font-light mt-1 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Variant indicator */}
                    {product.variants.length > 1 && (
                      <div className="mt-2 text-[11px] text-[#6B6875]">
                        <span>{product.variants.length} available sizes / styles</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart Action */}
                  <div className="pt-4 mt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6B6875] block">
                        Price
                      </span>
                      <span className="font-serif text-xl font-bold text-[#1E1E22]">
                        ₹{product.basePrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewProduct && onViewProduct(product)}
                        className="px-2.5 py-2 text-stone-500 hover:text-[#1E1E22] rounded-xl border border-[#EADFD5] hover:bg-stone-50 text-xs transition-colors cursor-pointer"
                        title="View Story & Details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddWithFeedback(product)}
                        className="inline-flex items-center gap-1.5 bg-[#FAF8F5] hover:bg-[#C85A32] text-[#1E1E22] hover:text-white border border-[#D4C5B5] hover:border-[#C85A32] px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View All CTA at bottom */}
        {onViewAll && (
          <div className="mt-14 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center gap-2 bg-[#1E1E22] hover:bg-[#C85A32] text-white px-8 py-4 rounded-full font-semibold text-sm transition-all shadow-md cursor-pointer group"
            >
              <span>Explore All 17 Creations in the Shop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
