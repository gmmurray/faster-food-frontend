<script lang="ts">
  import { onMount } from 'svelte';

  import { getCategories } from '../api';

  import type { CategoryModel } from '../models/CategoryModel';
  import { selectRandom } from '../utilities/selectRandom';

  //props
  export let selectedCategories: CategoryModel[] = [];
  export let loading: boolean = true;

  //state
  let categories: CategoryModel[] = [];
  let error: string | null = null;

  const retrieveCategories = async () => {
    try {
      error = null;
      loading = true;
      const res = await getCategories();
      categories = res.data;
    } catch (err) {
      error = err;
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!categories?.length) {
      loading = true;
      await retrieveCategories();
    } else {
      loading = false;
    }
  });

  const handleSelect = (category: CategoryModel) => {
    if (!category.selected && selectedCategories.length === 5) {
      error = 'You can only select 5 categories';
      return;
    }
    error = null;
    category.selected = !category.selected;
    selectedCategories = categories.filter(c => c.selected);
  };

  const handleSelectRandom = () => {
    const randomCategories = selectRandom(categories, 5);

    categories.forEach(
      c => (c.selected = randomCategories.some(r => r.id === c.id)),
    );
    selectedCategories = categories.filter(c => c.selected);
  };
</script>

<div>
  <div class="pm-text-center">
    <h3>Select five categories</h3>
    <button on:click={handleSelectRandom} class="pm-btn-gradient">Random</button
    >
  </div>
  {#if error}
    {error}
  {/if}
  <ol>
    {#each selectedCategories as category}
      <li>{category.name}</li>
    {/each}
  </ol>
  {#if loading}
    loading...
  {:else}
    {#each categories as category}
      <div on:click={() => handleSelect(category)}>{category.name}</div>
    {/each}
  {/if}
</div>
