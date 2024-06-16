import { defineStore } from "pinia";
import {alertMessage} from "boot/messages";


export const useDepartments = defineStore('departments', {
    state: () => ({
        departments:      [
            {
                "department": "Разработка",
                "head":       {
                    "name":         "Иван Иванов",
                    "position":     "Главный разработчик",
                    "department":   "Разработчики",
                    "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                    "subordinates": {
                        "Разработчик":         [
                            {
                                "name":       "Петр Петров",
                                "position":   "Разработчик",
                                "department": "Разработка",
                                "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                            },
                            {
                                "name":       "Дмитрий Дмитриев",
                                "position":   "Разработчик",
                                "department": "Разработка",
                                "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                            }
                        ],
                        "Младший разработчик": [
                            {
                                "name":       "Сергей Сергеев",
                                "position":   "Младший разработчик",
                                "department": "Разработка",
                                "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                            }
                        ]
                    }
                }
            },
            {
                "department": "Продажи",
                "head":       {
                    "name":         "Анна Антонова",
                    "position":     "Руководитель отдела продаж",
                    "department":   "Продажи",
                    "avatar": "https://img.goodfon.ru/original/2000x1853/1/e2/devushka-ulybka-krasota-milaia-belyi-fon.jpg",
                    "subordinates": {
                        "Менеджер по продажам": [
                            {
                                "name":       "Елена Еленова",
                                "position":   "Менеджер по продажам",
                                "department": "Продажи",
                                "avatar": "https://img.goodfon.ru/original/2000x1853/1/e2/devushka-ulybka-krasota-milaia-belyi-fon.jpg",
                            },
                            {
                                "name":       "Ольга Ольгова",
                                "position":   "Менеджер по продажам",
                                "department": "Продажи",
                                "avatar": "https://img.goodfon.ru/original/2000x1853/1/e2/devushka-ulybka-krasota-milaia-belyi-fon.jpg",
                            },
                            {
                                "name":       "Мария Мариева",
                                "position":   "Менеджер по продажам",
                                "department": "Продажи",
                                "avatar": "https://img.goodfon.ru/original/2000x1853/1/e2/devushka-ulybka-krasota-milaia-belyi-fon.jpg",
                            }
                        ]
                    }
                }
            },
            {
                "department": "Тестирование",
                "head":       {
                    "name":         "Михаил Михайлов",
                    "position":     "Главный тестировщик",
                    "department":   "Тестирование",
                    "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                    "subordinates": {
                        "Тестировщик":         [
                            {
                                "name":       "Алексей Алексеев",
                                "position":   "Тестировщик",
                                "department": "Тестирование",
                                "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                            },
                            {
                                "name":       "Василий Васильев",
                                "position":   "Тестировщик",
                                "department": "Тестирование",
                                "avatar": "https://vplate.ru/images/knowledge/orig/2022/12/paramon.jpg",
                            }
                        ],
                        "Младший тестировщик": [
                            {
                                "name":       "Наталья Натальева",
                                "position":   "Младший тестировщик",
                                "department": "Тестирование",
                                "avatar": "https://img.goodfon.ru/original/2000x1853/1/e2/devushka-ulybka-krasota-milaia-belyi-fon.jpg",
                            }
                        ]
                    }
                }
            }
        ],
        activeDepartment: null,
    }),

    getters: {
        getDepartments(state) {
            return state.departments;
        },
        getActiveDepartment(state) {
            return state.activeDepartment;
        },
    },

    actions: {
        async deleteSubordinate(position, index) {
            const subordinates = this.activeDepartment.head.subordinates;
            const { name } = subordinates[position][index];
            const message = await alertMessage(`Вы уверены, что хотите удалить сотрудника ${ name }?`);
            if (!message.ok) {
                return;
            }
            if (subordinates[position].length === 1) {
                delete subordinates[position];
                return;
            }
            subordinates[position].splice(index, 1);
        },
    }
});