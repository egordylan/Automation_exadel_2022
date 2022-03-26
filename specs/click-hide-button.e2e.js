async function login() {
    await browser.url('https://viktor-silakov.github.io/course-sut');
    await $('#login').setValue('walker@jw.com');
    await $('#password').setValue('password');
    await $('button').click();
}

describe('Executing JS in a brovser context', function () {
    it('remove sticky top bar', async function () {
        await login();
        await browser.execute('document.getElementsByClassName("sticky-top")[0].remove()');
        await browser.pause(8000);
    });

    it('click on hidden button ', async function () {
        await browser.execute('document.getElementsByClassName("btn btn-danger")[0].click()');
        await browser.pause(1000);
        await browser.acceptAlert();
        await browser.pause(1000);
        
    });
});
