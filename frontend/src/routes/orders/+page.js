import {error} from '@sveltejs/kit';

export async function load({fetch}) {
 try {
  const response = await fetch('http://localhost:3000/api/orders');
  const orders = await response.json();
   return {orders};
 } catch (err) {
  console.error('Error in blog/+layout.js: ', err);
  throw error(404, 'Ooops, Something went wrong...' + err);
 }
}
