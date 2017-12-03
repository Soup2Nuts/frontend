'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  var currentUser = "testing" + Date.now();
  var password = "password"+Date.now();
  beforeEach(function() {
    // browser.executeScript('window.sessionStorage.clear();');
        browser.driver.manage().deleteAllCookies();
        browser.get('/#!');
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
    // expect(browser.getLocationAbsUrl()).toMatch("/login");
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


  /*describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#!/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#!/viewAccount');
    });


    it('should render viewAccount when user navigates to /viewAccount', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });*/
});
