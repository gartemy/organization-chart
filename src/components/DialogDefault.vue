<template>
    <q-dialog
        v-model="isVisibleDialog"
        :full-width="fullscreen"
        :maximized="fullscreen"
        :persistent="persistent"
        :full-height="fullHeight"
        class="dialog-default"
        @show="emit('show')"
        @before-hide="onBeforeHideDialog"
        @hide="onHideDialog"
    >
        <q-card
			:style="{ width: `${ width }px` }"
            style="max-width: 90vw;"
        >
            <div
                class="dialog-default__header"
                :class="{
                    'dialog-default__header--sticky': headerSticky,
                }"
            >
                <q-card-section class="row items-center">
                    <div class="col text-h5">
                        <slot name="title">{{ title }}</slot>
                    </div>
                    <div class="col-auto">
                        <q-btn
                            v-close-popup
                            icon="fas fa-times"
                            color="dark"
                            dense
                            flat
                            round
                            class="not-custom-size"
                        />
                    </div>
                </q-card-section>
                <q-separator/>
            </div>

            <div class="dialog-default__body">
                <slot name="body"/>

                <q-card-section
                    :class="{'column col q-pb-none' : fullHeight }"
                >
                    <slot name="default"/>
                </q-card-section>
            </div>

            <div
                v-if="!props.hideActions"
                class="dialog-default__actions"
                :class="{
                    'dialog-default__actions--sticky': actionsSticky,
                }"
            >
                <q-separator />
                <q-card-actions
                    align="right"
                >
                    <slot name="actions">
                        <q-btn
                            v-close-popup
                            color="dark"
                            label="Отмена"
                            flat
                        />

                        <q-btn
							color="primary"
                            :label="buttonLabel"
                            :loading="buttonLoading"
                            @click="emit('submit')"
                        />
                    </slot>
                </q-card-actions>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue:    { type: Boolean, default: false },
    title:         { type: String, default: 'Диалоговое окно' },
    width:         { type: Number, default: 600 },
	height:        { type: String, default: 'auto' },
    fullscreen:    { type: Boolean, default: false },
    persistent:    { type: Boolean, default: false },
    hideActions:   { type: Boolean, default: false },
    buttonLabel:   { type: String, default: 'Да' },
    buttonLoading: { type: Boolean, default: false },
	fullHeight:    { type: Boolean, default: false },
    headerSticky:  { type: Boolean, default: true },
    actionsSticky: { type: Boolean, default: true },
});

const emit = defineEmits([ 'update:model-value', 'before-hide', 'hide', 'submit', 'show' ]);

const isVisibleDialog = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:model-value', newValue);
    },
});

const onBeforeHideDialog = () => {
    emit('before-hide');
};

const onHideDialog = () => {
    emit('hide');
};
</script>

<style scoped>

</style>
