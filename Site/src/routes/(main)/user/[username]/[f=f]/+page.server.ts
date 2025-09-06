// The friends, followers, and following pages for a user.

import { error } from "@sveltejs/kit"
import { db, type RecordId } from "$lib/server/surreal"
import followersQuery from "./followers.surql"
import followingQuery from "./following.surql"
import friendsQuery from "./friends.surql"
import userQuery from "./user.surql"

// "$id->friends->user OR $id<-friends<-user" doesn't work
// "$id<->friends<->user" shows yourself in the list (twice)
const queries = Object.freeze({
	friends: friendsQuery,
	followers: followersQuery,
	following: followingQuery,
})

export async function load({ params }) {
	const type = params.f as keyof typeof queries
	const [[user]] = await db.query<{ id: RecordId<"user"> }[][]>(
		userQuery,
		params
	)
	if (!user) error(404, "Not Found")

	const [users, count] = await db.query<BasicUser[][]>(queries[type], user)

	return {
		...params,
		f: params.f as keyof typeof queries,
		users,
		count,
	}
}
