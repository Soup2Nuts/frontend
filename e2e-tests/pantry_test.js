describe("pantry-test", function(){
    describe("index", function(){

        beforeEach(function() {
            // browser.executeScript('window.sessionStorage.clear();');
            browser.driver.manage().deleteAllCookies();
            browser.get('/#!');
        });

/*        it("login and add everything from the search to the pantry", function(){
            element(by.model('username')).clear().sendKeys('supersoup');
            element(by.model('password')).clear().sendKeys('Bananaphone1!');
            element(by.id('login-button')).click();
            browser.waitForAngular();
            element(by.id('ingredientSearch')).click();
            element(by.id('ingredientSearch')).sendKeys(protractor.Key.ARROW_DOWN);
                //.sendKeys(protractor.Key.ENTER);
            element(by.id('btnAddIngredient')).click();

            expect(browser.getLocationAbsUrl()).toMatch("/pantry");
            element(by.id('login-logout-button')).click();
        })*/

        it("login and delete everything in the users pantry using the delete all button", function(){
            element(by.model('username')).clear().sendKeys('supersoup');
            element(by.model('password')).clear().sendKeys('Bananaphone1!');
            element(by.id('login-button')).click();
            browser.waitForAngular();
            element(by.id('deletePantry')).click();
            element(by.css('body > div.md-dialog-container.ng-scope > md-dialog > md-dialog-actions > button.md-primary.md-confirm-button.md-button.md-ink-ripple.md-default-theme')).click();
            expect(element.all(by.repeater('item in pantryItems')).count()).toEqual(0);
            element(by.id('login-logout-button')).click();
            expect(browser.getLocationAbsUrl()).toMatch("/about");
        })
    })

    var origFn = browser.driver.controlFlow().execute;

    browser.driver.controlFlow().execute = function() {
        var args = arguments;

        // queue 100ms wait
        origFn.call(browser.driver.controlFlow(), function() {
            return protractor.promise.delayed(100);
        });

        return origFn.apply(browser.driver.controlFlow(), args);
    };

});