const { GOOGLE_IMG_SCRAP } = require('../dist');
/**
 * Example demonstrating rate limiting and retry features
 * This example shows how to:
 * 1. Handle rate limits with automatic retries
 * 2. Use proxy rotation to avoid rate limits
 * 3. Implement delays between requests
 */

async function main() {
  try {
    // Example 1: Basic usage with rate limiting
    console.log('Example 1: Basic usage with automatic retries');
    const result1 = await GOOGLE_IMG_SCRAP({
      search: 'cats',
      limit: 5 // Limiting results to reduce request load
    });
    console.log('Successfully retrieved images:', result1.result.length);

    // Example 2: Using proxy to avoid rate limits
    console.log('\nExample 2: Using proxy to avoid rate limits');
    const result2 = await GOOGLE_IMG_SCRAP({
      search: 'dogs',
      limit: 5,
      proxy: {
        protocol: 'http',
        host: 'your-proxy-host.com',
        port: 8080
      }
    });
    console.log('Successfully retrieved images with proxy:', result2.result.length);

    // Example 3: Implementing delays between requests
    console.log('\nExample 3: Implementing delays between multiple requests');
    const searches = ['cats', 'dogs', 'birds'];

    for (const search of searches) {
      console.log(`\nSearching for: ${search}`);
      const result = await GOOGLE_IMG_SCRAP({
        search,
        limit: 3
      });
      console.log(`Found ${result.result.length} images for ${search}`);

      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error('Error:', error.message);
    if (error.message.includes('Too many requests')) {
      console.log('Rate limit hit. Consider:');
      console.log('1. Using a proxy');
      console.log('2. Increasing delay between requests');
      console.log('3. Reducing the number of results per request');
    }
  }
}

main();
