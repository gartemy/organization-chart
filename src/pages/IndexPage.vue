<template>
	<Sidebar
		v-model="activeDepartment"
		:departments="departments"
	/>

	<q-page class="main-content">
		<Toolbar
			@fullscreen="toggleFullscreen"
			@zoom-in="zoomIn"
			@zoom-out="zoomOut"
			@print="printPage"
			@download="downloadPage"
		/>

		<TransitionDefault>
			<div
				v-if="activeDepartment"
				ref="employeesListRef"
			>
				<EmployeesList
					v-bind="activeDepartment"
				/>
			</div>
		</TransitionDefault>
	</q-page>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useDepartments } from "stores/departments";
import Sidebar from "components/Sidebar.vue";
import Toolbar from "components/Toolbar.vue";
import EmployeesList from "components/EmployeesList.vue";
import TransitionDefault from "components/TransitionDefault.vue";
import html2canvas from "html2canvas";

const { activeDepartment, departments } = storeToRefs(useDepartments());

const employeesListRef = ref();

const toggleFullscreen = () => {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	}
	else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
};

const zoomIn = () => {
	employeesListRef.value.style.zoom = parseFloat(getComputedStyle(employeesListRef.value).zoom) + 0.1;
};

const zoomOut = () => {
	employeesListRef.value.style.zoom = parseFloat(getComputedStyle(employeesListRef.value).zoom) - 0.1;
};

const printPage = () => {
	const printContents = employeesListRef.value.innerHTML;
	const originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
};

const downloadPage = async () => {
	const canvas = await html2canvas(employeesListRef.value);
	const data = canvas.toDataURL("image/png;base64");
	const downloadLink = document.createElement('a');
	downloadLink.download = 'Организационная структура';
	downloadLink.href = data;
	downloadLink.click();
	document.body.removeChild(downloadLink);
};
</script>

<style scoped>
.main-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	background: #f0f4f8;
	padding: 1em;
}
</style>
