import React, { useState } from 'react';
import { Mail, Check, AlertCircle, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please provide an email address to join the circular dispatch.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email format (e.g., hello@domain.com).');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setEmail('');
    setSubmitted(false);
    setError(null);
  };

  return (
    <section className="py-20 bg-[#F5EFEB] border-t border-[#EADFD5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-2 block">
          Stay Connected
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal">
          Follow Our Circular Journey
        </h2>
        <p className="mt-3 text-base text-[#6B6875] font-light max-w-xl mx-auto">
          Subscribe for botanical dispatches, new small-batch releases, and circular material breakthroughs.
        </p>

        {submitted ? (
          <div className="mt-8 bg-white border border-[#EADFD5] p-6 sm:p-8 rounded-3xl shadow-md text-center max-w-lg mx-auto animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#EBF0E6] text-[#5B6E4E] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1E1E22]">
              Welcome to the Circular Circle!
            </h3>
            <p className="text-xs sm:text-sm text-[#4A4850] mt-2 font-light">
              We’ve recorded <strong className="text-[#1E1E22]">{email}</strong> to our botanical studio dispatch for <strong className="text-[#5B6E4E]">{interest.toUpperCase()}</strong> releases.
            </p>
            <div className="mt-4 pt-4 border-t border-[#F5EFEB] flex items-center justify-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs text-[#C85A32] font-semibold hover:underline cursor-pointer"
              >
                Sign up with another address
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto space-y-4">
            
            {/* Preference Chips */}
            <div className="flex items-center justify-center gap-2 pb-2">
              {[
                { id: 'all', label: 'All Releases' },
                { id: 'hair', label: 'Hair Care' },
                { id: 'leather', label: 'Eco-Leather' },
                { id: 'jewelry', label: 'Jewelry' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setInterest(opt.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    interest === opt.id
                      ? 'bg-[#1E1E22] text-white'
                      : 'bg-white border border-[#D4C5B5] text-[#4A4850] hover:border-[#1E1E22]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-white border border-[#D4C5B5] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] pl-11 pr-4 py-3.5 rounded-full text-sm text-[#1E1E22] placeholder:text-stone-400 outline-none transition-all shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#C85A32] hover:bg-[#B34720] text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>Subscribe</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {error && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#B34720] font-medium pt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-[11px] text-[#6B6875] font-light">
              Complimentary circular design dispatch • No spam, ever.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
