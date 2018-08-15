/* global describe, beforeEach, it, window */
/**
 * Dependency Modules
 */
const assert = require('assert');
const webdriver = require('selenium-webdriver');

const { By, until, Key } = webdriver;
require('geckodriver');

// Application Server
const serverUri = 'http://localhost:3000/';
const appTitle = 'Custom Star Map Editor';
let originCanvasImage;

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

/**
 * Fucntion to check changes of canvas updates
 *
 *
 */

const checkCanvasUpdate = async (browser, originCanvasImage, message) => {
  await browser.findElement(By.xpath("//canvas[@id='canvas']")).then((canvasObject) => {
    const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);

    base.then((result) => {
      assert.notStrictEqual(result, originCanvasImage, message);
    });
  });
};

describe('Home Page', () => {
  /* Configuration before launching a case */
  beforeEach(() => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
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

        assert.strictEqual(themeBtns.length, 4, 'There should be 4 theme buttons on page');

        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then((canvasObject) => {
          const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
          base.then((result) => {
            originCanvasImage = result;
          });
        });

        /* iteratate and click theme image buttons and check canvas change */
        await browser.findElements(By.xpath("//li[contains(@class, 'theme')]")).then(async (objs) => {
          await objs.forEach(async (element) => {
            const color = await element
              .findElement(By.xpath('.//p'))
              .then(pTag => pTag.getText().then(text => text));

            console.log('color:', color);

            await element.click();
            await setTimeout(() => {}, 1000);

            const message = `Canvas not updated when click ${color} theme image`;
            await checkCanvasUpdate(browser, originCanvasImage, message);
          });
        });

        /* enter location and check canvas change */
        await browser
          .findElement(By.id('geo-location-suggestions'))
          .sendKeys('TORONTO, ON, CANADA', Key.RETURN);

        await setTimeout(() => {}, 1000);
        const message = 'Canvas not updated when change location';
        await checkCanvasUpdate(browser, originCanvasImage, message);

        /* change date */
        // check year
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][1]//option[1]"))
          .then(async (element) => {
            await element.click();

            await setTimeout(() => {}, 1000);
            const message = 'Canvas not updated when change year';
            await checkCanvasUpdate(browser, originCanvasImage, message);
          });

        // check month
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][2]//option[1]"))
          .then(async (element) => {
            await element.click();

            await setTimeout(() => {}, 1000);
            const message = 'Canvas not updated when change month';
            await checkCanvasUpdate(browser, originCanvasImage, message);
          });

        // check day
        await browser
          .findElement(By.xpath("//div[@class='sc-kpOJdX UIIWh']"))
          .then(async (element) => {
            await element.click();
            await setTimeout(() => {}, 1000);

            await browser
              .findElement(By.xpath("//div[@class='react-datepicker__week'][1]//div[1]"))
              .then(async (subElement) => {
                await subElement.click();

                await setTimeout(() => {}, 1000);
                const message = 'Canvas not updated when change day';
                await checkCanvasUpdate(browser, originCanvasImage, message);
              });
          });

        // /* write message */
        // await browser.findElement(By.xpath("//div[@class='sc-jKJlTe dRaXUR'][2]")).click();
        // await browser.findElement(By.xpath("//textarea[@class='sc-hMqMXs zscDj']"))
        //   .sendKeys('My body', Key.RETURN);

        // /* change paper size */
        // await browser.findElement(By.xpath("//div[@class='sc-jKJlTe dRaXUR'][3]")).click();

        // const cls = "//div[contains(@class, 'dimensions-col')]"
        //           + "//div[contains(@class, 'dimension')]";

        // await browser.findElements(By.xpath(cls))
        //   .then(async (elements) => {
        //     await elements.forEach(async (element, idx) => {
        //       await element.click();
        //       await setTimeout(() => {}, 1000);

        //       await browser.findElement(By.xpath("//canvas[@id='canvas']"))
        //         .then((canvasObject) => {
        //           const base = browser.executeScript(
        //             'return arguments[0].toDataURL();',
        //             canvasObject,
        //           );

        //           let paperSize = '50cm X 70cm';
        //           if (idx === 1) {
        //             paperSize = '18" X 24"';
        //           }

        //           base.then((result) => {
        //             assert.notStrictEqual(
        //               result,
        //               originCanvasImage,
        //               `Canvas not updated when click ${paperSize} theme image`,
        //             );
        //           });
        //         });
        //     });
        //   });

        // /* Check Advanced options */
        // await browser.findElement(By.xpath("//div[@class='sc-jKJlTe dRaXUR'][3]")).click();

        // // change title
        // await browser.findElement(By.xpath("//input[@class='sc-hSdWYo erHRpd'][1]"))
        //   .sendKeys('THE NIGHT SKY', Key.RETURN);

        // await browser.findElement(By.xpath("//input[@class='sc-hSdWYo erHRpd'][2]"))
        //   .sendKeys('Welcome starmapper', Key.RETURN);
      })
      .catch(err => console.log(err));
  });
});
