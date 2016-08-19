// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/components/angular/angular.js',
  'app/components/angular-mocks/angular-mocks.js',
  'app/components/angular-resource/angular-resource.js',
  'app/components/angular-route/angular-route.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'app/scripts/controllers/termine.js',
//  'test/mock/**/*.js',
  'test/spec/controllers/termine.js',
  'test/spec/services/terminService.js',
  'test/spec/services/dateService.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
