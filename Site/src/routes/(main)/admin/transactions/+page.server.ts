import { error } from "@sveltejs/kit"
import { authorise } from "$lib/server/auth"
import {
	getAdminTransactions,
	transformTransactions,
} from "$lib/server/economy"

export async function load({ locals }) {
	await authorise(locals, 5)

	const transactions = await getAdminTransactions()
	if (!transactions.ok) error(500, "Failed to fetch transactions")

	return transformTransactions(transactions.value)
}
