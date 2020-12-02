import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { login } from './login.utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show file info after clicking on file', () => {
    login('t@t.com', '123456');

    browser.sleep(1000);
    const file = element(by.id('folder-info'));

    file.click()

    browser.sleep(600);

    const fileInfo = element(by.id('file-info-container'));

    expect(fileInfo.isPresent).toBeTruthy();
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