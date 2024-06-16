import DialogMessage from "components/DialogMessage.vue";
import { Dialog } from 'quasar';

const callMessageDialog = (message, options = {}) => {
    const title = (options.title) ? options.title : 'Подтвердите действие';

    if (!options.hasOwnProperty('persistent'))
        options.persistent = true;

    return Dialog.create({
        component:      DialogMessage,
        componentProps: {
            ...options,
            title:   title,
            message: message,
        },
    });
};

const alertMessage = (...params) => {
    return new Promise((resolve, reject) => {
        callMessageDialog(...params)
            .onOk(() => resolve({ ok: true }))
            .onCancel(() => resolve({ cancel: true }))
    });
};

export { callMessageDialog, alertMessage };