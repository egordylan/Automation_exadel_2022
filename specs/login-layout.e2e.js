async function login(login, password) {
    await browser.url('https://viktor-silakov.github.io/course-sut?quick');
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
}


async function loggedIn() {
    await $('//*[@id="user-label"]').waitForDisplayed({timeout: 3000});
}


describe('Login', function () {
    const testData = [
        { login: 'walker@jw.com', 
          password: 'password', 
          msg: 'Successfully logged in',},
    ]

    for (const user of testData) {
        it(`should logged in: '${user.login}', '${user.password}'`, 
            async function () {
                const userLogin = 'walker@jw.com';
                const userPassword = 'password';
                await login(user.login, user.password);
                expect(await expect(userLogin).toMatch(user.login));
                expect(await expect(userPassword).toMatch(user.password));
            });
    }

    it(`spinner should appear and then disappear`, 
            async function () {
                // wait for an element to be displayed or not displayed
                /*await $('#spinner').waitForDisplayed({ reverse: false, timeout: 5000 });
                await $('#spinner').waitForDisplayed({ reverse: true, timeout: 5000 });
                expect(await $('#spinner').waitForDisplayed({ reverse: true, timeout: 5000 }));*/

                // searching the element in DOM
                await $('(//div[@style="display: flex;"][@id="spinner"])').waitForExist({timeout: 1000, reverse: false});
                await $('(//div[@style="display: none;"][@id="spinner"])').waitForExist({timeout: 3000, reverse: false});
                expect(await $('(//div[@style="display: none;"][@id="spinner"])')
                                .waitForExist({timeout: 3000, reverse: false}));
    });

    for (const exactUser of testData) {
        it(`exactly user logged in: '${exactUser.login}'`, 
            async function () {
                await loggedIn();
                expect(await $('//*[@id="user-label"][@title="walker@jw.com"][text()[contains(.,"John Walker")]]')
                                .waitForDisplayed({timeout: 3000, reverse: false}));
    });
    }
    
    it(`should throw an error if background-color is red`, 
        async function() {
            await browser.pause(700);
            const sidebarData = await $$('//ul[@id="first-nav-block"]/child::li');
            for (const bar of sidebarData) {
                await $(bar).moveTo();
                const color = await bar.getCSSProperty('background-color')
                const item = await bar.getText();
                if (color?.value === 'rgba(255,0,0,1)') {
                    throw new Error (`The "${item}" has wrong background-color`);
                }
            }
    });
    
});
