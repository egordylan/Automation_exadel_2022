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
                await $('#spinner').waitForDisplayed({ reverse: false, timeout: 5000 });
                await $('#spinner').waitForDisplayed({ reverse: true, timeout: 8000 });
    });


    it(`exactly user logged in: '${userLogin}'`, 
            async function () {
                const userTitle = await $('//*[@id="user-label"][@title="walker@jw.com"]');
                const name = await userTitle.getText();
                expect(await expect(name).toMatch('John Walker'));
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
