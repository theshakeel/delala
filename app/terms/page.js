import TermsClient from "./TermsClient";

// ✅ Server Component (SSR)
export default async function TermsPage() {
  // --- API Fetch (commented for now) ---
  /*
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/terms`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  */

  // --- Dummy Data for Development ---
  const data = {
    title: "Terms & Conditions",
    content: `
      <p>Welcome to our platform. Please read these Terms and Conditions carefully before using our services.</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using our website, you agree to be bound by these terms and all applicable laws and regulations.</p>

      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial viewing only.</p>

      <h2>3. Disclaimer</h2>
      <p>The materials on this site are provided "as is". We make no warranties, expressed or implied.</p>

      <h2>4. Limitation of Liability</h2>
      <p>In no event shall the company be liable for any damages arising out of the use or inability to use the materials on the website.</p>

      <h2>5. Governing Law</h2>
      <p>These terms are governed by and construed in accordance with the laws of your jurisdiction.</p>

      <p>Last updated: October 2025</p>
    `,
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <TermsClient data={data} />
      </div>
    </section>
  );
}
