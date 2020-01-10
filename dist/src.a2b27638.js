// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

document.getElementById("app").innerHTML = "\n<h1>Hello Vanilla!</h1>\n<div>\n  We use Parcel to bundle this sandbox, you can find more info about Parcel\n  <a href=\"https://parceljs.org\" target=\"_blank\" rel=\"noopener noreferrer\">here</a>.\n</div>\n"; // cache example

var isUnique = function isUnique(arr) {
  var cache = {};
  var result = true;

  for (var i = 0; i < arr.length; i++) {
    console.log("~~~LOOP~~~ i === ".concat(i));

    if (cache[arr[i]]) {
      return false;
    } else {
      cache[arr[i]] = true;
    }
  }

  return result;
};

console.log('isUnique 1', isUnique([1, 2, 3]));
console.log('isUnique 2', isUnique([1, 1, 3]));
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Unique sort'); //___________________________________Unique sort

var uniqueSort = function uniqueSort(arr) {
  var cache = {};
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (!cache[arr[i]]) {
      result.push(arr[i]);
      cache[arr[i]] = true;
    }
  }

  return result.sort(function (a, b) {
    return a - b;
  });
};

uniqueSort([4, 2, 2, 3, 2, 2, 2]);
console.log(uniqueSort([4, 2, 2, 3, 2, 2, 2]));
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Basic memoization');

var times10 = function times10(n) {
  return n * 10;
};

times10(9);
console.log(times10(9));
var basicMemoCache = {};

var memoTimes10 = function memoTimes10(n) {
  console.log('basicMemoCache 1', basicMemoCache);

  if (n in basicMemoCache) {
    console.log('basicMemoCache 2', basicMemoCache);
    console.log('Fetching from cache', n);
    return basicMemoCache[n];
  } else {
    console.log('basicMemoCache 3', basicMemoCache);
    console.log('Calculating result');
    var result = times10(n);
    basicMemoCache[n] = result;
    return result;
  }
};

console.log(memoTimes10(9), 'calculating');
console.log(memoTimes10(9), 'calculated');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoization with Closure');

var memoizedClosureTimes10 = function memoizedClosureTimes10(n) {
  var closureCache = {};
  return function (n) {
    console.log('closureCache 1', closureCache);

    if (n in closureCache) {
      console.log('closureCache 2', closureCache);
      console.log('Fetching from cache', n);
      return closureCache[n];
    } else {
      console.log('closureCache 3', closureCache);
      console.log('Calculating result');
      var result = times10(n);
      closureCache[n] = result;
      return result;
    }
  };
};

var memoClosureTimes10 = memoizedClosureTimes10();

try {
  console.log(memoClosureTimes10(9), 'calculating');
  console.log(memoClosureTimes10(9), 'calculated');
} catch (e) {
  console.error('Memoization with Closure ERROR: ', e);
}

;
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Generic Memoize Function');

var genericMemoizedFunction = function genericMemoizedFunction(cb) {
  var genericMemoCache = {};
  return function () {
    console.log('genericMemoCache 1', genericMemoCache);

    for (var _len = arguments.length, n = new Array(_len), _key = 0; _key < _len; _key++) {
      n[_key] = arguments[_key];
    }

    if (n in genericMemoCache) {
      console.log('genericMemoCache 2', genericMemoCache);
      console.log('Fetching from cache', n);
      return genericMemoCache[n];
    } else {
      console.log('genericMemoCache 3', genericMemoCache);
      console.log('Calculating result');
      var result = cb.apply(void 0, n);
      genericMemoCache[n] = result;
      return result;
    }
  };
};

var genericMemoFunc = genericMemoizedFunction(times10);

try {
  console.log(genericMemoFunc(9), 'calculating');
  console.log(genericMemoFunc(9), 'calculated');
} catch (e) {
  console.error('Memoization with Closure ERROR: ', e);
}

;
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Memoized Factorial in Closure');

function memoFactorial(n) {
  var cache = {};
  return function (n) {
    var result = 1;

    if (n in cache) {
      return cache[n];
    } else {
      for (var i = 2; i <= n; i++) {
        console.log("result ".concat(result, " * number ").concat(n, " =  ").concat(result * n));
        result *= i;
      }

      cache[n] = result;
      return result;
    }
  };
}

var memoFact = memoFactorial();
console.log(memoFact(5), 'calculating');
console.log(memoFact(5), 'calculated');
console.log(memoFact(6), 'calculating');
console.log(memoFact(5), 'calculated');
console.log(memoFact(6), 'calculated');
console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Recursive Memoized Factorial');

function memoRecursiveFactorial(callbackFactorial) {
  var cache = {};
  return function (number) {
    if (cache[number]) {
      return cache[number];
    } else {
      var result = callbackFactorial(number);
      cache[number] = result;
      return result;
    }
  };
}

function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    console.log("number ".concat(factorial(n - 1), " * ").concat(n, " = ").concat(n * factorial(n - 1)));
    return n * factorial(n - 1);
  }
}

;
var memoRF = memoRecursiveFactorial(factorial);
console.log(memoRF(5), 'calculating');
console.log(memoRF(5), 'calculated');
console.log(memoRF(6), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(6), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated');
console.log(memoRF(5), 'calculated'); // console.log(factorial(6))
},{"./styles.css":"src/styles.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52132" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map