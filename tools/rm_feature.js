'use strict';
// Summary:
//  Remove a feature: remove foler structure and files. If the feature folder contains
//  more than 20 files, nothing will happen, it should be deleted manually.
// Example:
//  node remove_feature.js employee

const path = require('path');
const _ = require('lodash');
const shell = require('shelljs');
const helpers = require('./helpers');

const args = process.argv;
const featureName = _.kebabCase(args[2]);

if (!featureName) {
  throw new Error('Please set the feature name');
}

const context = {
  FEATURE_NAME: _.upperFirst(_.camelCase(featureName)),
  CAMEL_FEATURE_NAME: _.camelCase(featureName),
  KEBAB_FEATURE_NAME: _.kebabCase(featureName),
  UPPER_SNAKE_FEATURE_NAME: _.kebabCase(featureName).toUpperCase(),
};

const filesToSave = [];
const toSave = helpers.getToSave(filesToSave);

const targetDir = `${__dirname}/../src/features/${context.KEBAB_FEATURE_NAME}`;

if (shell.test('-e', targetDir)) {
  if (shell.ls(targetDir).length > 20) {
    console.log('Feature not changed: files under the feature are more than 15. Please delete it manually.');
    process.exit();
  }

  // Remove all files
  shell.rm('-rf', targetDir);
} else {
  console.log('feature folder does not exist, try to remove common entries now...');
}

let lines;
let targetPath;

/* ===== Remove reducer from rootReducer.js ===== */
console.log('Remove from root reducer.');
targetPath = path.join(__dirname, '../src/common/rootReducer.js');
lines = helpers.getLines(targetPath);
helpers.removeLines(lines, `import ${context.CAMEL_FEATURE_NAME}Reducer from '../features/${context.KEBAB_FEATURE_NAME}/reducer';`);
helpers.removeLines(lines, `  ${context.CAMEL_FEATURE_NAME}: ${context.CAMEL_FEATURE_NAME}Reducer,`);
toSave(targetPath, lines);

/* ===== Remove route from routeConfig.js ===== */
console.log('Un-register route');
targetPath = path.join(__dirname, '../src/common/routeConfig.js');
lines = helpers.getLines(targetPath);
helpers.removeLines(lines, `import ${context.CAMEL_FEATURE_NAME}Route from '../features/${context.KEBAB_FEATURE_NAME}/route';`);
helpers.removeLines(lines, `    ${context.CAMEL_FEATURE_NAME}Route,`);
toSave(targetPath, lines);

/* ===== Remove entry from styles/index.less ===== */
console.log('Remove entry from styles/index.less');
targetPath = path.join(__dirname, '../src/styles/index.less');
lines = helpers.getLines(targetPath);
helpers.removeLines(lines, `@import '../features/${context.KEBAB_FEATURE_NAME}/style.less';`);
toSave(targetPath, lines);

// Save files
helpers.saveFiles(filesToSave);
console.log('Remove feature success: ', context.KEBAB_FEATURE_NAME);
