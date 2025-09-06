import { error } from "@sveltejs/kit"
import { authorise } from "$lib/server/auth"
import { db, Record } from "$lib/server/surreal"
import readQuery from "./read.surql"
import readAllQuery from "./readAll.surql"

export async function load({ locals }) {
	const { user } = await authorise(locals)

	await db.query(readAllQuery, {
		user: Record("user", user.id),
	})
}

export const actions: import("./$types").Actions = {}
actions.default = async ({ locals, url }) => {
	const { user } = await authorise(locals)
	const id = url.searchParams.get("s")
	if (!id) error(400)

	try {
		await db.query(readQuery, {
			notification: Record("notification", id),
			user: Record("user", user.id),
		})
	} catch {
		error(400)
	}
}
