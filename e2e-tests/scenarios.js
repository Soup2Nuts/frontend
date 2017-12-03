'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  var currentUser = "testing" + Date.now();
  var password = "password"+Date.now();
  beforeEach(function() {
    // browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
        browser.get('#!/');
  });

  it('should automatically redirect to /login when it is not logged in', function() {

    expect(browser.getCurrentUrl()).toMatch("/login");
  });

  it('should not login when wrong username or password is given', function() {

    element(by.model('username')).clear().sendKeys('testing');
    element(by.model('password')).clear().sendKeys('testing');
    expect(element(by.id('login-button')).isEnabled()).toBe(true);
    element(by.id('login-button')).click();
    expect(element(by.css('form>span'))).not.toBeNull();
  });

  it('should redirect to signup page when signup button is clicked', function() {

    element(by.id('signup-button')).click();
    expect(browser.getCurrentUrl()).toMatch("/register");
  });


  it('should create a user in signup page and successfully login', function() {

    element(by.id('signup-button')).click();
    element(by.model('username')).clear().sendKeys(currentUser);
    element(by.model('password')).clear().sendKeys(password);
    expect(element(by.id('submit-button')).isEnabled()).toBe(true);
    element(by.id('submit-button')).click();
    expect(browser.getCurrentUrl()).toMatch("/pantry");
  });


    it('should logout successfully even after refreshing the page', function() {

        expect(browser.getCurrentUrl()).toMatch("/pantry");
        element(by.id('login-logout-button')).click();
        expect(browser.getCurrentUrl()).toMatch("/about");
    });


    it(" should log in, navigate to account settings to confirm it loaded it's username properly", function(){
        element(by.model('username')).clear().sendKeys(currentUser);
        element(by.model('password')).clear().sendKeys(password);
        expect(element(by.id('login-button')).isEnabled()).toBe(true);
        element(by.id('login-button')).click();
        element(by.id('btnMenu')).click();
        element(by.id('btnMenuAccount')).click();
        expect(browser.getCurrentUrl()).toMatch("/account");
        var el = element(by.model('account.name'));
        var val = el.getAttribute('value');

        expect(val).toEqual(currentUser);

    });
});
