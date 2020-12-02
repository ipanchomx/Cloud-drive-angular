import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { login } from './login.utils';
import { generateRandomName } from './random-names.utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should create a new folder after login', () => {
    login('t@t.com', '123456');

    browser.sleep(1000);

    browser.get(browser.baseUrl + '/ruta-que-no-existe');

    browser.sleep(3000);


    const notFoundTitle = element(by.className('image-404'));


    expect(notFoundTitle.isPresent).toBeTruthy();


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
