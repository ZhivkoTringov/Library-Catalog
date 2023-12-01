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

test('Submit the Form with Empty Input Fields', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Submit the Form with Empty Email Input Field', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[id="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Submit the Form with Empty Password Input Field', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

test('Submit the Form with Valid Values', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'zhivko@abv.bg');
    await page.fill('input[id="password"]', '12345');
    await page.click('input[type="submit"]');
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Submit the Form with Empty Email', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[id="password"]', '12345');
    await page.fill('input[id="repeat-pass"]', '12345');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Submit the Form with Empty Values', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Submit the Form with Empty Password', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'zhivko@abv.bg');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Submit the Form with Empty Confirm Password', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'zhivko@abv.bg');
    await page.fill('input[id="password"]', '12345');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Submit the Form with Different Passwords', async ({ page}) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'zhivko@abv.bg');
    await page.fill('input[id="password"]', '12345');
    await page.fill('input[id="repeat-pass"]', '1234');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register');
});

test('Add book with correct data', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'http://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL('http://localhost:3000/catalog');
    expect(page.url()).toBe('http://localhost:3000/catalog');
});

test('Submit the Form with Empty Title Field', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'This is a test book description');
    await page.fill('#image', 'http://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Submit the Form with Empty Description Field', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#image', 'http://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Submit the Form with Empty Image URL Field', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'This is a test book description');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create');
});

test('Login and verify all books are displayed', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

test('Verify That Logged-In User Sees Details Button and Button Works Correctly', async ({ page}) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[id="password"]', '123456');
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailPageTitle = await page.textContent('.book-information h3');
    expect(detailPageTitle).toBe('Test Book');
});

test('Verify That Guest User Sees Details Button and Button Works Correctly', async ({ page}) => {
    await page.goto('http://localhost:3000');
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailPageTitle = await page.textContent('.book-information h3');
    expect(detailPageTitle).toBe('Test Book');
});

test('Verify That All Info Is Displayed Correctly', async ({ page}) => {
    await page.goto('http://localhost:3000');
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailPageTitle = await page.textContent('.book-information h3');
    expect(detailPageTitle).toBe('Test Book');
    const detailPageType = await page.textContent('#details-page > div.book-information > p.type');
    expect(detailPageType).toBe('Type: Fiction');
    const detailPageDescription = await page.textContent('.book-description h3');
    expect(detailPageDescription).toBe('Description:');
    const detailPageDescriptionText = await page.textContent('.book-description p');
    expect(detailPageDescriptionText).toBe('This is a test book description');
});