import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

import {login} from './login.utils'

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should fail login with wrong credentials', () => {
    login('t@t.com', '12345');

    const errorLabel = element(by.css('.mat-simple-snackbar span'))
    expect(errorLabel.getText()).toContain('Unable to login');

    page.navigateTo()
  });

  it('should login with credentials', () => {
    login('t@t.com', '123456');

    const filesHeader = element(by.id('manager-title'))
    expect(filesHeader.getText()).toEqual('File Manager')
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
