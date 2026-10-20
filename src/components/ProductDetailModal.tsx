import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Sparkles } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, variantId?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!isOpen || !product) return null;

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const currentVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const activePrice = currentVariant ? currentVariant.price : product.basePrice;

  const handleAdd = () => {
    onAddToCart(product, selectedVariantId, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#EADFD5] z-10 animate-fade-in my-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#EADFD5] text-[#1E1E22] hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Product Visual */}
          <div className="md:col-span-6 bg-stone-100 relative min-h-[340px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                  target.src = '/images/products/fallback-product.svg';
                }
              }}
            />
            {/* Fallback */}
            <div className={`absolute inset-0 -z-10 ${product.fallbackGradient}`} />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-[#5B6E4E] tracking-wide uppercase shadow-xs">
                {product.categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1E1E22]/90 backdrop-blur-sm text-xs font-medium text-white shadow-xs">
                {product.statusLabel}
              </span>
            </div>
          </div>

          {/* Right Column: Product Narrative, Options, and Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#6B6875]">
                <span className="uppercase font-semibold tracking-wider text-[#5B6E4E]">
                  Floralac Botanical Studio
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#1E1E22]">
                  ★ {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E22] leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#4A4850] font-light mt-1.5 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-3xl font-bold text-[#1E1E22]">
                  ₹{activePrice}
                </span>
                <span className="text-xs text-[#6B6875]">Taxes included • Plastic-free packaging</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A4850] font-light leading-relaxed border-t border-b border-[#F5EFEB] py-3">
                {product.description}
              </p>

              {/* Material Story */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EADFD5] text-xs space-y-1">
                <span className="font-semibold text-[#C85A32] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Material & Origin
                </span>
                <p className="text-[#4A4850] font-light leading-relaxed">
                  {product.materialStory}
                </p>
              </div>

              {/* Validation Status Notice (Natural and honest) */}
              {product.validationStatus && (
                <div className="bg-[#EBF0E6] p-3.5 rounded-2xl border border-[#5B6E4E]/20 text-xs space-y-1">
                  <span className="font-semibold text-[#4A5A3F] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5B6E4E]" /> Craftsmanship & Material Testing
                  </span>
                  <p className="text-[#4A5A3F] font-light leading-relaxed">
                    {product.validationStatus}
                  </p>
                </div>
              )}

              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider block">
                    Choose Size / Edition
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          selectedVariantId === v.id
                            ? 'border-[#C85A32] bg-[#FAF8F5] font-semibold text-[#1E1E22] ring-1 ring-[#C85A32]'
                            : 'border-[#EADFD5] hover:border-stone-400 text-[#4A4850]'
                        }`}
                      >
                        <p className="truncate">{v.name}</p>
                        <p className="text-[#C85A32] font-semibold mt-0.5">₹{v.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-[#D4C5B5] rounded-xl bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:text-[#1E1E22] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1E1E22]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:text-[#1E1E22] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Action Row */}
            <div className="pt-4 border-t border-[#EADFD5] flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34720] text-white py-3.5 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-98"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{activePrice * quantity}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-full border border-[#D4C5B5] hover:border-[#C85A32] transition-colors cursor-pointer ${
                  isWishlisted ? 'text-[#C85A32] bg-[#FAF8F5]' : 'text-stone-600 hover:text-[#C85A32]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C85A32]' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
