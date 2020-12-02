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
    const createFolderButton = element(by.id('createFolder'));

    createFolderButton.click()

    browser.sleep(600);

    const newDirInput = element(by.id('dirnameInput'));

    newDirInput.sendKeys(generateRandomName());

    const newDirButton = element(by.id('create-folder-btn'));
    
    newDirButton.click();

    browser.sleep(1000);

    const successAlert = element(by.css('.mat-simple-snackbar span'))
    expect(successAlert.getText()).toEqual('Folder Created');
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
