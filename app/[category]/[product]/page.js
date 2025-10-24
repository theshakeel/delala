// app/[category]/[product]/page.js
export const revalidate = 0;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
import AdDetails from './AdDetails';
// console.log("process.env.NEXT_PUBLIC_API_BASE_URL =", process.env.NEXT_PUBLIC_API_BASE_URL);
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
async function getAd(categorySlug, productSlug) {
  console.log("Fetching from:", `${API_BASE}/get-product/${categorySlug}/${productSlug}`);

  const res = await fetch(`${API_BASE}/get-product/${categorySlug}/${productSlug}`);
  console.log(res)
  if (!res.ok) throw new Error('Failed to fetch ad');
  const data = await res.json();
  return data.product;
}

export default async function ProductPage({ params }) {
  // params is a promise internally, so await it
  const { category, product } = await params;

  const ad = await getAd(category, product);
  return <> <head>
        <title>{ad.title} | My E-commerce Site</title>
        <meta name="description" content={ad.description} />
        <meta property="og:title" content={ad.title} />
        <meta property="og:description" content={ad.description} />
        <meta property="og:image" content={ad.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={ad.price} />
        <meta property="product:price:currency" content="ETB" />
      </head>
      <AdDetails ad={ad} />
      </>;
}
