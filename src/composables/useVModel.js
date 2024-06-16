import { computed, getCurrentInstance } from "vue";

// composable для обновления props, переданных в компонент
export const useVModel = (props, propName) => {
	const vm = getCurrentInstance().proxy;

	return computed({
		get() {
			return props[propName];
		},
		set(newValue) {
			vm.$emit(`update:${ propName }`, newValue);
		},
	});
};