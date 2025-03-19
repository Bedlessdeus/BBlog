<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { notifyType } from '$lib/global/g_types';
	import { triggerNotification } from '$lib/stores/notifications';
</script>

<form
	method="POST"
	use:enhance={() => {
		return ({ result }) => {
			if (result.type == 'success') goto('/login');
			if (result.type != 'failure' && result.type != 'error') return;
			triggerNotification(
				notifyType.ERROR,
				result.data.value ??
					result.error?.message ??
					'An Error Occurred while Processing your request, try again'
			);
		};
	}}
>
	<button type="submit">Logout</button>
</form>
