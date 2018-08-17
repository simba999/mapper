/* global describe, beforeEach, it, window */
/**
 * Dependency Modules
 */
const assert = require('assert');
const webbrowser = require('selenium-webdriver');

const { By, until, Key } = webbrowser;
require('geckodriver');

// Application Server
const serverUri = 'http://localhost:3000/';
const appTitle = 'Custom Star Map Editor';
let originCanvasImage;

/**
 * Config for Chrome browser
 * @type {webbrowser}
 */
const browser = new webbrowser.Builder()
  .usingServer()
  .withCapabilities({ browserName: 'chrome' })
  .build();

const driver = new webbrowser.Builder()
  .usingServer()
  .withCapabilities({ browserName: 'chrome' })
  .build();

// /**
//  * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
//  * @type {webbrowser}
//  */

// const browser = new webbrowser.Builder()
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
  await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
    const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);

    await base.then((result) => {
      assert.notStrictEqual(result, originCanvasImage, message);
    });
  });
};

describe('BDD Testing', () => {
  beforeAll(async () => {
    // window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 790000;
  });
  /* Configuration before launching a case */
  beforeEach(async () => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  /**
   * Test if the site is loaded
   */
  it('Should load the home page', async () => {
    await browser
      .get(serverUri)
      .then(logTitle)
      .then(async (title) => {
        assert.strictEqual(title, appTitle, 'App Loading Failed!!!');
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
      });
  });

  /**
   * Test if canvas is loaded
   */
  it('Should be canvas in the page', async () => {
    await browser
      .get(serverUri)
      .then(logTitle)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.sleep(3000);
        await browser.findElement(By.xpath("//canvas[@id='canvas']"))
          .catch(() => {
            assert.fail('There is no canvas');
          });
      });
  });

  /**
   * Test menu dropdowns
   */
  it('Should check all menu dropdowns', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        const numberOfMenu = await browser
          .findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"));
        assert.equal(numberOfMenu.length, 4, 'menu dropdowns don\'t work');
      });
  });

  /**
   * Test location input
   */
  it('Should check if location input works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.sleep(1000);

        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await browser.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await browser.findElement(By.id('geo-location-suggestions'))
          .sendKeys('TORONTO, ON, CANADA', Key.ENTER);
        await browser.sleep(1000);
        await browser.findElement(By.id('geo-location-suggestions')).click();
        await browser.sleep(1000);
        await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);
        await browser.sleep(3000);

        const message = 'Canvas not updated when change location';
        await checkCanvasUpdate(browser, originCanvasImage1, message);
      });
  });

  /**
   * Test date input
   */
  it('Should check if date input works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        /* change date */
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await browser.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        // // check year
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][1]//option[1]"))
          .then(async (element) => {
            await element.click();
            await browser.sleep(1000);

            const message = 'Canvas not updated when change year';
            await checkCanvasUpdate(browser, originCanvasImage1, message);
          });

        // check month
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][2]//option[1]"))
          .then(async (element) => {
            await element.click();
            await browser.sleep(1000);

            const message = 'Canvas not updated when change month';
            await checkCanvasUpdate(browser, originCanvasImage1, message);
          });

        // check day
        await browser
          .findElement(By.xpath("//div[@class='sc-kpOJdX UIIWh']"))
          .then(async (element) => {
            await element.click();

            await browser
              .findElement(By.xpath("//div[@class='react-datepicker__week'][1]//div[1]"))
              .then(async (subElement) => {
                await subElement.click();
                await browser.sleep(1000);

                const message = 'Canvas not updated when change day';
                await checkCanvasUpdate(browser, originCanvasImage1, message);
              });
          });
      });
  });

  /**
   * Test writing message
   */
  it('Should check if writing message works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await browser.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then(async (elements) => {
            // elements[1].click();
            await elements.forEach(async (element) => {
              element.click();
            });
          });

        await browser.sleep(2000);

        /* write message */
        const textareaObject = await browser.findElement(By.xpath('//textarea'));
        textareaObject.sendKeys(Key.TAB);
        textareaObject.clear();
        textareaObject.sendKeys('Some Sample Text Here');

        const message = 'Canvas is not updated when you write message';
        await checkCanvasUpdate(browser, originCanvasImage1, message);
      });
  });

  /**
   * Test latitude works
   */
  it('Should check if latitude works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        await browser.sleep(2000);

        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await browser.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then(async (elements) => {
            await elements.forEach(async (element) => {
              element.click();
            });
          });

        await browser.executeScript('window.scrollBy(0,450)', browser);
        await browser.sleep(1000);
        await browser
          .findElement(By.xpath('//div[contains(@class, "sc-cvbbAY khUyxq")]//button')).click();
        await browser.sleep(3000);

        await browser
          .findElements(By.xpath('//div[contains(@class, "sc-cvbbAY khUyxq")]//li[@role="presentation"]//a'))
          .then(async (elements) => {
            const element1 = elements[1];
            await element1.click();
            await browser.sleep(1000);

            const direction = 'South';
            const message = `Canvas not updated when click latitude ${direction} buttn`;
            await checkCanvasUpdate(browser, originCanvasImage1, message);
            await checkCanvasUpdate(browser, originCanvasImage1, message);
          });
      });
  });

  /**
   * Test theme selection working
   */
  it('Should test theme selection working', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        // get theme image buttons
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        const themeBtns = await browser.findElements(By.xpath("//li[contains(@class, 'theme')]"));
        assert.strictEqual(themeBtns.length, 4, 'There should be 4 theme buttons on page');
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
          await base.then((result) => {
            originCanvasImage = result;
          });
        });

        /* iteratate and click theme image buttons and check canvas change */
        await browser.findElements(By.xpath("//li[contains(@class, 'theme')]")).then(async (objs) => {
          await objs.forEach(async (element) => {
            const color = await element
              .findElement(By.xpath('.//p'))
              .then(pTag => pTag.getText().then(text => text));

            await element.click();
            await browser.sleep(1000);

            const message = `Canvas not updated when click ${color} theme image`;
            await checkCanvasUpdate(browser, originCanvasImage, message);
          });
        });
      });
  });


  it('Should check if longitude works', async () => {
    await driver
      .get(serverUri)
      .then(async () => {
        await driver.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await driver.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        let originCanvasImage1;
        await driver.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await driver.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await driver.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            elements.forEach((element) => {
              element.click();
            });
          });

        await driver.sleep(1000);
        await driver.findElement(By.xpath('//div[contains(@class, "sc-brqgnP kJSMSC")]//button')).click();
        await driver.sleep(3000);

        await driver
          .findElements(By.xpath('//div[contains(@class, "sc-brqgnP kJSMSC")]//li[@role="presentation"]//a'))
          .then(async (elements) => {
            const element1 = elements[0];
            await element1.click();
            await driver.sleep(1000);

            const direction = 'East';
            const message = `Canvas not updated when click latitude ${direction} buttn`;
            await checkCanvasUpdate(driver, originCanvasImage1, message);
          });
      });
  });

  /**
   * Test exact time
   */
  it('Should check if exact time selections work', async () => {
    // const browser = driver;
    await driver
      .get(serverUri)
      .then(async () => {
        await driver.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        /* change date */
        await driver.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        let originCanvasImage1;
        await driver.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await driver.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await driver.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            elements.forEach((element) => {
              element.click();
            });
          });

        await driver.sleep(1000);

        // Hour
        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][1]")).click();

        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][1]//option[2]"))
          .click();

        let message = 'Canvas not updated when change exact hour';
        await checkCanvasUpdate(driver, originCanvasImage1, message);

        // miute
        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][2]")).click();
        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][2]//option[2]"))
          .click();
        message = 'Canvas not updated when change exact minute';
        checkCanvasUpdate(driver, originCanvasImage1, message);

        // noon
        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][3]")).click();
        await driver
          .findElement(By.xpath("//select[@class='sc-gPEVay fHQsvh'][3]//option[2]")).click();
        message = 'Canvas not updated when change am or pm';
        await checkCanvasUpdate(driver, originCanvasImage1, message);
      });
  });

  /**
   * Test continute button
   */
  it('Should check if continue button works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.sleep(3000);
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.sleep(1000);

        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        await browser.findElement(By.id('geo-location-suggestions'))
          .sendKeys('TORONTO, ON, CANADA', Key.ENTER);
        await browser.sleep(1000);
        await browser.findElement(By.id('geo-location-suggestions')).click();
        await browser.sleep(1000);
        await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);
        await browser.sleep(3000);

        /* continue button check */
        await browser.findElement(By.xpath("//button[@class='sc-gipzik fTDcrJ']")).click();
        await browser.sleep(2000);

        const currentURL = await browser.getCurrentUrl()
          .then(text => text);

        if (currentURL.indexOf('thenightsky.com') > -1) {
          assert.ok('Continue button works!!');
        } else {
          assert.fail('Continue button doesn\'t works!!');
        }
      });
  });

  /**
   * Test Advanced options
   */
  it('Should check if Advanced options', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.sleep(1000);
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          await browser.executeScript('return arguments[0].toDataURL();', canvasObject)
            .then((result) => {
              originCanvasImage1 = result;
            });
        });

        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            elements.forEach((element) => {
              element.click();
            });
          });

        await browser.sleep(2000);

        // change title
        await browser.findElements(By.xpath("//input[@class='sc-hSdWYo erHRpd']"))
          .then(async (elements) => {
            await elements.forEach(async (element, idx) => {
              let message = '';
              let txt = '';

              switch (idx) {
                case 0:
                  message = 'title';
                  txt = 'Nght Sky';
                  break;
                case 1:
                  message = 'Location Text';
                  txt = 'toronto';
                  break;
                default:
                  message = 'email';
                  txt = 'mail@mail.com';
                  break;
              }

              await element.sendKeys(txt, Key.ENTER);

              await checkCanvasUpdate(browser, originCanvasImage1, message);
            });
          });
      });
  });

  /**
   * Test poster sizes
   */
  it('Should check if poster sizes works', async () => {
    // const browser = driver;
    await driver
      .get(serverUri)
      .then(async () => {
        await driver.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        await driver.sleep(3000);

        await driver.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then(async (elements) => {
            await elements.forEach(async (element) => {
              element.click();
            });
          });

        await driver.sleep(1000);

        const cls = "//div[contains(@class, 'dimensions-col')]"
                  + "//div[contains(@class, 'dimension')]";

        const posterDomObjects = await driver.findElements(By.xpath(cls));

        assert.strictEqual(posterDomObjects.length, 2, 'There should be 2 poster size buttons!');

        await driver.findElements(By.xpath(cls)).then(async (elements) => {
          const element = elements[1];
          const leftSizeValue = await element.getText().then(text => text);

          await element.click();
          await driver.sleep(5000);
          // await browser.manage().setTimeouts({ implicit: 5000 });

          const sizeValue = await driver
            .findElement(By.xpath("//div[@class='sc-csuQGl guCrrI']"))
            .then(sizeDomObject => sizeDomObject.getText().then(text => text));

          const message = `Canvas is not changed when clicking poster size ${leftSizeValue}`;
          assert.strictEqual(leftSizeValue, sizeValue, message);
        });
      });
  });

  afterAll(async () => {
    await browser.quit();
    await driver.quit();
  });
});
