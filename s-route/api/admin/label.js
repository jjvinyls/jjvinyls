// [REQUIRE] //
const cors = require('cors')
const express = require('express')


// [REQUIRE] Personal //
const Auth = require('../../../s-middleware/Auth')
const handler = require('./label.handler.js')


// [EXPRESS + USE] //
const router = express.Router().use(cors())


// [GNERATE-AUTOMATIC] //
router.post(
	'/generate-automatic',
	Auth.adminToken(),
	async (req, res) => { res.send(await handler.generateAutomatic({ req })) }
)


// [GENERATE-MANUAL] //
router.post(
	'/generate-manual',
	Auth.adminToken(),
	async (req, res) => { res.send(await handler.generateManual({ req })) }
)


// [GET-SINGLE-LISTING] //
router.get(
	'/get-listing/:listing_id',
	async (req, res) => { res.send(await handler.getListing({ req })) }
)


module.exports = router