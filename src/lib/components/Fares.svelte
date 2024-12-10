<script lang=ts>

      export let fare;
      export let destinations;
      export let translations;
      import FareImage from '$lib/components/FareImage.svelte';
	    import FareTop from '$lib/components/FareTop.svelte';
	    import FarePrice from '$lib/components/FarePrice.svelte';
      export let lang = "es"; 
        export let sf = ""; // Single filter for the country code
     // console.log("Countries", fare.country)

      function getCountryCode(country: string): string {
         const normalizedCountry = country.trim().toLowerCase();
  // validaciones
  const countryMap: Record<string, string> = {
    "panama": "pa",
    "pa": "pa",
    "panamá": "pa",

    "brazil": "br",
    "br": "br",

    "costa rica": "cr",
    "cr": "cr",

    "colombia": "co",
    "co": "co",

    "chile": "cl",
    "cl": "cl",

    "estados unidos": "us",
    "us": "us",
    "usa": "us",
    "united states": "us",

    "argentina": "ar",
    "ar": "ar",

    "méxico": "ar",
    "mexico": "ar",
    "mx": "ar",

    "canada": "ca",
    "ca": "ca",

  };

  // Return the code if the normalized country exists in the map, otherwise default to "gs"
  return countryMap[normalizedCountry] || "gs";
}

 // Check if the fare.country matches the filter
 $: isVisible = sf === "" || getCountryCode(fare.country) === sf;

  </script>
  
  {#if isVisible}
  <li class="custom-fares w-full max-w-[400px] h-full">
    <a
      class="grid overflow-hidden grid-cols-[8px_116px_auto_8px] grid-rows-[8px_auto_auto_8px] outline outline-1 rounded-2xl outline-grey-300 hover:outline-primary-ultralight focus:outline-2 hover:outline-2 focus:outline-primary-ultralight"
      href="https://shopping.copaair.com/?roundtrip=true&adults=1&children=0&infants=0&sf={getCountryCode(fare.country)}&langid={lang}&date1={fare.departure}&date2={fare.return}&promocode=&area1={fare.origin}&area2={fare.destination}&advanced_air_search=false&flexible_dates_v2=false&origin=EM"
      role="button"
      data-oac={fare.origin}
      data-dac={fare.destination}
      data-departure-date={fare.departure}
      data-return-date={fare.return}
      data-price={`USD ${fare.price}`}>
      <FareImage {fare} {destinations} />
      <FareTop {fare} {destinations} {translations} {lang} />
      <FarePrice {fare} {lang} />
    </a>
  </li>
  {/if}