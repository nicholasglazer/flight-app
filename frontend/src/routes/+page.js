import {error} from '@sveltejs/kit';

export async function load({fetch}) {
  try {
    const response = await fetch('http://localhost:3000/api/flights');
    const flights = await response.json();
    return {flights};
  } catch (err) {
    console.error('Error in blog/+layout.js: ', err);
    throw error(404, 'Ooops, Something went wrong...' + err);
  }
}
