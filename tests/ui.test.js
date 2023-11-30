const { test, expect } = require("@playwright/test")

test('Verify "All Books" link is visible', async ({ page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login Button" is visible', async ({ page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    const MyBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await MyBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    const AddBooksLink = await page.$('a[href="/create"]');
    const isLinkVisible = await AddBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "User email" is visible after user login', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    const User_email = await page.$('#user>span');
    const isLinkVisible = await User_email.isVisible();
    expect(isLinkVisible).toBe(true);
});


test('Login with valid credentials', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});