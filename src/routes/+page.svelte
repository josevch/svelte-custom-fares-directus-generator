<script lang="ts">
    	import { getTypography } from "$lib/foundations/typography";
        import * as Select from "$lib/components/ui/select/index.js";

        const destinations = [
 
{value: 'SAL', label: 'SAL'},
{value: 'CUN', label: 'CUN'},
{value: 'SJO', label: 'SJO'},
{value: 'XPL', label: 'XPL'},
{value: 'AUA', label: 'AUA'},
{value: 'PUJ', label: 'PUJ'}

  ];
/** @type {import('./$types').PageData} */
export let data;
</script>

<p>{data.customFare}</p>


<div class="container mx-auto py-8 ">
    <div class="grid grid-cols-12 grid-rows-2 !pb-8 ">
        
    </div>
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


<ol class="grid gap-3 justify-center" style="grid-template-columns: repeat(auto-fit, minmax(399px,392px));" >

<li class="custom-fares w-full max-w-[400px] h-full">
    <a class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"  href="https://www.shopping.copaair.com/" role="button" data-oac="STI" data-dac="PTY" data-departure-date="2024-10-10" data-price="USD 383" data-return-date="2024-10-17" data-title="Santiago de los Caballeros a Panamá" data-sub="Itinerario: Ago 15, 2024 - Nov 30, 2024" data-promo-code="" data-site-edition="es" data-currency-code="USD">
            <img class="w-full h-full col-start-1 col-end-3 row-span-full object-cover" loading="lazy" src="https://www.copaair.com/promotions/airtrfx-lp/panama-increible/PTY-11-264x400.jpg " alt="Panamá" >
            <span class="mx-2 mb-2  col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
                <span class={getTypography('caption','h4','flex flex-col font-gilroy text-primary h-auto ')}>
                    <span class="">Santiago de los Caballeros (STI) a</span>
                        <span class="">Comayagua, Tegucigalpa (XPL)</span>
                </span>
                <span class="flex h-auto items-center gap-2">
                    <img src="https://www.copaair.com/promotions/destinations/icons/calendar-icon.svg" class="h-[10.3px] w-[11.6px]" alt="date">
                    <span class={getTypography('body-small')} >
                        Ida y vuelta<br>Ago 15, 2024 - Nov 30, 2024
                    </span>
                </span>
            </span>
            <span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3 ">
                <span class="flex flex-col items-end grid-rows-subgrid">
                    <span class={getTypography('body',undefined,'font-suisse  text-grey-600 line-through self-end')}>USD 287</span>
                
                            <span class="gap-y-2">
                                <span class={getTypography('body-small')}>desde <span class={getTypography('caption-tiny','h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>COP 1.000.249<sup>*</sup></span>
                            </span>
                </span>
                <span class={getTypography('body-small')}>Impuestos incluidos de COP 1.032.432 </span>
            </span>
    </a>
</li>

<li class="custom-fares w-full max-w-[400px] h-full">
    <a class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"  href="https://www.shopping.copaair.com/" role="button" data-oac="STI" data-dac="PTY" data-departure-date="2024-10-10" data-price="USD 383" data-return-date="2024-10-17" data-title="Santiago de los Caballeros a Panamá" data-sub="Itinerario: Ago 15, 2024 - Nov 30, 2024" data-promo-code="" data-site-edition="es" data-currency-code="USD">
            <img class="w-full h-full col-start-1 col-end-3 row-span-full object-cover" loading="lazy" src="https://www.copaair.com/promotions/airtrfx-lp/panama-increible/PTY-11-264x400.jpg " alt="Panamá" >
            <span class="mx-2 mb-2  col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
                <span class={getTypography('caption','h4','flex flex-col font-gilroy text-primary h-auto ')}>
                    <span class="">Santiago de los Caballeros (STI) a</span>
                        <span class="">Comayagua, Tegucigalpa (XPL)</span>
                </span>
                <span class="flex h-auto items-center gap-2">
                    <img src="https://www.copaair.com/promotions/destinations/icons/calendar-icon.svg" class="h-[10.3px] w-[11.6px]" alt="date">
                    <span class={getTypography('body-small')} >
                        Ida y vuelta<br>Ago 15, 2024 - Nov 30, 2024
                    </span>
                </span>
            </span>
            <span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3 ">
                <span class="flex flex-col items-end grid-rows-subgrid">
                    <span class={getTypography('body',undefined,'font-suisse  text-grey-600 line-through self-end')}>USD 287</span>
                
                            <span class="gap-y-2">
                                <span class={getTypography('body-small')}>desde <span class={getTypography('caption-tiny','h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>COP 1.000.249<sup>*</sup></span>
                            </span>
                </span>
                <span class={getTypography('body-small')}>Impuestos incluidos de COP 1.032.432 </span>
            </span>
    </a>
</li>


<li class="custom-fares w-full max-w-[400px] h-full">
    <a class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"  href="https://www.shopping.copaair.com/" role="button" data-oac="STI" data-dac="PTY" data-departure-date="2024-10-10" data-price="USD 383" data-return-date="2024-10-17" data-title="Santiago de los Caballeros a Panamá" data-sub="Itinerario: Ago 15, 2024 - Nov 30, 2024" data-promo-code="" data-site-edition="es" data-currency-code="USD">
            <img class="w-full h-full col-start-1 col-end-3 row-span-full object-cover" loading="lazy" src="https://www.copaair.com/promotions/airtrfx-lp/panama-increible/PTY-11-264x400.jpg " alt="Panamá" >
            <span class="mx-2 mb-2  col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
                <span class={getTypography('caption','h4','flex flex-col font-gilroy text-primary h-auto ')}>
                    <span class="">Santiago de los Caballeros (STI) a</span>
                        <span class="">Comayagua, Tegucigalpa (XPL)</span>
                </span>
                <span class="flex h-auto items-center gap-2">
                    <img src="https://www.copaair.com/promotions/destinations/icons/calendar-icon.svg" class="h-[10.3px] w-[11.6px]" alt="date">
                    <span class={getTypography('body-small')} >
                        Ida y vuelta<br>Ago 15, 2024 - Nov 30, 2024
                    </span>
                </span>
            </span>
            <span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3 ">
                <span class="flex flex-col items-end grid-rows-subgrid">
                    <span class={getTypography('body',undefined,'font-suisse  text-grey-600 line-through self-end')}>USD 287</span>
                
                            <span class="gap-y-2">
                                <span class={getTypography('body-small')}>desde <span class={getTypography('caption-tiny','h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>COP 1.000.249<sup>*</sup></span>
                            </span>
                </span>
                <span class={getTypography('body-small')}>Impuestos incluidos de COP 1.032.432 </span>
            </span>
    </a>
</li>

</ol>

<div class="text-center mx-auto flex justify-center pt-4">
<button  id="atlantaholderpaginator" class={getTypography('body','body','min-w-[4.563rem] max-h-[5rem] flex items-center justify-center text-center outline-offset-4 outline-2 border active:outline focus:outline disabled:cursor-not-allowed disabled:outline-0 px-4 py-[0.625rem] rounded-[2.5rem] gap-1 text-d1 *:max-h-5 bg-primary text-common-white outline-primary border-primary hover:bg-primary-ultradark active:bg-primary focus:bg-primary-ultradark disabled:text-grey-500 disabled:bg-grey-100')}>Ver más</button>
</div>
<p class={getTypography('body','body','text-grey-600 text-center pt-4')} >
*Aplican restricciones, consulte nuestros 
<a href="https://www.copaair.com/es/vuelos-terminos-y-condiciones" target="_blank" rel="noopener"><span class={getTypography('body','body','text-primary hover:!underline')}>T&eacute;rminos y condiciones</span>
</a>.</p>

</div>
