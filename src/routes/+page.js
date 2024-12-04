/** @type {import('./$types').PageLoad} */

import getDirectusInstance from '$lib/directus';

import { readItems } from '@directus/sdk';

export async function load({ fetch }) {

	const directus = getDirectusInstance(fetch);
	
	return {
		custom_fare: await directus.request(readItems('custom_fare')),
	};

}