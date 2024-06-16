<template>
	<q-dialog
		ref="dialogRef"
		:persistent="persistent"
		@hide="onDialogHide"
	>
		<q-card style="width: 600px;">
			<q-card-section class="text-h5">
				{{ title }}
			</q-card-section>
			
			<q-separator />
			
			<q-card-section style="white-space: pre-line;">
				{{ message }}
			</q-card-section>
			
			<q-card-actions align="right">
				<q-btn
					color="dark"
					label="Отмена"
					dense
					flat
					@click="onDialogCancel"
				/>
				
				<q-btn
					color="primary"
					label="Да"
					dense
					@click="onDialogOK"
				/>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from "quasar";

const props = defineProps({
	message:    {
		type:    String,
		default: '',
	},
	title:      {
		type:    String,
		default: '',
	},
	persistent: {
		type:    Boolean,
		default: false,
	},
});

const emit = defineEmits([ ...useDialogPluginComponent.emits ]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

</script>

<style scoped>

</style>