/**
 * Dependency Modules
 */
const assert = require("assert");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
require("geckodriver");

// Application Server
const serverUri = "http://localhost:3000/";
const appTitle = "Custom Star Map Editor";

/**
 * Config for Chrome browser
 * @type {webdriver}
 */
let browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();


 // /**
 //  * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
 //  * @type {webdriver}
 //  */
 
 // const browser = new webdriver.Builder()
 //  .usingServer()
 //  .withCapabilities({ browserName: "firefox" })
 //  .build();
  

/**
* Function to get the title and resolve it it promise.
* @return {[type]} [description]
*/
function logTitle() {
	return new Promise((resolve, reject) => {
		browser.getTitle().then((title) => {
			resolve(title);
		});
	});
}

describe("Home Page", () => {
	/* Configuration before launching a case */
	beforeEach(function() {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
  });

	/**
	  * Test case to load our application and check the title.
	  */
	it("Should load the home page", async function() {
		// return new Promise((resolve, reject) => {
		await browser
				.get(serverUri)
				.then(logTitle)
				.then(async (title) => {
					console.log(title)
					assert.strictEqual(title, appTitle, "App is successfully loaded!!!");

					// await browser.wait(until.titleIs(appTitle), 10000);

					// const canvas = browser.findElement(By.xpath("//canvas[@id='canvas']"))
					// 	.then((obj) => {
					// 		console.log(obj)
					// 	});


					// await browser.findElement(By.xpath("//li[contains(@class, 'theme')]"))
					// 	.then(async (obj) => {
					// 		const themeColor = await obj.getText().then((text) => { 
					// 			return text 
					// 		});
					// 		console.log('color: ', themeColor);

					// 		// await obj.click()
					// 		// await setTimeout(()=> {}, 3000);
					// 	})

					// browser.quit();
					resolve();
				})
				.catch(err => console.log(err));
		})
	// });
});