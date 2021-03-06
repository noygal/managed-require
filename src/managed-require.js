var npmi = require('npmi');
var sync = require('synchronize');
var npmi = sync(npmi);

function combine(obj1, obj2) {
  var result = {}
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) result[key] = obj2[key];
  }
  for (var key in obj1) {
    if (obj1.hasOwnProperty(key)) result[key] = obj1[key];
  }
  return result;
}

var defaults = {
  // path : '.',
  // versions : [{
  //   packageName : '',
  //   version : '*'
  // }],
  // forceInstall : false,
  npmLoad: {
    save: true
      // loglevel: 'verbose',
  }
};

function managedRequire(packageName, npmiOptions) {
  // console.log(packageName);
  try {
    return require(packageName);
  } catch (error) {
    if (packageName.indexOf('./') !== -1) throw error;
    sync.fiber(function() {
      console.log('hi');
      var options = combine(npmiOptions, defaults);
      options.name = packageName;
      npmi(options);
      console.log('hi2');
      return require(packageName);
    });
  }
}

function config(options) {
  defualts = combine(options, defaults);
  return managedRequire;
}

module.exports = managedRequire;
module.exports.config = config;
