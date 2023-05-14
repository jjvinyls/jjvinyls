const puppeteer = require("puppeteer");


module.exports = {
	createBufferFromHTML: async (pdfHTML) => {
		// Create a browser instance
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox","--disable-setuid-sandbox"]
		});

		// Create a new page
		const page = await browser.newPage();

		await page.setContent(pdfHTML, { waitUntil: "domcontentloaded" });

		// To reflect CSS used for screens instead of print
		//await page.emulateMediaType("screen");

		// Downlaod the PDF
		const pdf = await page.pdf({
			margin: {
				top: "0",
				right: "0",
				bottom: "0",
				left: "0"
			},
			width: "2in",
			height: "1.5in",
			printBackground: true,
			displayHeaderFooter: true,
		});

		// Close the browser instance
		await browser.close();

		return pdf
	}
}