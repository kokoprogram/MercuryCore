export async function GET() {
	const scriptFile = Bun.file("../Corescripts/visit.lua")
	const script = (await scriptFile.text()).replaceAll("_PLACE_ID", "0")

	return new Response(script)
}
