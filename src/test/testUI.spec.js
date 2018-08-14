/**
 * Dependency Modules
 */
const assert = require("assert");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
require("geckodriver");

// Application Server
const serverUri = 'http://localhost:3000/';
const appTitle = 'Custom Star Map Editor';

/**
 * Config for Chrome browser
 * @type {webdriver}
 */
const browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: 'chrome' })
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
  return new Promise((resolve) => {
    browser.getTitle().then((title) => {
      resolve(title);
    });
  });
}

describe('Home Page', () => {
  /* Configuration before launching a case */
  beforeEach(() => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  /**
  * Test case to load our application and check the title.
  */
  it('Should load the home page', async () => {
    // return new Promise((resolve, reject) => {
    await browser
      .get(serverUri)
      .then(logTitle)
      .then(async (title) => {
        assert.strictEqual(title, appTitle, 'App Loading Failed!!!');

        // await browser.wait(until.titleIs(appTitle), 10000);
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        // get theme image buttons
        const themeBtns = await browser.findElements(By.xpath("//li[contains(@class, 'theme')]"));

        assert.strictEqual(
          themeBtns.length,
          4,
          'There should be 4 theme buttons on page',
        );

        // iteratate and click theme image buttons and check canvas change
        await browser.findElements(By.xpath("//li[contains(@class, 'theme')]"))
          .then(async (objs) => {
            await objs.forEach(async (element) => {
              await element.click();
              await setTimeout(() => {}, 3000);

              await browser.findElement(By.xpath("//canvas[@id='canvas']"))
                .then((canvasObject) => {
                  const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
                  base.then((result) => {
                    console.log(result);
                  })
                });
            });
          });
      })
      .catch(err => console.log(err));
  });
});
