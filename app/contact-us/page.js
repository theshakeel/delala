import ContactClient from "./ContactClient";

// Dummy contact info data
const contactData = {
  heading: "Contact Us",
  intro: `
    <p>
      We’re always happy to hear from you. Whether you have a question, feedback,
      or need help with your account — feel free to reach out to us through any
      of the following channels.
    </p>
  `,
  contactInfo: [
    { label: "Email", value: "support@example.com" },
    { label: "Phone", value: "+1 234 567 890" },
    { label: "Office Hours", value: "Monday – Friday, 9:00 AM – 6:00 PM" },
    { label: "Address", value: "123 Market Street, Cityville, Country" },
  ],
  faqNote: `
    Have a question? Check out our <a href="/faq" class="text-emerald-600 underline hover:text-emerald-700">FAQ page</a>
    for quick answers before contacting us.
  `,
};

// ✅ Example API integration for later:
// export async function getData() {
//   const res = await fetch(`${process.env.API_URL}/contact`);
//   if (!res.ok) throw new Error("Failed to fetch contact info");
//   return res.json();
// }

export default async function ContactPage() {
  // const data = await getData();
  const data = contactData;

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <ContactClient data={data} />
      </div>
    </section>
  );
}
