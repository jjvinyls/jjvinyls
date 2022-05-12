<template>
	<BRow>
		<BCol sm="6" md="3" class="">
			<RouterLink to="/admin/inventory">
				<BButton
					variant="primary"
					size="sm"
					class="w-100"
					pill
				>Inventory</BButton>
			</RouterLink>
		</BCol>

		<BCol sm="6" md="3" class="">
			<RouterLink
				to="/admin/discogs"
			>
				<BButton
					variant="primary"
					size="sm"
					class="w-100"
					pill
				>Discogs</BButton>
			</RouterLink>
		</BCol>

		<BCol sm="6" md="3" class="">
			<RouterLink to="/admin/shopify">
				<BButton
					variant="primary"
					size="sm"
					class="w-100"
					pill
				>Shopify</BButton>
			</RouterLink>
		</BCol>
	</BRow>
</template>

<script>
	import router from '@/router'

	export default {
		methods: {
			redirectDashboard() {
				router.push({ name: 'admin' }) 
			},
		},
	}
</script>