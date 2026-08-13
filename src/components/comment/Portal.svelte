<script lang="ts">
import { onMount } from "svelte";

let el: HTMLDivElement | null = null;

onMount(() => {
	if (el && el.parentNode !== document.body) {
		document.body.appendChild(el);
	}
});
</script>

{#if $$slots.default}
	<div bind:this={el}>
		<slot />
	</div>
{/if}
