import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product, ProductCategory } from '../types/product';
import { Search, SlidersHorizontal, Heart, ShoppingBag, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ShopPageProps {
  onAddToCart: (product: Product, variantId?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onOpenProductDetail: (product: Product) => void;
  initialCategory?: ProductCategory | 'all';
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenProductDetail,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'hair-care', label: 'Hair & Scalp Care' },
    { id: 'eco-leather', label: 'Floral Eco-Leather' },
    { id: 'jewelry', label: 'Botanical Jewelry' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materialStory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice((curr) => (curr === product.name ? null : curr));
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-8 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs text-[#5B6E4E] font-semibold uppercase tracking-wider mb-2">
            <span>Bio-Circular Collection</span>
            <span>•</span>
            <span>17 Artisanal Creations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1E1E22]">
            The Floralac Collection
          </h1>
          <p className="mt-3 text-base text-[#6B6875] font-light max-w-2xl leading-relaxed">
            Discover our complete range of nourishing scalp treatments, durable petal-composite leather goods, and hand-cured casein botanical jewelry.
          </p>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#EADFD5] shadow-xs mb-10 space-y-4">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, or scents (e.g. marigold, wallet, mask)..."
                className="w-full bg-[#FAF8F5] border border-[#D4C5B5] focus:border-[#C85A32] pl-11 pr-4 py-2.5 rounded-full text-xs sm:text-sm text-[#1E1E22] placeholder:text-stone-400 outline-none transition-all"
              />
            </div>

            {/* Sort Dropdown & Count */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
              <span className="text-[#6B6875] hidden sm:inline">
                {filteredAndSortedProducts.length} items found
              </span>

              <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-full border border-[#D4C5B5]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-semibold text-[#1E1E22]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#1E1E22] font-medium outline-none cursor-pointer text-xs"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F5EFEB]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1E1E22] text-white shadow-xs'
                    : 'bg-[#FAF8F5] border border-[#EADFD5] text-[#4A4850] hover:border-[#1E1E22]'
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

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#EADFD5] shadow-xs max-w-lg mx-auto">
            <p className="text-stone-400 font-serif text-3xl">🌸</p>
            <h3 className="font-serif text-2xl font-bold text-[#1E1E22] mt-3">
              No matching creations found
            </h3>
            <p className="text-xs text-[#6B6875] mt-1.5 leading-relaxed">
              We couldn’t find any items matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#C85A32] text-white text-xs font-semibold hover:bg-[#B34720] transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const isTesting = product.status === 'concept-testing';

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-[#EADFD5] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 card-hover-lift"
                >
                  {/* Image Container */}
                  <div
                    onClick={() => onOpenProductDetail(product)}
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

                    {/* Category Label */}
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

                    {/* Status Pill on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded-md backdrop-blur-sm text-[10px] font-semibold flex items-center gap-1 shadow-xs ${
                          isTesting
                            ? 'bg-[#E27E58]/90 text-white'
                            : 'bg-black/60 text-white'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{product.statusLabel}</span>
                      </span>

                      <span className="text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                        ★ {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => onOpenProductDetail(product)}
                        className="font-serif text-lg font-bold text-[#1E1E22] group-hover:text-[#C85A32] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-[#4A4850] font-light mt-1 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Craftsmanship / Testing note snippet */}
                      {product.validationStatus && (
                        <p className="mt-2 text-[11px] text-[#5B6E4E] line-clamp-1 italic">
                          • {product.validationStatus}
                        </p>
                      )}
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="pt-4 mt-3 border-t border-[#F5EFEB] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6B6875] block">
                          Price
                        </span>
                        <span className="font-serif text-xl font-bold text-[#1E1E22]">
                          ₹{product.basePrice}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenProductDetail(product)}
                          className="p-2 text-stone-500 hover:text-[#1E1E22] rounded-xl border border-[#EADFD5] hover:bg-stone-50 text-xs transition-colors cursor-pointer"
                          title="View Details"
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
        )}

      </div>
    </div>
  );
};
