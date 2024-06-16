<template>
	<div class="employees-list">
		<EmployeeCard
			ref="employeeCardRef"
			v-model:is-expanded="head.isExpanded"
			v-bind="head"
			:department="department"
			@update:is-expanded="updateLineCoords"
		/>

		<svg width="60px">
			<line :x1="250" :y1="250" :x2="300" :y2="300" stroke="red" />
		</svg>

		<TransitionDefault
			enter="animated fadeInLeft"
			leave="animated fadeOutLeft"
		>
			<SubordinatesList
				v-if="head.isExpanded"
				v-bind="head"
			/>
		</TransitionDefault>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import EmployeeCard from "components/EmployeeCard.vue";
import SubordinatesList from "components/SubordinatesList.vue";
import TransitionDefault from "components/TransitionDefault.vue";

const props = defineProps({
	department: {
		type:    String,
		default: '',
	},
	head:       {
		type:    Object,
		default: () => ({}),
	},
});

const employeeCardRef = ref();
const lineCoords = ref({
	x1: 0,
	y1: 0,
	x2: 0,
	y2: 0
});

const updateLineCoords = () => {
	const rectA = document.querySelector('.employee-card__expand').getBoundingClientRect();

	lineCoords.value = {
		x1: rectA.right,
		y1: rectA.top + rectA.height / 2,
		x2: rectA.right + 60,
		y2: rectA.top + rectA.height / 2 + 60
	};
}
</script>

<style
	lang="scss"
	scoped
>
.employees-list {
	display: flex;
	align-items: flex-start;
}
</style>