import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import * as fs from 'fs';
import * as path from 'path';
import { testCases } from './testCases';

expect.extend({ toMatchImageSnapshot });

// Set long timeout because browser downloads and launches can be slow
jest.setTimeout(60000);

describe('Browser visual regression tests', () => {
	let browser: Browser;
	let context: BrowserContext;
	let page: Page;

	const jsbarcodePath = path.resolve(__dirname, '../../packages/jsbarcode/dist/index.js');
	const testCss = `
		@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
		body {
			font-family: 'Roboto Mono', monospace;
			background: white;
			margin: 0;
			padding: 10px;
		}
		.testbox {
			display: inline-block;
			vertical-align: top;
			margin: 15px;
			text-align: center;
		}
		.errorbox {
			background: #d00;
			vertical-align: top;
			display: inline-block;
			margin: 15px;
			padding: 15px;
			width: 100px;
			text-align: center;
			color: white;
		}
	`;

	beforeAll(async () => {
		browser = await chromium.launch({ headless: true });
	});

	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		context = await browser.newContext({
			viewport: { width: 1200, height: 1800 },
			deviceScaleFactor: 1,
		});
		page = await context.newPage();
	});

	afterEach(async () => {
		await context.close();
	});

	const loadJsBarcode = async (p: Page) => {
		// Shim CommonJS in browser page so the bundle registers window.JsBarcode correctly
		await p.evaluate(() => {
			(window as any).module = { exports: {} };
			(window as any).exports = (window as any).module.exports;
		});
		await p.addScriptTag({ path: jsbarcodePath });
	};

	it('renders Canvas barcodes correctly', async () => {
		await page.setContent('<html><body></body></html>');
		await page.addStyleTag({ content: testCss });
		await page.evaluate(() => document.fonts.load('12px "Roboto Mono"'));
		await loadJsBarcode(page);

		await page.evaluate((cases) => {
			cases.forEach((c) => {
				const testbox = document.createElement("div");
				testbox.className = "testbox";
				const format = c.options?.format || "auto";
				testbox.innerHTML = `
					<b>Format:</b> ${format}<br>
					<b>Input:</b> ${c.text.replace(/\n/g, '\\n')}<br>
					<br>
					<img class="barcode"/>
				`;
				try {
					(window as any).JsBarcode(testbox.querySelector('.barcode'), c.text, { font: 'Roboto Mono', ...c.options });
				} catch (e: any) {
					testbox.className = "errorbox";
					testbox.innerText = `Error: ${e.message}`;
				}
				document.body.appendChild(testbox);
			});
		}, testCases);

		// Allow images/canvas to render fully
		await page.waitForTimeout(500);

		const screenshot = await page.screenshot({ fullPage: true });
		expect(screenshot).toMatchImageSnapshot({
			customSnapshotIdentifier: 'canvas-barcodes',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
		});
	});

	it('renders SVG barcodes correctly', async () => {
		await page.setContent('<html><body></body></html>');
		await page.addStyleTag({ content: testCss });
		await page.evaluate(() => document.fonts.load('12px "Roboto Mono"'));
		await loadJsBarcode(page);

		await page.evaluate((cases) => {
			cases.forEach((c) => {
				const testbox = document.createElement("div");
				testbox.className = "testbox";
				const format = c.options?.format || "auto";
				testbox.innerHTML = `
					<b>Format:</b> ${format}<br>
					<b>Input:</b> ${c.text.replace(/\n/g, '\\n')}<br>
					<br>
					<svg class="barcode"></svg>
				`;
				try {
					(window as any).JsBarcode(testbox.querySelector('.barcode'), c.text, { font: 'Roboto Mono', ...c.options });
				} catch (e: any) {
					testbox.className = "errorbox";
					testbox.innerText = `Error: ${e.message}`;
				}
				document.body.appendChild(testbox);
			});
		}, testCases);

		await page.waitForTimeout(500);

		const screenshot = await page.screenshot({ fullPage: true });
		expect(screenshot).toMatchImageSnapshot({
			customSnapshotIdentifier: 'svg-barcodes',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
		});
	});

	it('initializes barcodes automatically via init()', async () => {
		const initHtml = `
			<html>
			<head>
				<style>
					@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
					body {
						font-family: 'Roboto Mono', monospace;
						background: white;
						margin: 0;
						padding: 10px;
					}
				</style>
			</head>
			<body>
				<svg class="barcode"
					jsbarcode-value="1234567890104"
					jsbarcode-format="ean13"
					jsbarcode-textMargin="0"
					jsbarcode-lineColor="#e00">
				</svg>

				<img class="barcode" data-value="Test"/>

				<canvas class="barcode"
					data-value="HI"
					data-format="CODE39"
					data-background="#bff">
				</canvas>

				<br />

				<svg id="barcode1"
					jsbarcode-value="1234567890104"
					jsbarcode-format="ean13"
					jsbarcode-textMargin="0"
					jsbarcode-lineColor="#e00">
				</svg>

				<img id="barcode2" data-value="Test"/>

				<canvas id="barcode3"
					data-value="HI"
					data-format="CODE39"
					data-background="#bff">
				</canvas>
			</body>
			</html>
		`;

		await page.setContent(initHtml);
		await page.evaluate(() => document.fonts.load('12px "Roboto Mono"'));
		await loadJsBarcode(page);

		await page.evaluate(() => {
			document.querySelectorAll('.barcode, [id^="barcode"]').forEach(el => {
				el.setAttribute('jsbarcode-font', 'Roboto Mono');
			});
			(window as any).JsBarcode(".barcode").init();
			(window as any).JsBarcode("#barcode1").init();
			(window as any).JsBarcode("#barcode2").init();
			(window as any).JsBarcode("#barcode3").init();
		});

		await page.waitForTimeout(500);

		const screenshot = await page.screenshot({ fullPage: true });
		expect(screenshot).toMatchImageSnapshot({
			customSnapshotIdentifier: 'init-barcodes',
			failureThreshold: 0.01,
			failureThresholdType: 'percent',
		});
	});
});
