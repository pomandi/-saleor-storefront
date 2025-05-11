import React from "react";
import { ImageGallery } from "./ImageGallery";
import { ProductListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import Link from "next/link";

interface PageProps {
	params: {
		channel: string;
	};
}

const Page: React.FC<PageProps> = async ({ params }) => {
	const data = await executeGraphQL(ProductListDocument, {
		variables: {
			channel: params.channel,
			first: 20, // Fetch first 20 products
		},
		revalidate: 60,
	});

	const products = data.products?.edges || [];

	return (
		<div className="mx-auto max-w-7xl">
			{/* Hero Section */}
			<section className="text-center py-10 px-4 md:py-16">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
					Elegant Men&apos;s Apparel
				</h1>
				<div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
					<Link 
						href={`/${params.channel}/categories/suits`}
						className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors"
					>
						Shop Collection
					</Link>
					<Link 
						href={`/${params.channel}/categories/accessories`}
						className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
					>
						View Accessories
					</Link>
				</div>
			</section>

			{/* Slider Section */}
			<ImageGallery />
			<h1>Test Text</h1>

			{/* Featured Collection */}
			{products.length > 0 ? (
				<section className="px-4 py-12 md:py-20">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-2xl md:text-3xl font-bold">Featured Collection</h2>
						<Link 
							href={`/${params.channel}/products`}
							className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
						>
							View All
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</Link>
					</div>
					<ProductList products={products.map(({ node: product }) => product)} />
				</section>
			) : (
				<section className="text-center py-12 px-4">
					<div className="bg-gray-50 rounded-lg p-8 md:p-12 max-w-2xl mx-auto">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
						</svg>
						<h3 className="text-xl font-semibold mb-2">No products available</h3>
						<p className="text-gray-600 mb-6">Our collection is being updated. Please check back soon for new arrivals.</p>
						<Link 
							href={`/${params.channel}`}
							className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium transition-colors inline-block"
						>
							Refresh Page
						</Link>
					</div>
				</section>
			)}

			{/* Features Section */}
			<section className="bg-gray-50 py-12 md:py-20 px-4 mt-12">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Our Brand</h2>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-lg shadow-sm text-center">
							<div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
							<p className="text-gray-600">Crafted from the finest materials for exceptional comfort and durability.</p>
						</div>
						
						<div className="bg-white p-6 rounded-lg shadow-sm text-center">
							<div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
							<p className="text-gray-600">Multiple payment options with enhanced security for your peace of mind.</p>
						</div>
						
						<div className="bg-white p-6 rounded-lg shadow-sm text-center">
							<div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
							<p className="text-gray-600">Complimentary shipping on all orders above $150 worldwide.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-12 md:py-20 px-4">
				<div className="max-w-3xl mx-auto text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
					<p className="text-gray-600 mb-8">Stay updated with our latest collections and exclusive offers.</p>
					
					<form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
						<input 
							type="email" 
							placeholder="Your email address" 
							className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
							required
						/>
						<button 
							type="submit"
							className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
						>
							Subscribe
						</button>
					</form>
					<p className="text-sm text-gray-500 mt-4">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
				</div>
			</section>
		</div>
	);
};

export default Page;
