const { chromium } = require('playwright');
const expect = require('expect');
const { saveVideo } = require('playwright-video'); // currently only records on chromium browser

(async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    // await saveVideo(page, 'SignIn.mp4') // specify page and path where video will be saved. Video stops automatically when page closes
    const capture = await saveVideo(page, 'SignIn-2.mp4')

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

    await capture.stop() // to stop video explicitly

    await browser.close()
}) ()