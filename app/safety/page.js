import SafetyClient from "./SafetyClient";

// Dummy safety tips data (replace with API response later)
const safetyTipsData = [
  {
    title: "Stay Safe on Our Platform",
    html: `
      <h1 class="text-3xl font-bold text-emerald-600 mb-6">Safety Tips</h1>
      <p class="text-gray-700 mb-6">
        Your safety is our priority. Follow these tips to ensure a secure and smooth experience while buying, selling, or applying for jobs.
      </p>
      <p class="text-gray-700">
        Always meet in public places, avoid sharing personal details with strangers, and report any suspicious activity immediately.
      </p>
    `,
  },
  {
    category: "General Safety",
    tips: [
      "Meet in public, well-lit places and avoid meeting at night.",
      "Never share personal information like passwords or bank details.",
      "Verify the identity of the other party before making any deal.",
      "Use only the platform’s official communication channels.",
    ],
  },
  {
    category: "Buying & Selling",
    tips: [
      "Inspect items thoroughly before purchase.",
      "Avoid making upfront payments for goods you haven't seen.",
      "Prefer cash transactions or secure payment options.",
      "Be cautious of unrealistically cheap offers.",
    ],
  },
  {
    category: "Job Offers",
    tips: [
      "Do not pay to apply for a job — legitimate employers never ask that.",
      "Research the company before sharing personal details.",
      "Avoid interviews in private or unsafe locations.",
    ],
  },
  {
    category: "Property Deals",
    tips: [
      "Always verify ownership documents before paying any deposit.",
      "Visit the property in person before making a deal.",
      "Avoid sending money before meeting the landlord or agent.",
    ],
  },
];

// ✅ You can replace above data with an API call later:
// export async function getData() {
//   const res = await fetch(`${process.env.API_URL}/safety-tips`);
//   if (!res.ok) throw new Error("Failed to load safety tips");
//   return res.json();
// }

export default async function SafetyPage() {
  // const data = await getData();
  const data = safetyTipsData;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <SafetyClient data={data} />
      </div>
    </section>
  );
}
