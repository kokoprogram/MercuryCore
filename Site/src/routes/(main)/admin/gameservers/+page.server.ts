import { error } from "@sveltejs/kit"
import { authorise } from "$lib/server/auth"
import { listGameservers } from "$lib/server/orbiter"

export async function load({ locals }) {
	await authorise(locals, 5)

	const gameservers = await listGameservers()
	if (!gameservers.ok) error(500, "Failed to fetch gameservers")

	return {
		gameservers: gameservers.value,
	}
}
