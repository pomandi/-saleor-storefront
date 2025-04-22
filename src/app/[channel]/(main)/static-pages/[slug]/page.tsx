import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { executeGraphQL } from "@/lib/graphql";
import { PageDetailsBySlugDocument } from "@/gql/graphql";

// Type for the params
type StaticPageParams = {
  slug: string;
  channel: string;
};

export const generateMetadata = async ({ params }: { params: StaticPageParams }): Promise<Metadata> => {
  const { slug, channel } = params;

  try {
    const { page } = await executeGraphQL(PageDetailsBySlugDocument, {
      variables: { slug, channel },
      revalidate: 60 * 60,
    });

    if (!page) {
      return {
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
      };
    }

    return {
      title: page.seoTitle || page.title,
      description: page.seoDescription || undefined,
    };
  } catch (error) {
    console.error("Error fetching metadata for static page:", error);
    return {
      title: "Error",
      description: "Could not load page information.",
    };
  }
};

export default async function StaticPage({ params }: { params: StaticPageParams }) {
  const { slug, channel } = params;

  let pageData;
  try {
    const { page } = await executeGraphQL(PageDetailsBySlugDocument, {
      variables: { slug, channel },
      revalidate: 60 * 60,
    });
    pageData = page;
  } catch (error) {
    console.error(`Error fetching page content for slug ${slug}:`, error);
  }

  if (!pageData) {
    notFound();
  }

  const htmlContent = pageData.content || "";

  return (
    <div className="prose mx-auto max-w-7xl p-8 pb-16">
      <h1>{pageData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
} 