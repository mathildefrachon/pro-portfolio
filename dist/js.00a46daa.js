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
})({"js/index.js":[function(require,module,exports) {
"use strict";

var json_link = "https://portfolio-backend.mathildefrachon.com/wp-json/wp/v2/projects?_embed&per_page=20";
var urlParams = new URLSearchParams(window.location.search);
var gallery = document.querySelector("#gallery");
window.addEventListener("DOMContentLoaded", init);
/* THIS IS AFTER CLICKING ON A PROJECT / SUBPAGE */

var cat = urlParams.get("category");
var activeFilter = cat;

if (cat) {
  console.log("array have a category : " + cat);
  json_link = json_link + "&categories=" + cat;
} // CREATE OBJECT PROJECT


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
var currentArray = [];

function init() {
  // fetch JSON
  fetch(json_link).then(function (e) {
    return e.json();
  }).then(function (data) {
    return buildList(data);
  });
} // BUILD THE ARRAY OF PROJECTS


function buildList(data) {
  data.forEach(function (dataProject) {
    project = Object.create(objProject);
    project.name = dataProject.title.rendered;
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

    projectsArray.push(project);
    project.id = projectsArray.indexOf(project);
  });
  currentArray = projectsArray;
  displayArray(currentArray);
} // DISPLAY THE ARRAY IN GALLERY AND IN SUBPAGE


function displayArray(currentArray) {
  var urlParams = new URLSearchParams(window.location.search);
  var urlIndex = urlParams.get("index");

  if (urlIndex === null) {
    displayList(currentArray);
    console.log("we are on gallery");
  } else {
    displayProject(currentArray);
    console.log("we are on subpage");
  }
} // DISPLAY ARRAY IN THE GALLERY


function displayList(listOfProjects) {
  currentArray = listOfProjects; //CLEAR THE TABLE

  clearList(); // CLONE FOR EACH PROJECT

  cloneProject(listOfProjects);
} //CLONE BY PROJECT AND APPEND


function cloneProject(listOfProjects) {
  listOfProjects.forEach(function (oneProject) {
    var template = document.querySelector("#project-template").content;
    var clone = template.cloneNode(true); // FILL IN THE CLONE
    // let projectWrap = clone.querySelector(".project-wrapper");

    imgLoaded(clone, oneProject); // APPEND

    gallery.appendChild(clone);
  });
} //WHEN IMG LOADED GIVE SRC AT PROJECT IMG + TAKE OUT LOADER


function imgLoaded(clone, oneProject) {
  var downloadingImage = new Image();
  var loader = clone.querySelector(".loader");
  var projectImg = clone.querySelector(".project-img");
  var projectWrap = clone.querySelector(".project-wrapper");
  var projectTitle = clone.querySelector("h2");

  downloadingImage.onload = function () {
    loader.classList.add("none");
    projectWrap.classList.remove("width-load");
    projectImg.classList.remove("none");
    checkImgOrientation(downloadingImage, projectImg, projectWrap);
  };

  downloadingImage.src = oneProject.image;
  var source = downloadingImage.src;
  displayImg(oneProject, projectImg, projectWrap, source, projectTitle);
} // GIVE PORTRAIT OR LANDSCAPE CLASS


function checkImgOrientation(downloadingImage, projectImg, projectWrap) {
  //   console.log(myProject);
  if (downloadingImage.naturalWidth > downloadingImage.naturalHeight) {
    console.log("landscape img");
    projectImg.classList.remove("portrait");
    projectImg.classList.add("landscape"); //for mobile

    if (window.innerWidth < 1000) {
      projectImg.style.marginBottom = "20%";
      projectWrap.style.height = "30vh";
    }
  } else if (downloadingImage.naturalWidth < downloadingImage.naturalHeight) {
    console.log("portrait img");
    projectImg.classList.add("portrait");
    projectImg.classList.remove("landscape");
  }
} // GIVE SOURCE TO projectImg IN HTML + TITLE + ID AND WPID TO EACH CLONE


function displayImg(oneProject, projectImg, projectWrap, source, projectTitle) {
  console.log(projectImg);
  projectImg.setAttribute("src", source);
  projectTitle.innerHTML = oneProject.name;
  projectImg.dataset.projectId = oneProject.id;
  projectImg.dataset.wpid = oneProject.wpid;
} // CLEAR THE ARRAY


function clearList() {
  gallery.innerHTML = "";
} // ------------------- FILTER THE ARRAY ------------------------- //
// SET ACTIVE FILTER NUMBER


function clickedFilter(event) {
  console.log("clickedFilter");
  console.log(this);
  var filter = this.dataset.filter;
  activeFilter = filter;
  event.preventDefault(); // PREVENT FROM GOIN BACK TO BEGINNING AFTER FILTERING

  currentArray = filterByCat(filter);
  console.log(currentArray);
  displayArray(currentArray, filter);
} // FILTER THE ARRAY AND RETURN IT


function filterByCat(filter) {
  currentArray = projectsArray.filter(byCat);

  function byCat(project) {
    if (project.category.toString() === filter.toString()) {
      return true;
    } else {
      return false;
    }
  }

  return currentArray;
} // SET URL SUBPAGE WITH WPID OF POST OR FILTER OF CATEGORY


function clickedPost(event) {
  var postClicked = event.target;
  console.log(postClicked);
  var index = postClicked.dataset.wpid;
  console.log(index);
  var url = "subpage.html?index=" + index;

  if (activeFilter) {
    url += "&category=" + activeFilter;
  }

  postClicked.parentElement.setAttribute("href", url);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60881" + '/');

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
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.map