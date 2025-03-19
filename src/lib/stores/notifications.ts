import type { NotificationData, notifyType } from '$lib/global/g_types';
import { writable } from 'svelte/store';

export const notifications = writable<NotificationData[]>([]);

let idCounter = 0;

export const triggerNotification = (
	type: notifyType,
	text: string,
	desc?: string,
	disappear = 3
) => {
	const id = ++idCounter;
	console.log(id)
	notifications.update((n) => [...n, { id, type, text, desc, disappear }]);
};
