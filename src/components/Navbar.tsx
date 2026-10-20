import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  wishlistCount,
  onCartClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'hair-care', label: 'Hair & Scalp' },
    { id: 'eco-leather', label: 'Eco-Leather' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'story', label: 'Our Story' },
    { id: 'material-lab', label: 'Material Lab' },
    { id: 'impact', label: 'Our Impact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EADFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Floralac Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none py-1"
            aria-label="Floralac - Second Life Materials"
          >
            <img
              src="/images/floralac-logo.png"
              alt="Floralac - Second Life Materials"
              className="h-14 sm:h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-[#C85A32] font-semibold'
                      : 'text-[#4A4850] hover:text-[#1E1E22]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C85A32] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Wishlist Indicator */}
            <div
              onClick={() => handleNavClick('shop')}
              className="hidden sm:flex items-center text-[#4A4850] hover:text-[#C85A32] p-2 rounded-full hover:bg-stone-100 transition-colors relative cursor-pointer"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#5B6E4E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 bg-[#1E1E22] hover:bg-[#C85A32] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow-md cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A4850] hover:text-[#1E1E22] rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EADFD5] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#C85A32]/10 text-[#C85A32] font-semibold'
                  : 'text-[#4A4850] hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#EADFD5] flex items-center justify-between px-4 text-xs text-[#5B6E4E]">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Handcrafted in Varanasi & Delhi
            </span>
            <span className="text-stone-400">Floralac Studio</span>
          </div>
        </div>
      )}
    </header>
  );
};
