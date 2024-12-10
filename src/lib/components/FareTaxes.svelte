<script>
    import { getTypography } from "$lib/foundations/typography";
    export let fare;
</script>

<span class={getTypography('body-small')}>
    {#if fare.taxes}
      <p><strong>Impuestos incluidos de</strong> {fare.taxes}</p>
    {/if}
  </span>