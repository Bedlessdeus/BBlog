<script lang="ts">
	import type { notifyType } from '$lib/global/g_types';
	import { onMount } from 'svelte';

	let {
		type,
		text,
		desc,
		disappear
	}: { type: notifyType; text: string; desc: string; disappear: number } = $props();

	let classes = $derived(type.toString());

	let time = $state(disappear);
	onMount(() => {
		if (disappear == -1) return;
		setTimeout(() => {
			time = 0;
		}, disappear * 1000);
	});
</script>

{#if !(time == 0)}
	<div class="notify-box {classes}">
		<div class="notify-content {classes}">
			<svg
				class="notify-icon {classes}-items"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v7h-2zm0 8h2v2h-2z"
				/>
			</svg>
			<h2 class="notify-text {classes}-items">{text}</h2>
		</div>
		<p class="notify-description {classes}-items">{desc}</p>
	</div>
{/if}

<style>
	.notify-box {
		border-radius: 8px;
		padding: 16px;
		max-width: 500px;
		margin: 20px auto;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.notify-content {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 8px;
	}

	.notify-icon {
		width: 24px;
		height: 24px;
		margin-right: 12px;
	}

	.notify-text {
		font-size: 18px;
		font-weight: bold;
		margin: 0;
	}

	.notify-description {
		text-align: center;
		margin: 0;
		font-size: 14px;
	}

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
