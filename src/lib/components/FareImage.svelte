<script lang="ts">
  export let fare;
  export let destinations; 

  function getImageForDestination(destinationCode: any) {
    const destination = destinations.find(dest => dest.iata_code === destinationCode);
    return destination ? destination.main_image : null;
  }
</script>

<img
  class="w-full h-full col-start-1 col-end-3 row-span-full object-cover"
  loading="lazy"
  src={`https://cm-marketing.directus.app/assets/${getImageForDestination(fare.destination)}?access_token=td20Cl6zJ-deTLVDB8VgHS6ZGwBrmF6q&format=auto&width=124&height=168`}
  alt={fare.destination}
/>
