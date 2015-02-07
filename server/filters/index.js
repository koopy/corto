var SerializerFilter = require('./serializer-filter');
var PaginationFilter= require('./pagination-filter');

function setupFilter(app, container) {
  return [
    SerializerFilter.create({
      container: container,
      app: app
    }),
    PaginationFilter.create({
      container: container,
      app: app
    })
  ];
}

module.exports = setupFilter;

