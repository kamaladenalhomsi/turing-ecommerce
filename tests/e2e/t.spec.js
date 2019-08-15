describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://example.com/');
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Example');
  });
});