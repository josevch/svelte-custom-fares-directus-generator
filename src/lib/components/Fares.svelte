<svelte:options customElement="custom-fare" />
<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { onMount } from 'svelte';
 	import { getTypography } from '$lib/foundations/typography';
	import getDirectusInstance from '$lib/directus';
	import { readItems } from '@directus/sdk';
  	import calendarIcon from '$lib/assets/icons/calendar-icon.svg'

	let isLoading = true;
	let error: string | null = null;
	let fares: Fares[] = [];

	export let lang = 'es';
	export let country = 'gs';
	export let campaign = '24 Hours Sale';

	const destinationQuery = [
		{ country: [{ translations: ['name'] }] },
		'iata_code',
		'main_image',
		{
			categories: [
				{
					destination_category_id: [
						{
							translations: ['name']
						}
					]
				}
			]
		},
		{ translations: ['name'] }
	];
	
	const conversionQuery = [
		'rate',
		'currency',
	];

	const translationFilter = {
		translations: {
			_filter: {
				languages_code: {
					_eq: lang
				}
			}
		}
	};

	const countryFilter = (storefront: string) => {
		const validStorefronts = ['pa', 'us', 'br', 'ar', 'mx', 'ca', 'co', 'cl', 'cr', 'gs'];

		if (!validStorefronts.includes(storefront) || storefront === 'gs')
			return { _nin: validStorefronts.filter((sf) => sf !== 'gs').map((sf) => sf.toUpperCase()) };
		return { _eq: storefront.toUpperCase() };
	};

	const query = {
		fields: [
			{ origin: destinationQuery },
			{ destination: destinationQuery },
			'departure',
			'return',
			'price',
			'price_before',
			'taxes',
		],
		filter: {
			_and: [
				{
					campaign: {
						_eq: campaign
					}
				},
				{
					origin: {
						country: countryFilter(country)
					}
				}
			]
		},
		deep: {
			origin: {
				categories: {
					destination_category_id: translationFilter
				},
				...translationFilter,
				country: translationFilter,

			},
			destination: {
				categories: {
					destination_category_id: translationFilter
				},
				...translationFilter,
				country: translationFilter
			},
			
		}
	};

	const directus = getDirectusInstance(fetch);


onMount(async () => {
try {
  console.log('Fetching fares...', query);
  console.log('Fetching destinations...');

  // El fetch Directus pap
  const [faresData] = await Promise.all([directus.request(readItems('custom_fare', query))]);
  const [conversionData] = await Promise.all([directus.request(readItems('currency_conversion'))]);

  fares = faresData as Fares[];
  console.log('Fares Data:', faresData);

  conversions = [conversionData]


} catch (err) {
  error = 'No hay tarifas.';
  console.error(err);
} finally {
  isLoading = false;
}
});

	function formatDateShort(date: string, lang: string): string {
		const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
		const locale = lang === 'es' ? 'es-419' : lang === 'en' ? 'en-US' : 'pt-BR';
		// formato encontrado para cambiar la fecha
		return new Date(date).toLocaleDateString(locale, options).replace('.', '');
	}
</script>

<div class="container mx-auto py-24">
	{#if isLoading}
	<ol
	class="skeleton-loader grid justify-center gap-3"
	style="grid-template-columns: repeat(auto-fit, minmax(399px, 392px));"
>
	{#each Array(6) as _}
		<div class="custom-fares h-full w-full max-w-[400px]">
			<div
				class="grid h-40 grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] overflow-hidden rounded-2xl outline outline-1 outline-grey-300"
			>
				<div
					class="col-start-1 col-end-3 row-span-full h-full w-full bg-grey-300 object-cover"
				></div>

				<div class="col-start-3 col-end-3 row-start-2 row-end-2 mx-2 mb-2 flex flex-col gap-1">
					<div class="h-6 rounded-2xl bg-grey-300"></div>
					<div class="mt-3 h-3 max-w-40 rounded-2xl bg-grey-300"></div>
					<div class="mt-0.5 h-3 max-w-24 rounded-2xl bg-grey-300"></div>
				</div>
			</div>
		</div>
	{/each}
</ol>
	{:else if error}
		<p>{error}</p>
	{:else if fares.length > 0}
		<ol
			class="grid justify-center gap-3"
			style="grid-template-columns: repeat(auto-fit, minmax(399px, 392px))">
			{#each fares as fare}
				<li class="custom-fares h-full w-full max-w-[400px]">
					<a class="grid grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] overflow-hidden rounded-2xl outline outline-1 outline-grey-300 hover:outline-2 hover:outline-primary-ultralight focus:outline-2 focus:outline-primary-ultralight"
						href="https://shopping.copaair.com/?roundtrip=true&adults=1&children=0&infants=0&sf={country}&langid={lang}&date1={fare.departure}&date2={fare.return}&promocode=&area1={fare.origin.iata_code}&area2={fare.destination.iata_code}&advanced_air_search=false&flexible_dates_v2=false&origin=EM"
						role="button"
						data-oac={fare.origin.iata_code}
						data-dac={fare.destination.iata_code}
						data-departure-date={fare.departure}
						data-return-date={fare.return}
						data-price={`USD ${fare.price}`}>

						<img
						class="col-start-1 col-end-3 row-span-full h-full w-full object-cover"
						loading="lazy"
						src="https://cm-marketing.directus.app/assets/{fare.destination
						  .main_image}?access_token=td20Cl6zJ-deTLVDB8VgHS6ZGwBrmF6q&format=auto&width=124&height=168"
						alt={fare.destination}
						/>
         
						<span class="col-start-3 col-end-3 row-start-2 row-end-2 mx-2 mb-2 flex flex-col gap-1">
							<span
								class={getTypography(
									'caption',
									'h4',
									'flex h-auto flex-col font-gilroy text-primary '
								)}>
								<span>
									{fare.origin.translations[0].name} ({fare.origin.iata_code})
									{lang === 'es' ? ' a' : lang === 'en' ? ' to' : ' para'}
								</span>
								<span>
									{fare.destination.translations[0].name} ({fare.destination.iata_code})
								</span>
							</span>
							<span class="flex h-auto items-center gap-2">
								<img src={calendarIcon} class="h-[10.3px] w-[11.6px]" alt="date" />
								<span class={getTypography('body-small')}>
									{lang === 'es'
										? ' Ida y Vuelta'
										: lang === 'en'
											? ' Roundtrip'
											: ' Ida e volta'}<br />{formatDateShort(fare.departure, lang)} - {formatDateShort(
										fare.return,
										lang
									)}
								</span>
							</span>
						</span>
						<span class="col-start-3 col-end-3 row-start-3 row-end-3 mx-2 mt-2">
							<span class="flex grid-rows-subgrid flex-col items-end">
								{#if fare.price_before}
									<span
										class={getTypography(
											'body',
											undefined,
											'self-end font-suisse text-grey-600 line-through'
										)}
									>
										USD {Math.round(fare.price_before)}
									</span>
								{/if}
								<span class="gap-y-2">
									<span class={getTypography('body-small')}>
										{lang === 'es' ? 'desde' : lang === 'en' ? 'from' : 'de'}
										<span
											class={getTypography(
												'caption-tiny',
												'h2',
												'font-gilroy font-bold text-primary lg:text-u1 '
											)}
										>
											USD {Math.round(fare.price)}<sup>*</sup>
										</span>
									</span>
								</span>
							</span>
							{#if fare.taxes}
								<p class={getTypography('body-small')}>
									<strong>{lang === 'es' ? 'Impuestos incluidos de' : lang === 'en' ? 'Taxes included' : 'Impostos incluídos em'}</strong> ${fare.taxes}
								</p>
							{/if}
						</span>
					</a>
				</li>
			{/each}
		</ol>
	{:else}
		<p></p>
	{/if}
</div>
