<template>
	<q-drawer
		:model-value="true"
		:width="300"
		class="sidebar"
	>
		<h2 class="sidebar__title">
			Отделы
		</h2>

		<q-list class="sidebar__list">
			<q-expansion-item
				v-for="(department, index) in departments"
				:key="index"
				v-model="department.isExpanded"
				:label="department.department"
				:data-color="departmentColors[index]"
				switch-toggle-side
				class="sidebar__item"
				@click="updateActiveDepartment(index)"
			>
				<q-expansion-item
					v-for="(subordinate, key) in department.head.subordinates"
					:key="key"
					:label="key"
					:header-inset-level="subordinate.subordinates ? 0.5 : 1"
					:hide-expand-icon="!subordinate.subordinates"
					switch-toggle-side
					@click.stop="updateActiveSubordinate"
				/>
			</q-expansion-item>
		</q-list>
	</q-drawer>
</template>

<script setup>
import { useVModel } from "src/composables/useVModel";

const departmentColors = [ 'primary', 'positive', 'negative' ];

const props = defineProps({
	modelValue:  {
		type:    Object,
		default: () => ({}),
	},
	departments: {
		type:    Array,
		default: () => [],
	},
});

const vModel = useVModel(props, 'modelValue');

const updateActiveDepartment = (index) => {
	const department = props.departments[index];
	if (vModel.value === department) {
		vModel.value = null;
		return;
	}
	closeAllDepartments();
	department.isExpanded = !department.isExpanded;
	department.color = departmentColors[index];
	vModel.value = department;
};

const closeAllDepartments = () => {
	for (const department of props.departments) {
		department.isExpanded = false;
	}
};

const updateActiveSubordinate = () => {
	vModel.value.head.isExpanded = true;
};
</script>

<style
	lang="scss"
>

.q-drawer {
	display:        flex;
	flex-direction: column;
	box-shadow:     none;
	padding:        2rem 0;

	.sidebar {

		&__title {
			font-size:     2rem;
			font-weight:   bold;
			padding-left:  2rem;
			margin-bottom: 2rem;
		}

		&__item {
			.q-item {
				padding-top: 0;
				padding-bottom: 0;
			}

			&[data-color='primary'] {
				border-left: 8px solid $primary;

				&.q-expansion-item--expanded {
					background: rgba($primary, .1);
				}
			}

			&[data-color='negative'] {
				border-left: 8px solid $negative;

				&.q-expansion-item--expanded {
					background: rgba($negative, .1);
				}
			}

			&[data-color='positive'] {
				border-left: 8px solid $positive;

				&.q-expansion-item--expanded {
					background: rgba($positive, .1);
				}
			}
		}
	}
}

</style>