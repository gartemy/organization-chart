import { Notify } from 'quasar';
import { boot } from "quasar/wrappers";

export const errorMessage = (message, options) => {
	Notify.create({
		...options,
		type: 'negative',
		icon: 'error',
		message,
	});
};

export const infoMessage = (message, options) => {
	Notify.create({
		...options,
		type: 'info',
		icon: 'info',
		message,
	});
};

export const successMessage = (message, options) => {
	Notify.create({
		...options,
		type: 'positive',
		icon: 'check_circle',
		message,
	});
};

export const warningMessage = (message, options) => {
	Notify.create({
		...options,
		type: 'warning',
		icon: 'error',
		message,
	});
};

export default boot(async ({ app }) => {
	Notify.setDefaults({
		position:  'top-right',
		timeout:   7000,
		textColor: 'white',
		multiLine: false,
		progress:  true,
		classes:   'max-w500',
		actions:   [{ icon: 'close', color: 'white' }],
	});
});