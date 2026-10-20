import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Beaker, ShieldCheck, Cpu } from 'lucide-react';

export interface ProcessStep {
  id: number;
  title: string;
  shortLabel: string;
  summary: string;
  details: string;
  inputs: string[];
  outputs: string[];
  intents: string;
  validationGoal: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Flower Collection & Temple Partnerships',
    shortLabel: 'Collect',
    summary: 'Partnering with local shrines, ghats, and temples to collect discarded devotional offerings before they reach waterways.',
    details: 'Freshly discarded marigolds, roses, and hibiscus are gathered twice daily from temple collection bins in breathable jute hampers to prevent early anaerobic fermentation.',
    inputs: ['Devotional Marigold, Rose & Hibiscus', 'Temple Partner Bins'],
    outputs: ['Raw Segregated Botanical Mass'],
    intents: 'Diverts biological load from sacred rivers while securing zero-cost raw material.',
    validationGoal: 'Establishing collection logistics, hygienic handling, and moisture control during transit.',
  },
  {
    id: 2,
    title: 'Botanical Sorting & Solar Shade-Drying',
    shortLabel: 'Sort & Dry',
    summary: 'Manual inspection to remove non-organic materials, followed by gentle low-temperature drying.',
    details: 'Petals are separated from strings and debris, washed in mild citrus-derived sanitizing baths, and placed in solar convection dryers to retain vibrant pigment flavonoids.',
    inputs: ['Raw Botanical Mass', 'Solar Drying Trays'],
    outputs: ['Stabilized Dried Petals (<8% moisture)'],
    intents: 'Preserves natural anthocyanin colors and bioactive antioxidant compounds.',
    validationGoal: 'Preventing microbial contamination and mould formation without harsh chemical additives.',
  },
  {
    id: 3,
    title: 'Material Preparation & Fractionation',
    shortLabel: 'Prepare',
    summary: 'Milling floral biomass into calibrated micro-fibers alongside extracting casein polymer curds from dairy whey.',
    details: 'Dried petals are cryogenic-milled into uniform 50-micron flour. In parallel, surplus dairy whey or skim milk is acidified to precipitate natural casein phosphoprotein curds.',
    inputs: ['Dried Petals', 'Surplus Dairy Whey / Acidified Skim Milk'],
    outputs: ['Botanical Micro-Fiber Flour', 'Precipitated Acid Casein Curd'],
    intents: 'Creates the two fundamental building blocks: organic filler/pigment and proteinaceous binder.',
    validationGoal: 'Ensuring batch-to-batch consistency in casein purity and flower particle size.',
  },
  {
    id: 4,
    title: 'Formulation & Bio-Plasticization',
    shortLabel: 'Formulate',
    summary: 'Tailoring specific formulations for cosmetics, flexible biocomposites, or rigid stone jewelry.',
    details: 'For hair masks, floral fractions are infused with cosmetic-grade casein peptides and aloe. For eco-leather and jewelry, casein is blended with natural plasticizers (glycerol, bio-waxes) and cross-linked.',
    inputs: ['Casein Curd', 'Botanical Flour', 'Glycerol / Safe Bio-Plasticizers'],
    outputs: ['Uncured Leather Compound', 'Jewelry Dough', 'Scalp Emulsion Base'],
    intents: 'Customizes viscosity, flexibility, tensile strength, and curing kinetics for each vertical.',
    validationGoal: 'Balancing mechanical elasticity with safe, biodegradable non-toxic cross-linking agents.',
  },
  {
    id: 5,
    title: 'Casting & Forming',
    shortLabel: 'Cast / Form',
    summary: 'Compression molding for sheets, precision silicone molds for jewelry, and colloidal mixing for hair masks.',
    details: 'Eco-leather dough is rolled between heated calendaring rollers into uniform 0.8mm–1.5mm sheets. Jewelry blanks are pressed into silicone molds. Hair masks are homogenized.',
    inputs: ['Formulated Compounds', 'Rolling Presses', 'Precision Silicone Molds'],
    outputs: ['Raw Leather Sheets', 'Molded Jewelry Blanks', 'Restorative Hair Creams'],
    intents: 'Produces defined dimensional blanks and stable cosmetic dispersions.',
    validationGoal: 'Eliminating air voids, ensuring thickness uniformity, and verifying color dispersion.',
  },
  {
    id: 6,
    title: 'Finishing & Conditioning',
    shortLabel: 'Finish',
    summary: 'Surface polishing, vegetable wax conditioning, and natural botanical edge-burnishing.',
    details: 'Sheets undergo conditioning with cold-pressed oils to enhance suppleness and water resistance. Jewelry stones are tumbled and polished to a smooth ivory-like sheen.',
    inputs: ['Formed Blanks', 'Beeswax / Carnauba Wax', 'Natural Linen Polishers'],
    outputs: ['Finished Floral Eco-Leather', 'Galalith-Style Botanical Stones'],
    intents: 'Imparts water repellency, tactile luxury feel, and enhanced durability.',
    validationGoal: 'Achieving moisture resistance and tactile parity with traditional premium goods.',
  },
  {
    id: 7,
    title: 'Quality Testing & Validation',
    shortLabel: 'Test & Validate',
    summary: 'Rigorously testing material performance and skin compatibility before commercial scaling.',
    details: 'Subjecting leather sheets to ASTM flex and tensile tests, cosmetic masks to patch testing and stability protocols, and jewelry to drop tests.',
    inputs: ['Studio Test Batches', 'Testing Equipment'],
    outputs: ['Standardized Validation Data & Iteration Feedback'],
    intents: 'Ensures consumer safety, durability, and transparent ecological accountability.',
    validationGoal: 'Validating safety and functional claims before full commercial deployment.',
  },
];

export const ProcessPipeline: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeStep = PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#EADFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32] mb-2 block">
            Shared Material Pipeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1E22] font-normal">
            The 7-Step Circular Lifecycle
          </h2>
          <p className="mt-3 text-base text-[#6B6875] font-light">
            Click on any phase below to explore how sacred offerings and dairy fractions travel through our research and studio workflow.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="relative mb-10 overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center justify-between min-w-[700px] border-b border-[#EADFD5] pb-4 px-2">
            {PROCESS_STEPS.map((step) => {
              const isSelected = step.id === activeStepId;
              const isPast = step.id < activeStepId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex flex-col items-center group cursor-pointer transition-all px-2 ${
                    isSelected ? 'scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                      isSelected
                        ? 'bg-[#C85A32] text-white ring-4 ring-[#C85A32]/20'
                        : isPast
                        ? 'bg-[#5B6E4E] text-white'
                        : 'bg-white border border-[#D4C5B5] text-[#1E1E22]'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : `0${step.id}`}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium whitespace-nowrap ${
                      isSelected ? 'text-[#C85A32] font-bold' : 'text-[#4A4850]'
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Details Panel */}
        <div className="bg-white rounded-3xl border border-[#EADFD5] p-6 sm:p-10 shadow-lg text-left editorial-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Step Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold">
                  Phase 0{activeStep.id} of 07
                </span>
                <span className="text-xs font-medium text-[#5B6E4E] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Circular Formulation
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E22]">
                {activeStep.title}
              </h3>

              <p className="text-base text-[#4A4850] font-light leading-relaxed">
                {activeStep.details}
              </p>

              {/* Inputs & Outputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EADFD5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6875] block mb-2">
                    Key Inputs
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#1E1E22]">
                    {activeStep.inputs.map((inp, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EADFD5]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5B6E4E] block mb-2">
                    Target Output
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#1E1E22]">
                    {activeStep.outputs.map((out, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B6E4E]" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation buttons for next/prev step */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  disabled={activeStep.id === 1}
                  onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-full border border-[#D4C5B5] text-xs font-medium text-[#1E1E22] hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous Phase
                </button>
                <button
                  disabled={activeStep.id === PROCESS_STEPS.length}
                  onClick={() => setActiveStepId((prev) => Math.min(PROCESS_STEPS.length, prev + 1))}
                  className="px-5 py-2 rounded-full bg-[#1E1E22] text-white hover:bg-[#C85A32] text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right: Validation & Research Intent */}
            <div className="lg:col-span-5 bg-[#FAF8F5] p-6 rounded-2xl border border-[#EADFD5] space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] uppercase tracking-wider">
                <Beaker className="w-4 h-4 text-[#C85A32]" />
                <span>R&D Craftsmanship Goal</span>
              </div>

              <div>
                <p className="text-xs text-[#6B6875] uppercase font-semibold">Circularity Intent</p>
                <p className="text-sm text-[#1E1E22] mt-1 font-medium leading-relaxed">
                  {activeStep.intents}
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#EADFD5] shadow-xs">
                <div className="flex items-center gap-2 text-[#5B6E4E] font-semibold text-xs mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Validation Metric to Prove</span>
                </div>
                <p className="text-xs text-[#4A4850] font-light leading-relaxed">
                  {activeStep.validationGoal}
                </p>
              </div>

              <div className="text-[11px] text-[#6B6875] flex items-start gap-1.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#5B6E4E] shrink-0 mt-0.5" />
                <span>
                  Material Integrity: Process parameters and yields are developed from peer-reviewed casein biomaterial literature.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
