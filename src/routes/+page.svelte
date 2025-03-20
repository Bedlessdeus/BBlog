<script>
	export let data;
</script>

<div class="grid grid-cols-3 gap-4 p-8">
	{#each data.items as item}
		<a class="article-mini" href={`/article/${item.id}`}>
			<div class="font-bold">{item.title}</div>
			<div>{item.description}</div>
		</a>
	{/each}
</div>
