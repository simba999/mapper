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

describe('Home Page', () => {
  beforeAll(async () => {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 90000;
  });
  /* Configuration before launching a case */
  beforeEach(async () => {
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
        const numberOfMenu = await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"));
        console.log('menu length: ', numberOfMenu.length);
        assert.equal(numberOfMenu.length, 4, 'menu dropdowns don\'t work');

        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']"))
          .then((elements) => {
            elements.forEach((element) => {
              element.click();
            });
          });
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

        await browser.findElement(By.id('geo-location-suggestions')).sendKeys('TORONTO, ON, CANADA', Key.ENTER);
        await browser.manage().setTimeouts({ implicit: 5000 });
        await browser.findElement(By.id('geo-location-suggestions')).click();
        await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);

        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        let originCanvasImage1;
        await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
          const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
          await base.then((result) => {
            originCanvasImage1 = result;
          });
        });

        const message = 'Canvas not updated when change location';
        console.log('AAA:', originCanvasImage1.substring(0, 24));
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
        // // check year
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][1]//option[1]"))
          .then(async (element) => {
            await element.click();

            const message = 'Canvas not updated when change year';
            await checkCanvasUpdate(browser, originCanvasImage, message);
          });

        await browser.findElement(By.id('geo-location-suggestions')).click();
        await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);

        // check month
        await browser
          .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][2]//option[1]"))
          .then(async (element) => {
            await element.click();

            const message = 'Canvas not updated when change month';
            await checkCanvasUpdate(browser, originCanvasImage, message);
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

                const message = 'Canvas not updated when change day';
                await checkCanvasUpdate(browser, originCanvasImage, message);
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
        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            // elements[1].click();
            elements.forEach((element) => {
              element.click();
            });
          });

        /* write message */
        const textareaObject = await browser.findElement(By.xpath("//textarea[contains(@class, 'sc-hMqMXs')]"));
        textareaObject.sendKeys(Key.TAB);
        textareaObject.clear();
        textareaObject.sendKeys("Some Sample Text Here");
          
      });
  });

  /**
   * Test poster sizes
   */
  it('Should check if poster sizes works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        const cls = "//div[contains(@class, 'dimensions-col')]"
                  + "//div[contains(@class, 'dimension')]";

        await browser.findElements(By.xpath(cls))
          .then(async (elements) => {
            await elements.forEach(async (element, idx) => {
              await element.click();

              await browser.findElement(By.xpath("//canvas[@id='canvas']"))
                .then((canvasObject) => {
                  const base = browser.executeScript(
                    'return arguments[0].toDataURL();',
                    canvasObject,
                  );

                  let paperSize = '50cm X 70cm';
                  if (idx === 1) {
                    paperSize = '18" X 24"';
                  }

                  base.then((result) => {
                    assert.notStrictEqual(
                      result,
                      originCanvasImage,
                      `Canvas not updated when click ${paperSize} theme image`,
                    );
                  });
                });
            });
          });
      });
  });

  /**
   * Test poster sizes
   */
  it('Should check if latitude works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            // elements[1].click();
            console.log('dropdown elements: ', elements);
            elements.forEach((element) => {
              element.click();
            });
          });

        await browser.findElements(By.xpath('//div[contains(@class, "sc-cvbbAY khUyxq")]//li[@role="presentation"]'))
          .then(async (elements) => {
            await elements.forEach(async (element, idx) => {
              await element.click();

              let direction = 'North';
              if (idx === 1) {
                direction = 'South';
              }

              await browser.findElement(By.xpath("//canvas[@id='canvas']"))
                .then((canvasObject) => {
                  const base = browser.executeScript(
                    'return arguments[0].toDataURL();',
                    canvasObject,
                  );

                  base.then((result) => {
                    console.log('Latitude:: ', result.substring(0, 14));
                    assert.strictEqual(
                      result,
                      originCanvasImage,
                      `Canvas not updated when click latitude ${direction} buttn`,
                    );
                  });
                });
            });
          });
      });
  });


  it('Should check if longitude works', async () => {
    await browser
      .get(serverUri)
      .then(async () => {
        await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
        await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
          .then((elements) => {
            // elements[1].click();
            elements.forEach((element) => {
              element.click();
            });
          });

        await browser.findElements(By.xpath('//div[contains(@class, "sc-brqgnP kJSMSC")]//li[@role="presentation"]'))
          .then(async (elements) => {
            await elements.forEach(async (element, idx) => {
              await element.click();

              let direction = 'EAST';
              if (idx === 1) {
                direction = 'WEST';
              }

              await browser.findElement(By.xpath("//canvas[@id='canvas']"))
                .then((canvasObject) => {
                  const base = browser.executeScript(
                    'return arguments[0].toDataURL();',
                    canvasObject,
                  );

                  base.then((result) => {
                    console.log('longitude:: ', result.substring(0, 14));
                    assert.strictEqual(
                      result,
                      originCanvasImage,
                      `Canvas not updated when click latitude ${direction} buttn`,
                    );
                  });
                });
            });
          });
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
        await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));
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

              await checkCanvasUpdate(browser, originCanvasImage, message);
            });
          });
      });
  });

  // /**
  //  * Test theme selection working
  //  */
  // it('Should test theme selection working', async () => {
  //   await browser
  //     .get(serverUri)
  //     .then(async () => {
  //       // get theme image buttons
  //       await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();
  //       const themeBtns = await browser.findElements(By.xpath("//li[contains(@class, 'theme')]"));
  //       assert.strictEqual(themeBtns.length, 3, 'There should be 4 theme buttons on page');
  //       await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

  //       await browser.findElement(By.xpath("//canvas[@id='canvas']")).then(async (canvasObject) => {
  //         const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
  //         await base.then((result) => {
  //           originCanvasImage = result;
  //         });
  //       });

  //       /* iteratate and click theme image buttons and check canvas change */
  //       await browser.findElements(By.xpath("//li[contains(@class, 'theme')]")).then(async (objs) => {
  //         await objs.forEach(async (element) => {
  //           const color = await element
  //             .findElement(By.xpath('.//p'))
  //             .then(pTag => pTag.getText().then(text => text));

  //           await element.click();
  //           await browser.sleep(1000);

  //           const message = `Canvas not updated when click ${color} theme image`;
  //           await checkCanvasUpdate(browser, originCanvasImage, message);
  //         });
  //       });
  //     });
  // });


  /**
   * Test case to load our application and check the title.
   */
  // it('Should load the home page', async () => {
  //   // return new Promise((resolve, reject) => {
  //   await browser
  //     .get(serverUri)
  //     .then(logTitle)
  //     .then(async (title) => {
  //       assert.strictEqual(title, appTitle, 'App Loading Failed!!!');

  //       // await browser.wait(until.titleIs(appTitle), 10000);
  //       await browser.wait(until.elementLocated(By.xpath("//canvas[@id='canvas']")));

  //       await browser.findElement(By.xpath("//button[@class='sc-bwzfXH khcJWs']")).click();

  //       // const numberOfMenu = await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']"));
  //       // assert.strictEqual(numberOfMenu, 4, 'menu dropdowns don\'t work');

  //       // get theme image buttons
  //       const themeBtns = await browser.findElements(By.xpath("//li[contains(@class, 'theme')]"));
  //       assert.strictEqual(themeBtns.length, 4, 'There should be 4 theme buttons on page');

  //       await browser.findElement(By.xpath("//canvas[@id='canvas']")).then((canvasObject) => {
  //         const base = browser.executeScript('return arguments[0].toDataURL();', canvasObject);
  //         base.then((result) => {
  //           originCanvasImage = result;
  //         });
  //       });

  //       /* iteratate and click theme image buttons and check canvas change */
  //       await browser.findElements(By.xpath("//li[contains(@class, 'theme')]")).then(async (objs) => {
  //         await objs.forEach(async (element) => {
  //           const color = await element
  //             .findElement(By.xpath('.//p'))
  //             .then(pTag => pTag.getText().then(text => text));

  //           console.log('color:', color);

  //           await element.click();

  //           const message = `Canvas not updated when click ${color} theme image`;
  //           await checkCanvasUpdate(browser, originCanvasImage, message);
  //         });
  //       });

  //       /* enter location and check canvas change */
  //       await browser.findElement(By.id('geo-location-suggestions')).sendKeys('TORONTO, ON, CANADA', Key.NULL);
  //       await browser.manage().setTimeouts({ implicit: 5000 });
  //       await browser.findElement(By.id('geo-location-suggestions')).click();
  //       await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);

  //       const message = 'Canvas not updated when change location';
  //       await checkCanvasUpdate(browser, originCanvasImage, message);

  //       // /* change date */
  //       // // check year
  //       await browser
  //         .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][1]//option[1]"))
  //         .then(async (element) => {
  //           await element.click();

  //           const message = 'Canvas not updated when change year';
  //           await checkCanvasUpdate(browser, originCanvasImage, message);
  //         });

  //       await browser.findElement(By.id('geo-location-suggestions')).click();
  //       await browser.findElement(By.id('geo-location-suggestions')).sendKeys('', Key.ENTER);

  //       // // check month
  //       // await browser
  //       //   .findElement(By.xpath("//select[@class='sc-kGXeez iePPvq'][2]//option[1]"))
  //       //   .then(async (element) => {
  //       //     await element.click();

  //       //     const message = 'Canvas not updated when change month';
  //       //     await checkCanvasUpdate(browser, originCanvasImage, message);
  //       //   });

  //       // // check day
  //       // await browser
  //       //   .findElement(By.xpath("//div[@class='sc-kpOJdX UIIWh']"))
  //       //   .then(async (element) => {
  //       //     await element.click();

  //       //     await browser
  //       //       .findElement(By.xpath("//div[@class='react-datepicker__week'][1]//div[1]"))
  //       //       .then(async (subElement) => {
  //       //         await subElement.click();

  //       //         const message = 'Canvas not updated when change day';
  //       //         await checkCanvasUpdate(browser, originCanvasImage, message);
  //       //       });
  //       //   });

  //       // click all menu dropdowns
  //       await browser.findElements(By.xpath("//div[@class='sc-jKJlTe dRaXUR']//text"))
  //         .then((elements) => {
  //           elements.forEach((element) => {
  //             element.click();
  //           });
  //         });

  //       // // /* write message */
  //       // // await browser.findElement(By.xpath("//textarea[contains(@class, 'sc-hMqMXs')]"))
  //       // //   .sendKeys('My body', Key.RETURN);

  //       // /* change paper size */
  //       // const cls = "//div[contains(@class, 'dimensions-col')]"
  //       //           + "//div[contains(@class, 'dimension')]";

  //       // await browser.findElements(By.xpath(cls))
  //       //   .then(async (elements) => {
  //       //     await elements.forEach(async (element, idx) => {
  //       //       await element.click();

  //       //       await browser.findElement(By.xpath("//canvas[@id='canvas']"))
  //       //         .then((canvasObject) => {
  //       //           const base = browser.executeScript(
  //       //             'return arguments[0].toDataURL();',
  //       //             canvasObject,
  //       //           );

  //       //           let paperSize = '50cm X 70cm';
  //       //           if (idx === 1) {
  //       //             paperSize = '18" X 24"';
  //       //           }

  //       //           base.then((result) => {
  //       //             assert.notStrictEqual(
  //       //               result,
  //       //               originCanvasImage,
  //       //               `Canvas not updated when click ${paperSize} theme image`,
  //       //             );
  //       //           });
  //       //         });
  //       //     });
  //       //   });

  //       // /* Check Advanced options */
  //       // // change title
  //       // await browser.findElements(By.xpath("//input[@class='sc-hSdWYo erHRpd']"))
  //       //   .then(async (elements) => {
  //       //     await elements.forEach(async (element, idx) => {
  //       //       let message = '';
  //       //       let txt = '';

  //       //       switch (idx) {
  //       //         case 0:
  //       //           message = 'title';
  //       //           txt = 'Nght Sky';
  //       //           break;
  //       //         case 1:
  //       //           message = 'Location Text';
  //       //           txt = 'toronto';
  //       //           break;
  //       //         default:
  //       //           message = 'email';
  //       //           txt = 'mail@mail.com';
  //       //           break;
  //       //       }

  //       //       await element.sendKeys(txt, Key.ENTER);

  //       //       await checkCanvasUpdate(browser, originCanvasImage, message);
  //       //     });
  //       //   });

  //       /* enter location and check canvas change */
  //       // await browser
  //       //   .findElement(By.id('geo-location-suggestions'))
  //       //   .sendKeys('', Key.ENTER);

  //       /* continue button check */
  //       await browser.findElement(By.xpath("//button[@class='sc-gipzik fTDcrJ']")).click();
  //       await browser.sleep(2000);

  //       const currentURL = await browser.getCurrentUrl()
  //         .then((text) => {
  //           console.log('**: ', text);
  //           console.log(text.toString());
  //           return text;
  //         });

  //       console.log('&&&&&&&&&&&:', currentURL);
  //       if (currentURL.indexOf('https://eu.thenightsky.com') > -1) {
  //         assert.ok('Continue button works!!');
  //       } else {
  //         assert.fail('Continue button doesn\'t works!!');
  //       }
  //       // assert.strictEqual(currentURL, 'https://eu.thenightsky.com', 'Continue button doesn\'t works!!');
  //     })
  //     .catch(err => console.log(err));
  // });
});
