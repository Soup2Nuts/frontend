//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [

        'app/services/apiService_test.js',
        'scenarios.js',
        '*_test.js',
    //  '*.js',
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8887',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
