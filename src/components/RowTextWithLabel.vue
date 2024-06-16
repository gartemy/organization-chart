<template>
	<div
		class="q-col-gutter-sm row-text"
		:class="rowOrColumn"
	>
		<div
			class="col-sm-6 col-6 q-mb-sm"
			:class="largeScreensClasses"
		>
			<template v-if="customLeftPart">
				<slot name="left"></slot>
			</template>
			
			<template v-else>
				{{ leftPart }}
				<span
					v-if="required"
					class="text-negative"
				>
                    *
                </span>
				<slot name="left">{{ (emptyLeftPart) ? '&nbsp;' : '' }}</slot>
			</template>
		</div>
		<div
			class="col row-text__right"
			style="word-break: break-word;"
		>
			<pre v-if="originalText">{{ rightPart || '—' }}</pre>
			
			<div v-else>
				{{ (customRightPart) ? '' : rightPart || '—' }}
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	originalText: {
		type:    Boolean,
		default: false,
	},
	
	emptyLeftPart: {
		type:    Boolean,
		default: false,
	},
	
	leftPart: {
		type:    String,
		default: '',
	},
	
	rightPart: {
		type:    [ String, Number ],
		default: null,
	},
	
	customLeftPart: {
		type:    Boolean,
		default: false,
	},
	
	customRightPart: {
		type:    Boolean,
		default: false,
	},
	
	questionText: {
		type:    String,
		default: '',
	},
	
	largeScreens: {
		type:    [ String, Number ],
		default: '4',
	},
	
	vertical: {
		type:    Boolean,
		default: false,
	},
	
	formed: {
		type:    Boolean,
		default: false,
	},
	
	required: {
		type:    Boolean,
		default: false,
	},
});

const largeScreensClasses = computed(() => {
	const rowClass = props.formed ? 'row-text__left--formed' : 'row-text__left';
	return `col-lg-${ props.largeScreens } col-md-${ props.largeScreens } ${ rowClass }`;
});

const rowOrColumn = computed(() => {
	return {
		'row':    !props.vertical,
		'column': props.vertical,
	}
});
</script>

<style scoped>

</style>