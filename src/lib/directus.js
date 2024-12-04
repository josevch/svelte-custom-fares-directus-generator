import { createDirectus, rest, registerUserVerify } from '@directus/sdk';
import { readItems, readItem, updateItem, updateUser, createItem, deleteItem } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';

function getDirectusInstance(fetch) {
  const options = fetch ? { globals: { fetch } } : {};
	
  const directus = createDirectus(PUBLIC_APIURL, options ).with(rest());

  const result = await directus.request(registerUserVerify('td20Cl6zJ-deTLVDB8VgHS6ZGwBrmF6q'));

	
  return result;
}

export default getDirectusInstance;


import { createDirectus, authentication, rest, refresh } from '@directus/sdk';

const client = createDirectus('https://cm-marketing.directus.app').with(authentication()).with(rest());

// refresh using the authentication composable
const result = await client.refresh();

// refresh http request using a cookie
const result = await client.request(refresh('cookie'));

// refresh http request using json
const result = await client.request(refresh('json', 'gmPd...8wuB'));