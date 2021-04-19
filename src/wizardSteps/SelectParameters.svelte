<script lang="ts">
  import {
    invalidResultCountMessage,
    invalidZipCodeMessage,
    validResultCount,
    validZipCode,
  } from '../utilities/validation';

  // props
  export let zipCode: string;
  export let resultCount: number;

  // state
  let zipCodeTouched: boolean = false;
  let resultCountTouched: boolean = false;

  const handleZipCodeChange = (e: any) => {
    console.log(e);
    zipCode = e.target.value ? e.target.value.toString() : null;
  };

  $: zipCodeError =
    !zipCodeTouched || validZipCode(zipCode) ? '' : invalidZipCodeMessage;
  $: resultCountError =
    !resultCountTouched || validResultCount(resultCount)
      ? ''
      : invalidResultCountMessage;
</script>

<div>
  <h3>Select parameters</h3>
  <input
    type="number"
    value={zipCode}
    on:input={handleZipCodeChange}
    on:blur={() => (zipCodeTouched = true)}
    placeholder="Zip code"
  />
  {zipCodeError}
  <input
    type="number"
    bind:value={resultCount}
    on:blur={() => (resultCountTouched = true)}
    placeholder="Result count"
    min={1}
  />
  {resultCountError}
</div>
