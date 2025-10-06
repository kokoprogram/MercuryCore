import sharp, { type ResizeOptions } from "sharp"

/**
 * Creates an image asset based off a file object
 * @param file A File object for the image to save
 * @param sharpOptions Extra options to pass to sharp
 * @returns A function that saves the image to ../data/assets
 * @example
 * const save = await imageAsset(image)
 * const id = // Load from database
 * save(id)
 */
export async function imageAsset(file: File, sharpOptions?: ResizeOptions) {
	const { buffer } = await sharp(await file.arrayBuffer())
		.resize(256, 256, {
			fit: "contain",
			...sharpOptions,
		})
		.png()
		.toBuffer()
		.catch(() => {
			throw new Error("Image asset failed to upload")
		})

	return (id: number) => Bun.write(`../data/assets/${id}`, buffer)
}

/**
 * Creates a clothing asset based off a file object
 * @param file A File object for the image to save
 * @param sharpOptions Extra options to pass to sharp
 * @returns A function that saves the image to ../data/assets
 * @example
 * const save = await clothingAsset(image)
 * const id = // Load from database
 * save(id)
 */
export async function clothingAsset(file: File, sharpOptions?: ResizeOptions) {
	const { buffer } = await sharp(await file.arrayBuffer())
		.resize(585, 559, {
			fit: "fill",
			...sharpOptions,
		})
		.png()
		.toBuffer()
		.catch(() => {
			throw new Error("Image asset failed to upload")
		})

	return (id: number) => Bun.write(`../data/assets/${id}`, buffer)
}

/**
 * Creates an image thumbnail based off a file object
 * @param file A File object for the image to save
 * @param sharpOptions Extra options to pass to sharp
 * @returns A function that saves the image to data/assets
 * @example
 * const save = await thumbnail(image)
 * const id = // Load from database
 * save(id)
 */
export async function thumbnail(file: File, sharpOptions?: ResizeOptions) {
	const { buffer } = await sharp(await file.arrayBuffer())
		.resize(420, 420, {
			fit: "fill",
			...sharpOptions,
		})
		.webp() // sorry avif, but webp is just magic (just here)
		.toBuffer()
		.catch(() => {
			throw new Error("Thumbnail failed to upload")
		})

	return (id: number) => Bun.write(`../data/thumbnails/${id}`, buffer)
}

const tShirtOpts = Object.freeze({
	fit: "contain",
	position: "top",
	background: { r: 0, g: 0, b: 0, alpha: 0 },
})

/**
 * Creates an T-Shirt image asset based off a file object
 * @param file A File object for the image to save
 * @returns A function that saves the image to ../data/assets
 * @example
 * const save = await tShirt(image)
 * const id = // Load from database
 * save(id)
 */
export async function tShirt(file: File) {
	const { buffer } = await sharp(await file.arrayBuffer())
		.resize(420, 420, tShirtOpts)
		.png()
		.toBuffer()
		.catch(() => {
			throw new Error("Image asset failed to upload")
		})

	return (id: number) => Bun.write(`../data/assets/${id}`, buffer)
}

/**
 * Creates a T-Shirt thumbnail based off a file object
 * @param file A File object for the image to save
 * @returns A function that saves the image to data/assets
 * @example
 * const save = await tShirtThumbnail(image)
 * const id = // Load from database
 * save(id)
 */
export async function tShirtThumbnail(b: ArrayBuffer) {
	const input = await sharp(b).resize(250, 250, tShirtOpts).toBuffer() // ok
	const { buffer } = await sharp("../Assets/tShirtTemplate.webp")
		.composite([{ input }])
		.avif()
		.toBuffer()
		.catch(() => {
			throw new Error("Thumbnail failed to upload")
		})

	return (id: number) => Bun.write(`../data/thumbnails/${id}`, buffer)
}
