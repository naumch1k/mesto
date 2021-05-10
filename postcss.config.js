const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
}; 

var ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {});