// [REQUIRE]
const JsBarcode = require('jsbarcode')
const mergePDFBuffers = require('merge-pdf-buffers')
const QRCode = require('qrcode')
const { DOMImplementation, XMLSerializer } = require('xmldom')


// [REQUIRE] Personal //
const api_discogs = require('../../../s-api/discogs')
const config = require('../../../s-config')
const pdf = require('../../../s-pdf')


module.exports = {
	generateAutomatic: async ({ req }) => {
		try {
			// [INIT]
			let listings = []

			// [API]
			const discogsListings = await api_discogs.getInventory({
				daysAgo: parseInt(req.body.daysAgo),
			})

			// [FOR-EACH] vinylsJSON //
			for (let i = 0; i < req.body.vinylsJSON.length; i++) {
				// [INIT] Const //
				const v = req.body.vinylsJSON[i]

				// [LISTING_ID]
				for (let i = 0; i < discogsListings.length; i++) {
					const dL = discogsListings[i]
					
					if (dL.release.id == v.release_id) {
						listings.push(
							{
								listing_id: dL.id || '',
								albumTitle: dL.release.title || '',
								location: dL.location,
								price: dL.price.value,
							}
						)
						
						break
					}
				}
			}

			return {
				executed: true,
				status: true,
				discogsListings: discogsListings,
				listings: listings,
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				location: '/api/label/generate-automatic: Error -->',
				message: `/api/label/generate-automatic: Error --> ${err}`,
			}
		}
	},


	generateManual: async ({ req }) => {
		try {
			// [INIT]
			let toBeMerged = []

			// [DOCUMENT]
			const document = new DOMImplementation()
				.createDocument(
					'http://www.w3.org/1999/xhtml',
					'html',
					null
				)
			
			for (let i = 0; i < req.body.vinylsJSON.length; i++) {
				const v = req.body.vinylsJSON[i]

				// [QR-CODE]
				const QRCodeLabel = await QRCode.toString(
					`${config.labelCreator.baseURL}/checkout/${v.listing_id}`,
					{
						type: "svg",
						margin: 0,
						padding: 0,
						width: 100
					}
				)
	
				// [BAR-CODE]
				const barCodeElement = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg'
				)
			
				JsBarcode(
					barCodeElement,
					v.listing_id,
					{
						xmlDocument: document,
						lineColor: "black",
						width: 1.8,
						height: 20,
						fontSize: 8,
						margin: 0,
						displayValue: false,
					}
				).render()

				// [PDF] Create Buffer from HTML //
				const pdfGenerated = await pdf.createBufferFromHTML(`
					<style>
						* {
							font-family: Sans-serif;
						}
			
						h6 {
							margin: 0;
						}

						.data1 {
							margin: 0;
							padding: 0;
						}

						.data2 {
							margin: 0;
							padding: 0;
						}
				
						.data2 svg {
							margin: 0;
							padding: 0;
							height: 50px;
							width: 50px;
						}
				
						.data3 {
							margin: 0;
							padding: 0;
							width: 100%;
						}
					</style>

					<table style="width: 100%;">
						<tr style="">
							<td class="data1">
								<h6 class="price" style="font-size: 16px;">$${v.price}</h6>
								<h6 style="font-size: 16px;">[${v.location}]</h6>
								<h6 style="font-size: 14px;">
									${
										v.albumTitle.length > 15 ?
										v.albumTitle.substring(0, 15 - 3) + '...' :
										v.albumTitle
									}
								</h6>
								<h6 style="font-size: 14px;">${v.listing_id}</h6>
							</td>

							<td class="data2">
								${QRCodeLabel}
							</td>
						</tr>
					</table>

					<table style="width: 100%;">
						<tr style="width: 100%; margin: 0; padding: 0;">
							<td class="data3" style="width: 100%;">
								${new XMLSerializer().serializeToString(barCodeElement)}
							</td>
						</tr>
					</table>
				`);
	
				toBeMerged.push(pdfGenerated)
			}
			
			// [MERGE]
			const mergedBuffer = await mergePDFBuffers.merge(toBeMerged)

			return mergedBuffer
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				location: '/api/label/generate-manual',
				message: `/api/label/generate-manual: Error --> ${err}`,
			}
		}
	},


	getListing: async ({ req }) => {
		try {
			const listing = await api_discogs.getListing({
				listing_id: req.params.listing_id,
			})

			return {
				executed: true,
				status: true,
				listing: listing
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				location: '/api/label/get-listing/:listing_id',
				message: `/api/label/get-listing/:listing_id: Error --> ${err}`,
			}
		}
	},
}