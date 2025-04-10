import { client } from "@/app/sanity/client"; // Import your configured Sanity client
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Create the image URL builder instance
const imageBuilder = createImageUrlBuilder(client);

/**
 * Generates image URLs for Sanity image assets.
 * @param source - The Sanity image source object.
 * @returns An image URL builder instance.
 * @example urlForImage(sanityImageObject).width(200).url()
 */
export const urlForImage = (source: SanityImageSource) => {
	return imageBuilder.image(source);
};
