<script>
    import { getTypography } from "$lib/foundations/typography";
    import FareTaxes from "./FareTaxes.svelte";
    export let fare;
    export let lang = "es"; 
</script>


<span class="mx-2 mt-2 col-start-3 col-end-3 row-start-3 row-end-3">
  <span class="flex flex-col items-end grid-rows-subgrid">
    {#if fare.price_before}
    <span class={getTypography('body', undefined, 'font-suisse text-grey-600 line-through self-end')}>
      USD {Math.round(fare.price_before)}
    </span>
    {/if}
    <span class="gap-y-2">
    <span class={getTypography('body-small')}>
      {lang === "es" ? "desde" : lang === "en" ? "from" : "de"} <span class={getTypography('caption-tiny', 'h2', 'font-gilroy font-bold text-primary lg:text-u1 ')}>
      USD {Math.round(fare.price)}<sup>*</sup>
      </span>
    </span>
    </span>
  </span>
  {#if fare.taxes}
    <p class={getTypography('body-small')}><strong>Impuestos incluidos de</strong> ${fare.taxes}</p>
  {/if}
  </span>