<script lang="ts">
  import { onMount } from 'svelte';
  import { getRestaurants } from '../api';
  import type { RestaurantModel } from '../models/RestaurantModel';

  import type { RestaurantRequest } from '../types/apiTypes';
  import { selectRandom } from '../utilities/selectRandom';
  import { validRestaurantRequest } from '../utilities/validateRequest';

  // props
  export let requestParams: RestaurantRequest = null;
  export let selectedRestaurants: RestaurantModel[] = [];
  export let loading: boolean = true;

  // state
  let restaurants: RestaurantModel[] = [];
  let error: string | null = null;

  const retrieveRestaurants = async (body: RestaurantRequest) => {
    try {
      error = null;
      loading = true;
      const res = await getRestaurants(body);
      restaurants = res.data;
    } catch (err) {
      console.log(err);
      error = err[0].message;
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!restaurants?.length) {
      loading = true;
      if (validRestaurantRequest(requestParams)) {
        await retrieveRestaurants(requestParams);
      } else {
        error = 'There was an error getting available restaurants.';
        loading = false;
      }
    } else {
      loading = false;
    }

    if (selectedRestaurants.length) {
      restaurants.forEach(
        r => (r.selected = selectedRestaurants.some(s => s.id === r.id)),
      );
    }
  });

  const handleSelect = (restaurant: RestaurantModel) => {
    console.log(restaurant);
    if (!restaurant.selected && selectedRestaurants.length === 3) {
      error = 'You can only select 3 restaurants';
      return;
    }

    error = null;
    restaurant.selected = !restaurant.selected;
    selectedRestaurants = restaurants.filter(r => r.selected);
  };

  const handleSelectRandom = () => {
    const randomRestaurants = selectRandom(restaurants, 3);
    restaurants.forEach(
      r => (r.selected = randomRestaurants.some(rand => r.id === rand.id)),
    );
    selectedRestaurants = restaurants.filter(c => c.selected);
  };
</script>

<div>
  <h3>Select three restaurants</h3>
  <button on:click={handleSelectRandom}>Random</button>
  {#if error}
    {error}
  {/if}
  <ol>
    {#each selectedRestaurants as restaurant}
      <li>{restaurant.name}</li>
    {/each}
  </ol>
  {#if loading}
    loading...
  {:else}
    <ul>
      {#each restaurants as restaurant}
        <li on:click={() => handleSelect(restaurant)}>{restaurant.name}</li>
      {/each}
    </ul>
  {/if}
</div>
