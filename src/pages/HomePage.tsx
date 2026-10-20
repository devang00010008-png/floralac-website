import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryCards } from '../components/CategoryCards';
import { WasteToWonder } from '../components/WasteToWonder';
import { ProcessPipeline } from '../components/ProcessPipeline';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { SustainabilitySection } from '../components/SustainabilitySection';
import { BrandStorySection } from '../components/BrandStorySection';
import { NewsletterSection } from '../components/NewsletterSection';
import type { Product, ProductCategory } from '../types/product';

interface HomePageProps {
  onNavigate: (section: string) => void;
  onAddToCart: (product: Product, variantId?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  onOpenProductDetail: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onOpenProductDetail,
}) => {
  const handleScrollToProcess = () => {
    const el = document.getElementById('process-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('material-lab');
    }
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    onNavigate(cat);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1E22]">
      {/* Hero Section */}
      <HeroSection
        onExploreClick={() => onNavigate('shop')}
        onProcessClick={handleScrollToProcess}
      />

      {/* 3 Categories Section */}
      <CategoryCards onSelectCategory={handleSelectCategory} />

      {/* From Waste to Wonder Section */}
      <WasteToWonder />

      {/* Shared Material Pipeline (7-Steps) */}
      <div id="process-section">
        <ProcessPipeline />
      </div>

      {/* Featured Products Collection */}
      <FeaturedProducts
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
        onViewProduct={onOpenProductDetail}
        onViewAll={() => onNavigate('shop')}
      />

      {/* Sustainability & Impact Section */}
      <SustainabilitySection />

      {/* Brand Origin Story */}
      <BrandStorySection />

      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
};
