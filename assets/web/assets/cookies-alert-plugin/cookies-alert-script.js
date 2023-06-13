var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, d) {
        a != Array.prototype && a != Object.prototype && (a[b] = d.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, d, e) {
  if (b) {
    d = $jscomp.global;
    a = a.split(".");
    for (e = 0; e < a.length - 1; e++) {
      var c = a[e];
      c in d || (d[c] = {});
      d = d[c];
    }
    a = a[a.length - 1];
    e = d[a];
    b = b(e);
    b != e &&
      null != b &&
      $jscomp.defineProperty(d, a, {
        configurable: !0,
        writable: !0,
        value: b,
      });
  }
};
$jscomp.polyfill(
  "Array.from",
  function (a) {
    return a
      ? a
      : function (b, a, e) {
          a =
            null != a
              ? a
              : function (f) {
                  return f;
                };
          var c = [],
            d =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              b[Symbol.iterator];
          if ("function" == typeof d) {
            b = d.call(b);
            for (var f = 0; !(d = b.next()).done; )
              c.push(a.call(e, d.value, f++));
          } else
            for (d = b.length, f = 0; f < d; f++) c.push(a.call(e, b[f], f));
          return c;
        };
  },
  "es6",
  "es3"
);
$jscomp.findInternal = function (a, b, d) {
  a instanceof String && (a = String(a));
  for (var e = a.length, c = 0; c < e; c++) {
    var k = a[c];
    if (b.call(d, k, c, a)) return { i: c, v: k };
  }
  return { i: -1, v: void 0 };
};
$jscomp.polyfill(
  "Array.prototype.find",
  function (a) {
    return a
      ? a
      : function (b, a) {
          return $jscomp.findInternal(this, b, a).v;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Object.is",
  function (a) {
    return a
      ? a
      : function (b, a) {
          return b === a ? 0 !== b || 1 / b === 1 / a : b !== b && a !== a;
        };
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.prototype.includes",
  function (a) {
    return a
      ? a
      : function (a, d) {
          var b = this;
          b instanceof String && (b = String(b));
          var c = b.length;
          d = d || 0;
          for (0 > d && (d = Math.max(d + c, 0)); d < c; d++) {
            var k = b[d];
            if (k === a || Object.is(k, a)) return !0;
          }
          return !1;
        };
  },
  "es7",
  "es3"
);
$jscomp.checkStringArgs = function (a, b, d) {
  if (null == a)
    throw new TypeError(
      "The 'this' value for String.prototype." +
        d +
        " must not be null or undefined"
    );
  if (b instanceof RegExp)
    throw new TypeError(
      "First argument to String.prototype." +
        d +
        " must not be a regular expression"
    );
  return a + "";
};
$jscomp.polyfill(
  "String.prototype.includes",
  function (a) {
    return a
      ? a
      : function (a, d) {
          return (
            -1 !==
            $jscomp.checkStringArgs(this, a, "includes").indexOf(a, d || 0)
          );
        };
  },
  "es6",
  "es3"
);
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.makeIterator = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill(
  "Promise",
  function (a) {
    function b() {
      this.batch_ = null;
    }
    function d(a) {
      return a instanceof c
        ? a
        : new c(function (f, b) {
            f(a);
          });
    }
    if (a && !$jscomp.FORCE_POLYFILL_PROMISE) return a;
    b.prototype.asyncExecute = function (a) {
      if (null == this.batch_) {
        this.batch_ = [];
        var f = this;
        this.asyncExecuteFunction(function () {
          f.executeBatch_();
        });
      }
      this.batch_.push(a);
    };
    var e = $jscomp.global.setTimeout;
    b.prototype.asyncExecuteFunction = function (a) {
      e(a, 0);
    };
    b.prototype.executeBatch_ = function () {
      for (; this.batch_ && this.batch_.length; ) {
        var a = this.batch_;
        this.batch_ = [];
        for (var b = 0; b < a.length; ++b) {
          var c = a[b];
          a[b] = null;
          try {
            c();
          } catch (g) {
            this.asyncThrow_(g);
          }
        }
      }
      this.batch_ = null;
    };
    b.prototype.asyncThrow_ = function (a) {
      this.asyncExecuteFunction(function () {
        throw a;
      });
    };
    var c = function (a) {
      this.state_ = 0;
      this.result_ = void 0;
      this.onSettledCallbacks_ = [];
      var b = this.createResolveAndReject_();
      try {
        a(b.resolve, b.reject);
      } catch (h) {
        b.reject(h);
      }
    };
    c.prototype.createResolveAndReject_ = function () {
      function a(a) {
        return function (f) {
          c || ((c = !0), a.call(b, f));
        };
      }
      var b = this,
        c = !1;
      return { resolve: a(this.resolveTo_), reject: a(this.reject_) };
    };
    c.prototype.resolveTo_ = function (a) {
      if (a === this)
        this.reject_(new TypeError("A Promise cannot resolve to itself"));
      else if (a instanceof c) this.settleSameAsPromise_(a);
      else {
        a: switch (typeof a) {
          case "object":
            var b = null != a;
            break a;
          case "function":
            b = !0;
            break a;
          default:
            b = !1;
        }
        b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a);
      }
    };
    c.prototype.resolveToNonPromiseObj_ = function (a) {
      var b = void 0;
      try {
        b = a.then;
      } catch (h) {
        this.reject_(h);
        return;
      }
      "function" == typeof b
        ? this.settleSameAsThenable_(b, a)
        : this.fulfill_(a);
    };
    c.prototype.reject_ = function (a) {
      this.settle_(2, a);
    };
    c.prototype.fulfill_ = function (a) {
      this.settle_(1, a);
    };
    c.prototype.settle_ = function (a, b) {
      if (0 != this.state_)
        throw Error(
          "Cannot settle(" +
            a +
            ", " +
            b +
            "): Promise already settled in state" +
            this.state_
        );
      this.state_ = a;
      this.result_ = b;
      this.executeOnSettledCallbacks_();
    };
    c.prototype.executeOnSettledCallbacks_ = function () {
      if (null != this.onSettledCallbacks_) {
        for (var a = 0; a < this.onSettledCallbacks_.length; ++a)
          k.asyncExecute(this.onSettledCallbacks_[a]);
        this.onSettledCallbacks_ = null;
      }
    };
    var k = new b();
    c.prototype.settleSameAsPromise_ = function (a) {
      var b = this.createResolveAndReject_();
      a.callWhenSettled_(b.resolve, b.reject);
    };
    c.prototype.settleSameAsThenable_ = function (a, b) {
      var c = this.createResolveAndReject_();
      try {
        a.call(b, c.resolve, c.reject);
      } catch (g) {
        c.reject(g);
      }
    };
    c.prototype.then = function (a, b) {
      function d(a, b) {
        return "function" == typeof a
          ? function (b) {
              try {
                g(a(b));
              } catch (m) {
                f(m);
              }
            }
          : b;
      }
      var g,
        f,
        e = new c(function (a, b) {
          g = a;
          f = b;
        });
      this.callWhenSettled_(d(a, g), d(b, f));
      return e;
    };
    c.prototype.catch = function (a) {
      return this.then(void 0, a);
    };
    c.prototype.callWhenSettled_ = function (a, b) {
      function c() {
        switch (g.state_) {
          case 1:
            a(g.result_);
            break;
          case 2:
            b(g.result_);
            break;
          default:
            throw Error("Unexpected state: " + g.state_);
        }
      }
      var g = this;
      null == this.onSettledCallbacks_
        ? k.asyncExecute(c)
        : this.onSettledCallbacks_.push(c);
    };
    c.resolve = d;
    c.reject = function (a) {
      return new c(function (b, c) {
        c(a);
      });
    };
    c.race = function (a) {
      return new c(function (b, c) {
        for (
          var g = $jscomp.makeIterator(a), e = g.next();
          !e.done;
          e = g.next()
        )
          d(e.value).callWhenSettled_(b, c);
      });
    };
    c.all = function (a) {
      var b = $jscomp.makeIterator(a),
        e = b.next();
      return e.done
        ? d([])
        : new c(function (a, c) {
            function g(b) {
              return function (c) {
                f[b] = c;
                h--;
                0 == h && a(f);
              };
            }
            var f = [],
              h = 0;
            do
              f.push(void 0),
                h++,
                d(e.value).callWhenSettled_(g(f.length - 1), c),
                (e = b.next());
            while (!e.done);
          });
    };
    return c;
  },
  "es6",
  "es3"
);
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    function a() {
      c.style.top = 0;
      c.style.left = 0;
      c.style.position = "fixed";
      c.style.display = "block";
      c.style.background = "#ffffff";
      c.style.height = "100%";
      c.style.width = "100%";
      c.style.zIndex = "9998";
      c.appendChild(d);
      document.body.appendChild(c);
    }
    var b = document.querySelector("input[name=cookieData]"),
      d = document.createElement("div");
    d.innerHTML =
      "\n        <style>\n            .spinner {\n                animation: rotate 2s linear infinite;\n                z-index: 2;\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                margin: -25px 0 0 -25px;\n                width: 50px;\n                height: 50px;\n            }\n            \n            .path {\n                stroke: " +
      b.getAttribute("data-cookie-colorButton") +
      ';\n                stroke-linecap: round;\n                animation: dash 1.5s ease-in-out infinite;\n            }\n            \n            @keyframes rotate {\n                100% {\n                    transform: rotate(360deg);\n                }\n            }\n            \n            @keyframes dash {\n                0% {\n                    stroke-dasharray: 1, 150;\n                    stroke-dashoffset: 0;\n                }\n                50% {\n                    stroke-dasharray: 90, 150;\n                    stroke-dashoffset: -35;\n                }\n                100% {\n                    stroke-dasharray: 90, 150;\n                    stroke-dashoffset: -124;\n                }\n            }          \n        </style>\n        <svg class="spinner" viewBox="0 0 50 50">\n            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>\n        </svg>';
    var e = document.createElement("div"),
      c = document.createElement("div");
    (function (a) {
      a += "=";
      for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
        for (var d = b[c]; " " == d.charAt(0); ) d = d.substring(1, d.length);
        if (0 === d.indexOf(a)) return d.substring(a.length, d.length);
      }
      return null;
    })("cookiesDirective")
      ? a()
      : "3" === b.getAttribute("data-cookie-cookiesAlertType") &&
        b.getAttribute("data-cookie-customDialogSelector") &&
        ((e.style.top = 0),
        (e.style.left = 0),
        (e.style.position = "fixed"),
        (e.style.display = "block"),
        (e.style.background = "#000000"),
        (e.style.opacity = 0.01 * b.getAttribute("data-cookie-opacityOverlay")),
        (e.style.height = "100%"),
        (e.style.width = "100%"),
        (e.style.zIndex = "1050"),
        document.body.appendChild(e));
    cookiesDirective && b
      ? (new cookiesDirective({
          customDialogSelector:
            "null" === b.getAttribute("data-cookie-customDialogSelector")
              ? null
              : b.getAttribute("data-cookie-customDialogSelector"),
          explicitConsent:
            "2" === b.getAttribute("data-cookie-cookiesAlertType") ||
            "3" === b.getAttribute("data-cookie-cookiesAlertType")
              ? !0
              : !1,
          cookiesAlertType: b.getAttribute("data-cookie-cookiesAlertType"),
          position: "bottom",
          duration: 0,
          limit: 0,
          message: b.getAttribute("data-cookie-text"),
          fontFamily: "Arial",
          fontColor: b.getAttribute("data-cookie-colorText"),
          fontSize: "13px",
          backgroundColor: b.getAttribute("data-cookie-colorBg"),
          bgOpacity: b.getAttribute("data-cookie-bgOpacity"),
          backgroundOpacity: b.getAttribute("data-cookie-opacityOverlay"),
          linkColor: b.getAttribute("data-cookie-colorLink"),
          underlineLink: b.getAttribute("data-cookie-underlineLink"),
          textButton: b.getAttribute("data-cookie-textButton"),
          colorButton: b.getAttribute("data-cookie-colorButton"),
          rejectColor: b.getAttribute("data-cookie-rejectColor"),
          animate:
            "null" === b.getAttribute("data-cookie-customDialogSelector"),
          rejectText: b.getAttribute("data-cookie-rejectText"),
          scriptWrapper: function () {
            function b(a) {
              return new Promise(function (b, c) {
                a.getAttribute("data-src")
                  ? ((c = document.createElement("script")),
                    document.body.appendChild(c),
                    (c.onload = function (a) {
                      b();
                    }),
                    (c.onerror = function () {
                      b();
                    }),
                    (c.src = a.getAttribute("data-src")))
                  : ((c = document.createElement("script")),
                    document.body.appendChild(c),
                    (c.innerHTML = a.innerHTML),
                    b());
                a.remove();
              });
            }
            a();
            e && e.remove();
            var d = Array.from(document.querySelectorAll("script")),
              l = d.find(function (a) {
                if (a.getAttribute("data-src"))
                  return a
                    .getAttribute("data-src")
                    .includes("theme/js/script.js");
              });
            d.push(d.splice(d.indexOf(l), 1)[0]);
            var h = Promise.resolve();
            d.forEach(function (a) {
              a.src ||
                "text/javascript" === a.type ||
                (h = h.then(function () {
                  return b(a);
                }));
            });
            h.then(function () {
              c.remove();
              e.remove();
            });
            document.querySelectorAll("iframe").forEach(function (a) {
              a.src ||
                ((a.src = a.getAttribute("data-src")),
                a.removeAttribute("data-src"));
            });
            document.querySelectorAll("link").forEach(function (a) {
              a.href ||
                ((a.href = a.getAttribute("data-href")),
                a.removeAttribute("data-href"));
            });
            document
              .querySelectorAll("embed, object, img")
              .forEach(function (a) {
                a.src ||
                  ((a.src = a.getAttribute("data-src")),
                  a.removeAttribute("data-src"));
              });
          },
        }),
        b.remove())
      : (c.remove(), e.remove());
  });
})();
