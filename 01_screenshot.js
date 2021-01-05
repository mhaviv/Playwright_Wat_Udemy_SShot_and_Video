const { chromium } = require('playwright');
const expect = require('expect');

(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    // Check we are on the right page
    await page.goto('https://react-redux.realworld.io/#/login')
    const title = await page.title()
    expect(title).toBe('Conduit')

    await page.fill('input[type = "email"]', 'qacamp.acad@gmail.com')
    await page.press('input[type = "email"]', 'Tab')
    await page.type('input[type = "password"]', 'test12345')
    await page.click('form >> "Sign in"')

    const html = await page.innerHTML('.feed-toggle')
    expect(html).toMatch('Your Feed')

    // await page.screenshot() // take a screenshot
    // await page.screenshot({path: 'SignIn.png'}) // In order to save the screenshot, we have to provide the path (will be placed in project root folder). Accepted types are png or jpeg
    await page.screenshot({path: 'SignIn.png', fullPage: true}) // to take screenshot of full page set attribute to true

    await browser.close()
}) ()