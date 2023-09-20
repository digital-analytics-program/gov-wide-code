/*
				    .ooooo.        oooooooo
				   d88" `88b      888    P88
				   888            o888oo888
				   888            888
				   `"88888"       888
                                  
***********************************************************************************************************
Copyright 2023 by Cardinal Path.
Dual Tracking Federated Analytics: Google Analytics Government Wide Site Usage Measurement.
Author: Ahmed Awwad
09/20/2023 Version: 6.8
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
    VERSION: "20230920 v6.8 - Dual Tracking",
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
    COOKIE_DOMAIN: location.hostname.replace("www.", "").toLowerCase(),
    COOKIE_TIMEOUT: 63072e3,
    SEARCH_PARAMS: "q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords",
    YOUTUBE: !1,
    AUTOTRACKER: !0,
    EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
    SUBDOMAIN_BASED: !0,
    PUA_NAME: "GSA_ENOR",
    GA4_NAME: "GSA_GA4_ENOR",
  };
  
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
  _updateConfig();
  _defineCookieDomain();
  _defineAgencyCDsValues();
  _setAllowedQS();
  createTracker(trackerFlag);
  _sendViewSearchResult(location.href);
}
_onEveryPage();

function _defineCookieDomain() {
  /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(
    oCONFIG.SUBDOMAIN_BASED.toString()
  )
    ? ((oCONFIG.COOKIE_DOMAIN = oCONFIG.SUBDOMAIN_BASED.toLowerCase().replace(
        "www.",
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
        .replace("www.", "")),
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
  return null != a && 0 < a.length;
}

function _isValidGA4Num(a) {
  a = a.toLowerCase();
  a = a.match(/^g\-([0-9a-z])+$/);
  return null != a && 0 < a.length;
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
  } catch (c) {}
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
        } catch (d) {}
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
        } catch (d) {}
  }
}

function _sendEvent(a, b) {
  !/^(page_view|view_search_results)$/i.test(a) && _mapGA4toUA(a, b);
  var send_to = "";
  for (var g = 0; g < oCONFIG.GWT_GA4ID.length; g++){
    try {
      send_to += oCONFIG.GA4_NAME+g+ ",";
    }
    catch(er){}
  }
  b.send_to = send_to.replace(/.$/, "");
  b.event_name_dimension = a;
  gtag("event", a, b);
}

function _mapGA4toUA(en, pa) {
  var a, b, c, d, f, e;
  (c = pa.link_url),
  (d = pa.event_value?pa.event_value:0),
    (f = pa.non_interaction || !1),
    (e =  pa.interaction_type);
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
      b =
        pa.video_percent > 0 && pa.video_percent <= 33
          ? "33%"
          : pa.video_percent > 33 && pa.video_percent <= 66
          ? "66%"
          : pa.video_percent > 66 && pa.video_percent <= 90
          ? "90%"
          : pa.video_percent;
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
      } catch (k) {}
  }
}

function _sendPageview(a, b) {
  if ("" !== a && void 0 !== a) {
    var ur = _URIHandler(_scrubbedURL(a)).split(/[#]/)[0];
    tObjectCheck !== window.GoogleAnalyticsObject && createTracker(!1);
    for (var c = 0; c < oCONFIG.GWT_UAID.length; c++){
      try {
        window[window.GoogleAnalyticsObject](
          oCONFIG.PUA_NAME + c + ".send",
          "pageview",
          {
            page: ur.split(location.hostname)[1],
            title: "" !== b || void 0 !== b ? b : document.title
          }
        );
      } catch (d) {}
    }

      _sendEvent("page_view", {
        page_location: ur,
        page_title: "" !== b || void 0 !== b ? b : document.title,
        ignore_referrer: (_isExcludedReferrer()? true : false)
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
      } catch (n) {}
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
      } catch (n) {}
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
      } catch (n) {}
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
      } catch (n) {}
}

function _URIHandler(a) {
  var b = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]+)", "i");
  b.test(a) && (a = a.replace(b, "$1query$3"), isSearch = true);
  return a;
}

function _sendViewSearchResult(a){
  isSearch && (_sendEvent("view_search_results", {search_term: _URIHandler(a).match(/([?&])(query\=)([^&#?]*)/i)[3], page_location: _URIHandler(_scrubbedURL(a))}), isSearch=false);
}

function _isExcludedReferrer() {
  if ("" !== document.referrer) {
    var a = document.referrer
      .replace(/https?:\/\//, "")
      .split("/")[0]
      .replace("www.", "");
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
  for (var b = 0; b < oCONFIG.GWT_UAID.length; b++) {
    var cc = _URIHandler(_scrubbedURL(document.location.pathname + document.location.search + document.location.hash));
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
      (c = ("/vpv404/" + c).replace(/\/\//g, "/") + ((document.referrer)? "/" + document.referrer : document.referrer));
    if (a)
      window[window.GoogleAnalyticsObject](
        oCONFIG.PUA_NAME + b + ".send",
        "pageview", c
      );
  }

  var p = ((-1 !== document.title.search(/404|not found/ig))? document.location.protocol+"//"+document.location.hostname+c : document.location.href);
  var ur = _URIHandler(_scrubbedURL(p));
  for (var b = 0; b < oCONFIG.GWT_GA4ID.length; b++) {
    if((b === 0) || (b > 0 && oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS)){
      gtag("config", oCONFIG.GWT_GA4ID[b], {
        groups: oCONFIG.GA4_NAME+b,
        cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
        page_location: ur,
        ignore_referrer: (_isExcludedReferrer()? true : false),
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
        groups: oCONFIG.GA4_NAME+b,
        cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
        page_location: ur,
        ignore_referrer: (_isExcludedReferrer()? true : false)
      });
    }
  }
}

function _initAutoTracker(a) {
  var b = oCONFIG.COOKIE_DOMAIN,
    c = oCONFIG.EXTS.split("|");
  a = a || document.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    var d = 0,
      f = "",
      e = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
      h =
        /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
      g = /^(tel:)(.*)$/i;
    if (e.test(a[i].href) || h.test(a[i].href) || g.test(a[i].href)) {
      try {
        h.test(a[i].href)
          ? (f = a[i].hostname.toLowerCase().replace("www.", ""))
          : e.test(a[i].href)
          ? (f = a[i].href.split("@")[1].toLowerCase())
          : g.test(a[i].href) && ((f = a[i].href), (f = f.toLowerCase()));
      } catch (k) {
        continue;
      }
      if (oCONFIG.SUBDOMAIN_BASED ? -1 !== f.indexOf(b) : f === b)
        if (
          -1 !== a[i].href.toLowerCase().indexOf("mailto:") &&
          -1 === a[i].href.toLowerCase().indexOf("tel:")
        )
          (e = a[i].href.match(
            /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/
          )),
            _tagClicks(a[i], "email_click", {
              link_id: a[i].id,
              link_url: e[0],
              link_domain: e[0].split("@")[1],
              link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
              link_classes: a[i].className,
            });
        else if (
          -1 === a[i].href.toLowerCase().indexOf("mailto:") &&
          -1 !== a[i].href.toLowerCase().indexOf("tel:")
        )
          _tagClicks(a[i], "telephone_click", {
            link_id: a[i].id,
            link_url: a[i].href.split("tel:")[1],
            link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
            link_classes: a[i].className,
          });
        else {
          if (
            -1 === a[i].href.toLowerCase().indexOf("mailto:") &&
            -1 === a[i].href.toLowerCase().indexOf("tel:")
          )
            for (d = 0; d < c.length; d++)
              if (
                ((e = a[i].href.split(".")),
                (e = e[e.length - 1].split(/[#?&?]/)),
                e[0].toLowerCase() === c[d])
              ) {
                var pa = a[i].pathname.split(/[#?&?]/)[0]; 
                var p = pa.length >100? "[shrt]"+pa.substring(pa.length-94) : pa;
                _tagClicks(a[i], "file_download", {
                  file_name: p,
                  file_extension: e[0].toLowerCase(),
                  link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
                  link_id: a[i].id,
                  link_url: a[i].href.replace(/[#?&].*/, ""),
                  link_domain: a[i].hostname.replace(/(www\.)?/gi, ""),
                });
                break;
              }
        }
      else
        for (f = 0; f < c.length; f++)
          if (
            ((e = a[i].href.split(".")),
            (e = e[e.length - 1].split(/[#?]/)),
            e[0].toLowerCase() === c[f])
          ) {
            a[i].href.split(c[f]);
            var pa = a[i].pathname.split(/[#?&?]/)[0]; 
            var p = pa.length >100? "[shrt]"+pa.substring(pa.length-94) : pa;
            _tagClicks(a[i], "file_download", {
              file_name: p,
              file_extension: e[0].toLowerCase(),
              link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
              link_id: a[i].id,
              link_url: a[i].href.replace(/[#?&].*/, ""),
              link_domain: a[i].hostname.replace(/(www\.)?/gi, ""),
              outbound: true,
            });
            break;
          } else
            e[0].toLowerCase() !== c[f] &&
              (d++,
              d === c.length &&
                (-1 === a[i].href.toLowerCase().indexOf("mailto:") &&
                -1 === a[i].href.toLowerCase().indexOf("tel:")
                  ? _tagClicks(a[i], "click", {
                      link_id: a[i].id,
                      link_url: a[i].href.replace(/[#?&].*/, ""),
                      link_domain: a[i].hostname.replace(/(www\.)?/gi, ""),
                      link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
                      link_classes: a[i].className,
                      outbound: true,
                    })
                  : c.length &&
                    -1 !== a[i].href.toLowerCase().indexOf("mailto:") &&
                    -1 === a[i].href.toLowerCase().indexOf("tel:")
                  ? ((e = a[i].href.match(
                      /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i
                    )),
                    _tagClicks(a[i], "email_click", {
                      link_id: a[i].id,
                      link_url: e[0],
                      link_domain: e[0].split("@")[1],
                      link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
                      link_classes: a[i].className,
                      outbound: true,
                    }))
                  : c.length &&
                    -1 === a[i].href.toLowerCase().indexOf("mailto:") &&
                    -1 !== a[i].href.toLowerCase().indexOf("tel:") &&
                    _tagClicks(a[i], "telephone_click", {
                      link_id: a[i].id,
                      link_url: a[i].href.split("tel:")[1],
                      link_text: a[i].text.replace(/(?:[\r\n]+)+/g, "").trim(),
                      link_classes: a[i].className,
                    })));
    }
  }
}

// START YT TRACKER //
if (oCONFIG.YOUTUBE) {
  var videoArray_fed = [],
    playerArray_fed = [],
    _f33 = !1,
    _f66 = !1,
    _f90 = !1,
    tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var youtube_parser_fed = function (a) {
      if (
        (a = a.match(
          /^(https?:)?(\/\/)?(www\.)?(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*$/
        )) &&
        11 === a[9].length
      )
        return a[9];
    },
    IsYouTube_fed = function (a) {
      return /^(https?:)?(\/\/)?(www\.)?(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*$/.test(
        a.toString()
      )
        ? !0
        : !1;
    },
    YTUrlHandler_fed = function (a) {
      a = a.replace(
        /origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi,
        "origin=" + document.location.protocol + "//" + document.location.host
      );
      stAdd = "";
      adFlag = !1;
      -1 === a.indexOf("https") && (a = a.replace("http", "https"));
      -1 === a.indexOf("?") && (stAdd = "?flag=1");
      -1 === a.indexOf("enablejsapi") &&
        ((stAdd += "&enablejsapi=1"), (adFlag = !0));
      -1 === a.indexOf("html5") && ((stAdd += "&html5=1"), (adFlag = !0));
      -1 === a.indexOf("origin") &&
        ((stAdd +=
          "&origin=" +
          document.location.protocol +
          "//" +
          document.location.host),
        (adFlag = !0));
      return !0 === adFlag ? a + stAdd : a;
    },
    _initYouTubeTracker = function () {
      for (
        var a = document.getElementsByTagName("iframe"), b = 0, c = 0;
        c < a.length;
        c++
      ) {
        _thisVideoObj = a[c];
        var d = _thisVideoObj.src;
        IsYouTube_fed(d) &&
          ((_thisVideoObj.src = YTUrlHandler_fed(d)),
          (d = youtube_parser_fed(d)),
          _thisVideoObj.setAttribute("id", d),
          (videoArray_fed[b] = d),
          b++);
      }
    },
    onYouTubePlayerAPIReady = function () {
      for (var a = 0; a < videoArray_fed.length; a++)
        playerArray_fed[a] = new YT.Player(videoArray_fed[a], {
          events: {
            onReady: onFedPlayerReady,
            onStateChange: onFedPlayerStateChange,
          },
        });
    },
    onFedPlayerReady = function (a) {},
    onFedPlayerStateChange = function (a) {
      var b = a.target.getIframe().getAttribute("src");
      _thisDuration = (
        (parseInt(a.target.getCurrentTime()) /
          parseInt(a.target.getDuration())) *
        100
      ).toFixed();
      var p = {
        video_current_time: Math.round(a.target.getCurrentTime()),
        video_duration: Math.round(a.target.getDuration()),
        video_percent: this.video_percent || Math.round(+_thisDuration),
        video_provider: "youtube",
        video_title: a.target.getVideoData().title,
        video_url: b.split("?")[0],
      };
      youtube_parser_fed(b);
      "undefined" !== typeof onPlayerStateChange && onPlayerStateChange(a);

      parseInt(a.data) === parseInt(YT.PlayerState.PLAYING)
        ? 0 == Math.floor(+_thisDuration)
          ? ((_f90 = _f66 = _f33 = !1), _sendEvent("video_start", p))
          : _sendEvent("video_play", p)
        : a.data === YT.PlayerState.ENDED
        ? _sendEvent("video_complete", p)
        : a.data === YT.PlayerState.PAUSED &&
          (_sendEvent("video_pause", p),
          100 > _thisDuration &&
            ((a = _thisDuration),
            0 < a && 33 >= a && !1 === _f33
              ? ((p.video_percent = 33),
                _sendEvent("video_progress", p),
                (p.video_percent = undefined),
                (_f33 = !0))
              : 33 < a && 66 >= a && !1 === _f66
              ? ((p.video_percent = 66),
                _sendEvent("video_progress", p),
                (p.video_percent = undefined),
                (_f66 = !0))
              : 66 < a &&
                90 >= a &&
                !1 === _f90 &&
                ((p.video_percent = 90),
                _sendEvent("video_progress", p),
                (p.video_percent = undefined),
                (_f90 = !0))));
    };
  }
 // END YT TRACKER //

function _initIdAssigner() {
  for (var a = document.getElementsByTagName("a"), b = 0; b < a.length; b++) {
    var c = a[b].getAttribute("id");
    (null !== c && "" !== c && void 0 !== c) ||
      a[b].setAttribute("id", "anch_" + b);
  }
}

function _tagClicks(a, b, c) {
  a.addEventListener
    ? (a.addEventListener("mousedown", function () {
        (c.interaction_type = "Mouse Click"), _sendEvent(b, c);
      }),
      a.addEventListener("keydown", function (e) {
        13 === e.keyCode &&
          ( (c.interaction_type = "Enter Key Keystroke"), _sendEvent(b, c));
      }))
    : a.attachEvent &&
      (a.attachEvent("onmousedown", function () {
        (c.interaction_type = "Mouse Click"), _sendEvent(b, c);
      }),
      a.attachEvent("onkeydown", function (e) {
        13 === e.keyCode &&
          ( (c.interaction_type = "Enter Key Keystroke"), _sendEvent(b, c));
      }));
}


// ************ GA4 ************
 function _scrubbedURL(z) {
  RegExp.escape = function(s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
  var n = new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace("www.", ""))}`, "ig"),
    t = "",
    o = ((n.test(z) )? z: document.location.protocol +"//"+ document.location.hostname+z ),
    a = o.split("?")[0];
  return o.split("?").length > 1
    ? (o
        .split("?")[1]
        .split("&")
        .forEach(function (o, i) {
          _allowedQuerystrings.indexOf(o.split("=")[0]) > -1 && (t = t + "&" + o);
        }),
      t.length > 0 ? a + "?" + t.substring(1) : a)
    : a;
}

function _setAllowedQS(){
  var queries = {
    "default": ["utm_id","utm_source","utm_medium","utm_campaign","utm_term","utm_content","_gl","gclid", "dclid", "gclsrc", "affiliate"],
      "gsa": ["challenge","state"],
      "dhs": ["appreceiptnum"],
      "doc": ["station","meas","start","atlc","epac","cpac","basin","fdays","cone","tswind120","gm_track","50wind120","hwind120","mltoa34","swath","radii","wsurge","key_messages","inundation","rainqpf","ero","gage","wfo","spanish_key_messages","key_messages","sid","lan","office"],
      "hhs": ["s_cid","selectedFacets"],
      "hud": ["PostID"],
      "nasa": ["feature","ProductID","selectedFacets"],
      "nps": ["gid","mapid","site","webcam","id"],
      "nsf": ["meas","start","atlc","epac","cpac","basin","fdays","cone","tswind120","gm_track","50wind120","hwind120","mltoa34","swath","radii","wsurge","key_messages","inundation","rainqpf","ero","gage","wfo","spanish_key_messages","key_messages","sid"],
      "va": ["id"]
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
  return (("interactive" === document.readyState || "complete" === document.readyState)? (_setUpTrackers(), !0) : !1);
}
_setUpTrackersIfReady() || (document.addEventListener? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));
