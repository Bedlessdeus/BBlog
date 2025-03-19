<script lang="ts">
	import { notifyType } from '$lib/global/g_types';
	import { notifications } from '$lib/stores/notifications';
	import Notification from './Notification.svelte';

	const positions = {
		'top-right': 'top-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
		'center-top': 'top-4 left-1/2 transform -translate-x-1/2'
	} as const;

	export let position: keyof typeof positions = 'center-top';
</script>

<div class="fixed z-50 {positions[position]} space-y-2 w-1/2">
	{#each $notifications as notif (notif.id)}
		<Notification
			type={notif.type as notifyType}
			text={notif.text}
			desc={notif.desc ?? ''}
			disappear={Number(notif.disappear)}
		/>
	{/each}
</div>
