import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { CartItem } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced?: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [isCheckoutStep, setIsCheckoutStep] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('Ananya Sharma');
  const [customerEmail, setCustomerEmail] = useState<string>('ananya@example.com');
  const [customerAddress, setCustomerAddress] = useState<string>('42 Lotus Boulevard, Varanasi, UP - 221005');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `FLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmedId(newOrderId);
    onClearCart();
    if (onOrderPlaced) {
      onOrderPlaced(newOrderId);
    }
  };

  const handleResetCheckout = () => {
    setIsCheckoutStep(false);
    setOrderConfirmedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => {
          if (orderConfirmedId) handleResetCheckout();
          else onClose();
        }}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between z-10 animate-fade-in border-l border-[#EADFD5]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EADFD5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
            <h3 className="font-serif text-xl font-bold text-[#1E1E22]">
              {orderConfirmedId ? 'Order Confirmed' : isCheckoutStep ? 'Complete Order' : 'Your Bag'}
            </h3>
            {!orderConfirmedId && !isCheckoutStep && (
              <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] text-xs font-semibold text-[#6B6875] border border-[#EADFD5]">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              if (orderConfirmedId) handleResetCheckout();
              else onClose();
            }}
            className="p-2 text-stone-400 hover:text-[#1E1E22] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Order Success Screen */}
          {orderConfirmedId ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#EBF0E6] text-[#5B6E4E] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-[#1E1E22]">
                  Thank You for Your Order!
                </h4>
                <p className="text-xs text-[#5B6E4E] font-semibold mt-1">
                  Order Reference: {orderConfirmedId}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#EADFD5] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                  <span className="text-[#6B6875]">Recipient:</span>
                  <span className="font-medium text-[#1E1E22]">{customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                  <span className="text-[#6B6875]">Delivery:</span>
                  <span className="font-medium text-[#1E1E22] text-right truncate max-w-[200px]">{customerAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6875]">Payment:</span>
                  <span className="font-medium text-[#1E1E22] uppercase">{paymentMethod === 'upi' ? 'Simulated UPI' : 'Simulated COD'}</span>
                </div>
              </div>

              <p className="text-xs text-[#6B6875] leading-relaxed">
                Your order is safely registered in your local session. Our artisan studio prepares each batch with care using circular temple flora and milk casein.
              </p>

              <button
                onClick={handleResetCheckout}
                className="w-full mt-4 py-3 rounded-full bg-[#1E1E22] text-white text-xs font-semibold hover:bg-[#C85A32] transition-colors cursor-pointer"
              >
                Back to Collection
              </button>
            </div>

          /* Checkout Form */
          ) : isCheckoutStep ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#EADFD5]">
                <button
                  type="button"
                  onClick={() => setIsCheckoutStep(false)}
                  className="text-xs text-[#C85A32] hover:underline cursor-pointer"
                >
                  ← Back to Bag
                </button>
                <span className="text-xs font-semibold text-[#1E1E22]">
                  Order Total: ₹{subtotal}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#D4C5B5] px-3.5 py-2.5 rounded-xl text-xs text-[#1E1E22] outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-white border border-[#D4C5B5] px-3.5 py-2.5 rounded-xl text-xs text-[#1E1E22] outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider block mb-1">
                  Shipping Address
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-white border border-[#D4C5B5] px-3.5 py-2 rounded-xl text-xs text-[#1E1E22] outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1E1E22] uppercase tracking-wider block mb-1">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-[#C85A32] bg-[#FAF8F5] font-semibold text-[#C85A32]'
                        : 'border-[#EADFD5] bg-white text-[#4A4850]'
                    }`}
                  >
                    UPI / Instant Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-xs text-left cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#C85A32] bg-[#FAF8F5] font-semibold text-[#C85A32]'
                        : 'border-[#EADFD5] bg-white text-[#4A4850]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34720] text-white py-3.5 rounded-full font-semibold text-sm shadow-md transition-all cursor-pointer active:scale-98"
                >
                  <span>Place Order • ₹{subtotal}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-[#5B6E4E] text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero plastic packaging • Biodegradable tape & box</span>
              </p>
            </form>

          /* Bag Item List */
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EADFD5]/50 flex items-center justify-center mx-auto text-[#6B6875]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#1E1E22]">
                Your bag is empty
              </h4>
              <p className="text-xs text-[#6B6875] max-w-xs mx-auto leading-relaxed">
                Explore our restorative hair masks, floral eco-leather small goods, and botanical jewelry.
              </p>
              <button
                onClick={onClose}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E1E22] text-white text-xs font-semibold hover:bg-[#C85A32] transition-colors cursor-pointer"
              >
                Discover the Collection
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-[#6B6875]">Selected creations</span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-[#B34720] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-[#EADFD5] flex gap-4 items-center shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.endsWith('/images/products/fallback-product.svg')) {
                          target.src = '/images/products/fallback-product.svg';
                        }
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 text-left">
                    <h5 className="font-serif text-sm font-semibold text-[#1E1E22] truncate">
                      {item.product.name}
                    </h5>
                    {item.variantName && (
                      <p className="text-[11px] text-[#6B6875] truncate">
                        {item.variantName}
                      </p>
                    )}
                    <span className="font-semibold text-xs text-[#C85A32] mt-0.5 block">
                      ₹{item.price} each
                    </span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-[#B34720] transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-[#EADFD5] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs text-stone-600 hover:text-[#1E1E22] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1E1E22]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-stone-600 hover:text-[#1E1E22] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer with Subtotal & Proceed CTA */}
        {!orderConfirmedId && !isCheckoutStep && items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EADFD5] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6875]">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-[#1E1E22]">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-[11px] text-[#5B6E4E] font-medium text-left">
              ✓ Plastic-free botanical packaging included
            </p>

            <button
              onClick={() => setIsCheckoutStep(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34720] text-white py-3.5 rounded-full font-semibold text-sm shadow-md transition-all cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
