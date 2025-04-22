import { notFound } from "next/navigation";
import { type Metadata } from "next";
import fs from "fs";
import path from "path";

const PAGE_TITLES = {
  'about-us': 'About Us - POMANDI Luxury',
  'contact-us': 'Contact Us - POMANDI Luxury',
  'privacy-policy': 'Privacy Policy - POMANDI Luxury',
  'return-policy': 'Return Policy - POMANDI Luxury',
  'shipping-information': 'Shipping Information - POMANDI Luxury'
};

// Type for the params
type StaticPageParams = {
  slug: string;
};

export const generateMetadata = async ({ params }: { params: StaticPageParams }): Promise<Metadata> => {
  const { slug } = params;
  
  const title = PAGE_TITLES[slug as keyof typeof PAGE_TITLES] || 'POMANDI Luxury';
  
  return {
    title,
    description: `${title} - Custom tailored suits and luxury menswear`,
  };
};

export default async function StaticPage({ params }: { params: StaticPageParams }) {
  const { slug } = params;
  
  // Define valid pages
  const validPages = [
    'about-us',
    'contact-us',
    'privacy-policy',
    'return-policy',
    'shipping-information'
  ];
  
  // Check if the requested page exists
  if (!validPages.includes(slug)) {
    notFound();
  }
  
  // Path to the HTML file
  const filePath = path.join(process.cwd(), 'pages-content', `${slug}.html`);
  
  // Try to read the HTML file
  let html = '';
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract just the body content from the HTML (without the body tags)
    const bodyMatch = fileContent.match(/<body>([\s\S]*)<\/body>/i);
    html = bodyMatch ? bodyMatch[1] : fileContent;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    notFound();
  }
  
  return (
    <div className="mx-auto max-w-7xl p-8 pb-16">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
} 