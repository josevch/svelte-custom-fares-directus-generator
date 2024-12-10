<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
	import { getTypography } from '$lib/foundations/typography';
	import getDirectusInstance from '$lib/directus';
	import { readItems } from '@directus/sdk';
	import Fares from '$lib/components/Fares.svelte';


	type Fare = {
	  origin: string;
	  destination: string;
	  departure: string;
	  return: string;
	  price: number;
	  country: string;
	  price_before?: number;
	  taxes?: number;
	};
  
	type Destination = {
	  id: string;
	  name: string;
	  iata_code: string; 
	  main_image: string;
	};
  
	type Translations = {
	  id: string;
	  name: string;
	  destinations_iata_code: string;
	};
	
	let fares: Fare[] = [];
	let destinations: Destination[] = [];
	let translations: Translations[] = [];
	let isLoading = true;
	let error: string | null = null;

	const directus = getDirectusInstance(fetch);

  
	onMount(async () => {
	  try {
		console.log('Fetching fares...');
		console.log('Fetching destinations...');
		
		// El fetch Directus pap
		const [faresData, destinationsData] = await Promise.all([
		  directus.request(readItems('custom_fare', { fields: ['*'] })),
		  directus.request(readItems('destinations', { fields: ['*'] }))
		]);
		
		// Sin limites para translations
		const translationsData = await directus.request(readItems('destinations_translations', { fields: ['*'], limit: -1 }));
  
		fares = faresData as Fare[];
		console.log('Fares Data:', faresData);
		


		destinations = destinationsData as Destination[];
		console.log('Destinations Data:', destinationsData);
  

		translations = translationsData as Translations[];
		console.log('Translations Data:', translationsData);
  
	  } catch (err) {
		error = 'No hay tarifas.';
		console.error(err);
	  } finally {
		isLoading = false;
	  }
	});

	let sf=""
  </script>

 
<div class="container mx-auto py-24">
	{#if isLoading}
	   <ol class="skeleton-loader grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px, 392px));">
		{#each Array(12) as _} 
		<div class=" outline outline-1 rounded-2xl outline-grey-300 shadow p-4 max-w-sm w-full mx-auto h-[168px]">
			<div class="animate-pulse flex space-x-4">
			  <div class="rounded-2xl bg-primary-ultralight  h-32 w-24"></div>
			  <div class="flex-1 flex space-y-6 py-1 flex-col">
				<div class="h-6 bg-primary-ultralight rounded"></div>
				
				<div class="space-y-4">
				<div class="grid grid-cols-3 gap-4">
					<div class="h-2 bg-primary-ultralight rounded col-span-2"></div>
					<div class="h-2 bg-primary-ultralight rounded col-span-1"></div>
				</div>
				<div class="h-2 bg-primary-ultralight rounded"></div>
				<div class="h-6 bg-primary-ultralight rounded"></div>
				</div>
				
			</div>
				
			</div>
		  </div>
		{/each}
	  </ol>
	{:else if error}
	  <p>{error}</p>
	{:else if fares.length > 0 && destinations.length > 0}

	  <ol class="grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px, 392px));">
		
		{#each fares as fare}
		
		<Fares {fare} {destinations} {translations} lang="es" sf=""/>

		{/each}
	  </ol>
	
	  {:else}
	  <p>No fares available.</p>
	{/if}
  </div>

  














<!--
Works ok

<div class="container mx-auto py-24">
	{#if fares.length > 0 && destinations.length > 0}
		<ol class="grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px,392px));">
			{#each fares as fare}
				<li class="custom-fares w-full max-w-[400px] h-full">
					<a class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"
					   href="https://www.shopping.copaair.com/" role="button"
					   data-oac="STI" data-dac="PTY" data-departure-date="2024-10-10"
					   data-price="USD 383" data-return-date="2024-10-17"
					   data-title="Santiago de los Caballeros a Panamá" data-sub="Itinerario: Ago 15, 2024 - Nov 30, 2024"
					   data-promo-code="" data-site-edition="es" data-currency-code="USD">
					
					
					   <FareImage {fare} />
					
					
					
					   <span class="mx-2 mb-2 col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
							<span class={getTypography('caption', 'h4', 'flex flex-col font-gilroy text-primary h-auto ')}>
								<span class="">{fare.origin} ({fare.origin}) a</span>
								<span class="">{fare.destination} ({fare.origin})</span>
							</span>
							<span class="flex h-auto items-center gap-2">
								<img src="https://www.copaair.com/promotions/destinations/icons/calendar-icon.svg"
									 class="h-[10.3px] w-[11.6px]" alt="date">
								<span class={getTypography('body-small')}>
									Ida y vuelta<br>{fare.departure} - {fare.return}
								</span>
							</span>
						</span>
						<span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3">
							<span class="flex flex-col items-end grid-rows-subgrid">
								<span class={getTypography('body', undefined, 'font-suisse text-grey-600 line-through self-end')}>
									USD {Math.round(fare.price_before)}
								</span>
								<span class="gap-y-2">
									<span class={getTypography('body-small')}>desde <span
											class={getTypography('caption-tiny', 'h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>
										COP {Math.round(fare.price)}<sup>*</sup></span>
									</span>
								</span>
							</span>
							<span class={getTypography('body-small')}>
								{#if fare.taxes}
									<p><strong>Impuestos incluidos de</strong> ${fare.taxes}</p>
								{/if}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ol>
	{:else}
		<p>Loading fares and destinations...</p>
	{/if}
</div>



<div class="container mx-auto py-24">
	{#if fares}
		<ol class="grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px, 392px))">
			{#each fares as fare}
			<li class="custom-fares w-full max-w-[400px] h-full">
				<Fares {fare} />
			</li>
			{/each}
		</ol>
	{:else}
	<p>Loading fares and destinations...</p>
	{/if}
</div>-->