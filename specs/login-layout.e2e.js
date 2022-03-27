describe('Login', function () {
    const userLogin = 'walker@jw.com';
    const userPassword = 'password';

     it(`should logged in: '${userLogin}', '${userPassword}'`, 
        async function () {
            await browser.url('https://viktor-silakov.github.io/course-sut');
            await $('#login').setValue('walker@jw.com');
            await $('#password').setValue('password');
            await $('button').click();
    });
    

    it(`spinner should appear and then disappear`, 
            async function () {
                // wait for an element to be displayed or not displayed
                await $('#spinner').waitForDisplayed({ reverse: false, timeout: 5000 });
                await $('#spinner').waitForDisplayed({ reverse: true, timeout: 8000 });

                // searching the element in DOM
                // await $('(//div[@style="display: flex;"][@id="spinner"])').waitForExist({timeout: 1000, reverse: false});
                // await $('(//div[@style="display: none;"][@id="spinner"])').waitForExist({timeout: 3000, reverse: false});

                // I don't understand about this variant. Could it be or not?
                // expect(await $('(//div[@style="display: none;"][@id="spinner"])')
                //                .waitForExist({timeout: 3000, reverse: false}));
    });

    it(`exactly user logged in: '${userLogin}'`, 
            async function () {
                // with boolean expression
               /* const userName = await $('//*[@id="user-label"][@title="walker@jw.com"][text()[contains(.,"John Walker")]]')
                                        .waitForDisplayed({timeout: 3000});
                const result = userName.toString();
                expect(await expect(result).toMatch('true'));*/

                // with comparing text which contains in user label
                const userTitle = await $('//*[@id="user-label"][@title="walker@jw.com"]');
                const name = await userTitle.getText();
                expect(await expect(name).toMatch('John Walker'));

                //expect(await $('//*[@id="user-label"][@title="walker@jw.com"][text()[contains(.,"John Walker")]]')
                //                .waitForDisplayed({timeout: 3000, reverse: false}));
    });
    
    
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
