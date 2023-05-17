// https://github.com/serpapi/google-search-results-nodejs
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("0e14fd727e7f06fab76eed708cfbb5b57725332d0818e29973faedd8bc2279b3");

const params = {
  engine: "google",
  q: "Fresh Bagels",
  location: "Seattle-Tacoma, WA, Washington, United States",
  hl: "en",
  gl: "us",
  google_domain: "google.com",
  num: "10",
  start: "10",
  safe: "active"
};

const callback = function(data) {
  console.log(data["organic_results"]);
};

// Show result as JSON
search.json(params, callback);