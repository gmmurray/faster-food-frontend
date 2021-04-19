<script lang="ts">
  import { onMount } from 'svelte';

  import type { RestaurantModel } from '../models/RestaurantModel';

  // props
  export let finalRestaurant: RestaurantModel;

  //state
  let error: string | null = null;

  onMount(() => {
    if (!finalRestaurant) {
      error = 'There was an error retrieving your selected restaurant';
    }
  });
</script>

<div>
  <h3>Result</h3>
  {#if finalRestaurant}
    <ul>
      <li>{finalRestaurant.name}</li>
      <li>{finalRestaurant.address}</li>
      <li>{finalRestaurant.city}</li>
      <li>{finalRestaurant.postalCode}</li>
      <li>{finalRestaurant.state}</li>
      <li>{finalRestaurant.deliveryUrl}</li>
    </ul>
  {/if}
  {#if error}
    {error}
  {/if}
</div>
