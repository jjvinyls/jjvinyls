<template>
	<BContainer class="py-5">
		<BCard no-body>
			<BCardHeader class="bg-primary">
				<h3 class="m-0 text-light">Products</h3>
			</BCardHeader>

			<BCardBody>
				
			</BCardBody>
		</BCard>
	</BContainer>
</template>

<script>
	import ShopifyProductService from '@/services/admin/shopify/ProductService'

	export default {
		data() {
			return {
				resData: {},
			}
		},

		methods: {
			async getPageData() {
				this.resData = await ShopifyProductService.s_readAll_paginated()
			}
		},

		async created() {
			await this.getPageData()
		},
	}
</script>