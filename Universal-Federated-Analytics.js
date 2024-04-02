/*
            .ooooo.        oooooooo
           d88" `88b      888    P88
           888            o888oo888
           888            888
           `"88888"       888
                                  
***********************************************************************************************************
Copyright 2024 by Cardinal Path.
Dual Tracking Federated Analytics: Google Analytics Government Wide Site Usage Measurement.
Author: Ahmed Awwad
02/04/2024 Version: 7.0
***********************************************************************************************************/
var tObjectCheck,
  _allowedQuerystrings = [],
  isSearch = false,
  oCONFIG = {
    GWT_UAID: ["UA-33523145-1"],
    GWT_GA4ID: ["G-CSLL4ZEK4L"], 
    FORCE_SSL: !0,
    ANONYMIZE_IP: !0,
    AGENCY: "",
    SUB_AGENCY: "",
    VERSION: "20240402 v7.0 - Dual Tracking",
    SITE_TOPIC: "",
    SITE_PLATFORM: "",
    SCRIPT_SOURCE: "",
    URL_PROTOCOL: location.protocol,
    USE_MAIN_CUSTOM_DIMENSIONS: !0,
    MAIN_AGENCY_CUSTOM_DIMENSION_SLOT: "dimension1",
    MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT: "dimension2",
    MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT: "dimension3",
    MAIN_SITE_TOPIC_CUSTOM_DIMENSION_SLOT: "dimension4",
    MAIN_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT: "dimension5",
    MAIN_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT: "dimension6",
    MAIN_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT: "dimension7",
    MAIN_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT: "dimension8",
    USE_PARALLEL_CUSTOM_DIMENSIONS: !1,
    PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT: "dimension1",
    PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT: "dimension2",
    PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT: "dimension3",
    PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT: "dimension4",
    PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT: "dimension5",
    PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT: "dimension6",
    PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT: "dimension7",
    PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT: "dimension8",
    COOKIE_DOMAIN: location.hostname.replace(/^www\./, "").toLowerCase(),
    COOKIE_TIMEOUT: 63072e3,
    SEARCH_PARAMS: "q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
    YOUTUBE: !1,
    YT_MILESTONE: 25, //accepts 10, 20, and 25
    AUTOTRACKER: !0,
    EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
    SUBDOMAIN_BASED: !0,
    PUA_NAME: "GSA_ENOR",
    GA4_NAME: "GSA_GA4_ENOR",
    USE_CUSTOM_URL: !1,
    USE_CUSTOM_TITLE: !1
  };
if (document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i)) {
  oCONFIG.GWT_UAID[0] = "UA-33523145-1";
  oCONFIG.GWT_GA4ID[0] = "G-9TNNMGP8WJ"; //Test Digital Analytics Program GA4
}
//*********GA4************
var head = document.getElementsByTagName("head").item(0);
var GA4Object = document.createElement("script");
GA4Object.setAttribute("type", "text/javascript");
GA4Object.setAttribute(
  "src",
  "https://www.googletagmanager.com/gtag/js?id=" + oCONFIG.GWT_GA4ID[0]
);
head.appendChild(GA4Object);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag('set', 'cookie_flags', 'SameSite=Strict;Secure');
//*********GA4************

"undefined" === typeof window.GoogleAnalyticsObject &&
  (function (a, b, c, d, f, e, h) {
    a.GoogleAnalyticsObject = f;
    a[f] =
      a[f] ||
      function () {
        (a[f].q = a[f].q || []).push(arguments);
      };
    a[f].l = 1 * new Date();
    e = b.createElement(c);
    h = b.getElementsByTagName(c)[0];
    e.async = 1;
    e.src = d;
    h.parentNode.insertBefore(e, h);
  })(
    window,
    document,
    "script",
    "https://www.google-analytics.com/analytics.js",
    "ga"
  );
tObjectCheck = window.GoogleAnalyticsObject;
var trackerFlag = true;

function _onEveryPage() {
  _payloadInterceptor();
  _updateConfig();
  _defineCookieDomain();
  _defineAgencyCDsValues();
  _setAllowedQS();
  createTracker(trackerFlag);
}
_onEveryPage();

function _defineCookieDomain() {
  /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(
    oCONFIG.SUBDOMAIN_BASED.toString()
  )
    ? ((oCONFIG.COOKIE_DOMAIN = oCONFIG.SUBDOMAIN_BASED.toLowerCase().replace(
      /^www\./i,
      ""
    )),
      (oCONFIG.SUBDOMAIN_BASED = !0))
    : !1 === oCONFIG.SUBDOMAIN_BASED
      ? ((oCONFIG.COOKIE_DOMAIN = document.location.hostname.match(
        /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/
      )[1]),
        (oCONFIG.SUBDOMAIN_BASED = !0))
      : ((oCONFIG.COOKIE_DOMAIN = location.hostname
        .toLowerCase()
        .replace(/^www\./i, "")),
        (oCONFIG.SUBDOMAIN_BASED = !1));
}

function _defineAgencyCDsValues() {
  oCONFIG.AGENCY = oCONFIG.AGENCY || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
  oCONFIG.SUB_AGENCY = oCONFIG.SUB_AGENCY || "" + oCONFIG.COOKIE_DOMAIN;
  oCONFIG.SITE_TOPIC =
    oCONFIG.SITE_TOPIC || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
  oCONFIG.SITE_PLATFORM =
    oCONFIG.SITE_PLATFORM || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
}

function _cleanBooleanParam(a) {
  switch (a.toString().toLowerCase()) {
    case "true":
    case "on":
    case "yes":
    case "1":
      return !0;
    case "false":
    case "off":
    case "no":
    case "0":
      return !1;
    default:
      return a;
  }
}

function _isValidUANum(a) {
  a = a.toLowerCase();
  a = a.match(/^ua\-([0-9]+)\-[0-9]+$/);
  return null !== a && 0 < a.length && a[0] !== oCONFIG.GWT_UAID[0].toLowerCase();
}

function _isValidGA4Num(a) {
  a = a.toLowerCase();
  a = a.match(/^g\-([0-9a-z])+$/);
  return null !== a && 0 < a.length && a[0] !== oCONFIG.GWT_GA4ID[0].toLowerCase();
}

function _cleanDimensionValue(a) {
  try {
    pattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
    if (pattern.test(a)) return a;
    if (null !== a.match(/\d+$/g)) {
      var b = "dimension" + a.match(/\d+$/g)[0];
      if (pattern.test(b)) return b;
    }
    return "";
  } catch (c) { }
}

function _updateConfig() {
  if ("undefined" !== typeof _fedParmsGTM) {
    var a = _fedParmsGTM.toLowerCase().split("&");
    oCONFIG.SCRIPT_SOURCE = "GTM";
  } else {
    var b = document.getElementById("_fed_an_ua_tag");
    _fullParams = b.src.match(/^([^\?]*)(.*)$/i)[2].replace("?", "");
    a = _fullParams.split("&");
    oCONFIG.SCRIPT_SOURCE = b.src.split("?")[0];
  }
  for (b = 0; b < a.length; b++)
    switch (
    ((_keyValuePair = decodeURIComponent(a[b].toLowerCase())),
      (_key = _keyValuePair.split("=")[0]),
      (_value = _keyValuePair.split("=")[1]),
      _key)
    ) {
      case "pua":
        for (var c = _value.split(","), d = 0; d < c.length; d++)
          _isValidUANum(c[d]) && oCONFIG.GWT_UAID.push(c[d].toUpperCase());
        break;
      case "pga4":
        for (var c = _value.split(","), d = 0; d < c.length; d++)
          _isValidGA4Num(c[d]) && oCONFIG.GWT_GA4ID.push(c[d].toUpperCase());
        break;
      case "agency":
        oCONFIG.AGENCY = _value.toUpperCase();
        break;
      case "subagency":
        oCONFIG.SUB_AGENCY = _value.toUpperCase();
        break;
      case "sitetopic":
        oCONFIG.SITE_TOPIC = _value;
        break;
      case "siteplatform":
        oCONFIG.SITE_PLATFORM = _value;
        break;
      case "parallelcd":
        _value = _cleanBooleanParam(_value);
        if (!0 === _value || !1 === _value)
          oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS = _value;
        break;
      case "custurl":
          _value = _cleanBooleanParam(_value);
          if (!0 === _value || !1 === _value)
            oCONFIG.USE_CUSTOM_URL = _value;
          break;
      case "custitle":
            _value = _cleanBooleanParam(_value);
            if (!0 === _value || !1 === _value)
              oCONFIG.USE_CUSTOM_TITLE = _value;
          break;
      case "palagencydim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palsubagencydim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palversiondim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "paltopicdim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palplatformdim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palscriptsrcdim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palurlprotocoldim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "palinteractiontypedim":
        _value = _cleanDimensionValue(_value);
        "" !== _value &&
          (oCONFIG.PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT = _value);
        break;
      case "cto":
        oCONFIG.COOKIE_TIMEOUT = parseInt(_value) * 2628000;		// = 60 * 60 * 24 * 30.4166666666667;
        break;
      case "sp":
        oCONFIG.SEARCH_PARAMS += "|" + _value.replace(/,/g, "|");
        break;
      case "exts":
        oCONFIG.EXTS += "|" + _value.replace(/,/g, "|");
        break;
      case "yt":
        _value = _cleanBooleanParam(_value);
        if (!0 === _value || !1 === _value) oCONFIG.YOUTUBE = _value;
        break;
      case "ytm":
        oCONFIG.YT_MILESTONE =  ((/^(10|20|25)$/.test(_value)? parseInt(_value): 25)); 
        break;
      case "autotracker":
        _value = _cleanBooleanParam(_value);
        if (!0 === _value || !1 === _value) oCONFIG.AUTOTRACKER = _value;
        break;
      case "sdor":
        oCONFIG.SUBDOMAIN_BASED = _cleanBooleanParam(_value);
        break;
      default:
        break;
    }
}

function _sendCustomDimensions(a, b) {
  if (0 < a.length && "" !== b && void 0 !== b) {
    tObjectCheck !== window.GoogleAnalyticsObject && createTracker(!1);
    for (var c = 0; c < oCONFIG.GWT_UAID.length; c++)
      if ("dimension0" !== a[c])
        try {
          window[window.GoogleAnalyticsObject](
            oCONFIG.PUA_NAME + c + ".set",
            a[c],
            b
          );
        } catch (d) { }
  }
}

function _sendCustomMetrics(a, b) {
  if (0 < a.length && "" !== b && void 0 !== b) {
    tObjectCheck != window.GoogleAnalyticsObject && createTracker(!1);
    for (var c = 0; c < oCONFIG.GWT_UAID.length; c++)
      if ("metric0" !== a[c])
        try {
          window[window.GoogleAnalyticsObject](
            oCONFIG.PUA_NAME + c + ".set",
            a[c],
            b
          );
        } catch (d) { }
  }
}

function _sendEvent(a, b) {
  !/^(page_view|view_search_results)$/i.test(a) && _mapGA4toUA(a, b);
  var send_to = "";
  for (var g = 0; g < oCONFIG.GWT_GA4ID.length; g++) {
    try {
      send_to += oCONFIG.GA4_NAME + g + ",";
    }
    catch (er) { }
  }
  b.send_to = send_to.replace(/.$/, "");
  b.event_name_dimension = a;
  gtag("event", a, b);
}

function _mapGA4toUA(en, pa) {
  var a, b, c, d, f, e;
  (c = pa.link_url),
    (d = pa.event_value ? pa.event_value : 0),
    (f = pa.non_interaction || !1),
    (e = pa.interaction_type);
  switch (en) {
    case "file_download":
      pa.outbound ? (a = "Outbound Downloads") : (a = "Download");
      b = pa.file_extension;
      break;
    case "email_click":
      pa.outbound ? (a = "Outbound MailTo") : (a = "Mailto");
      b = pa.link_url;
      c = "";
      break;
    case "click":
      a = "Outbound";
      b = pa.link_domain;
      c = pa.link_url.split(pa.link_domain)[1];
      break;
    case "telephone_click":
      a = "Telephone Clicks";
      b = pa.link_url;
      c = "";
      break;
    case "video_start":
      a = "YouTube Video";
      b = "play";
      c = pa.video_url;
      break;
    case "video_play":
      a = "YouTube Video";
      b = "play";
      c = pa.video_url;
      break;
    case "video_pause":
      a = "YouTube Video";
      b = "pause";
      c = pa.video_url;
      break;
    case "video_progress":
      a = "YouTube Video";
      b = String(pa.video_percent) + "%";
      c = pa.video_url;
      break;
    case "video_complete":
      a = "YouTube Video";
      b = "finish";
      c = pa.video_url;
      break;
    case "dap_event":
      a = pa.event_category;
      b = pa.event_action;
      c = pa.event_label;
      break;
    default:
      break;
  }

  if ("" !== a && void 0 !== a && "" !== b && void 0 !== b) {
    var h = oCONFIG.MAIN_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT;
    tObjectCheck !== window.GoogleAnalyticsObject && createTracker(!1);
    for (var g = 0; g < oCONFIG.GWT_UAID.length; g++)
      try {
        0 < g &&
          (!0 === oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS
            ? (h = oCONFIG.PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT)
            : (e = void 0)),
          window[window.GoogleAnalyticsObject](
            oCONFIG.PUA_NAME + g + ".set",
            h,
            e
          ),
          window[window.GoogleAnalyticsObject](
            oCONFIG.PUA_NAME + g + ".send",
            "event",
            a,
            b,
            void 0 !== c ? c : "",
            "" === d && isNaN(d) && void 0 === d ? 0 : parseInt(d),
            {
              nonInteraction: f,
            }
          );
      } catch (k) { }
  }
}

function _sendPageview(a, b) {
  if ("" !== a && void 0 !== a) {
    var ur = _URIHandler(_scrubbedURL(a)).split(/[#]/)[0];
    tObjectCheck !== window.GoogleAnalyticsObject && createTracker(!1);
    for (var c = 0; c < oCONFIG.GWT_UAID.length; c++) {
      try {
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + c + ".send",
          "pageview",
          {
            page: ur.split(location.hostname)[1],
            title: "" !== b || void 0 !== b ? b : document.title
          }
        );
      } catch (d) { }
    }

    _sendEvent("page_view", {
      page_location: ur,
      page_title: "" !== b || void 0 !== b ? b : document.title,
      ignore_referrer: (_isExcludedReferrer() ? true : false)
    });

    _sendViewSearchResult(ur);

  }
}

function gas(a, b, c, d, f, e, h) {
  if (
    void 0 !== a &&
    "" !== a &&
    void 0 !== b &&
    "" !== b &&
    void 0 !== c &&
    "" !== c
  )
    if ("pageview" === b.toLowerCase())
      try {
        _sendPageview(c, void 0 === d || "" === d ? document.title : d);
      } catch (n) { }
    else if ("event" === b.toLowerCase() && void 0 !== d && "" !== d)
      try {
        var g = !1;
        void 0 !== h &&
          "boolean" === typeof _cleanBooleanParam(h) &&
          (g = _cleanBooleanParam(h));
        _sendEvent("dap_event", {
          event_category: c,
          event_action: d,
          event_label: void 0 === f ? "" : f,
          event_value: void 0 === e || "" === e || isNaN(e) ? 0 : parseInt(e),
          non_interaction: g,
        });
      } catch (n) { }
    else if (-1 != b.toLowerCase().indexOf("dimension"))
      try {
        g = b.toLowerCase().split(",");
        var k = [];
        dimsPattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
        for (var l = 0; l < g.length; l++)
          if (dimsPattern.test(g[l])) k.push(g[l]);
          else {
            var m = "dimension" + g[l].match(/\d+$/g)[0];
            (dimsPattern.test(m) || "dimension0" === m) && k.push(m);
          }
        0 < k.length && _sendCustomDimensions(k, void 0 === c ? "" : c);
      } catch (n) { }
    else if (-1 != b.toLowerCase().indexOf("metric"))
      try {
        k = b.toLowerCase().split(",");
        g = [];
        mtrcsPattern = /^metric([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
        for (m = 0; m < k.length; m++)
          mtrcsPattern.test(k[m])
            ? g.push(k[m])
            : ((l = "metric" + k[m].match(/\d+$/g)[0]),
              (mtrcsPattern.test(l) || "metric0" === l) && g.push(l));
        0 < g.length &&
          _sendCustomMetrics(
            g,
            void 0 === c || "" === c || isNaN(c) ? 1 : parseFloat(c)
          );
      } catch (n) { }
}

function _URIHandler(a) {
  var b = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]+)", "i");
  b.test(a) && (a = a.replace(b, "$1query$3"), isSearch = true);
  return a;
}

function _sendViewSearchResult(a) {
  isSearch && (_sendEvent("view_search_results", { search_term: _URIHandler(a).match(/([?&])(query\=)([^&#?]*)/i)[3], page_location: _URIHandler(_scrubbedURL(a)) }), isSearch = false);
}

function _isExcludedReferrer() {
  if ("" !== document.referrer) {
    var a = document.referrer
      .replace(/https?:\/\//i, "")
      .split("/")[0]
      .replace(/^www\./i, "");
    return oCONFIG.SUBDOMAIN_BASED
      ? -1 != a.indexOf(oCONFIG.COOKIE_DOMAIN)
        ? !0
        : !1
      : a === oCONFIG.COOKIE_DOMAIN
        ? !0
        : !1;
  }
}

function createTracker(a) {
  var cc;
  for (var b = 0; b < oCONFIG.GWT_UAID.length; b++) {
    var m, n, o = /^\/.*$/i;
    try { m = ((oCONFIG.USE_CUSTOM_URL && o.test(custom_dap_data.url))?location.protocol+"//"+location.hostname+custom_dap_data.url.replace(location.protocol+"//"+location.hostname, "") : document.location.href); n = ((oCONFIG.USE_CUSTOM_TITLE)? custom_dap_data.title : document.title);} catch (error) { m = document.location.href; n = document.title; }
    cc = _URIHandler(_scrubbedURL(m));
    var c = cc.split(document.location.hostname)[1];
    window[window.GoogleAnalyticsObject](
      "create",
      oCONFIG.GWT_UAID[b],
      oCONFIG.COOKIE_DOMAIN,
      {
        name: oCONFIG.PUA_NAME + b,
        allowLinker: !0,
        cookieExpires: parseInt(oCONFIG.COOKIE_TIMEOUT),
        cookieFlags: 'SameSite=Strict;Secure'
      }
    );
    window[window.GoogleAnalyticsObject](
      oCONFIG.PUA_NAME + b + ".set", 'customTask', _customTask()
    );
    if (oCONFIG.ANONYMIZE_IP)
      window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".set",
        "anonymizeIp",
        oCONFIG.ANONYMIZE_IP
      );
    if (oCONFIG.FORCE_SSL)
      window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".set",
        "forceSSL",
        !0
      );
    if (_isExcludedReferrer())
      window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".set",
        "referrer",
        ""
      );
    oCONFIG.USE_MAIN_CUSTOM_DIMENSIONS &&
      0 === b &&
      (window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".set",
        oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT,
        oCONFIG.AGENCY
      ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SUB_AGENCY
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT,
          oCONFIG.VERSION
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_SITE_TOPIC_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SITE_TOPIC
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SITE_PLATFORM
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SCRIPT_SOURCE
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.MAIN_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT,
          oCONFIG.URL_PROTOCOL
        ));
    oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS &&
      0 < b &&
      (window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".set",
        oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT,
        oCONFIG.AGENCY
      ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SUB_AGENCY
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT,
          oCONFIG.VERSION
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SITE_TOPIC
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SITE_PLATFORM
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT,
          oCONFIG.SCRIPT_SOURCE
        ),
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + b + ".set",
          oCONFIG.PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT,
          oCONFIG.URL_PROTOCOL
        ));
    -1 !== document.title.search(/404|not found/i) &&
      (c = ("/vpv404/" + c).replace(/\/\//g, "/") + ((document.referrer) ? "/" + document.referrer : document.referrer));
    if (a)
      window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".send",
        "pageview", c, {"title": n}
      );
  }
  var p = ((-1 !== document.title.search(/404|not found/ig)) ? document.location.protocol + "//" + document.location.hostname + c : m);
  var ur = _URIHandler(_scrubbedURL(p));
  for (var b = 0; b < oCONFIG.GWT_GA4ID.length; b++) {
    if ((b === 0) || (b > 0 && oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS)) {
      gtag("config", oCONFIG.GWT_GA4ID[b], {
        groups: oCONFIG.GA4_NAME + b,
        cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
        page_location: ur,
        page_title: n,
        ignore_referrer: (_isExcludedReferrer() ? true : false),
        agency: oCONFIG.AGENCY.toUpperCase(),
        subagency: oCONFIG.SUB_AGENCY.toUpperCase(),
        site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
        site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
        script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
        version: oCONFIG.VERSION.toLowerCase(),
        protocol: oCONFIG.URL_PROTOCOL
      });
    }
    else {
      gtag("config", oCONFIG.GWT_GA4ID[b], {
        groups: oCONFIG.GA4_NAME + b,
        cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
        page_location: ur,
        page_title: n,
        ignore_referrer: (_isExcludedReferrer() ? true : false)
      });
    }
  }

  _sendViewSearchResult(cc);
}

function _initAutoTracker() {
  var _isDownload = function (a) {
    var ex = a.href.toLowerCase().replace(/[#?&].*/, '').split(a.hostname)[1].split("."); var ext = ex[ex.length - 1];
    if (ext.match(new RegExp("^(" + oCONFIG.EXTS + ")$")) != null) {
      return ext;
    }
    else {
      return false;
    }
  };
  var _enforeLower = function (j) {
    try {
      var d = JSON.stringify(j);
      return JSON.parse(d.toLowerCase());
    } catch (error) { }
  };

  var _eventHandler = function (event) {
    try {
      if ("mousedown" === event.type || ("keydown" === event.type && 13 === event.keyCode)) {
        if (event.target.nodeName === 'A' || event.target.closest('a') !== null) {
          var b = oCONFIG.COOKIE_DOMAIN, c = "";
          var d = "",
            f = "",
            e = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
            h =
              /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
            i = "",
            t = "",
            l = {},
            g = /^(tel:)(.*)$/i;
          var a = event.target.closest('a');
          if ("mousedown" === event.type) {
            t = "Mouse Click";
          }
          else if ("keydown" === event.type && 13 === event.keyCode) {
            t = "Enter Key Keystroke";
          }

          if (e.test(a.href) || h.test(a.href) || g.test(a.href)) {
            try {
              h.test(a.href)
                ? ((f = a.hostname.toLowerCase().replace(/^www\./i, "")), (i = "l"))
                : e.test(a.href)
                  ? ((f = a.href.split("@")[1].toLowerCase()), (i = "m"))
                  : g.test(a.href) && ((f = a.href), (f = f.toLowerCase()), (i = "t"));
            } catch (k) {
              //continue;
            }
          }

          if (oCONFIG.SUBDOMAIN_BASED ? -1 !== f.indexOf(b) : f === b) {
            if ("m" === i) {
              c = a.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
              l = { link_id: a.id, link_url: c[0], link_domain: c[0].split("@")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, interaction_type: t };
              _sendEvent("email_click", _enforeLower(l));
            }
            /*else if("t"===i){
              l = {link_id: a.id, link_url: a.href.split("tel:")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, interaction_type: t};
              _sendEvent("telephone_click", l);
            }*/
            else {
              if ("l" === i && _isDownload(a)) {
                c = a.pathname.split(/[#?&?]/)[0];
                d = _isDownload(a);
                l = { file_name: c, file_extension: d, link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_id: a.id, link_url: a.href.replace(/[#?&].*/, ""), link_domain: a.hostname.replace(/^www\./i, ""), interaction_type: t };
                _sendEvent("file_download", _enforeLower(l));
              }
              else if ("l" === i && !_isDownload(a)) {
                //internal link tracking;
              }
            }
          }
          else {
            if ("l" === i && _isDownload(a)) {
              c = a.pathname.split(/[#?&?]/)[0];
              d = _isDownload(a);
              l = { file_name: c, file_extension: d, link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_id: a.id, link_url: a.href.replace(/[#?&].*/, ""), link_domain: a.hostname.replace(/^www\./i, ""), outbound: true, interaction_type: t };
              _sendEvent("file_download", _enforeLower(l));
            }
            else if ("l" === i && !_isDownload(a)) {
              l = { link_id: a.id, link_url: a.href.replace(/[#?&].*/, ""), link_domain: a.hostname.replace(/^www\./i, ""), link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, outbound: true, interaction_type: t };
              _sendEvent("click", _enforeLower(l));
            }
            else if ("m" === i) {
              c = a.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
              l = { link_id: a.id, link_url: c[0], link_domain: c[0].split("@")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, outbound: true, interaction_type: t };
              _sendEvent("email_click", _enforeLower(l));
            }
            else if ("t" === i) {
              l = { link_id: a.id, link_url: a.href.split("tel:")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, interaction_type: t };
              _sendEvent("telephone_click", _enforeLower(l));
            }
          }
        }
      }

    } catch (error) {

    }
  };

  (document.addEventListener ? document.addEventListener("mousedown", _eventHandler, false) : (document.attachEvent && document.attachEvent("onmousedown", _eventHandler)));
  (document.addEventListener ? document.addEventListener("keydown", _eventHandler, false) : (document.attachEvent && document.attachEvent("onkeydown", _eventHandler)));
}

// START YT TRACKER //
if (oCONFIG.YOUTUBE) {
  var tag = document.createElement('script');
  tag.src = document.location.protocol + "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var videoArray = [];
  var playerArray = [];
  var _buckets = [];

  var _milestoneController = oCONFIG.YT_MILESTONE; /* accepted values 10, 20 or 25 */
  var ytUtils = [];


  onYouTubeIframeAPIReady = function () {
    for (var i = 0; i < videoArray.length; i++) {
      playerArray[i] = new YT.Player(videoArray[i], {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onError': onPlayerError
        }
      });
    }
  };
  onPlayerReady = function (event) { };
  onPlayerError = function (event) {
    _sendEvent('video_error', { videotitle: event.target.getVideoData().title });
  };
  cCi = 0;
  onPlayerStateChange = function (event) {
    var videoIndex = 0, video_id = event.target.playerInfo.videoData.video_id || event.target.getVideoData().video_id;
    for (var o = 0; o < videoArray.length; o++) {
      if (videoArray[o] == video_id) {
        videoIndex = o;
      }
    }
    var cTime = Math.round(playerArray[videoIndex].playerInfo.currentTime) || Math.round(playerArray[videoIndex].getCurrentTime());
    var vDuration = Math.round(playerArray[videoIndex].playerInfo.duration) || Math.round(playerArray[videoIndex].getDuration());
    var p = {
      video_current_time: cTime,
      video_duration: vDuration,
      video_percent: ((cTime / vDuration) * 100).toFixed(),
      video_provider: "youtube",
      video_title: playerArray[videoIndex].playerInfo.title || playerArray[videoIndex].getVideoData().title,
      video_id: playerArray[videoIndex].playerInfo.videoData.video_id || playerArray[videoIndex].getVideoData().video_id,
      video_url: playerArray[videoIndex].playerInfo.videoUrl || playerArray[videoIndex].getVideoUrl()
    };
    if (event.data == YT.PlayerState.PLAYING && p.video_percent == 0) {
      _sendEvent('video_start', p);
      if (_milestoneController) {
        ytUtils.push([videoIndex, function (videx) {
          //var f10 = false;var f20 = false;var f30 = false;var f40 = false;var f50 = false;var f60 = false;var f70 = false;var f80 = false;var f90 = false;
          for (var b = 1; b <= (100 / _milestoneController); b++) {
            ((100 / _milestoneController === 4 && b === 100 / _milestoneController) ?
              _buckets[b - 1] = { milestone: 95, triggered: false } : ((_milestoneController * b !== 100) ? _buckets[b - 1] = { milestone: _milestoneController * b, triggered: false } : ''));
          }
          setInterval(function () {
            var cTimeP = Math.round(playerArray[videoIndex].playerInfo.currentTime) || Math.round(playerArray[videoIndex].getCurrentTime());
            var vDurationP = Math.round(playerArray[videoIndex].playerInfo.duration) || Math.round(playerArray[videoIndex].getDuration());
            var y = {
              video_current_time: cTimeP,
              video_duration: vDurationP,
              video_percent: ((cTimeP / vDurationP) * 100).toFixed(),
              video_provider: "youtube",
              video_title: playerArray[videoIndex].playerInfo.title || playerArray[videoIndex].getVideoData().title,
              video_id: playerArray[videoIndex].playerInfo.videoData.video_id || playerArray[videoIndex].getVideoData().video_id,
              video_url: playerArray[videoIndex].playerInfo.videoUrl || playerArray[videoIndex].getVideoUrl()
            };
            if (y.video_percent <= _buckets[_buckets.length - 1] && cCi < _buckets.length) {
              if (y.video_percent >= _buckets[cCi].milestone && !_buckets[cCi].triggered) {
                _buckets[cCi].triggered = true; y.video_percent = _buckets[cCi].milestone; y.video_current_time = Math.round((y.video_duration / _buckets.length) * (cCi + 1)); _sendEvent("video_progress", y); cCi++;
              }
            }
          }, parseInt(playerArray[videoIndex].getDuration()) / _buckets.length);
        }]);
        ytUtils[ytUtils.length - 1][1](videoIndex);
      }
    }
    else if (event.data == YT.PlayerState.PLAYING) { _sendEvent("video_play", p); }
    if (event.data == YT.PlayerState.ENDED) { _sendEvent("video_complete", p); }
    if (event.data == YT.PlayerState.PAUSED) { _sendEvent("video_pause", p); }
  };
  youtube_parser = function (e) { var t = e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/); if (t && 11 == t[2].length) return t[2] };
  IsYouTube = function (u) { var e = u.match(/(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/); return null != e && e.length > 0 };
  YTUrlHandler = function (t) { return t = t.replace(/origin\=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\&?/gi, "origin=" + document.location.protocol + "//" + document.location.host), stAdd = "", adFlag = !1, -1 == t.indexOf("https") && (t = t.replace("http", "https")), -1 == t.indexOf("?") && (stAdd = "?flag=1"), -1 == t.indexOf("enablejsapi") && (stAdd += "&enablejsapi=1", adFlag = !0), -1 == t.indexOf("origin") && (stAdd += "&origin=" + document.location.protocol + "//" + document.location.host, adFlag = !0), 1 == adFlag ? t + stAdd : t };
  _initYouTubeTracker = function () {
    var i = 0;
    var allIframes = document.getElementsByTagName('iframe');
    for (var iframe = 0; iframe < allIframes.length; iframe++) {
      var video = allIframes[iframe];
      var _thisSrc = video.src;
      if (IsYouTube(_thisSrc)) {
        allIframes[iframe].src = YTUrlHandler(_thisSrc);
        var youtubeid = youtube_parser(_thisSrc);
        videoArray[i] = youtubeid;
        allIframes[iframe].setAttribute('id', youtubeid);
        i++;
      }
    }
  };
}
// END YT TRACKER //

// GA4 Payload Interceptor
function _payloadInterceptor() {
  window._isRedacted = window._isRedacted || false;
  if (!window._isRedacted) {
    window._isRedacted = !0;
    try {
      var proxied = window.navigator.sendBeacon;
      window.navigator.sendBeacon = function () {
        if (arguments && arguments[0].match(/google-analytics\.com.*v\=2\&/)) {
          var endpoint = arguments[0].split('?')[0];
          var query = arguments[0].split('?')[1];
          var beacon = {
            endpoint: endpoint,
            // Check for PII
            query: _piiredactor(query, "ga4"), events: []
          };
          // This is a multiple events hit
          if (arguments[1]) {
            arguments[1].split("\r\n").forEach(function (event) {
              // Check for PII
              beacon.events.push(_piiredactor(event, "ga4"));
            });
          }
          arguments[0] = [beacon.endpoint, beacon.query].join('?');
          if (arguments[1] && beacon.events.length > 0) {
            beacon.events.join("\r\n"); 
            arguments[1] = beacon.events.join("\r\n");
          }
        }
        return proxied.apply(this, arguments);
      };
    } catch (e) { return proxied.apply(this, arguments); }
  }
}
// End GA4 Payload Interceptor

// Payload Redactor
function _piiredactor(payload, type) {
  var piiRegex = [{
    name: 'EMAIL',
    regex: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi
  }, {
    name: 'TEL',
    regex: /(tel|telephone|mob(ile)?|cell(ular)?)\=[\d\+\s]([^&\/\?]*)/gi
  }, {
    name: 'NAME',
    regex: /((first|last|middle|sur|f|l)([\-\_])?)?name\=([^\&\s]*)/ig
  }, {
    name: 'PASSWORD',
    regex: /(((confirm([\-\_])?)?password)|passwd|pwd)\=([^\&\s]*)/ig
  }, {
    name: 'ZIP',
    regex: /((postcode=)|(zipcode=)|(zip=))([^&\/\?]*)/gi
  }, {
    name: 'ADDRESS',
    regex: /add(ress)?([1-2])?\=([^\&\s]*)/ig
  }, {
    name: 'SSN',
    regex: /(full)?(([\-\_])?)?ssn\=(\d{3}\-?\d{2}\-?\d{4})([^\&\s]*)/ig
  }, {
    name: 'DOB',
    regex: /((birth)?date|dob)\=([^&\/\?]*)/ig
  }];
  try {
    var _allowedQs = _allowedQuerystrings.toString().replace(/\,/g, "=|")+"=";
    var checkParams = ((type === "ga4") ? "dl|dp|dr|dt|en|ep.|up.|uid" : "dl|dp|dr|dt|ec|ea|el|uid|cd\\d{1,3}|pr\\d{1,3}cd\\d{1,3}");
    var _hitPayloadParts = payload.split('&'); 
    for (var i = 0; i < _hitPayloadParts.length; i++) {
      var newQueryString = '';
      var _param = _hitPayloadParts[i].split('=');
      var _val;
      try {
        _val = decodeURIComponent(decodeURIComponent(_param[1]));
      } catch (e) {
        _val = decodeURIComponent(_param[1]);
      }
      if (_param[0].match(new RegExp(checkParams)) != null && _val.indexOf('?') > -1) {
        var paramArray = _val.split('?').splice(1).join('&').split('&');
        var paramSubArray = [];
        // loop through the parameters in the search query string to see if there are sub-parameters, and build the paramSubArray
        for (pa = 0; pa < paramArray.length; pa++) {
          // account for sub-parameters within parameters in the URL
          if (paramArray[pa].indexOf('?') > -1) {
            paramSubArray.push(paramArray[pa].split('?')[1]);
          }
        }
        paramArray = paramArray.concat(paramSubArray);
        // Build a new query string out of all allowed parameters
        for (var ix = 0; ix < paramArray.length; ix++) {
          if ( paramArray[ix].toLowerCase().match(new RegExp(_allowedQs))!= null ) {
            newQueryString += paramArray[ix] + '&';
          }
        }
        _val = _val.replace(/\?.*/, '?' + newQueryString.replace(/\&$/, ''));
      }
      if (_param[0].match(new RegExp(checkParams)) != null) {
        piiRegex.forEach(function (pii) {
          _val = _val.replace(pii.regex, '[REDACTED_' + pii.name + ']');
        });
        _param[1] = encodeURIComponent(_val.replace(/\?$/, '')) || _val.replace(/\?$/, '');
        _hitPayloadParts[i] = _param.join('=');
      }
    }
    return _hitPayloadParts.join("&");
  } catch (error) {
  }
}
// Payload Redactor
function _initIdAssigner() {
  for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) {
    var c = a[b].getAttribute("id");
    (null !== c && "" !== c && void 0 !== c) ||
      a[b].setAttribute("id", "anch_" + b);
  }
}
// UA customTask 
function _customTask(){
  var globalSendHitTaskName   = '_ga_originalSendHitTask';
  return function (customTaskModel) {
    window[globalSendHitTaskName] = window[globalSendHitTaskName] || customTaskModel.get('sendHitTask');
    customTaskModel.set('sendHitTask', function (sendHitTaskModel) {
      var originalSendHitTaskModel = sendHitTaskModel,
          originalSendHitTask      = window[globalSendHitTaskName],
          canSendHit               = true;
      try {
        var pl = sendHitTaskModel.get('hitPayload');
        var redactedPayload = _piiredactor(pl, "UA");
        sendHitTaskModel.set('hitPayload', redactedPayload, true);
        if (canSendHit) {
          originalSendHitTask(sendHitTaskModel);
        }
      } catch (error) {
        originalSendHitTask(originalSendHitTaskModel);
      }
    });
  };
}
// End UA customTask
// ************ GA4 ************
function _scrubbedURL(z) {
  RegExp.escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
  var n = new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace(/^www\\./, ""))}`, "ig"),
    t = "",
    o = ((n.test(z)) ? z : document.location.protocol + "//" + document.location.hostname + z),
    a = o.split("?")[0],
    r = o.split("?").length > 1
      ? (o
        .split("?")[1]
        .split("&")
        .forEach(function (o, i) {
          _allowedQuerystrings.indexOf(o.split("=")[0]) > -1 && (t = t + "&" + o);
        }),
        t.length > 0 ? a + "?" + t.substring(1) : a)
      : a;
  return r;
}

function _setAllowedQS() {
  var queries = {
    "default": ["utm_id", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic", "gbraid", "wbraid", "_gl", "gclid", "dclid", "gclsrc", "affiliate", "dap-dev-env", "v"],
    "gsa": ["challenge", "state"],
    "dhs": ["appreceiptnum"],
    "doc": ["station", "meas", "start", "atlc", "epac", "cpac", "basin", "fdays", "cone", "tswind120", "gm_track", "50wind120", "hwind120", "mltoa34", "swath", "radii", "wsurge", "key_messages", "inundation", "rainqpf", "ero", "gage", "wfo", "spanish_key_messages", "key_messages", "sid", "lan", "office", "pil"],
    "hhs": ["s_cid", "selectedFacets"],
    "hud": ["PostID"],
    "nasa": ["feature", "ProductID", "selectedFacets"],
    "nps": ["gid", "mapid", "site", "webcam", "id"],
    "nsf": ["meas", "start", "atlc", "epac", "cpac", "basin", "fdays", "cone", "tswind120", "gm_track", "50wind120", "hwind120", "mltoa34", "swath", "radii", "wsurge", "key_messages", "inundation", "rainqpf", "ero", "gage", "wfo", "spanish_key_messages", "key_messages", "sid"],
    "va": ["id"],
    "dod": ["p"],
    "opm": ["l", "soc", "jt", "j", "rmi", "smin", "hp", "g", "d", "a"]
  };
  _allowedQuerystrings = queries.default.concat(queries[oCONFIG.AGENCY.toLowerCase()]).concat(oCONFIG.SEARCH_PARAMS.split("|"));
}

function _setUpTrackers() {
  tObjectCheck !== window.GoogleAnalyticsObject && createTracker(!1);
  oCONFIG.ENHANCED_LINK ? _initIdAssigner() : "";
  oCONFIG.AUTOTRACKER ? _initAutoTracker() : "";
  oCONFIG.YOUTUBE ? _initYouTubeTracker() : "";
}

function _setUpTrackersIfReady() {
  return (("interactive" === document.readyState || "complete" === document.readyState) ? (_setUpTrackers(), !0) : !1);
}
_setUpTrackersIfReady() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));
