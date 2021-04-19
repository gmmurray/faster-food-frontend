<script lang="ts">
  import type { RestaurantModel } from '../models/RestaurantModel';

  // props
  export let selectedRestaurants: RestaurantModel[] = [];
  export let finalRestaurant: RestaurantModel = null;

  // state
  let error: string | null = null;

  const handleSelect = (restaurant: RestaurantModel) => {
    finalRestaurant = restaurant;
  };
</script>

<div>
  <h3>Select winning restaurant</h3>
  {#if error}
    {error}
  {/if}
  {#if finalRestaurant !== null}
    <p>Final restaurant: {finalRestaurant.name}</p>
  {/if}
  <ul>
    {#each selectedRestaurants as restaurant}
      <li on:click={() => handleSelect(restaurant)}>{restaurant.name}</li>
    {/each}
  </ul>
</div>
