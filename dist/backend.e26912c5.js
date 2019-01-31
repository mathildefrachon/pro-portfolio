// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"js/backend.js":[function(require,module,exports) {
"use strict"; // categories = 4;

var json_link = "https://portfolio-backend.mathildefrachon.com/wp-json/wp/v2/projects?_embed&per_page=20";
var urlParams = new URLSearchParams(window.location.search);
/* THIS IS AFTER CLICKING ON A PROJECT / SUBPAGE */

var cat = urlParams.get("category");
var activeFilter = cat;

if (cat) {
  console.log("array have a category : " + cat);
  json_link = json_link + "&categories=" + cat;
}
/* THIS JAVASCRIPT FETCH THE DATA AND CREATE AN ARRAY OF POSTS - FILTER THE ARRAY  */
// CREATE OBJECT PROJECT


var objProject = {
  name: "",
  subtitle: "",
  type: "",
  description: "",
  keywords: "",
  image: "",
  category: "",
  relatedpost: {
    title: "",
    url: ""
  },
  otherimages: [],
  id: null,
  wpid: null
};
var project = "";
var projectsArray = [];
var currentArray = []; // FETCHING

window.addEventListener("DOMContentLoaded", init); //ignoreHTTPSErrors: true;

function init() {
  // fetch JSON
  fetch(json_link).then(function (e) {
    return e.json();
  }).then(function (data) {
    return showData(data);
  });
}

function showData(data) {
  // build the list
  data.forEach(function (dataProject) {
    // console.log(dataProject);
    project = Object.create(objProject);
    project.name = dataProject.title.rendered; // project.id = dataProject.id;

    project.wpid = dataProject.id;
    project.image = dataProject._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    project.subtitle = dataProject.acf.subtitle;
    project.type = dataProject.acf.type;
    project.description = dataProject.acf.description;
    project.keywords = dataProject.acf.keywords;
    project.otherimages = [];
    project.category = dataProject.categories;

    for (var key in dataProject.acf) {
      if (key.startsWith("other_images") && dataProject.acf[key]) {
        project.otherimages.push(dataProject.acf[key]);
      }
    }

    console.log(project.wpid);
    console.table(project.otherimages);
    project.otherimage = dataProject.acf.other_images.url; // DONT KNOW

    project.relatedpost.title = dataProject.acf.related_posts.title;
    projectsArray.push(project);
    console.log(projectsArray);
    project.id = projectsArray.indexOf(project); // console.log(project);
  });
  currentArray = projectsArray; // display the list

  displayArray(currentArray);
} // SEE IF WE ARE ON THE SUBPAGE OR NOT TO DISPLAY THE LIST OR THE PROJECT


function displayArray(currentArray, filter, all) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlIndex = urlParams.get("index");

  if (urlIndex === null) {
    displayList(currentArray);
    console.log("we are on gallery");
  } else {
    displayProject(currentArray);
    console.log("we are on subpage");
  }
} // FILTER BY CATEGORIES


function filterByCat(filter) {
  currentArray = projectsArray.filter(byCat);

  function byCat(project) {
    if (project.category.toString() === filter.toString()) {
      return true;
    } else {
      return false;
    }
  } // console.log(currentArray + "is array after filtering");
  // localStorage.setItem("someVarKey", currentArray);
  // console.log(localStorage.getItem("someVarKey"));


  return currentArray;
}
},{}],"../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56960" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/backend.js"], null)
//# sourceMappingURL=/backend.e26912c5.map