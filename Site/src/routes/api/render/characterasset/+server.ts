import { error } from "@sveltejs/kit"
import { idRegex } from "$lib/paramTests"
import config from "$lib/server/config"

export async function GET({ url }) {
	const id = url.searchParams.get("id")
	if (!id || !idRegex.test(id)) error(400, "Missing id parameter")

	const res = `${config.Domain}/api/render/character;${config.Domain}/asset?id=${id}`
	return new Response(res, {
		headers: {
			Pragma: "no-cache",
			"Cache-Control": "no-cache",
		},
	})
}
