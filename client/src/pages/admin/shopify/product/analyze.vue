<template>
	<BContainer class="py-5">
		<BCard no-body>
			<BCardHeader class="bg-primary">
				<BRow>
					<BCol cols="12" sm="8">
						<h3 class="m-0 text-light">
							Products Analytics
						</h3>
					</BCol>

					<BCol cols="12" sm="4">
						<h3 class="m-0 text-right text-light">
							Total: {{ allProducts.length }}
						</h3>
					</BCol>
				</BRow>
			</BCardHeader>

			<BCardBody v-if="!loading">
				<BRow>
					<!-- Main -->
					<BCol cols="12" md="6" lg="6">
						<h4 class="text-primary">Distribution</h4>
						<BRow>
							<BCol cols="6">
								<h6 class="m-0 text-bold text-primary">Genre</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Count</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Pct</h6>
							</BCol>
						</BRow>

						<BRow
							v-for="(c, i) in genreCounts.main" :key="i"
							:class="{ 'bg-lite': isOdd(i) }"
						>
							<BCol cols="6">
								<h6 class="m-0 text-bold">{{ c.genre }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">{{ c.count }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">
									{{
										Math.round(
											(c.count / allProducts.length) * 100
										)
									}}
									{{ '%' }}
								</h6>
							</BCol>
						</BRow>
					</BCol>

					<!-- Main Pie Chart -->
					<BCol cols="12" md="6" lg="6">
						<PieChart
							:data="pieChart.chartData.main"
							:options="{}"
						/>
					</BCol>

					<!-- Hiphop -->
					<BCol cols="12" md="6" lg="3">
						<h4 class="text-primary">Hiphop</h4>
						<BRow>
							<BCol cols="6">
								<h6 class="m-0 text-bold text-primary">Genre</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Count</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Pct</h6>
							</BCol>
						</BRow>

						<BRow
							v-for="(c, i) in genreCounts.hiphop" :key="i"
							:class="{ 'bg-lite': isOdd(i) }"
						>
							<BCol cols="6">
								<h6 class="m-0 text-bold">{{ c.genre }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">{{ c.count }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">
									{{
										Math.round(
											(c.count / allProducts.length) * 100
										)
									}}
									{{ '%' }}
								</h6>
							</BCol>
						</BRow>
					</BCol>

					<!-- Hiphop Pie Chart -->
					<BCol cols="12" md="6" lg="3">
						<PieChart
							:data="pieChart.chartData.hiphop"
							:options="{}"
						/>
					</BCol>

					<!-- Electronic -->
					<BCol cols="12" md="6" lg="3">
						<h4 class="text-primary">Electronic</h4>
						<BRow>
							<BCol cols="6">
								<h6 class="m-0 text-bold text-primary">Genre</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Count</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Pct</h6>
							</BCol>
						</BRow>

						<BRow
							v-for="(c, i) in genreCounts.electronic" :key="i"
							:class="{ 'bg-lite': isOdd(i) }"
						>
							<BCol cols="6">
								<h6 class="m-0 text-bold">{{ c.genre }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">{{ c.count }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">
									{{
										Math.round(
											(c.count / allProducts.length) * 100
										)
									}}
									{{ '%' }}
								</h6>
							</BCol>
						</BRow>
					</BCol>

					<!-- Electronic Pie Chart -->
					<BCol cols="12" md="6" lg="3">
						<PieChart
							:data="pieChart.chartData.electronic"
							:options="{}"
						/>
					</BCol>

					<!-- Other -->
					<BCol cols="12" md="6" lg="3">
						<h4 class="text-primary">Other</h4>
						<BRow>
							<BCol cols="6">
								<h6 class="m-0 text-bold text-primary">Genre</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Count</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold text-primary">Pct</h6>
							</BCol>
						</BRow>

						<BRow
							v-for="(c, i) in genreCounts.other" :key="i"
							:class="{ 'bg-lite': isOdd(i) }"
						>
							<BCol cols="6">
								<h6 class="m-0 text-bold">{{ c.genre }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">{{ c.count }}</h6>
							</BCol>

							<BCol cols="3">
								<h6 class="m-0 text-bold">
									{{
										Math.round(
											(c.count / allProducts.length) * 100
										)
									}}
									{{ '%' }}
								</h6>
							</BCol>
						</BRow>
					</BCol>

					<!-- Other Pie Chart -->
					<BCol cols="12" md="6" lg="3">
						<PieChart
							:data="pieChart.chartData.other"
							:options="{}"
						/>
					</BCol>
				</BRow>
			</BCardBody>

			<BCardBody v-if="loading">
				<h1 class="text-warning">Loading..</h1>
			</BCardBody>
		</BCard>
	</BContainer>
</template>

<script>
import musicGenres from '@/defaults/musicGenres'
import PieChart from '@/chartjs/PieChart.js'
import PageService from '@/services/PageService'

export default {
	data() {
		const backgroundColor = [
			"#0074D9", "#FF4136", "#2ECC40",
			"#FF851B", "#7FDBFF", "#B10DC9",
			"#FFDC00", "#001f3f", "#39CCCC",
			"#01FF70", "#85144b", "#F012BE",
			"#3D9970", "#111111", "#AAAAAA",
			"#41B883", "#E46651", "#00D8FF", 
		]
		return {
			loading: true,
			resData: {},

			allProducts: [],
			genreCounts: {
				main: [],
				hiphop: [],
				electronic: [],
				other: [],
			},

			pieChart: {
				chartData: {
					main: {
						hoverBackgroundColor: "red",
						hoverBorderWidth: 20,
						labels: musicGenres.main,
						datasets: [
							{
								backgroundColor: backgroundColor,
								data: []
							},
						]
					},

					hiphop: {
						hoverBackgroundColor: "red",
						hoverBorderWidth: 20,
						labels: musicGenres.hiphop,
						datasets: [
							{
								backgroundColor: backgroundColor,
								data: []
							},
						]
					},

					electronic: {
						hoverBackgroundColor: "red",
						hoverBorderWidth: 20,
						labels: musicGenres.hiphop,
						datasets: [
							{
								backgroundColor: backgroundColor,
								data: []
							},
						]
					},

					other: {
						hoverBackgroundColor: "red",
						hoverBorderWidth: 20,
						labels: musicGenres.hiphop,
						datasets: [
							{
								backgroundColor: backgroundColor,
								data: []
							},
						]
					},
				}
			}
		}
	},

	components: {
		PieChart
	},

	methods: {
		isOdd(i) {
			return ( i & 1 ) ? true : false;
		},

		initializePieChart() {
			for (let i = 0; i < this.genreCounts.main.length; i++) {
				const g = this.genreCounts.main[i]

				this.pieChart.chartData.main.datasets[0].data.push(g.count)
			}

			for (let i = 0; i < this.genreCounts.hiphop.length; i++) {
				const g = this.genreCounts.hiphop[i]
				this.pieChart.chartData.hiphop.datasets[0].data.push(g.count)
			}

			for (let i = 0; i < this.genreCounts.electronic.length; i++) {
				const g = this.genreCounts.electronic[i]
				this.pieChart.chartData.electronic.datasets[0].data.push(g.count)
			}

			for (let i = 0; i < this.genreCounts.other.length; i++) {
				const g = this.genreCounts.other[i]
				this.pieChart.chartData.other.datasets[0].data.push(g.count)
			}
		},

		async getPageData() {
			this.loading = true

			this.resData = await PageService.s_admin_shopify_product_analyze()

			if (this.resData.status) {
				this.allProducts = this.resData.allProducts

				for (let i = 0; i < this.allProducts.length; i++) {
					// Turn string of values (delimited by ", " into array "tags")
					this.allProducts[i].tags = this.allProducts[i].tags.split(', ')
					
					// for each t in "tags" array
					for (let ii = 0; ii < this.allProducts[i].tags.length; ii++) {
						const t = this.allProducts[i].tags[ii]

						// get index
						const mainI = this.genreCounts.main.findIndex(o => o.genre === t)
						const hiphopI = this.genreCounts.hiphop.findIndex(o => o.genre === t)
						const electronicI = this.genreCounts.electronic.findIndex(o => o.genre === t)
						const otherI = this.genreCounts.other.findIndex(o => o.genre === t)

						// if found increment
						if (mainI > -1) { this.genreCounts.main[mainI].count++ }
						if (hiphopI > -1) { this.genreCounts.hiphop[hiphopI].count++ }
						if (electronicI > -1) { this.genreCounts.main[electronicI].count++ }
						if (otherI > -1) { this.genreCounts.main[otherI].count++ }
					}
				}

				this.initializePieChart()
			}

			this.loading = false
		},

		initializePage() {
			for (let i = 0; i < musicGenres.main.length; i++) {
				this.genreCounts.main.push({
					genre: musicGenres.main[i],
					count: 0,
				})
			}

			for (let i = 0; i < musicGenres.hiphop.length; i++) {
				this.genreCounts.hiphop.push({
					genre: musicGenres.hiphop[i],
					count: 0,
				})
			}

			for (let i = 0; i < musicGenres.electronic.length; i++) {
				this.genreCounts.electronic.push({
					genre: musicGenres.electronic[i],
					count: 0,
				})
			}

			for (let i = 0; i < musicGenres.other.length; i++) {
				this.genreCounts.other.push({
					genre: musicGenres.other[i],
					count: 0,
				})
			}
		},
	},
	
	async created() {
		this.initializePage()

		await this.getPageData()
	},
}
</script>

<style scoped>
	.bg-lite {
		background: rgb(230, 230, 230);
	}

	.text-bold {
		font-weight: bold;
	}
</style>