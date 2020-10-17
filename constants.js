const path = require('path');

const WEBSITE_TO_PROXY = 'https://www.inrhythm.com';

const INJECTED_CODE = `
  <link href="/dist/index.css" rel="stylesheet">
  <script src="/dist/index.js"></script>
`;

module.exports = {
  INJECTED_CODE,
  WEBSITE_TO_PROXY,
};
