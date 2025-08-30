import { test, expect } from '@playwright/test'

test('smoke: homepage responds', async ({ page, request }) => {
  // Prefer direct HTTP check to avoid full rendering flakiness
  const resp = await request.get('/')
  expect(resp.status()).toBeGreaterThanOrEqual(200)
  expect(resp.status()).toBeLessThan(400)

  // Also open page to ensure basic render works
  await page.goto('/')
  await expect(page).toHaveTitle(/home|fishing|guide|welcome/i)
})
