import type { Metadata } from "next";
import { Container } from "@wahab/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Al-Wahab Solar Traders collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <div className="mx-auto max-w-[760px]">
          <div className="glass rounded-2xl p-8 sm:p-10">
            <p className="text-[13px] text-slate-500">Last updated: 29 July 2026</p>

            <h1 className="font-display mt-4 text-[32px] font-semibold text-white">
              Privacy Policy
            </h1>

            <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-slate-400">
              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  1. Information we collect
                </h2>
                <p className="mt-3">
                  When you use our estimator or contact form, we collect the information you
                  provide: name, email, phone number, electricity usage, and installation
                  address. If you upload a LESCO bill, we extract usage data from it and
                  store the file privately.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  2. How we use your information
                </h2>
                <p className="mt-3">
                  We use your data to generate your solar estimate, contact you about your
                  enquiry, and — if you proceed — manage your installation project. We do
                  not sell your data to third parties or use it for unrelated marketing.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  3. Data storage and security
                </h2>
                <p className="mt-3">
                  Your data is stored securely on managed infrastructure with encryption at
                  rest and in transit. LESCO bills and personal documents are kept in private
                  storage accessible only to you and authorised Al-Wahab staff.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  4. Retention
                </h2>
                <p className="mt-3">
                  Uploaded bills are automatically purged 24 months after your last activity.
                  Account data is retained while your account is active. If you request
                  deletion, we anonymise your data within 30 days.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  5. Your rights
                </h2>
                <p className="mt-3">
                  You may export all your data, correct inaccuracies, or request deletion at
                  any time from your profile settings or by contacting us at
                  info@alwahabsolar.pk.
                </p>
              </section>

              <section>
                <h2 className="font-display text-lg font-semibold text-white">
                  6. Contact
                </h2>
                <p className="mt-3">
                  For privacy-related enquiries, email info@alwahabsolar.pk or call
                  +92 42 111 765 765.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
