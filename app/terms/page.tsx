import { Suspense } from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Terms and Conditions
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="prose prose-blue max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Smart Booking platform, you agree to
                be bound by these Terms and Conditions. If you do not agree to
                these terms, please do not use our service.
              </p>

              <h2>2. User Accounts</h2>
              <p>
                To use our platform, you must register for an account. You agree
                to provide accurate and complete information during registration
                and to keep your account information updated.
              </p>

              <h2>3. User Responsibilities</h2>
              <ul>
                <li>Maintain the confidentiality of your account</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Provide accurate and truthful information</li>
              </ul>

              <h2>4. Booking and Payments</h2>
              <p>
                Our platform facilitates bookings between clients and
                professionals. All payments are processed securely through our
                payment system. Cancellation policies may vary by service
                provider.
              </p>

              <h2>5. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and protect your personal information.
              </p>

              <h2>6. Intellectual Property</h2>
              <p>
                All content on the Smart Booking platform, including text,
                graphics, logos, and software, is the property of Smart Booking
                and is protected by intellectual property laws.
              </p>

              <h2>7. Limitation of Liability</h2>
              <p>
                Smart Booking is not liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use of or inability to use the service.
              </p>

              <h2>8. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes via email or through the
                platform.
              </p>

              <h2>9. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at support@smartbooking.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TermsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TermsAndConditions />
    </Suspense>
  );
}
