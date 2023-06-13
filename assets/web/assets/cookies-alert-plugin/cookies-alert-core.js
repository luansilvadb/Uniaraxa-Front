var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.owns = function (a, d) {
  return Object.prototype.hasOwnProperty.call(a, d);
};
$jscomp.assign =
  "function" == typeof Object.assign
    ? Object.assign
    : function (a, d) {
        for (var c = 1; c < arguments.length; c++) {
          var b = arguments[c];
          if (b) for (var e in b) $jscomp.owns(b, e) && (a[e] = b[e]);
        }
        return a;
      };
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, d, c) {
        a != Array.prototype && a != Object.prototype && (a[d] = c.value);
      };
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a
    ? a
    : "undefined" != typeof global && null != global
    ? global
    : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, d, c, b) {
  if (d) {
    c = $jscomp.global;
    a = a.split(".");
    for (b = 0; b < a.length - 1; b++) {
      var e = a[b];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    b = c[a];
    d = d(b);
    d != b &&
      null != d &&
      $jscomp.defineProperty(c, a, {
        configurable: !0,
        writable: !0,
        value: d,
      });
  }
};
$jscomp.polyfill(
  "Object.assign",
  function (a) {
    return a || $jscomp.assign;
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Array.from",
  function (a) {
    return a
      ? a
      : function (a, c, b) {
          c =
            null != c
              ? c
              : function (a) {
                  return a;
                };
          var d = [],
            g =
              "undefined" != typeof Symbol &&
              Symbol.iterator &&
              a[Symbol.iterator];
          if ("function" == typeof g) {
            a = g.call(a);
            for (var f = 0; !(g = a.next()).done; )
              d.push(c.call(b, g.value, f++));
          } else
            for (g = a.length, f = 0; f < g; f++) d.push(c.call(b, a[f], f));
          return d;
        };
  },
  "es6",
  "es3"
);
$jscomp.arrayIteratorImpl = function (a) {
  var d = 0;
  return function () {
    return d < a.length ? { done: !1, value: a[d++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function (a, d) {
  this.$jscomp$symbol$id_ = a;
  $jscomp.defineProperty(this, "description", {
    configurable: !0,
    writable: !0,
    value: d,
  });
};
$jscomp.SymbolClass.prototype.toString = function () {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = (function () {
  function a(c) {
    if (this instanceof a) throw new TypeError("Symbol is not a constructor");
    return new $jscomp.SymbolClass(
      $jscomp.SYMBOL_PREFIX + (c || "") + "_" + d++,
      c
    );
  }
  var d = 0;
  return a;
})();
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a ||
    (a = $jscomp.global.Symbol.iterator =
      $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[a] &&
    $jscomp.defineProperty(Array.prototype, a, {
      configurable: !0,
      writable: !0,
      value: function () {
        return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
      },
    });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.initSymbolAsyncIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a ||
    (a = $jscomp.global.Symbol.asyncIterator =
      $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function () {};
};
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = { next: a };
  a[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function (a, d) {
  $jscomp.initSymbolIterator();
  a instanceof String && (a += "");
  var c = 0,
    b = {
      next: function () {
        if (c < a.length) {
          var e = c++;
          return { value: d(e, a[e]), done: !1 };
        }
        b.next = function () {
          return { done: !0, value: void 0 };
        };
        return b.next();
      },
    };
  b[Symbol.iterator] = function () {
    return b;
  };
  return b;
};
$jscomp.polyfill(
  "Array.prototype.keys",
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (a) {
            return a;
          });
        };
  },
  "es6",
  "es3"
);
var defaultSettings = {
    explicitConsent: !0,
    position: "top",
    duration: 10,
    limit: 0,
    message: null,
    cookieScripts: null,
    privacyPolicyUri: "privacy.html",
    scriptWrapper: function () {},
    customDialogSelector: null,
    fontFamily: "helvetica",
    fontColor: "#FFFFFF",
    fontSize: "13px",
    backgroundColor: "#000000",
    bgOpacity: 100,
    linkColor: "#CA0000",
    underlineLink: !0,
    textButton: null,
    rejectText: null,
    colorButton: "",
    positionOffset: "0",
    animate: !0,
    callback: function () {},
  },
  cookiesDirective = function (a) {
    a = Object.assign({}, defaultSettings, a);
    checkConsentAndExecute(a);
  };
"undefined" !== typeof $ &&
  (($.cookiesDirective = function (a) {
    a = $.extend(defaultSettings, a);
    checkConsentAndExecute(a);
  }),
  ($.cookiesDirective.loadScript = function (a) {
    a = $.extend({ uri: "", appendTo: "body" }, a);
    var d = String(a.appendTo),
      c = document.createElement("script");
    c.src = a.uri;
    c.type = "text/javascript";
    c.onload = c.onreadystatechange = function () {};
    switch (a.appendTo) {
      case "head":
        $("head").append(c);
        break;
      case "body":
        $("body").append(c);
        break;
      default:
        $("#" + d).append(c);
    }
  }));
function invertHex(a) {
  a = a.slice(1);
  var d = parseInt(a.slice(0, 2), 16),
    c = parseInt(a.slice(2, 4), 16);
  a = parseInt(a.slice(4, 6), 16);
  return 186 < 0.299 * d + 0.587 * c + 0.114 * a ? "#000000" : "#FFFFFF";
}
var checkConsentAndExecute = function (a) {
    if (getCookie("cookiesDirective")) a.scriptWrapper();
    else {
      if (0 < a.limit) {
        if (getCookie("cookiesDisclosureCount")) {
          var d = getCookie("cookiesDisclosureCount");
          d++;
          setCookie("cookiesDisclosureCount", d, 1);
        } else setCookie("cookiesDisclosureCount", 1, 1);
        a.limit >= getCookie("cookiesDisclosureCount") && disclosure(a);
      } else disclosure(a);
      a.explicitConsent
        ? document
            .getElementById("explicitsubmit")
            .addEventListener("click", function () {
              a.scriptWrapper();
            })
        : a.scriptWrapper();
    }
  },
  getCookie = function (a) {
    a += "=";
    for (var d = document.cookie.split(";"), c = 0; c < d.length; c++) {
      for (var b = d[c]; " " == b.charAt(0); ) b = b.substring(1, b.length);
      if (0 === b.indexOf(a)) return b.substring(a.length, b.length);
    }
    return null;
  },
  setCookie = function (a, d, c) {
    var b = "";
    c &&
      ((b = new Date()),
      b.setTime(b.getTime() + 864e5 * c),
      (b = "; expires=" + b.toGMTString()));
    document.cookie = a + "=" + d + b + "; path=/";
  },
  checkIE = function () {
    var a;
    if ("Microsoft Internet Explorer" == navigator.appName) {
      null !== /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) &&
        (a = parseFloat(RegExp.$1));
      if (8 >= a) return !0;
      if (9 == a && "BackCompat" == document.compatMode)
        return (
          (a = document.createElement("meta")),
          (a.content = "IE=EmulateIE8"),
          document.getElementsByTagName("head")[0].appendChild(a),
          !0
        );
    }
    return !1;
  },
  disclosure = function (a) {
    a.css = "fixed";
    checkIE() && ((a.position = "top"), (a.css = "absolute"));
    var d = "";
    if (a.cookieScripts) {
      var c = a.cookieScripts.split(","),
        b = c.length,
        e = "";
      if (1 < b) {
        for (var g = 0; g < b - 1; g++) e += c[g] + ", ";
        d =
          " We use " +
          e.substring(0, e.length - 2) +
          " and " +
          c[b - 1] +
          " scripts, which all set cookies. ";
      } else d = " We use a " + c[0] + " script which sets cookies.";
    }
    if (a.customDialogSelector) {
      c = document.querySelector("#cookie-dialog");
      if (!c) return;
      b = c.querySelector("#cookiesdirective");
      if (!b) return;
      e = c.querySelector(".cookie-wrapper");
      if (a.explicitConsent) {
        if (!b.querySelector("#accept")) {
          var f = document.createElement("div");
          f.id = "accept";
          f.style =
            "display: flex;justify-content: center;align-items: center;margin-bottom:1rem;";
        }
        if (!f) return;
        e.appendChild(f);
        "2" === a.cookiesAlertType &&
          ((e = document.createElement("a")),
          (e.id = "explicitreject"),
          (e.innerText = a.rejectText || "Reject"),
          e.classList.add("btn"),
          e.classList.add("btn-white"),
          e.classList.add("display-7"),
          e.setAttribute(
            "style",
            "margin:0 5px;" +
              (a.rejectColor
                ? " background-color:" +
                  a.rejectColor +
                  " !important;color:" +
                  invertHex(a.rejectColor) +
                  "!important;"
                : "") +
              "border-color:" +
              a.rejectColor +
              " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"
          ),
          f.appendChild(e));
        b.querySelector("a#explicitsubmit") ||
          ((b = document.createElement("a")),
          (b.id = "explicitsubmit"),
          (b.innerText = a.textButton || "Continue"),
          b.classList.add("btn"),
          b.classList.add("btn-primary"),
          b.classList.add("display-7"),
          b.setAttribute(
            "style",
            "margin:0 5px;" +
              (a.colorButton
                ? " background-color:" +
                  a.colorButton +
                  " !important;color:" +
                  invertHex(a.colorButton) +
                  "!important;"
                : "") +
              "border-color:" +
              a.colorButton +
              " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"
          ),
          f.appendChild(b),
          console.warn(
            'cookiesDirective: Submit button with ID "explicitsubmit" does not exist in custom dialog, so automatically added'
          ));
      } else
        b.querySelector("a#impliedsubmit") ||
          ((f = document.createElement("a")),
          (f.id = "impliedsubmit"),
          (f.value = "Do not show this message again"),
          b.appendChild(f),
          console.warn(
            'cookiesDirective: Submit button with ID "impliedsubmit" does not exist in custom dialog, so automatically added'
          ));
      if ((f = c.querySelector("#epdnotick"))) f.style.display = "none";
      "none" !== getComputedStyle(c, null).display &&
        console.error(
          'cookiesDirective: Custom dialog element should have CSS style display: "none".'
        );
      c.style.display = "block";
    } else {
      document.querySelector("#cookiesdirective") &&
        document.querySelector("#cookiesdirective").remove();
      f = document.createElement("div");
      f.setAttribute("id", "epd");
      c = document.createElement("div");
      c.setAttribute("id", "cookiesdirective");
      c.setAttribute(
        "style",
        "font-family:sans-serif;position:" +
          a.css +
          ";" +
          a.position +
          ":-300px;left:0px;width:100%;height:auto;background:" +
          (a.backgroundColor || "rgb(255,255,255)").replace(
            /(rgba?)\(([0-9]+),\s+([0-9]+),\s+([0-9]+)(,\s+(\d?\.?\d+))?\)/,
            "rgba($2,$3,$4," + 0.01 * (a.bgOpacity || 100) + ")"
          ) +
          ";color:" +
          a.fontColor +
          ";text-align:center;z-index:1050;"
      );
      b = document.createElement("div");
      b.classList.add("cookie-wrapper");
      b.setAttribute(
        "style",
        "position:relative;height:auto;width:90%;padding:10px;margin-left:auto;margin-right:auto;"
      );
      e = document.createElement("div");
      e.classList.add("mbr-text");
      g = document.createElement("p");
      g.classList.add("display-7");
      g.classList.add("alert-message");
      g.style.margin = "1rem 0";
      a.message ||
        (a.explicitConsent
          ? ((a.message = "This site uses cookies. Some of the cookies we "),
            (a.message +=
              "use are essential for parts of the site to operate and have already been set."))
          : (a.message =
              "We have placed cookies on your computer to help make this website better."));
      g.innerHTML = a.message;
      if (a.explicitConsent) {
        d = document.createTextNode(d);
        g.appendChild(d);
        d = document.createElement("div");
        d.setAttribute("id", "epdnotick");
        d.setAttribute("style", "color:#ca0000;display:none;margin:2px;");
        var n = document.createElement("div");
        n.classList.add("accept");
        n.setAttribute(
          "style",
          "display:flex;justify-content:center;align-items:center;margin-bottom:1rem;"
        );
        if ("2" === a.cookiesAlertType) {
          var k = document.createElement("a");
          k.id = "explicitreject";
          k.innerText = a.rejectText || "Reject";
          k.classList.add("btn");
          k.classList.add("btn-white");
          k.classList.add("display-7");
          k.setAttribute(
            "style",
            "margin:0 5px;" +
              (a.rejectColor
                ? " background-color:" +
                  a.rejectColor +
                  " !important;color:" +
                  invertHex(a.rejectColor) +
                  "!important;"
                : "") +
              "border-color:" +
              a.rejectColor +
              " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"
          );
          n.appendChild(k);
        }
        k = document.createElement("a");
        k.id = "explicitsubmit";
        k.innerText = a.textButton || "Continue";
        k.classList.add("btn");
        k.classList.add("btn-primary");
        k.classList.add("display-7");
        k.setAttribute(
          "style",
          "margin:0 5px;" +
            (a.colorButton
              ? " background-color:" +
                a.colorButton +
                " !important;color:" +
                invertHex(a.colorButton) +
                "!important;"
              : "") +
            "border-color:" +
            a.colorButton +
            " !important;border:0px solid; padding:5px 20px; border-radius:2px; cursor: pointer;box-shadow: 0 2px 2px 0 rgb(0 0 0 / 20%);"
        );
        n.appendChild(k);
        e.appendChild(g);
        e.appendChild(n);
        e.appendChild(d);
        b.appendChild(e);
      } else
        (d = document.createTextNode(d)),
          g.appendChild(d),
          e.appendChild(g),
          (g = document.createElement("div")),
          g.classList.add("mbr-section-btn"),
          (d = document.createElement("a")),
          d.setAttribute(
            "style",
            "margin:0;" +
              (a.colorButton
                ? " background-color:" +
                  a.colorButton +
                  " !important;color:" +
                  invertHex(a.colorButton) +
                  "!important;"
                : "") +
              (a.colorButton && self === top
                ? "border-color:" + a.colorButton + " !important;"
                : "")
          ),
          (d.id = "impliedsubmit"),
          d.setAttribute("class", "btn btn-sm btn-primary display-7"),
          d.appendChild(document.createTextNode(a.textButton)),
          g.appendChild(d),
          b.appendChild(e),
          b.appendChild(g);
      c.appendChild(b);
      f.appendChild(c);
      Array.from(f.querySelectorAll("a"))
        .filter(function (a) {
          return !a.classList.contains("btn");
        })
        .forEach(function (b) {
          b.setAttribute(
            "style",
            "color: " +
              a.linkColor +
              ";text-decoration:" +
              (!0 === a.underlineLink || "true" === a.underlineLink
                ? "underline"
                : "none") +
              ";"
          );
        });
      document.body.appendChild(f);
    }
    var l = a.position.toLowerCase();
    "top" != l && "bottom" != l && (l = "top");
    var p = null,
      m = null;
    "top" == l
      ? ((p = { top: a.positionOffset }), (m = { top: "-300px" }))
      : ((p = { bottom: a.positionOffset }), (m = { bottom: "-300px" }));
    f = -1 !== location.href.search("privacy.html") ? !0 : !1;
    f && dialog.remove();
    var h = document.querySelector("#cookiesdirective"),
      q = function (a, b) {
        var c = {},
          d = Object.keys(b)[0],
          e = "0" == b[l] ? "-300px" : "0";
        a = getComputedStyle(a, null)[l];
        return [((c[d] = a ? a : e), c), b];
      };
    h.animate(q(h, p), { duration: a.animate ? 1e3 : 0 }).onfinish =
      function () {
        h.style[l] = p[l];
        if (a.explicitConsent) {
          var b = document.querySelector("#explicitsubmit"),
            c = document.querySelector("#explicitreject");
          b.addEventListener("click", function () {
            setCookie("cookiesDirective", 1, 365);
            a.customDialogSelector
              ? h.remove()
              : (h.animate(q(h, m), { duration: 1e3 }).onfinish = function () {
                  h.style[l] = m[l];
                  h.remove();
                });
          });
          c &&
            c.addEventListener("click", function () {
              h.animate(q(h, m), { duration: 1e3 }).onfinish = function () {
                h.style[l] = m[l];
                h.remove();
              };
            });
        } else {
          var d = document.querySelector("#impliedsubmit");
          d.addEventListener("click", function () {
            d.matches("[demo]") ||
              (setCookie("cookiesDirective", 1, 365),
              (h.animate(q(h, m), { duration: a.animate ? 1e3 : 0 }).onfinish =
                function () {
                  h.style[l] = m[l];
                  h.remove();
                }));
          });
        }
        0 < a.duration &&
          setTimeout(function () {
            h.animate([{ opacity: "1" }, { opacity: "0" }], {
              duration: 2e3,
            }).onfinish = function () {
              h.style.opacity = "0";
              h.style[l] = "-300px";
            };
          }, 1e3 * a.duration);
        a.callback();
      };
  };
