<script lang="ts">
  import type { CategoryModel } from './models/CategoryModel';
  import type { RestaurantModel } from './models/RestaurantModel';
  import { validateWizard } from './utilities/validation';
  import Intro from './wizardSteps/Intro.svelte';
  import Result from './wizardSteps/Result.svelte';
  import SelectCategories from './wizardSteps/SelectCategories.svelte';
  import SelectParameters from './wizardSteps/SelectParameters.svelte';
  import SelectRestaurants from './wizardSteps/SelectRestaurants.svelte';
  import SelectWinner from './wizardSteps/SelectWinner.svelte';

  // constants
  const DEFAULT_SELECTED_CATEGORIES = [];
  const DEFAULT_ZIP_CODE = null;
  const DEFAULT_RESULT_COUNT = null;
  const DEFAULT_SELECTED_RESTAURANTS = [];
  const DEFAULT_FINAL_RESTAURANT = null;

  // state variables
  let fiveSelectedCategories: CategoryModel[] = DEFAULT_SELECTED_CATEGORIES;
  let zipCode: string | null = DEFAULT_ZIP_CODE;
  let resultCount: number | null = DEFAULT_RESULT_COUNT;
  let threeSelectedRestaurants: RestaurantModel[] = DEFAULT_SELECTED_RESTAURANTS;
  let finalRestaurant: RestaurantModel | null = DEFAULT_FINAL_RESTAURANT;
  let currentStep = 0;
  let loading: boolean = false;

  function handleResetClick() {
    currentStep = 0;
    fiveSelectedCategories = DEFAULT_SELECTED_CATEGORIES;
    zipCode = DEFAULT_ZIP_CODE;
    resultCount = DEFAULT_RESULT_COUNT;
    threeSelectedRestaurants = DEFAULT_SELECTED_RESTAURANTS;
    finalRestaurant = DEFAULT_FINAL_RESTAURANT;
  }

  async function handleNextClick() {
    currentStep++;
  }

  function handlePrevClick() {
    currentStep--;
  }

  $: canClickNext = currentStep < 5;
  $: canClickPrev = currentStep > 0;

  $: wizardValid = validateWizard(
    currentStep,
    resultCount,
    zipCode,
    fiveSelectedCategories,
    threeSelectedRestaurants,
    finalRestaurant,
  );

  $: restaurantRequestParams = {
    zipCode: zipCode ?? '',
    resultCount,
    category: fiveSelectedCategories.map(c => c.id).join(','),
  };
</script>

<div class="pm-bg-light pm-padded pm-stacked">
  <div class="col-group">
    <div class="col-3">
      <button on:click={handleResetClick}>Start over</button>
    </div>
    <div class="col-9">
      <progress value={currentStep} max="5" />
    </div>
  </div>
  <div class="pm-stacked">
    {#if currentStep === 0}
      <Intro />
    {:else if currentStep === 1}
      <SelectCategories
        bind:selectedCategories={fiveSelectedCategories}
        bind:loading
      />
    {:else if currentStep === 2}
      <SelectParameters bind:zipCode bind:resultCount />
    {:else if currentStep === 3}
      <SelectRestaurants
        bind:selectedRestaurants={threeSelectedRestaurants}
        bind:requestParams={restaurantRequestParams}
        bind:loading
      />
    {:else if currentStep === 4}
      <SelectWinner
        bind:selectedRestaurants={threeSelectedRestaurants}
        bind:finalRestaurant
      />
    {:else if currentStep === 5}
      <Result bind:finalRestaurant />
    {/if}
  </div>

  <div class="pm-text-center">
    <button
      type="button"
      on:click={handlePrevClick}
      class="pm-btn-light"
      disabled={!canClickPrev || loading}>Prev</button
    >
    <button
      type="button"
      on:click={handleNextClick}
      class="pm-btn-primary"
      disabled={!canClickNext || loading || !wizardValid}
      >{currentStep === 0 ? 'Start' : 'Next'}</button
    >
  </div>
</div>

<style>
</style>
