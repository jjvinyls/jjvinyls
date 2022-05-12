<template>
	<BContainer class="py-5">
		<BCard no-body class="">
			<BCardHeader class="bg-primary">
				<h4 class="m-0 text-light">Inventory Manager</h4>
			</BCardHeader>

			<BCardBody>
				<BRow>
					<BCol cols="12" md="6" lg="4">
						<h6 class="text-center text-primary text-bold">labels</h6>
						<RouterLink to="/admin/inventory/label-creator">
							<BButton
								variant="primary"
								pill
								class="mb-3 w-100"
							>Creator</BButton>
						</RouterLink>
					</BCol>
				</BRow>
			</BCardBody>
		</BCard>
	</BContainer>
</template>