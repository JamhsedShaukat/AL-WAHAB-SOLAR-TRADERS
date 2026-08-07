/**
 * FAQ content, shared by the FAQ page (a Client Component) and the route
 * layout, which emits FAQPage structured data from the same source. Keeping
 * one copy means the markup can never drift from what visitors read.
 */
export const categories = [
  {
    id: "pricing",
    label: "Pricing",
    faqs: [
      {
        q: "How accurate are the prices?",
        a: "Estimates use live Lahore market rates that we update regularly, so they're a close, honest guide. Your final price is confirmed after a free site survey — quoted on the same itemized basis, with no new line items appearing.",
      },
      {
        q: "Are there any hidden costs?",
        a: "No. Every component is listed and priced in your estimate. The survey may adjust sizes or specs based on your actual roof, but no new categories appear. What you see is what you pay.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    faqs: [
      {
        q: "Do I need a battery?",
        a: "Not always. An on-grid system is the cheapest way to cut your bill. Add a battery (a hybrid system) if you also want backup during load-shedding. The estimator helps you decide based on what you actually need to keep running.",
      },
      {
        q: "What size system do I need?",
        a: "It depends on your monthly electricity usage. Upload your LESCO bill or enter your average units, and the estimator sizes the system to your goal — whether that's covering your full bill, reducing it, or fitting a budget.",
      },
    ],
  },
  {
    id: "net-metering",
    label: "Net metering",
    faqs: [
      {
        q: "What about net metering and LESCO?",
        a: "If you choose on-grid or hybrid, your estimate includes the net-metering application and bi-directional meter, and our team handles the LESCO paperwork and inspection for you.",
      },
      {
        q: "How long does net metering approval take?",
        a: "Roughly 5–9 weeks from application to approved meter. LESCO's inspection and approval timeline is outside our control, but we keep you updated at every step and handle all the paperwork.",
      },
    ],
  },
  {
    id: "installation",
    label: "Installation",
    faqs: [
      {
        q: "Who does the installation?",
        a: "Our own engineers and technicians. We do not subcontract. The team that surveys your roof is the team that installs and commissions the system.",
      },
      {
        q: "How long does installation take?",
        a: "The system is usually installed and running within about a week of order. Net metering takes longer because of LESCO approval, but the system itself works from day one.",
      },
      {
        q: "Is it free to use the estimator?",
        a: "Getting an estimate and a site survey is completely free, with no obligation. You only pay if you decide to go ahead with the system.",
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty & service",
    faqs: [
      {
        q: "What warranty do I get?",
        a: "Manufacturer warranties on every component — typically 12 years product and 25 years performance on panels, 5–10 years on the inverter, 8–10 years on the battery, 10 years on the structure — plus our own 1–2 year workmanship cover.",
      },
      {
        q: "What happens after installation?",
        a: "We provide local after-sales support. If something needs attention in year three, we are still a short drive away in Lahore. Your warranty documents and system details are always accessible from your dashboard.",
      },
    ],
  },
] as const;

/** Flat list for structured data. */
export const ALL_FAQS = categories.flatMap((category) =>
  category.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
);
