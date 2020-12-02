import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

export const login = (email:string, password: string) => {
    let page = new AppPage();

    browser.waitForAngularEnabled(false)
    page.navigateTo();

    const getStartedButton = element(by.id("get-started"))

    getStartedButton.click();

    browser.wait(() => element(by.className('register')).getText(), 3000);

    const emailInput = element(by.id('emailInput'));
    const passwordInput = element(by.id('passwordInput'));
    const loginButton = element(by.id('loginButton'));


    emailInput.sendKeys(email);
    passwordInput.sendKeys(password);

    loginButton.click();
    
    browser.sleep(1000);
}