//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
     //
     // 'services/apiService_test.js',
        '*.js',
      //'*_test.js'

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
