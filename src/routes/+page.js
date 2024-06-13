/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	let info = {};
	info = await (await fetch('/api/war')).json();
	return { info };
}