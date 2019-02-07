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
})({"float-panel/float-panel.js":[function(require,module,exports) {
var floatPanel = new McFloatPanel();
/* Float Panel v2016.10.28. Copyright www.menucool.com */

function McFloatPanel() {
  var i = [],
      s = [],
      h = "className",
      t = "getElementsByClassName",
      d = "length",
      l = "display",
      C = "transition",
      m = "style",
      B = "height",
      c = "scrollTop",
      k = "offsetHeight",
      a = "fixed",
      e = document,
      b = document.documentElement,
      j = function j(a, c, b) {
    if (a.addEventListener) a.addEventListener(c, b, false);else a.attachEvent && a.attachEvent("on" + c, b);
  },
      o = function o(c, d) {
    if (typeof getComputedStyle != "undefined") var b = getComputedStyle(c, null);else b = c.currentStyle;
    return b ? b[d] : a;
  },
      L = function L() {
    var a = e.body;
    return Math.max(a.scrollHeight, a[k], b.clientHeight, b.scrollHeight, b[k]);
  },
      O = function O(a, c) {
    var b = a[d];

    while (b--) {
      if (a[b] === c) return true;
    }

    return false;
  },
      g = function g(b, a) {
    return O(b[h].split(" "), a);
  },
      q = function q(a, b) {
    if (!g(a, b)) if (!a[h]) a[h] = b;else a[h] += " " + b;
  },
      p = function p(a, f) {
    if (a[h] && g(a, f)) {
      for (var e = "", c = a[h].split(" "), b = 0, i = c[d]; b < i; b++) {
        if (c[b] !== f) e += c[b] + " ";
      }

      a[h] = e.replace(/^\s+|\s+$/g, "");
    }
  },
      n = function n() {
    return window.pageYOffset || b[c];
  },
      z = function z(a) {
    return a.getBoundingClientRect().top;
  },
      F = function F(b) {
    var c = n();
    if (c > b.oS && !g(b, a)) q(b, a);else g(b, a) && c < b.oS && p(b, a);
  },
      x = function x() {
    for (var a = 0; a < s[d]; a++) {
      J(s[a]);
    }
  },
      J = function J(a) {
    if (a.oS) {
      a.fT && clearTimeout(a.fT);
      a.fT = setTimeout(function () {
        if (a.aF) F(a);else y(a);
      }, 50);
    } else y(a);
  },
      w = function w(d, c, b) {
    p(d, a);
    c[l] = "none";
    b.position = b.top = "";
  },
      y = function y(c) {
    var j = z(c),
        f = c[k],
        e = c[m],
        d = c.pH[m],
        h = n();

    if (j < c.oT && h > c.oS && !g(c, a) && (window.innerHeight || b.clientHeight) > f) {
      c.tP = h + j - c.oT;
      var p = L();
      if (f > p - c.tP - f) var i = f;else i = 0;
      d[l] = "block";
      d[C] = "none";
      d[B] = f + 1 + "px";
      c.pH[k];
      d[C] = "height .3s";
      d[B] = i + "px";
      q(c, a);
      e.position = a;
      e.top = c.oT + "px";
      if (o(c, "position") != a) d[l] = "none";
    } else if (g(c, a) && (h < c.tP || h < c.oS)) {
      var s = o(c, "animation");

      if (c.oS && c.classList && s.indexOf("slide-down") != -1) {
        var r = o(c, "animationDuration");
        c.classList.remove(a);
        e.animationDirection = "reverse";
        e.animationDuration = "300ms";
        void c[k];
        c.classList.add(a);
        setTimeout(function () {
          w(c, d, e);
          e.animationDirection = "normal";
          e.animationDuration = r;
        }, 300);
      } else w(c, d, e);
    }
  },
      I = function I() {
    var f = [],
        c,
        b;

    if (e[t]) {
      f = e[t]("float-panel");
      i = e[t]("slideanim");
    } else {
      var k = e.getElementsByTagName("*");
      c = k[d];

      while (c--) {
        g(k[c], "float-panel") && f.push(k[c]);
      }
    }

    c = f[d];

    for (var h = 0; h < c; h++) {
      b = s[h] = f[h];
      b.oT = parseInt(b.getAttribute("data-top") || 0);
      b.oS = parseInt(b.getAttribute("data-scroll") || 0);
      if (b.oS > 20 && o(b, "position") == a) b.aF = 1;
      b.pH = e.createElement("div");
      b.pH[m].width = b.offsetWidth + "px";
      b.pH[m][l] = "none";
      b.parentNode.insertBefore(b.pH, b.nextSibling);
    }

    if (s[d]) {
      setTimeout(x, 160);
      j(window, "scroll", x);
    }
  },
      f,
      D = 200,
      E = 0,
      r,
      u,
      H = function H() {
    return window.innerWidth || b.clientWidth || e.body.clientWidth;
  };

  function K() {
    if (!r) r = setInterval(function () {
      var a = e.body;
      if (a[c] < 3) a[c] = 0;else a[c] = a[c] / 1.3;
      if (b[c] < 3) b[c] = 0;else b[c] = b[c] / 1.3;

      if (!n()) {
        clearInterval(r);
        r = null;
      }
    }, 14);
  }

  function A() {
    clearTimeout(u);

    if (n() > D && H() > E) {
      u = setTimeout(function () {
        p(f, "mcOut");
      }, 60);
      f[m][l] = "block";
    } else {
      q(f, "mcOut");
      u = setTimeout(function () {
        f[m][l] = "none";
      }, 500);
    }
  }

  var N = function N() {
    f = e.getElementById("backtop");

    if (f) {
      var a = f.getAttribute("data-v-w");

      if (a) {
        a = a.replace(/\s/g, "").split(",");
        D = parseInt(a[0]);
        if (a[d] > 1) E = parseInt(a[1]);
      }

      j(f, "click", K);
      j(window, "scroll", A);
      A();
    }
  },
      v = function v() {
    for (var c = n(), e = c + window.innerHeight, g = i[d], b, f, a = 0; a < g; a++) {
      b = c + z(i[a]), f = b + i[a][k];
      if (b < e) q(i[a], "slide");else p(i[a], "slide");
    }
  },
      G = function G() {
    if (i[d]) {
      j(window, "scroll", v);
      v();
    }
  },
      M = function M() {
    I();
    N();
    G();
  };

  j(window, "load", M);
  j(document, "touchstart", function () {});
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51225" + '/');

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
},{}]},{},["../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","float-panel/float-panel.js"], null)
//# sourceMappingURL=/float-panel.91641834.map