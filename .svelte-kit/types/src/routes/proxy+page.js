// @ts-nocheck
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }) {
	let info = {};
	info = await (await fetch('/api/war')).json();
	return { info };
}