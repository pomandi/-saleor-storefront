import NextImage, { type ImageProps } from "next/image";

export const ProductImageWrapper = ({ src, ...props }: ImageProps) => {
	// Convert localhost to 127.0.0.1 (optional, depends if needed for local dev)
	const imageUrl = typeof src === 'string' ? src.replace('localhost', '127.0.0.1') : src;

	// Directly return NextImage without the wrapper div and absolute classes
	return (
		<NextImage
			{...props}
			src={imageUrl}
			// Removed absolute inset-0. Kept object-contain and sizing classes.
			// Added h-full w-full to try and fill the relative parent.
			className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
		/>
	);
};
