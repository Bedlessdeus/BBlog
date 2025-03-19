<script lang="ts">
	import Notifications from '$lib/client/comp/Notifications.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Notifications />

{@render children()}
