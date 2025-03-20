<script lang="ts">
	import type { notifyType } from '$lib/global/g_types';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { v4 as uuid } from 'uuid';

	let {
		type,
		text,
		desc,
		disappear
	}: { type: notifyType; text: string; desc: string; disappear: number } = $props();

	let classes = $derived(type.toString());

	let visible = $state(true);
	let id = uuid();

	onMount(() => {
		if (disappear === -1) return;
		setTimeout(() => {
			visible = false;
		}, disappear * 1000);
	});
</script>

{#if visible}
	<div
		id="notification-{id}"
		class="m-[20px auto] max-w-[500px] rounded-[8px] p-4 shadow-sm {classes}"
		in:fly={{ x: 300, duration: 500 }}
		out:fly={{ x: 300, duration: 500 }}
	>
		<div class="mb-2 flex items-center justify-center {classes}">
			<svg
				class="notify-icon mr-3 h-6 w-6 {classes}-items"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v7h-2zm0 8h2v2h-2z"
				/>
			</svg>
			<h2 class="m-0 text-[18px] font-bold {classes}-items">{text}</h2>
		</div>
		<p class="m-0 text-center text-[14px] {classes}-items">{desc}</p>
	</div>
{/if}

<style>
	.error {
		background-color: #ff8787;
	}

	.error-items {
		color: #b42727;
	}

	.success {
		background-color: rgb(93, 253, 93);
	}

	.success-items {
		color: rgb(32, 158, 32);
	}

	.warning {
		background-color: rgb(255, 255, 88);
	}

	.warning-items {
		color: #856404;
	}
</style>
