// app/faq/page.js
import FAQClient from "./FAQClient";
const faqData = [
            {
                html: `
                    <div class="prose max-w-none">
                        <h1 class="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
                        <p class="text-lg text-gray-600 mb-4">Welcome to our comprehensive FAQ section. Here you'll find answers to the most common questions about our services, policies, and procedures.</p>
                        <p class="text-gray-600">Use the sidebar to browse questions by category or search for specific topics. Click on any question to view the detailed answer.</p>
                    </div>
                `
            },
            {
                q: "Account Management: How do I reset my password?",
                a: "<p>To reset your password, click the 'Forgot Password' link on the login page. Enter your email address and we'll send you a secure reset link. The link expires in 24 hours for security.</p>",
                category: "Account"
            },
            {
                q: "Account Management: Can I change my username?",
                a: "<p>Yes, you can change your username once every 30 days. Go to Settings > Profile > Username. Note that changing your username may affect how others find you on the platform.</p>",
                category: "Account"
            },
            {
                q: "Billing: What payment methods do you accept?",
                a: "<p>We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoice billing with NET-30 terms.</p>",
                category: "Billing"
            },
            {
                q: "Billing: How do I cancel my subscription?",
                a: "<p>You can cancel your subscription at any time from your account dashboard. Go to Billing > Subscription > Cancel. Your access will continue until the end of your current billing period.</p>",
                category: "Billing"
            },
            {
                q: "Data Privacy: How is my data protected?",
                a: "<p>We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our servers are hosted in SOC 2 compliant data centers with 24/7 monitoring.</p>",
                category: "Privacy"
            },
            {
                q: "Features: How do I export my data?",
                a: "<p>Data export is available in multiple formats including CSV, JSON, and PDF. Go to Settings > Data Export, select your preferred format and date range, then click 'Generate Export'.</p>",
                category: "Features"
            },
            {
                q: "Getting Started: What's included in the free plan?",
                a: "<p>The free plan includes up to 5 projects, 1GB storage, basic templates, and community support. You can upgrade anytime to unlock unlimited projects and premium features.</p>",
                category: "Getting Started"
            },
            {
                q: "Integration: Does this work with third-party tools?",
                a: "<p>Yes! We offer integrations with popular tools like Slack, Zapier, Google Workspace, Microsoft 365, and many others. Check our integrations page for the full list.</p>",
                category: "Integration"
            }
        ];

// ✅ This is a Server Component by default in Next.js (App Router)
export default async function FAQPage() {
  // You can fetch from an API or DB here if needed.
  // For now, we just use the static faqData import.

  // Example: simulate async (uncomment if using real API)
  // const data = await fetch("https://api.example.com/faqs").then(res => res.json());

  const data = faqData;

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h1 className="text-3xl font-bold text-emerald-600 mb-6">
            Frequently Asked Questions
        </h1>

        {/* Pass the loaded data to the Client Component */}
        <FAQClient data={data} />
      </div>
    </section>
  );
}
