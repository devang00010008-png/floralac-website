import { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import type { Product, ProductCategory } from './types/product';
import type { CartItem } from './types/cart';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Initialize Cart from LocalStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('floralac_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize Wishlist from LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('floralac_wishlist');
      return saved ? JSON.parse(saved) : ['hibiscus-marigold-scalp-mask', 'floral-card-holder'];
    } catch {
      return [];
    }
  });

  // Save Cart to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('floralac_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [cart]);

  // Save Wishlist to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('floralac_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [wishlist]);

  // Add product to cart handler
  const handleAddToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const selectedVariant = variantId
      ? product.variants.find((v) => v.id === variantId)
      : product.variants[0];

    const unitPrice = selectedVariant ? selectedVariant.price : product.basePrice;
    const variantName = selectedVariant ? selectedVariant.name : undefined;
    const itemKey = `${product.id}-${selectedVariant?.id || 'standard'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          variantId: selectedVariant?.id,
          variantName,
          price: unitPrice,
          quantity,
        },
      ];
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Handle navigation
  const handleNavigate = (section: string) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (section === 'story' || section === 'material-lab' || section === 'impact') {
      setActiveSection('home');
      setTimeout(() => {
        if (section === 'story') {
          const el = document.getElementById('story-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'material-lab') {
          const el = document.getElementById('process-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (section === 'impact') {
          const el = document.getElementById('impact-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Determine which page to render
  const isShopView =
    activeSection === 'shop' ||
    activeSection === 'hair-care' ||
    activeSection === 'eco-leather' ||
    activeSection === 'jewelry';

  const shopInitialCategory: ProductCategory | 'all' =
    activeSection === 'hair-care' || activeSection === 'eco-leather' || activeSection === 'jewelry'
      ? activeSection
      : 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E22] font-sans antialiased selection:bg-[#C85A32]/20 selection:text-[#C85A32]">
      {/* Announcement Bar */}
      <AnnouncementBar onExploreClick={() => handleNavigate('shop')} />

      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {isShopView ? (
          <ShopPage
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onOpenProductDetail={(prod) => setSelectedProductForModal(prod)}
            initialCategory={shopInitialCategory}
          />
        ) : (
          <HomePage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onOpenProductDetail={(prod) => setSelectedProductForModal(prod)}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProductForModal ? wishlist.includes(selectedProductForModal.id) : false}
      />

      {/* Cart Drawer with Checkout Flow */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
