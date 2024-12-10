<script lang=ts>
    import { getTypography } from "$lib/foundations/typography";
      export let fare;
      export let destinations;
      export let translations;
      export let lang = "es"; 
      import calendarIcon from '$lib/assets/icons/calendar-icon.svg'


      function getTranslatedName(iataCode: string, lang: string) {

  const translationMap = translations.reduce((map, t) => {
    map[t.id] = t.name;
    return map;
  }, {} as { [key: number]: string });

  //console.log("mapa con traducciones pa ve namas", translationMap)

  // Aqui busca en el collection de destinations el objeto con ese iata code
  const destination = destinations.find(dest => dest.iata_code === iataCode);

  if (destination) {
    //Suponiendo que el orden de translations es ES, EN y PT, extrae el id segund el orden del el idioma que que viene del prop
    const translationId = destination.translations[lang === 'es' ? 0 : lang === 'en' ? 1 : 2];
    
      //console.log("Buscando el ID extraido:", translationId);
    
    // Buscando el ID en el map pa que traiga el name
    const translationName = translationMap[translationId];
    
    // Trae el nombre y si no el iata
    if (translationName) {
       // console.log("Traduccion tal encontrada:", translationName);
      return translationName;
    }
  }

  // Fallback si se rompe trae el iataCode mejor
  return iataCode;
}


function formatDateShort(date: string, lang: string): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const locale = lang === 'es' ? 'es-ES' : lang === 'en' ? 'en-US' : 'pt-BR';
    // formato encontrado para cambiar la fecha
    return new Date(date).toLocaleDateString(locale, options).replace('.', ''); 
  }
</script>



<span class="mx-2 mb-2 col-start-3 col-end-3 row-start-2 row-end-2 flex flex-col gap-1">
    <span class={getTypography("caption", "h4", "flex flex-col font-gilroy text-primary h-auto ")}>
      <span>
        {getTranslatedName(fare.origin, lang)} ({fare.origin})
        {lang === "es" ? " a" : lang === "en" ? " to" : " para"}
      </span>
      <span>
        {getTranslatedName(fare.destination, lang)} ({fare.destination})
      </span>
    </span>
    <span class="flex h-auto items-center gap-2">
      <img
        src={calendarIcon}
        class="h-[10.3px] w-[11.6px]"
        alt="date"
      />
      <span class={getTypography("body-small")}>
        {lang === "es" ? " Ida y Vuelta" : lang === "en" ? " Roundtrip" : " Ida e volta"}<br />{formatDateShort(fare.departure, lang)} - {formatDateShort(fare.return, lang)}
      </span>
    </span>
  </span>