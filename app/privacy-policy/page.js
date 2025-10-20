import PrivacyClient from "./PrivacyClient";

// ✅ Server Component (SSR)
export default async function PrivacyPage() {
  // --- API Fetch (commented out for now) ---
  /*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/privacy`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  */

  // --- Dummy Data for Development ---
  const data = {
    title: "Privacy Policy",
    content: `
      <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.</p>

      <h2>1. Information We Collect</h2>
      <p>We may collect personal information such as your name, email address, and usage data when you use our website or application.</p>

      <h2>2. How We Use Your Information</h2>
      <p>Your information is used to provide and improve our services, personalize your experience, and communicate with you regarding updates or offers.</p>

      <h2>3. Data Protection</h2>
      <p>We take security seriously and implement measures to protect your data from unauthorized access, alteration, or disclosure.</p>

      <h2>4. Cookies</h2>
      <p>We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some features may not function properly.</p>

      <h2>5. Third-Party Services</h2>
      <p>Our site may contain links to third-party websites. We are not responsible for the privacy practices of those websites.</p>

      <h2>6. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. The updated date will always be reflected at the top of this page.</p>

      <p>Last updated: October 2025</p>
    `,
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <PrivacyClient data={data} />
      </div>
    </section>
  );
}
