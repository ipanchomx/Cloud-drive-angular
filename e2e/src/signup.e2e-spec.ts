import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { generateRandomName } from './random-names.utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

    
  it('should sign up', () => {
    
    browser.waitForAngularEnabled(false)
    page.navigateTo();

    const getStartedButton = element(by.id("get-started"))
    getStartedButton.click();

    browser.wait(() => element(by.className('register')).getText(), 3000);

    const email = generateRandomName() + '@test.com';
    const name = 'test';
    const password = '123456';

    const emailInput = element(by.id('signupEmail'));
    const nameInput = element(by.id('signupName'));
    const passwordInput = element(by.id('signupPassword'));
    const passwordCInput = element(by.id('passwordConfirm'));
    const loginButton = element(by.id('signUpButton'));

    emailInput.sendKeys(email);
    nameInput.sendKeys(name);
    passwordInput.sendKeys(password);
    passwordCInput.sendKeys(password);

    loginButton.click();
    browser.sleep(1000);

    const successAlert = element(by.css('.mat-simple-snackbar span'))
    expect(successAlert.getText()).toEqual('User successfully created');
  });

  it('should not sign up if email already exist', () => {
    
    browser.waitForAngularEnabled(false)
    page.navigateTo();

    const getStartedButton = element(by.id("get-started"))
    getStartedButton.click();

    browser.wait(() => element(by.className('register')).getText(), 3000);

    const email = 't@t.com';
    const name = 'test';
    const password = '123456';

    const emailInput = element(by.id('signupEmail'));
    const nameInput = element(by.id('signupName'));
    const passwordInput = element(by.id('signupPassword'));
    const passwordCInput = element(by.id('passwordConfirm'));
    const loginButton = element(by.id('signUpButton'));

    emailInput.sendKeys(email);
    nameInput.sendKeys(name);
    passwordInput.sendKeys(password);
    passwordCInput.sendKeys(password);

    loginButton.click();
    browser.sleep(1000);

    const successAlert = element(by.css('.mat-simple-snackbar span'))
    expect(successAlert.getText()).toEqual('User already exists!');
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
