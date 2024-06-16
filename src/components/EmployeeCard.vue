<template>
	<q-card class="employee-card">
		<q-card-section class="q-py-sm">
			<div class="employee-card__header">
				<h3 class="employee-card__title">
					{{ department }}
				</h3>

				<q-btn
					icon="fas fa-ellipsis-h"
					dense
					flat
				>
					<q-menu>
						<q-list style="min-width: 210px">
							<q-item
								v-close-popup
								clickable
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
						</q-list>
					</q-menu>
				</q-btn>
			</div>

			<div class="employee-card__content">
				<img
					:src="avatar"
					:alt="name"
					class="employee-card__avatar"
				/>

				<div class="employee-card__details">
					<h4>{{ name }}</h4>
					<p>{{ position }}</p>
				</div>
			</div>
		</q-card-section>

		<q-btn
			:icon="_isExpanded ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"
			:color="_isExpanded ? 'primary' : 'white'"
			:text-color="_isExpanded ? 'white' : 'dark'"
			:class="{ 'active': _isExpanded }"
			round
			class="employee-card__expand"
			@click="_isExpanded = !_isExpanded"
		/>
	</q-card>
</template>

<script setup>

import {useVModel} from "src/composables/useVModel";
import {warningMessage} from "boot/notify";

const props = defineProps({
	department: {
		type: String,
		default: '',
	},
	avatar: {
		type: String,
		default: '',
	},
	name: {
		type: String,
		default: '',
	},
	position: {
		type: String,
		default: '',
	},
	count: {
		type: Number,
		default: 0,
	},
	isExpanded: {
		type: Boolean,
		default: false,
	},
});

const _isExpanded = useVModel(props, 'isExpanded');

const showWarningInProcess = () => {
	warningMessage('В разработке');
};
</script>

<style
	lang="scss"
	scoped
>
.employee-card {
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
		display:         flex;
		justify-content: space-between;
		align-items:     center;
		margin-bottom:   0.8rem;
	}

	&__title {
		font-size: 2rem;
		font-weight: bold;
	}

	&__content {
		display: flex;
		align-items: center;
		margin-top: 1em;
		margin-bottom: 1.6rem;
		position: relative;
	}

	&__avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 1em;
	}

	&__details {
		h4 {
			margin: 0;
		}

		p {
			margin: 0;
			color: gray;
		}
	}

	&__expand {
		position:  absolute;
		top:       50%;
		transform: translateY(-25%);
		right:     -2rem;
		transition: all .3s ease;

		&.active::after {
			content:    '';
			position:   absolute;
			top:        50%;
			right:      -80px;
			width:      80px;
			height:     2px;
			background: $primary;
			animation: showAfter .2s forwards;
		}
	}
}

@keyframes showAfter {
	0% {
		opacity: 0;
	}
	90% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>