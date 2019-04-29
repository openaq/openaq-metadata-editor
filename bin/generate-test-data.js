#! /usr/bin/env node

// Populate test fixtures with:
// npm run test-data > app/assets/scripts/tests/fixtures/location.json

const generateTestData = require('../app/assets/scripts/lib/generate-test-data');

const results = generateTestData();
console.log(JSON.stringify(results, null, 2));
