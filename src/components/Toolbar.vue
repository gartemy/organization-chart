<template>
	<div class="toolbar">
		<q-btn
			icon="fas fa-expand"
			class="toolbar__button"
			@click="emit('fullscreen')"

		/>

		<q-btn
			icon="fas fa-minus"
			class="toolbar__button"
			@click="emit('zoomOut')"
		/>

		<q-btn
			icon="fas fa-plus"
			class="toolbar__button"
			@click="emit('zoomIn')"
		/>

		<q-btn
			icon="fas fa-print"
			class="toolbar__button"
			@click="emit('print')"
		/>

		<q-btn
			icon="fas fa-file-download"
			class="toolbar__button"
			@click="emit('download')"
		/>
	</div>
</template>

<script setup>

const emit = defineEmits([ 'fullscreen', 'zoomIn', 'zoomOut', 'print', 'download' ])

</script>

<style
	lang="scss"
	scoped
>
.toolbar {
	display:               grid;
	grid-template-columns: repeat(5, max-content);
	grid-gap:              20px;
	margin-bottom:         3em;

	&__button {
		background: white;

		&::before {
			box-shadow: none;
		}
	}
}
</style>