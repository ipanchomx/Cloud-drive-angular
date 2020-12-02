import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { login } from './login.utils';
// import { generateRandomName } from './random-names.utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  fit('should jump to dir route when writing path', () => {
    login('t@t.com', '123456');

    browser.sleep(1000);

    let pathInput = element(by.name('path'));
    
    pathInput.sendKeys('test_dir');

    browser.sleep(1000);

    const jumpButton = element(by.id('jumpButton'));

    jumpButton.click();

    browser.sleep(1000);

    const backBtn = element(by.id('backBtn'));

    browser.sleep(1000);

    backBtn.click();

    browser.sleep(1000);

    expect(pathInput.getAttribute('value')).toEqual('/');

  });



  afterEach(async () => {
    browser.executeScript(()=>{
      window.localStorage.clear()
    });
    // Assert that there are no errors emitted from the browser
    //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    //   expect(logs).not.toContain(jasmine.objectContaining({
    //     level: logging.Level.SEVERE,
    //   } as logging.Entry));
    // });
  });

});
