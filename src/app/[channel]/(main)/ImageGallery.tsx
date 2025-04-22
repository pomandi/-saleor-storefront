'use client';

import { useState, useEffect, useCallback } from 'react';

interface SlideType {
	image: string;
	title: string;
	subtitle: string;
}

// Define touch event interface
interface TouchStartEvent {
	targetTouches: { clientX: number }[];
}

export function ImageGallery() {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

	// Define slides with images, titles, and subtitles
	const slides: SlideType[] = [
		{
			image: '/1.jpg',
			title: 'Özel Koleksiyon',
			subtitle: 'En kaliteli el işçiliğiyle üretilmiş özel tasarım takım elbiseler'
		},
		{
			image: '/2.jpg',
			title: 'Sezon İndirimi',
			subtitle: 'Seçili ürünlerde %50\'ye varan indirimler'
		},
		{
			image: '/3.jpg',
			title: 'Premium Kalite',
			subtitle: 'Kaliteden ödün vermeden üretilen takım elbiselerimiz'
		}
	];

	// Navigate to the previous slide
	const prevSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prevIndex: number) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
		
		// Reset transitioning state after animation completes
		setTimeout(() => {
			setIsTransitioning(false);
		}, 500);
	}, [slides.length, isTransitioning]);

	// Navigate to the next slide
	const nextSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prevIndex: number) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
		
		// Reset transitioning state after animation completes
		setTimeout(() => {
			setIsTransitioning(false);
		}, 500);
	}, [slides.length, isTransitioning]);

	// Handle touch start event
	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientX);
	};

	// Handle touch move event
	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};

	// Handle touch end event for swiping
	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			nextSlide();
		} else if (isRightSwipe) {
			prevSlide();
		}

		setTouchStart(null);
		setTouchEnd(null);
	};

	// Setup auto-slide with useEffect
	useEffect(() => {
		const timer = setInterval(() => {
			nextSlide();
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer); // Cleanup on unmount
	}, [nextSlide]);

	return (
		<div className="relative overflow-hidden">
			{/* Full-width slider container with responsive height */}
			<div 
				className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{/* All slides with positioning */}
				{slides.map((slide, idx) => (
					<div
						key={idx}
						className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
							idx === currentIndex 
								? 'opacity-100 z-10 translate-x-0' 
								: idx === (currentIndex + 1) % slides.length 
								? 'opacity-0 z-0 translate-x-full' 
								: 'opacity-0 z-0 -translate-x-full'
						}`}
					>
						{/* Background image */}
						<div 
							className="absolute inset-0 w-full h-full bg-cover bg-center"
							style={{ backgroundImage: `url(${slide.image})` }}
						/>
						
						{/* Dark overlay */}
						<div className="absolute inset-0 bg-black bg-opacity-40" />
						
						{/* Content */}
						<div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-20">
							<div className="max-w-3xl text-center">
								<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 
									transform transition-all duration-700 delay-100 
									translate-y-0 opacity-100
									scale-100"
								>
									{slide.title}
								</h2>
								<p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8 max-w-xl mx-auto
									transform transition-all duration-700 delay-300
									translate-y-0 opacity-100"
								>
									{slide.subtitle}
								</p>
								<button className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-md font-medium
									transition-all duration-300 transform hover:scale-105"
								>
									Koleksiyonu Gör
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Navigation Buttons - responsive sizing */}
			<button 
				className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white
				p-2 sm:p-3 rounded-full z-20 hover:bg-white/30 transition-colors shadow-lg hover:scale-110 transition-transform"
				onClick={prevSlide}
				aria-label="Previous slide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<button 
				className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white
				p-2 sm:p-3 rounded-full z-20 hover:bg-white/30 transition-colors shadow-lg hover:scale-110 transition-transform"
				onClick={nextSlide}
				aria-label="Next slide"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
				</svg>
			</button>

			{/* Indicators - responsive sizing and positioning */}
			<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
				{slides.map((_, idx) => (
					<button
						key={idx}
						className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
							idx === currentIndex 
								? 'bg-white scale-125 w-6 sm:w-8' 
								: 'bg-white/40 hover:bg-white/60'
						}`}
						onClick={() => {
							if (!isTransitioning) {
								setIsTransitioning(true);
								setCurrentIndex(idx);
								setTimeout(() => {
									setIsTransitioning(false);
								}, 500);
							}
						}}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	);
} 