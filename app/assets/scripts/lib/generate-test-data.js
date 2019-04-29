const jsf = require('json-schema-faker');
const schema = require('../schema/location.json');

schema.properties.id.faker = 'random.alphaNumeric';
schema.properties.city.faker = 'address.city';
schema.properties.country.faker = 'address.countryCode';
schema.properties.altitude.minimum = 0;
schema.properties.altitude.maximum = 4000;
schema.properties.activationDate.faker = 'date.past';
schema.properties.deactivationDate.faker = 'date.past';
schema.properties.coordinates.properties.latitude.faker = 'address.latitude';
schema.properties.coordinates.properties.longitude.faker = 'address.longitude';
schema.properties.instruments.items.properties.activationDate.faker = 'date.past';
schema.properties.instruments.items.properties.deactivationDate.faker = 'date.past';

jsf.option('alwaysFakeOptionals', true);
jsf.option('fillProperties', true);
jsf.option('optionalsProbability', 1);
jsf.extend('faker', () => require('faker'));

module.exports = function generateTestData () {
  const results = [];
  let total = 10;

  while (total > 0) {
    results.push(jsf.generate(schema));
    total--;
  }
  
  return results
}
