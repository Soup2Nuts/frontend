describe("pantry-test", function(){
    describe("index", function(){

        beforeEach(function() {
            // browser.executeScript('window.sessionStorage.clear();');
            browser.driver.manage().deleteAllCookies();
            browser.get('/#!');
        });

        it("login and add everything from the search to the pantry", function(){
            element(by.model('username')).clear().sendKeys('supersoup');
            element(by.model('password')).clear().sendKeys('Bananaphone1!');
            element(by.id('login-button')).click();
            browser.waitForAngular();

            //Enter 's' into the autocomplete
            element(by.css("md-autocomplete input#autocompleteFoodInput")).clear().sendKeys('s');

            //Move mouse to the autocomplete
            browser.actions()
              .mouseMove(element(by.id('ingredientSearch')))
              .perform().then(function(){
              browser.sleep(500);
              //Press the down arrow until you get to the first autocomplete item
              for(i = 0; i < 2; i++){
                  browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
              }
              browser.sleep(500);
              //Select the first autocomplete item
              browser.actions().sendKeys(protractor.Key.ENTER).perform();
            });
            //Click the "ADD ITEM" button
            element(by.id('btnAddIngredient')).click();

            expect(browser.getCurrentUrl()).toMatch("/pantry");
            element(by.id('login-logout-button')).click();
        })

        it("login and delete everything in the users pantry using the delete all button", function(){
            element(by.model('username')).clear().sendKeys('supersoup');
            element(by.model('password')).clear().sendKeys('Bananaphone1!');
            element(by.id('login-button')).click();
            browser.waitForAngular();
            element(by.id('deletePantry')).click();
            element(by.css('body > div.md-dialog-container.ng-scope > md-dialog > md-dialog-actions > button.md-primary.md-confirm-button.md-button.md-ink-ripple.md-default-theme')).click();
            expect(element.all(by.repeater('item in pantryItems')).count()).toEqual(0);
            element(by.id('login-logout-button')).click();
            expect(browser.getCurrentUrl()).toMatch("/about");
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
