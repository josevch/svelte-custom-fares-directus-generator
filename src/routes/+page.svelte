<script>
	/** @type {import('./$types').PageData} */
    import { getTypography } from '$lib/foundations/typography';
    import { Select } from 'bits-ui';
    import getDirectusInstance from '$lib/directus';
    import { readItems } from '@directus/sdk';

    const directus = getDirectusInstance(fetch);
    const fareRequest = directus.request(readItems('custom_fare', {fields:["*"]}))
    const cityNames = directus.request(readItems('destinations', {fields:["*"]}))

</script>



{#await cityNames}
    <div>Loading...</div>
{:then cities}
    {#if cities.length > 0}
        {#each cities as city}
          {JSON.stringify(city)}
        {/each}
    {:else}
        <p>No cities found.</p>
    {/if}
{:catch error}
    <p>Error: {error.toString()}</p>
{/await}




<div class="container mx-auto">
    
    <Select.Root >
        <Select.Trigger id="idForSelect" data-filter-by="data-oac" class="mb-8 w-[300px] font-gilroy bg-primary text-white shadow-lg">
        <Select.Value placeholder="Selecciona un destino a donde volar" />
        </Select.Trigger>
        <Select.Content class="bg-white">
        <Select.Group>
            <Select.Label class="font-gilroy">Todos los destinos</Select.Label>
            {#each destinations as Destination}
            <Select.Item class="font-gilroy " value={Destination.value} label={Destination.label}
                >{Destination.label}</Select.Item >
            {/each}
        </Select.Group>
        </Select.Content>
        <Select.Input name="favoriteFruit" />
    </Select.Root>
 

    

    

{#await fareRequest}
    <div class="">loading</div>
    {:then fares } 
    {#if fares.length > 0}
    <ol class="grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px,392px));" >
        {#each fares as fare}
        
            <li class="custom-fares w-full max-w-[400px] h-full">
                <a class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"  href="https://www.shopping.copaair.com/" role="button" data-oac="STI" data-dac="PTY" data-departure-date="2024-10-10" data-price="USD 383" data-return-date="2024-10-17" data-title="Santiago de los Caballeros a Panamá" data-sub="Itinerario: Ago 15, 2024 - Nov 30, 2024" data-promo-code="" data-site-edition="es" data-currency-code="USD">
                        <img class="w-full h-full col-start-1 col-end-3 row-span-full object-cover" loading="lazy" src="https://www.copaair.com/promotions/airtrfx-lp/panama-increible/PTY-11-264x400.jpg " alt="Panamá" >
                        <span class="mx-2 mb-2  col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
                            <span class={getTypography('caption','h4','flex flex-col font-gilroy text-primary h-auto ')}>
                                <span class="">{fare.origin} ({fare.origin}) a</span>
                                    <span class="">{fare.destination} ({fare.origin})</span>
                            </span>
                            <span class="flex h-auto items-center gap-2">
                                <img src="https://www.copaair.com/promotions/destinations/icons/calendar-icon.svg" class="h-[10.3px] w-[11.6px]" alt="date">
                                <span class={getTypography('body-small')} >
                                    Ida y vuelta<br>{fare.departure} - {fare.return}
                                </span>
                            </span>
                        </span>
                        <span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3 ">
                            <span class="flex flex-col items-end grid-rows-subgrid">
                                <span class={getTypography('body',undefined,'font-suisse  text-grey-600 line-through self-end')}>USD {Math.round(fare.price_before)}</span>
                            
                                        <span class="gap-y-2">
                                            <span class={getTypography('body-small')}>desde <span class={getTypography('caption-tiny','h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>COP {Math.round(fare.price)}<sup>*</sup></span>
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
        <p>No fares available</p>
    {/if}
    {:catch error}
    {error.toString()}
    

{/await}

</div>




