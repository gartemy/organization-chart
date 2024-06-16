<template>
	<q-card class="subordinates-list">
		<q-card-section class="q-py-sm">
			<div class="subordinates-list__header">
				<h2 class="subordinates-list__title">
					{{ department }}
				</h2>

				<q-btn
					icon="fas fa-ellipsis-h"
					dense
					flat
				>
					<q-menu>
						<q-list style="min-width: 210px">
							<q-item
								clickable
								v-close-popup
								@click="showWarningInProcess"
							>
								<div class="flex items-center">
									<q-icon
										name="fas fa-plus"
										color="positive"
										class="q-mr-sm"
										size="1.6rem"
									/>
									Добавить сотрудника
								</div>
							</q-item>
							<q-item
								clickable
								v-close-popup
								@click="showWarningInProcess"
							>
								<div class="flex items-center">
									<q-icon
										name="fas fa-crown"
										color="warning"
										class="q-mr-sm"
										size="1.6rem"
									/>
									Добавить должность
								</div>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</div>

			<div class="subordinates-list__list">
				<div
					v-for="(subordinate, position) in subordinates"
					:key="position"
					class="subordinates-list__item"
				>
					<h3 class="subordinates-list__item-title">
						{{ position }}
					</h3>

					<div
						v-for="(data, index) in subordinate"
						:key="index"
						class="subordinates-list__element"
					>
						<img
							:src="data.avatar"
							:alt="data.name"
						>

						<div class="manager-info">
							<div class="manager-name">{{ data.name }}</div>
							<div class="manager-title">{{ data.position }}</div>
						</div>

						<q-btn
							icon="fas fa-ellipsis-h"
							dense
							flat
						>
							<q-menu>
								<q-list style="min-width: 210px">
									<q-item
										clickable
										v-close-popup
										@click="showWarningInProcess"
									>
										<div class="flex items-center">
											<q-icon
												name="fas fa-pencil"
												color="dark"
												class="q-mr-sm"
												size="1.6rem"
											/>
											Редактировать
										</div>
									</q-item>
									<q-item
										clickable
										v-close-popup
										@click="handleDeleteSubordinate(position, index)"
									>
										<div class="flex items-center">
											<q-icon
												name="fas fa-trash"
												color="negative"
												class="q-mr-sm"
												size="1.6rem"
											/>
											Удалить
										</div>
									</q-item>
								</q-list>
							</q-menu>
						</q-btn>
					</div>
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>

<script setup>
import { useDepartments } from "stores/departments";
import { warningMessage } from "boot/notify";

const { deleteSubordinate } = useDepartments();

const props = defineProps({
	department:   {
		type:    String,
		default: '',
	},
	subordinates: {
		type:    Object,
		default: () => ({}),
	},
});

const showWarningInProcess = () => {
	warningMessage('В разработке');
};

const handleDeleteSubordinate = (position, index) => {
	deleteSubordinate(position, index);
};
</script>

<style lang="scss" scoped >
.subordinates-list {
	box-shadow:    0 2px 5px rgba(0, 0, 0, 0.1);
	position:      relative;
	width:         350px;
	margin:        1em;
	border-radius: 0;
	transition:    transform 0.3s;
	border-left:   5px solid $primary;

	&:hover {
		transform: scale(1.05);
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	&__title {
		font-size: 2rem;
		font-weight: bold;
	}

	&__list {
		border-top: 1px solid #e0e0e0;
		margin-top: 10px;
	}

	&__item {
		border-bottom: 1px solid #e0e0e0;

		&:last-child {
			border-bottom: none;
		}

		&-title {
			font-size:   1.6rem;
			font-weight: bold;
			margin-top:  1.6rem;
		}
	}

	&__element {
		display: flex;
		align-items: center;
		padding: 10px 0;
		position: relative;

		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-right: 1em;
		}
	}

	&__expand {
		position:  absolute;
		top:       50%;
		transform: translateY(-50%);
		right:     -4rem;
		transition: all .3s ease;
	}
}

.manager-info {
	flex-grow: 1;
}

.manager-name {
	font-weight: bold;
	margin: 0;
}

.manager-title {
	color: gray;
	margin: 0;
}

.menu-button, .details-button {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 18px;
	color: #888;
}

.menu-button {
	position: absolute;
	right: 30px;
}

.details-button {
	position: absolute;
	right: 0;
}
</style>