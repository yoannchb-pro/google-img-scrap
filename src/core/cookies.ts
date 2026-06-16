import fs from 'fs';
import path from 'path';
import { connect } from 'puppeteer-real-browser';
import GOOGLE_CONSTANT from '../constant/GOOGLE_CONSTANT';

const CACHE_FILE = path.join(__dirname, 'cookies-cache.json');

// Cache lifetime (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

interface CookieCache {
  cookies: string;
  proxy: string;
  timestamp: number;
}

/**
 * Check if the cache is still valid.
 * The cache is only valid if:
 * - The proxy is the same
 * - The cache has not expired
 */
function isCacheValid(cache: CookieCache, proxy: string): boolean {
  const now = Date.now();

  return cache.proxy === proxy && now - cache.timestamp < CACHE_DURATION;
}

/**
 * Load cookies from cache.
 * Returns null if:
 * - Cache does not exist
 * - Proxy changed
 * - Cache expired
 */
function loadCache(proxy: string): string | null {
  if (!fs.existsSync(CACHE_FILE)) {
    return null;
  }

  const cache: CookieCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

  if (!isCacheValid(cache, proxy)) {
    fs.unlinkSync(CACHE_FILE);

    return null;
  }

  return cache.cookies;
}

/**
 * Save cookies with the current proxy.
 */
function saveCache(cookies: string, proxy: string): void {
  const cache: CookieCache = {
    cookies,
    proxy,
    timestamp: Date.now()
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * Clear the cookies cache file.
 */
export function clearCacheCookies(): void {
  if (fs.existsSync(CACHE_FILE)) {
    fs.unlinkSync(CACHE_FILE);
  }
}

/**
 * Convert Puppeteer cookies into a Cookie header string.
 */
function cookiesToString(cookies: any[]): string {
  return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}

/**
 * Open browser and retrieve new cookies.
 */
async function fetchNewCookies(proxy: string): Promise<string> {
  const { browser, page } = await connect({
    headless: true,
    args: [`--proxy-server=${proxy}`]
  });

  await page.setUserAgent(GOOGLE_CONSTANT.headers['User-Agent']);

  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9'
  });

  await page.goto('https://www.google.com/search?udm=2&q=cats', {
    waitUntil: 'networkidle2'
  });

  const cookies = await page.browserContext().cookies();

  const cookieString = cookiesToString(cookies);

  await browser.close();

  saveCache(cookieString, proxy);

  return cookieString;
}

/**
 * Main function.
 *
 * Returns cookies matching the current proxy.
 */
export async function getCookies(proxy: string): Promise<string> {
  const cachedCookies = loadCache(proxy);

  if (cachedCookies) {
    return cachedCookies;
  }

  return await fetchNewCookies(proxy);
}
