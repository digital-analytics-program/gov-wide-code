/***********************************************************************************************************
U.S. General Services Administration (GSA).
Digital Analytics Program Government Wide Site Usage Measurement and Tracking. 
07/11/2024 Version: 8.4
***********************************************************************************************************/

/**
 * The Universal-Federated-Analytics.js file is part of the Digital Analytics
 * Program (DAP), designed to help US federal agencies implement a unified web
 * analytics solution. This script integrates Google Analytics (GA4) tracking
 * into government websites, ensuring data consistency and centralized reporting
 * across agencies.
 *
 * This code provides a robust and customizable solution for tracking user
 * interactions and page views on a website using GA4. It includes various
 * features and functions to ensure accurate and reliable data collection, while
 * also protecting user privacy by redacting any potential PII.
 */


/**
 * Defines a configuration object oCONFIG which contains various settings and
 * parameters for the tracking script. This includes the GA4 property ID,
 * whether to force SSL, anonymize IP addresses, and other tracking and data
 * collection settings.
 */
(function () {
  var isSearch = false,
  _allowedQuerystrings = [],
    oCONFIG = {
      GWT_GA4ID: ["G-CSLL4ZEK4L"],
      FORCE_SSL: !0,
      ANONYMIZE_IP: !0,
      AGENCY: "",
      SUB_AGENCY: "",
      VERSION: "20240711 v8.4 - GA4",
      SITE_TOPIC: "",
      SITE_PLATFORM: "",
      SCRIPT_SOURCE: "",
      URL_PROTOCOL: location.protocol,
      USE_MAIN_CUSTOM_DIMENSIONS: !0,
      MAIN_AGENCY_DIMENSION: "agency",
      MAIN_SUBAGENCY_DIMENSION: "subagency",
      MAIN_CODEVERSION_DIMENSION: "version",
      MAIN_SITE_TOPIC_DIMENSION: "site_topic",
      MAIN_SITE_PLATFORM_DIMENSION: "site_platform",
      MAIN_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
      MAIN_URL_PROTOCOL_DIMENSION: "protocol",
      MAIN_INTERACTION_TYPE_DIMENSION: "interaction_type",
      MAIN_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
      USE_PARALLEL_CUSTOM_DIMENSIONS: !1,
      PARALLEL_AGENCY_DIMENSION: "agency",
      PARALLEL_SUBAGENCY_DIMENSION: "subagency",
      PARALLEL_CODEVERSION_DIMENSION: "version",
      PARALLEL_SITE_TOPIC_DIMENSION: "site_topic",
      PARALLEL_SITE_PLATFORM_DIMENSION: "site_platform",
      PARALLEL_SCRIPT_SOURCE_URL_DIMENSION: "script_source",
      PARALLEL_URL_PROTOCOL_DIMENSION: "protocol",
      PARALLEL_INTERACTION_TYPE_DIMENSION: "interaction_type",
      PARALLEL_USING_PARALLEL_DIMENSION: "using_parallel_tracker",
      COOKIE_DOMAIN: location.hostname.replace(/^www\./, "").toLowerCase(),
      COOKIE_TIMEOUT: 63072e3,
      SEARCH_PARAMS: "q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
      YOUTUBE: !1,
      HTMLVIDEO: !0,
      YT_MILESTONE: 25, //accepts 10, 20, and 25
      AUTOTRACKER: !0,
      EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
      SUBDOMAIN_BASED: !0,
      GA4_NAME: "GSA_GA4_ENOR",
      USE_CUSTOM_URL: !1,
      USE_CUSTOM_TITLE: !1,
      USING_PARALLEL_TRACKER: "no",
      ACTIVATE_DEV: !1
    };

  _updateConfig();
  _setEnvironment();

  //*********GA4************
  var dap_head = document.getElementsByTagName("head").item(0);
  var GA4Object = document.createElement("script");
  GA4Object.setAttribute("type", "text/javascript");
  GA4Object.setAttribute(
    "src",
    "https://www.googletagmanager.com/gtag/js?id=" + oCONFIG.GWT_GA4ID[0]
  );
  dap_head.appendChild(GA4Object);
  window.dataLayer = window.dataLayer || [];
  /**
   * Pushes commands to the data layer array which is used by the Google gtag.js
   * library. More details are provided here:
   * https://developers.google.com/tag-platform/gtagjs/reference
   *
   * @param {string} command the name of the gtag command. Valid commands are:
   * "js", "config", "get", "set", "event", "consent"
   * @param {...*} commandParameters parameters passed to the gtag command. These
   * vary according to the command.
   */
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag('set', { 'cookie_flags': 'SameSite=Strict;Secure', 'transport_type': 'beacon' });
  //*********GA4************

  /**
   * This function is an interface function that enables DAP users to send their
   * custom GA4 events with the specified event name and parameters to the DAP GA4
   * property and all other parallel properties set through the DAP. This is an
   * older version of the gas4() function, which is kept for backward
   * compatibility. Some agencies are still using this function since it was the
   * older version created for the same purpose but mainly for Universal
   * Analytics.
   *
   * @param {*} a unknown
   * @param {*} b unknown
   * @param {*} c unknown
   * @param {*} d unknown
   * @param {*} f unknown
   * @param {*} e unknown
   * @param {*} h unknown
   */
  window.gas = function (a, b, c, d, f, e, h) {
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
          c = _URIHandler(_scrubbedURL(c)).split(/[#]/)[0];
          _sendEvent("page_view", { page_location: c, page_title: void 0 === d || "" === d ? document.title : d }),
            ((isSearch) ? _sendViewSearchResult({ search_term: isSearch }) : '');

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
        } catch (n) { }
      else if (-1 != b.toLowerCase().indexOf("metric"))
        try {

        } catch (n) { }
  };

  /**
   * This function is a public interface function that enables sites which include
   * the DAP JavaScript to send custom GA4 events with the specified event name
   * and parameters to the DAP GA4 property and all other parallel properties set
   * as query parameters to the DAP JavaScript source URL.
   *
   * @param {string} a the event name to be sent. This will default to 'dap_event'
   * if the event name is not in a hard-coded list of supported event names.
   * @param {object} b the event parameters to be sent. These parameters are
   * modified for the 'page_view' event to include page_location, page_title, and
   * search_term
   */
  window.gas4 = function (a, b) {
    if (void 0 !== a && "" !== a && void 0 !== b && 'object' === typeof b) {
      a = _cleanGA4Value("e", a);
      if ("page_view" === a.toLowerCase())
        try {
          if (Object.keys(b).length !== 0) {
            var ur = ((b.page_location) ? b.page_location : location.href);
            b.page_location = _URIHandler(_scrubbedURL(ur)).split(/[#]/)[0];
            b.page_title = ((b.page_title) ? b.page_title : document.title);
            _sendEvent("page_view", b), ((isSearch) ? (_sendViewSearchResult({ search_term: isSearch })) : '');
          }
        } catch (n) { }
      else
        try {
          var e_n = ((/^(((email|telephone|image|cta|navigation|faq|accordion|social)_)?click|file_download|view_search_results|video_(start|pause|progress|complete|play)|official_USA_site_banner_click|form_(start|submit|progress)|content_view|social_share|error|sort|filter|was_this_helpful_submit)$/gi.test(a)) ? a : 'dap_event');
          if (Object.keys(b).length !== 0) { _sendEvent(e_n, b); }
          else { _sendEvent(e_n); }
        } catch (n) { }
    }
  };

  /**
   * This function initializes the payload interceptor, defines the cookie domain,
   * defines agency custom dimensions values, sets allowed query strings, and
   * creates trackers. This function should be called immediately when every page
   * is loaded in order to begin tracking analytics data.
   */
  function _onEveryPage() {
    _payloadInterceptor();
    _defineCookieDomain();
    _defineAgencyCDsValues();
    _setAllowedQS();
    createTracker();
  }
  _onEveryPage();

  /**
   * This function configures the cookie domain. The oCONFIG.COOKIE_DOMAIN value
   * is set based on the oCONFIG.SUBDOMAIN_BASED configuration value.
   */
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

  /**
   * This function sets configuration values of agency custom dimensions.
   */
  function _defineAgencyCDsValues() {
    oCONFIG.AGENCY = oCONFIG.AGENCY || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SUB_AGENCY = oCONFIG.SUB_AGENCY || "" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SITE_TOPIC =
      oCONFIG.SITE_TOPIC || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
    oCONFIG.SITE_PLATFORM =
      oCONFIG.SITE_PLATFORM || "unspecified:" + oCONFIG.COOKIE_DOMAIN;
  }

  /**
   * This function sets the environment to production or dev, and drives the
   * traffic to the respective GA4 data stream based on the presence of
   * dap-dev-env query parameter in the page URL or dapdev parameter in the DAP
   * code script reference.
   */
  function _setEnvironment() {
    if (document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i) || oCONFIG.ACTIVATE_DEV) {
      oCONFIG.GWT_GA4ID[0] = "G-9TNNMGP8WJ"; //Test Digital Analytics Program GA4
    }
  }

  /**
   * @param {string} a a string to convert to a boolean value.
   * @returns {boolean} true or false based on parsing the string parameter.
   */
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

  /**
   * @param {string} a a GA4 measurement ID
   * @returns {boolean} true if the GA4 measurement ID is valid, false otherwise.
   */
  function _isValidGA4Num(a) {
    a = a.toLowerCase();
    a = a.match(/^g\-([0-9a-z])+$/);
    return null !== a && 0 < a.length && a[0] !== oCONFIG.GWT_GA4ID[0].toLowerCase();
  }

  var d_c = 1;
  /**
   * This function cleans a GA4 value of event names and custom dimension names by
   * replacing whitespace and non-alphanumeric characters with underscores.
   *
   * @param {string} t a key name for the event
   * @param {string} a the event name or custom dimension name
   * @returns {string|undefined} the event name or custom dimension name formatted
   * with underscores. Returns undefined if an error occurs while processing the
   * params.
   */
  function _cleanGA4Value(t, a) {
    try {
      a = a.replace(/\s/g, '_').replace(/([^\w]+)/g, '').match(/[A-Za-z]\w*$/ig);
      return ((null !== a) ? a[0].toLowerCase() : t === "d" ? "custom_dimension_" + d_c++ : "dap_event");
    } catch (c) { }
  }

  /**
   * This function updates oCONFIG configuration values based on the query
   * parameters of the DAP script element.
   */
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
            _isValidGA4Num(c[d]) && (oCONFIG.GWT_GA4ID.push(c[d].toUpperCase()), oCONFIG.USING_PARALLEL_TRACKER = "pua");
          break;
        case "pga4":
          for (var c = _value.split(","), d = 0; d < c.length; d++)
            _isValidGA4Num(c[d]) && (oCONFIG.GWT_GA4ID.push(c[d].toUpperCase()), oCONFIG.USING_PARALLEL_TRACKER = "pga4");
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
        case "dapdev":
          _value = _cleanBooleanParam(_value);
          if (!0 === _value || !1 === _value)
            oCONFIG.ACTIVATE_DEV = _value;
          break;
        case "palagencydim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_AGENCY_DIMENSION = _value);
          break;
        case "palsubagencydim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_SUBAGENCY_DIMENSION = _value);
          break;
        case "palversiondim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_CODEVERSION_DIMENSION = _value);
          break;
        case "paltopicdim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_SITE_TOPIC_DIMENSION = _value);
          break;
        case "palplatformdim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_SITE_PLATFORM_DIMENSION = _value);
          break;
        case "palscriptsrcdim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION = _value);
          break;
        case "palurlprotocoldim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_URL_PROTOCOL_DIMENSION = _value);
          break;
        case "palinteractiontypedim":
          _value = _cleanGA4Value("d", _value);
          "" !== _value &&
            (oCONFIG.PARALLEL_INTERACTION_TYPE_DIMENSION = _value);
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
        case "htmlvideo":
          _value = _cleanBooleanParam(_value);
          if (!0 === _value || !1 === _value) oCONFIG.HTMLVIDEO = _value;
          break;
        case "yt":
          _value = _cleanBooleanParam(_value);
          if (!0 === _value || !1 === _value) oCONFIG.YOUTUBE = _value;
          break;
        case "ytm":
          oCONFIG.YT_MILESTONE = ((/^(10|20|25)$/.test(_value) ? parseInt(_value) : 25));
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

  /**
   * This function sends an event command to the Google gtag.js library with the
   * specified event name and parameters. PII is redacted from the event
   * parameters.
   *
   * @param {string} a the event name
   * @param {object} b the event parameters. The parameters are modified to add
   * 'send_to' and 'event_name_dimension' keys before sending the parameters to
   * the gtag.js library's event command
   */
  function _sendEvent(a, b) {
    var send_to = "";
    for (var g = 0; g < oCONFIG.GWT_GA4ID.length; g++) {
      try {
        send_to += oCONFIG.GA4_NAME + g + ",";
      }
      catch (er) { }
    }
    var c = _piiRedactor(_objToQuery(b), "json");
    c = _queryToJSON(c);
    c = _unflattenJSON(c);
    c.send_to = send_to.replace(/.$/, "");
    c.event_name_dimension = a;
    gtag("event", a, c);
  }

  /**
   * This function sends a GA4 view_search_results event with the specified search
   * term.
   *
   * @param {string} a the search term.
   */
  function _sendViewSearchResult(a) {
    _sendEvent("view_search_results", a), isSearch = !1;
  }

  /**
   * This function checks for self-referrals to check if the referrer should be
   * excluded based on the SUBDOMAIN_BASED configuration.
   *
   * @returns {boolean|undefined} true if the referrer should be excluded,
   * undefined if the document.referrer is empty, false otherwise.
   */
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

  /**
   * This function creates a GA4 tracker with the configuration set in the oCONFIG
   * object. A "config" command is sent to the gtag.js library for the DAP GA4
   * configuration. A "config" command is also sent to the gtag.js library for
   * each configured parallel tracker.
   *
   * @param {*} a this parameter isn't used
   */
  function createTracker(a) {
    var m, n, o = /^\/.*$/i;
    try { m = ((oCONFIG.USE_CUSTOM_URL && o.test(custom_dap_data.url)) ? location.protocol + "//" + location.hostname + custom_dap_data.url.replace(location.protocol + "//" + location.hostname, "") : document.location.href); n = ((oCONFIG.USE_CUSTOM_TITLE) ? custom_dap_data.title : document.title); } catch (error) { m = document.location.href; n = document.title; }
    var c = m.split(document.location.hostname)[1];
    -1 !== document.title.search(/404|not found/i) &&
      (c = ("/vpv404/" + c).replace(/\/\//g, "/") + ((document.referrer) ? "/" + document.referrer : document.referrer));
    var p = ((-1 !== document.title.search(/404|not found/ig)) ? document.location.protocol + "//" + document.location.hostname + c : m);
    var ur = _URIHandler(_scrubbedURL(p));
    var r = {};
    for (var b = 0; b < oCONFIG.GWT_GA4ID.length; b++) {
      if (b === 0) {
        r = {
          groups: oCONFIG.GA4_NAME + b,
          cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
          //ignore_referrer: (_isExcludedReferrer() ? true : false),
          page_location: ur,
          page_title: n,
          [oCONFIG.MAIN_AGENCY_DIMENSION]: oCONFIG.AGENCY.toUpperCase(),
          [oCONFIG.MAIN_SUBAGENCY_DIMENSION]: oCONFIG.SUB_AGENCY.toUpperCase(),
          [oCONFIG.MAIN_SITE_TOPIC_DIMENSION]: oCONFIG.SITE_TOPIC.toLowerCase(),
          [oCONFIG.MAIN_SITE_PLATFORM_DIMENSION]: oCONFIG.SITE_PLATFORM.toLowerCase(),
          [oCONFIG.MAIN_SCRIPT_SOURCE_URL_DIMENSION]: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
          [oCONFIG.MAIN_CODEVERSION_DIMENSION]: oCONFIG.VERSION.toLowerCase(),
          [oCONFIG.MAIN_URL_PROTOCOL_DIMENSION]: oCONFIG.URL_PROTOCOL.toLowerCase(),
          [oCONFIG.MAIN_USING_PARALLEL_DIMENSION]: oCONFIG.USING_PARALLEL_TRACKER.toLowerCase()
        };
        ((document.referrer && -1 !== document.referrer.search(location.hostname)) ? (r.page_referrer = _scrubbedURL(document.referrer)) : document.referrer);
        var rr = _piiRedactor(_objToQuery(r), "default");
        rr = _queryToJSON(rr);
        rr = _unflattenJSON(rr);
        gtag("config", oCONFIG.GWT_GA4ID[b], rr);
      }
      else if (b > 0 && oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS) {
        r = {
          groups: oCONFIG.GA4_NAME + b,
          cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
          //ignore_referrer: (_isExcludedReferrer() ? true : false),
          page_location: ur,
          page_title: n,
          [oCONFIG.PARALLEL_AGENCY_DIMENSION]: oCONFIG.AGENCY.toUpperCase(),
          [oCONFIG.PARALLEL_SUBAGENCY_DIMENSION]: oCONFIG.SUB_AGENCY.toUpperCase(),
          [oCONFIG.PARALLEL_SITE_TOPIC_DIMENSION]: oCONFIG.SITE_TOPIC.toLowerCase(),
          [oCONFIG.PARALLEL_SITE_PLATFORM_DIMENSION]: oCONFIG.SITE_PLATFORM.toLowerCase(),
          [oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION]: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
          [oCONFIG.PARALLEL_CODEVERSION_DIMENSION]: oCONFIG.VERSION.toLowerCase(),
          [oCONFIG.PARALLEL_URL_PROTOCOL_DIMENSION]: oCONFIG.URL_PROTOCOL.toLowerCase(),
          [oCONFIG.PARALLEL_USING_PARALLEL_DIMENSION]: oCONFIG.USING_PARALLEL_TRACKER.toLowerCase()
        };
        ((document.referrer && -1 !== document.referrer.search(location.hostname)) ? (r.page_referrer = _scrubbedURL(document.referrer)) : document.referrer);
        var rr = _piiRedactor(_objToQuery(r), "default");
        rr = _queryToJSON(rr);
        rr = _unflattenJSON(rr);
        gtag("config", oCONFIG.GWT_GA4ID[b], rr);
      }
      else {
        r = {
          groups: oCONFIG.GA4_NAME + b,
          cookie_expires: parseInt(oCONFIG.COOKIE_TIMEOUT),
          //ignore_referrer: (_isExcludedReferrer() ? true : false),
          page_location: ur,
          page_title: n
        };
        ((document.referrer && -1 !== document.referrer.search(location.hostname)) ? (r.page_referrer = _scrubbedURL(document.referrer)) : document.referrer);
        var rr = _piiRedactor(_objToQuery(r), "default");
        rr = _queryToJSON(rr);
        rr = _unflattenJSON(rr);
        gtag("config", oCONFIG.GWT_GA4ID[b], rr);
      }
    }
    ((isSearch) ? _sendViewSearchResult({ search_term: isSearch }) : "");
  }

  /**
   * This function initializes the auto-tracker for links and downloads. It sets
   * event listeners to the document for mousedown and keydown events.
   */
  function _initAutoTracker() {
    /**
     * This function checks if a link is a download based on the file extension.
     *
     * @param {string} a the link URL
     * @returns {boolean} true if the URL is a download link, false otherwise.
     */
    var _isDownload = function (a) {
      var ex = a.href.toLowerCase().replace(/[#?&].*/, '').split(a.hostname)[1].split("."); var ext = ex[ex.length - 1];
      if (ext.match(new RegExp("^(" + oCONFIG.EXTS + ")$")) != null) {
        return ext;
      }
      else {
        return false;
      }
    };
    /**
     * @param {object} j the object to modify.
     * @returns {object|undefined} the object with all keys and values converted
     * to lower case, undefined if there is an error processing the object.
     */
  /*   var _enforeLower = function (j) {
      try {
        var d = JSON.stringify(j);
        return JSON.parse(d.toLowerCase());
      } catch (error) { }
    };
 */
    /**
     * This function handles events for the auto-tracker. It sends event commands
     * to the Google gtag.js library when links are clicked by the user. The event
     * name is determined by the type of link that was clicked.
     *
     * @param {object} event the browser event to handle
     */
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
                _sendEvent("email_click", l);
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
                  _sendEvent("file_download", l);
                }
                else if ("l" === i && !_isDownload(a)) {
                  //internal link tracking;
                  /*c = a.closest('section'); var s_n = (('object' === typeof c)? (c.id? c.id : c.className) : '');
                  l = { link_id: a.id, link_url: a.href, link_domain: a.hostname.replace(/^www\./i, ""), link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, interaction_type: t, section:  s_n, menu_type: 'all' };
                  _sendEvent("navigation_click", l);*/
                }
              }
            }
            else {
              if ("l" === i && _isDownload(a)) {
                c = a.pathname.split(/[#?&?]/)[0];
                d = _isDownload(a);
                l = { file_name: c, file_extension: d, link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_id: a.id, link_url: a.href.replace(/[#?&].*/, ""), link_domain: a.hostname.replace(/^www\./i, ""), outbound: true, interaction_type: t };
                _sendEvent("file_download", l);
              }
              else if ("l" === i && !_isDownload(a)) {
                l = { link_id: a.id, link_url: a.href.replace(/[#?&].*/, ""), link_domain: a.hostname.replace(/^www\./i, ""), link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, outbound: true, interaction_type: t };
                _sendEvent("click", l);
              }
              else if ("m" === i) {
                c = a.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
                l = { link_id: a.id, link_url: c[0], link_domain: c[0].split("@")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, outbound: true, interaction_type: t };
                _sendEvent("email_click", l);
              }
              else if ("t" === i) {
                l = { link_id: a.id, link_url: a.href.split("tel:")[1], link_text: a.text.replace(/(?:[\r\n]+)+/g, "").trim(), link_classes: a.className, interaction_type: t };
                _sendEvent("telephone_click", l);
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
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var videoArray = [];
    var playerArray = [];
    var _buckets = [];
    // accepted values for milestone 10, 20 or 25
    var _milestoneController = oCONFIG.YT_MILESTONE;
    var ytUtils = [];

    /**
     * Initializes the YouTube API
     */
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
    /**
     * Called when the YouTube player is ready
     *
     * @param {object} event the ready event.
     */
    onPlayerReady = function (event) { };
    /**
     * Called when the YouTube player has an error. Sends a 'video_error' event
     * command to the Google gtag.js library.
     *
     * @param {object} event the error event.
     */
    onPlayerError = function (event) {
      _sendEvent('video_error', { videotitle: ((event.target.playerInfo !== undefined) ? event.target.playerInfo.videoData.title : event.target.getVideoData().title) });
    };
    /**
     * Called when the YouTube player state changes. Sends a 'video_start',
     * "video_play", "video_complete", and "video_pause" event commands to the
     * Google gtag.js library based on the state of the player.
     *
     * @param {object} event the state change event.
     */
    onPlayerStateChange = function (event) {
      try {
        var videoIndex = 0, video_id = ((event.target.playerInfo !== undefined) ? event.target.playerInfo.videoData.video_id : event.target.getVideoData().video_id);
        for (var o = 0; o < videoArray.length; o++) {
          if (videoArray[o] == video_id) {
            videoIndex = o;
          }
        }
        var cTime = ((playerArray[videoIndex].playerInfo !== undefined) ? Math.round(playerArray[videoIndex].playerInfo.currentTime) : Math.round(playerArray[videoIndex].getCurrentTime()));
        var vDuration = ((playerArray[videoIndex].playerInfo !== undefined) ? Math.round(playerArray[videoIndex].playerInfo.duration) : Math.round(playerArray[videoIndex].getDuration()));
        var p = {
          video_current_time: cTime,
          video_duration: vDuration,
          video_percent: ((cTime / vDuration) * 100).toFixed(),
          video_provider: "youtube",
          video_title: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoData.title : playerArray[videoIndex].getVideoData().title),
          video_id: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoData.video_id : playerArray[videoIndex].getVideoData().video_id),
          video_url: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoUrl : playerArray[videoIndex].getVideoUrl())
        };
        if (event.data == YT.PlayerState.PLAYING && p.video_percent == 0) {
          _sendEvent('video_start', p);
          cCi = 0;
          if (_milestoneController) {
            ytUtils.push([videoIndex, function (videx) {
              for (var b = 1; b <= (100 / _milestoneController); b++) {
                ((100 / _milestoneController === 4 && b === 100 / _milestoneController) ? _buckets[b - 1] = { id: videoIndex, milestone: 95, triggered: false } : ((_milestoneController * b !== 100) ? _buckets[b - 1] = { id: videoIndex, milestone: _milestoneController * b, triggered: false } : ''));
              }
              setInterval(function () {
                var cTimeP = ((playerArray[videoIndex].playerInfo !== undefined) ? Math.round(playerArray[videoIndex].playerInfo.currentTime) : Math.round(playerArray[videoIndex].getCurrentTime()));
                var vDurationP = ((playerArray[videoIndex].playerInfo !== undefined) ? Math.round(playerArray[videoIndex].playerInfo.duration) : Math.round(playerArray[videoIndex].getDuration()));
                var y = {
                  video_current_time: cTimeP,
                  video_duration: vDurationP,
                  video_percent: ((cTimeP / vDurationP) * 100).toFixed(),
                  video_provider: "youtube",
                  video_title: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoData.title : playerArray[videoIndex].getVideoData().title),
                  video_id: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoData.video_id : playerArray[videoIndex].getVideoData().video_id),
                  video_url: ((playerArray[videoIndex].playerInfo !== undefined) ? playerArray[videoIndex].playerInfo.videoUrl : playerArray[videoIndex].getVideoUrl())
                };
                if (y.video_percent <= _buckets[_buckets.length - 1] && cCi < _buckets.length) {
                  if (y.video_percent >= _buckets[cCi].milestone && !_buckets[cCi].triggered && _buckets[videoIndex].id === videoIndex) {
                    _buckets[cCi].triggered = true; y.video_percent = _buckets[cCi].milestone; y.video_current_time = Math.round((y.video_duration / _buckets.length) * (cCi + 1)); _sendEvent("video_progress", y); cCi++;
                  }
                }
              }, ((playerArray[videoIndex].playerInfo !== undefined) ? Math.round(playerArray[videoIndex].playerInfo.duration) : Math.round(playerArray[videoIndex].getDuration())) / _buckets.length);
            }]);
            ytUtils[ytUtils.length - 1][1](videoIndex);
          }
        }
        else if (event.data == YT.PlayerState.PLAYING) { _sendEvent("video_play", p); }
        if (event.data == YT.PlayerState.ENDED) { _sendEvent("video_complete", p); }
        if (event.data == YT.PlayerState.PAUSED) { _sendEvent("video_pause", p); }

      } catch (error) {

      }

    };
    /**
     * @param {string} e a URL
     * @returns {string|undefined} the YouTube video ID if the URL is a YouTube
     * video URL, returns undefined otherwise.
     */
    youtube_parser = function (e) { var t = e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/); if (t && 11 == t[2].length) return t[2] };
    /**
     * @param {string} u a URL
     * @returns {boolean} true if the URL is a YouTube video URL, false otherwise.
     */
    IsYouTube = function (u) { var e = u.match(/(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/); return null != e && e.length > 0 };
    /**
     * @param {string} t a URL
     * @returns {string} the URL with 'origin', 'protocol', and 'enablejsapi'
     * query params altered.
     */
    YTUrlHandler = function (t) { return t = t.replace(/origin\=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\&?/gi, "origin=" + document.location.protocol + "//" + document.location.host), stAdd = "", adFlag = !1, -1 == t.indexOf("https") && (t = t.replace("http", "https")), -1 == t.indexOf("?") && (stAdd = "?flag=1"), -1 == t.indexOf("enablejsapi") && (stAdd += "&enablejsapi=1", adFlag = !0), -1 == t.indexOf("origin") && (stAdd += "&origin=" + document.location.protocol + "//" + document.location.host, adFlag = !0), 1 == adFlag ? t + stAdd : t };
    /**
     * Selects every iframe element in the page and modifies those which are
     * YouTube players with a parsed 'src' field and 'id' field.
     */
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

  // HTML5 VIDEO TRACKER //
  /**
   * Selects every video or audio element in the page and modifies those which
   * don't have ID attributes to add a random ID.  Then adds an event listener
   * to the elements for each type of event where metrics should be sent.
   */
  function _initHTMLVideoTracker() {
    var _milestone = oCONFIG.YT_MILESTONE;
    var media_status = {};
    /**
     * Sends audio and video metrics for start, play, progress, pause, and
     * complete based on the event's target element's state.
     *
     * @param {object} e an element's event
     */
    function eventHandler(e) {
      var media_type = ((e.target.nodeName === 'VIDEO') ? 'video' : 'audio');
      var mObj = {};
      ((media_type === 'video') ? (mObj = {
        video_provider: "html5 video",
        video_title: decodeURIComponent(e.target.currentSrc.split('/')[e.target.currentSrc.split('/').length - 1]),
        video_id: e.target.id,
        video_url: decodeURIComponent(e.target.currentSrc)
      }) : (mObj = {
        audio_provider: "html5 audio",
        audio_title: decodeURIComponent(e.target.currentSrc.split('/')[e.target.currentSrc.split('/').length - 1]),
        audio_id: e.target.id,
        audio_url: decodeURIComponent(e.target.currentSrc)
      }));
      switch (e.type) {
        case 'timeupdate':
          media_status[e.target.id].current = Math.round(e.target.currentTime);
          var percentage = Math.floor(100 * media_status[e.target.id].current / Math.round(e.target.duration));
          for (var j in media_status[e.target.id]._progress_milestones) {
            if (percentage >= j && j > media_status[e.target.id].latest_milestone) {
              media_status[e.target.id].latest_milestone = j;
            }
          }
          if (media_status[e.target.id].latest_milestone && !media_status[e.target.id]._progress_milestones[media_status[e.target.id].latest_milestone]) {
            media_status[e.target.id]._progress_milestones[media_status[e.target.id].latest_milestone] = true;
            ((media_type === 'video') ? (mObj.video_current_time = media_status[e.target.id].current, mObj.video_duration = Math.round(e.target.duration), mObj.video_percent = media_status[e.target.id].latest_milestone) :
              (mObj.audio_current_time = media_status[e.target.id].current, mObj.audio_duration = Math.round(e.target.duration), mObj.audio_percent = media_status[e.target.id].latest_milestone));
            _sendEvent(media_type + '_progress', mObj);
          }
          break;
        case 'play':
          ((media_type === 'video') ? (mObj.video_current_time = media_status[e.target.id].current, mObj.video_duration = Math.round(e.target.duration), mObj.video_percent = media_status[e.target.id].latest_milestone) :
            (mObj.audio_current_time = media_status[e.target.id].current, mObj.audio_duration = Math.round(e.target.duration), mObj.audio_percent = media_status[e.target.id].latest_milestone)); var e_n = ((media_status[e.target.id].current === 0) ? media_type + '_start' : media_type + '_play');
          _sendEvent(e_n, mObj);
          break;
        case 'pause':
          if (media_status[e.target.id].current !== Math.round(e.target.duration)) {
            ((media_type === 'video') ? (mObj.video_current_time = media_status[e.target.id].current, mObj.video_duration = Math.round(e.target.duration), mObj.video_percent = media_status[e.target.id].latest_milestone) :
              (mObj.audio_current_time = media_status[e.target.id].current, mObj.audio_duration = Math.round(e.target.duration), mObj.audio_percent = media_status[e.target.id].latest_milestone));
            _sendEvent(media_type + '_pause', mObj);
          }
          break;
        case 'ended':
          ((media_type === 'video') ? (mObj.video_current_time = media_status[e.target.id].current, mObj.video_duration = Math.round(e.target.duration), mObj.video_percent = "100") :
            (mObj.audio_current_time = media_status[e.target.id].current, mObj.audio_duration = Math.round(e.target.duration), mObj.audio_percent = "100"));
          _sendEvent(media_type + '_complete', mObj);
          media_status[e.target.id].current = 0;
          media_status[e.target.id].latest_milestone = 0;
          for (var b = 1; b <= (100 / _milestone); b++) {
            ((100 / _milestone === 4 && b === 100 / _milestone) ? media_status[e.target.id].progress_point = 95 : ((_milestone * b !== 100) ? media_status[e.target.id].progress_point = _milestone * b : ''));
            media_status[e.target.id]._progress_milestones[media_status[e.target.id].progress_point] = false
          }
          break;
        default:
          break;
      }
    }
    var htmlMedia = document.querySelectorAll('video,audio');

    for (var i = 0; i < htmlMedia.length; i++) {
      var mediaTagId;
      ((!htmlMedia[i].getAttribute('id')) ? (mediaTagId = 'html5_media_' + Math.random().toString(36).slice(2), htmlMedia[i].setAttribute('id', mediaTagId)) : mediaTagId = htmlMedia[i].getAttribute('id'));
      media_status[mediaTagId] = {};
      media_status[mediaTagId].latest_milestone = 0;
      media_status[mediaTagId]._progress_milestones = {};

      for (var b = 1; b <= (100 / _milestone); b++) {
        ((100 / _milestone === 4 && b === 100 / _milestone) ? media_status[mediaTagId].progress_point = 95 : ((_milestone * b !== 100) ? media_status[mediaTagId].progress_point = _milestone * b : ''));
        media_status[mediaTagId]._progress_milestones[media_status[mediaTagId].progress_point] = false
      }

      media_status[mediaTagId].current = 0;
      htmlMedia[i].addEventListener("play", eventHandler, false);
      htmlMedia[i].addEventListener("pause", eventHandler, false);
      htmlMedia[i].addEventListener("ended", eventHandler, false);
      htmlMedia[i].addEventListener("timeupdate", eventHandler, false);
      htmlMedia[i].addEventListener("ended", eventHandler, false);
    }
  }
  // END HTML5 VIDEO TRACKER

  /**
   * GA4 Payload Interceptor. This function intercepts the GA4 beacon requests to
   * redact personally identifiable information from the beacon request's
   * arguments.
   *
   * @returns {boolean|undefined} the result of the window.navigator.sendBeacon
   * function call if there is an error during this method's processing, returns
   * undefined otherwise.
   */
  function _payloadInterceptor() {
    window._isRedacted = window._isRedacted || false;
    if (!window._isRedacted) {
      window._isRedacted = !0;
      try {
        var pl = window.navigator.sendBeacon;
        var ga4_props = oCONFIG.GWT_GA4ID.join("|");
        /**
         * Attempts to redact PII from the arguments to beacon requests that are
         * directed to google analytics APIs. The beacon requests are then sent
         * with the modified arguments.
         *
         * @param {string} url the URL of the beacon request
         * @param {string|undefined} data the data for the beacon request.
         * @returns {boolean} true if the beacon request was queued successfully,
         * false otherwise.
         */
        window.navigator.sendBeacon = function () {
          if (arguments && arguments[0].match(/google-analytics\.com.*v\=2\&/i) && arguments[0].match(new RegExp(ga4_props))) {
            var endpoint = arguments[0].split('?')[0], query = arguments[0].split('?')[1];
            var beacon = {
              endpoint: endpoint, query: _piiRedactor(query, "ga4"), events: []
            };
            if (arguments[1]) {
              arguments[1].split("\r\n").forEach(function (event) {
                beacon.events.push(_piiRedactor(event, "ga4"));
              });
            }
            arguments[0] = [beacon.endpoint, beacon.query].join('?');
            if (arguments[1] && beacon.events.length > 0) {
              beacon.events.join("\r\n");
              arguments[1] = beacon.events.join("\r\n");
            }
          }
          return pl.apply(this, arguments);
        };
      } catch (e) { return pl.apply(this, arguments); }
    }
  }
  // End GA4 Payload Interceptor

  /**
   * @param {object} data a JSON object
   * @returns {object|undefined} the JSON object with nested objects restored if
   * nested keys exist in the object. Returns undefined if there is an error
   * during processing.
   */
  function _unflattenJSON(data) {
    try {
      if (Object(data) !== data || Array.isArray(data))
        return data;
      var result = {}, cur, prop, idx, last, temp;
      for (var p in data) {
        cur = result, prop = "", last = 0;
        do {
          idx = p.indexOf(".", last);
          temp = p.substring(last, idx !== -1 ? idx : undefined);
          cur = cur[prop] || (cur[prop] = (!isNaN(parseInt(temp)) ? [] : {}));
          prop = temp;
          last = idx + 1;
        } while (idx >= 0);
        cur[prop] = data[p];
      }
      return result[""];

    } catch (error) {
    }
  }
  /**
   * @param {object} data a JSON object
   * @returns {object|undefined} the JSON object with nested objects flattenned to
   * be at a single key depth in the main object. Returns undefined if there is an
   * error during processing.
   */
  function _flattenJSON(data) {
    try {
      var result = {};
      /**
       * Recursively sets keys on an external "result" object to a flattenned
       * version of the cur object.
       *
       * @param {object} cur the object to flatten
       * @param {string} prop a key name
       */
      function recurse(cur, prop) {
        if (Object(cur) !== cur) {
          result[prop] = cur;
        } else if (Array.isArray(cur)) {
          for (var i = 0, l = cur.length; i < l; i++)
            recurse(cur[i], prop ? prop + "." + i : "" + i);
          if (l == 0)
            result[prop] = [];
        } else {
          var isEmpty = true;
          for (var p in cur) {
            isEmpty = false;
            recurse(cur[p], prop ? prop + "." + p : p);
          }
          if (isEmpty)
            result[prop] = {};
        }
      }
      recurse(data, "");
      return result;
    } catch (error) {
    }
  }

  /**
   * @param {object} obj the object
   * @returns {string} the object converted to a URL query string
   */
  function _objToQuery(obj) {
    return Object.keys(obj).reduce(function (str, key, i) {
      var delimiter, val;
      delimiter = (i === 0) ? '' : '&';
      key = encodeURIComponent(key);
      val = encodeURIComponent(obj[key]);
      return [str, delimiter, key, '=', val].join('');
    }, '');
  }

  /**
   * @param {string} qs a URL querystring
   * @returns {object} the query string converted to a JSON object
   */
  function _queryToJSON(qs) {
    var pairs = qs.split('&');
    var result = {};
    pairs.forEach(function (p) {
      var pair = p.split('=');
      var key = pair[0];
      var value = decodeURIComponent(pair[1] || '');

      if (result[key]) {
        if (Object.prototype.toString.call(result[key]) === '[object Array]') {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    });

    return JSON.parse(JSON.stringify(result));
  };

  /**
   * @returns {object[]} an array of objects with name and regex for redacting
   * PII
   */
  function _piiRegexReset() {
    return [{
      name: 'EMAIL',
      regex: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi
    }, {
      name: 'TEL',
      regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)\=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]\d{3}[\s\.\-]\d{4})([^\&\s\?\/]*)/gi
    }, {
      name: 'SSN',
      regex: /((full)?(([\-\_])?)?ssn\=)?(\d{3}([\s\.\-\+]|%20)\d{2}([\s\.\-\+]|%20)\d{4})([^\&\s\?\/]*)/ig
    }, {
      name: 'NAME',
      regex: /((first|last|middle|sur|f|l|user)([\-\_])?)?name\=([^\&\s\?\/]*)/ig
    }, {
      name: 'PASSWORD',
      regex: /(((confirm([\-\_])?)?password)|passwd|pwd)\=([^\&\s\?\/]*)/ig
    }, {
      name: 'ZIP',
      regex: /(post(al)?[\s]?code|zip[\s]?code|zip)\=([^\&\s\?\/]*)/gi
    }, {
      name: 'ADDRESS',
      regex: /add(ress)?([1-2])?\=([^\&\s\?\/]*)/ig
    }];
  }

  // Payload Redactor
  /**
   * @param {*} payload event parameters to be redacted
   * @param {string} type the type of payload data
   * @returns {string|undefined} the payload converted to a query string and with
   * PII redacted. Returns undefined if there is an error during processing.
   */
  function _piiRedactor(payload, type) {
    try {
      var checkParams = "dl|dr|dt|dt|en|ep.|up.|uid";
      var UncheckParams = "ep.agency||ep.subagency|ep.site_topic|ep.site_platform|ep.script_source|ep.version|ep.protocol";
      var piiRegex = _piiRegexReset();
      payload = (("object" === typeof payload && /json|default/.test(type)) ? (_flattenJSON(payload), payload = _objToQuery(payload)) : payload);
      _piiRegexReset();

      var _allowedQs = _allowedQuerystrings.toString().toLowerCase().replace(/\,/g, "=|") + "=";
      var _hitPayloadParts = payload.split('&');
      for (var i = 0; i < _hitPayloadParts.length; i++) {
        var newQueryString = '';
        var _param = _hitPayloadParts[i].split('=');
        var _para = (_param.length > 2) ? _param.slice(1).join("=") : _param[1]; _param.splice(2); _param[1] = _para;
        var _val;
        try {
          _val = decodeURIComponent(decodeURIComponent(_param[1]));
        } catch (e) {
          _val = decodeURIComponent(_param[1]);
        }

        if ((_param[0].match(new RegExp(checkParams)) != null || /query|json/ig.test(type)) && _val.indexOf('?') > -1) {
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
            if (paramArray[ix].toLowerCase().match(new RegExp(_allowedQs)) != null) {
              newQueryString += paramArray[ix] + '&';
            }
          }
          _val = _val.replace(/\?.*/, '?' + newQueryString.replace(/\&$/, ''));
        }


        if (type === 'json') {
          piiRegex.push(
            {
              name: 'DOB',
              regex: /(((birth)?date|dob)\=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([^\&\s\?\/]*)/ig,
              format: 'YYYY-MM-DD'
            }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^\&\s\?\/]*)/ig,
            format: 'YYYY-DD-MM'
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^\&\s\?\/]*)/ig,
            format: 'DD-MM-YYYY'
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(19|20)\d\d([^\&\s\?\/]*)/ig,
            format: 'MM-DD-YYYY'
          });
        }
        else if (type === 'query' || (type === 'json' && /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(_val))) {
          piiRegex.push(
            {
              name: 'TEL',
              regex: /((tel|(tele)?phone|mob(ile)?|cell(ular)?)\=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]?\d{3}[\s\.\-]?\d{4})([^\&\s\?\/]*)/gi
            }, {
            name: 'SSN',
            regex: /((full)?(([\-\_])?)?ssn\=)?(\d{3}([\s\.\-\+]|%20)?\d{2}([\s\.\-\+]|%20)?\d{4})([^\&\s\?\/]*)/ig
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]%20)(0?[1-9]|[12][0-9]|3[01])([^\&\s\?\/]*)/ig,
            format: 'YYYY-MM-DD'
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^\&\s\?\/]*)/ig,
            format: 'YYYY-DD-MM'
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)?(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^\&\s\?\/]*)/ig,
            format: 'DD-MM-YYYY'
          }, {
            name: 'DOB',
            regex: /(((birth)?date|dob)\=)?(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]%20)(19|20)\d\d([^\&\s\?\/]*)/ig,
            format: 'MM-DD-YYYY'
          });
        }

        if ((_param[0].match(new RegExp(checkParams)) != null && _param[0].match(new RegExp(UncheckParams)) != null) || /query|json|default/ig.test(type)) {
          piiRegex.forEach(function (pii) {
            _val = _val.replace(pii.regex, '[REDACTED_' + pii.name + ']');
          });
          _param[1] = encodeURIComponent(_val.replace(/\?$/, '')) || _val.replace(/\?$/, '');
          _hitPayloadParts[i] = _param.join('=');
        }
      }
      _piiRegexReset();
      return _hitPayloadParts.join("&");
    } catch (error) {
    }
  }
  // End Payload Redactor

  /**
   * Adds a click handler to track 'Official USA Site' banner clicks.
   */
  function _initBannerTracker() {
    try {
      var acord = document.querySelector('section.usa-banner button.usa-accordion__button');
      if (acord) {
        acord.addEventListener('click', function (e) {
          gas4("official_usa_site_banner_click", { link_text: e.target.textContent.trim(), section: "header" });
        });
      }

    } catch (error) {

    }
  }

  /**
   * @param {string} a a URL
   * @returns {string} the URL modified by replacing certain query parameters with
   * the string "query" before sending it to the Google Analytics server.
   * Specifically, it replaces query parameters that match a regular expression.
   */
  function _URIHandler(a) {
    var b = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]+)", "i");
    b.test(a) && (a = a.replace(b, "$1query$3"), isSearch = a.match(/([?&])(query\=)([^&#?]*)/i)[3]);
    return a;
  }

  /**
   * @param {string} z a URL
   * @returns {string} a modified version of the URL with certain query parameters
   * removed. It first defines a regular expression that matches the domain name
   * of the current page. It then extracts the protocol, domain name, and path
   * from the input URL, and constructs a new URL by concatenating the protocol,
   * domain name, and path. If the input URL contains any query parameters that
   * are not allowed (i.e., not in the _allowedQuerystrings array), it removes
   * those query parameters from the new URL.
   */
  function _scrubbedURL(z) {
    /**
     * @param {string} s a URL
     * @returns {string} the URL with special characters escaped
     */
    RegExp.escape = function (s) { return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
    var n = new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace(/^www\\./, ""))}`, "ig"),
      t = "",
      o = ((n.test(z)) ? z : document.location.protocol + "//" + document.location.hostname + z).toLowerCase(),
      a = o.split("?")[0],
      r = o.split("?").length > 1
        ? (o
          .split("?")[1]
          .split("&")
          .forEach(function (o, i) {
            _allowedQuerystrings.toString().toLowerCase().indexOf(o.split("=")[0]) > -1 && (t = t + "&" + o);
          }),
          t.length > 0 ? a + "?" + _piiRedactor(t.substring(1), "query") : a)
        : a;
    return r;
  }

  /**
   * This function sets the default query parameters, as well as query
   * parameters that are specific to the configured agency. The default query
   * parameters include those used by Google Analytics, as well as some common
   * query parameters used by government websites. The agency-specific query
   * parameters are determined by the value of the oCONFIG.AGENCY variable.
   * {string[]} an array of allowed querystring parameter strings is set to _allowedQuerystrings variable.
   */
  function _setAllowedQS() {
    var queries = {
      "default": ["utm_id", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic", "gbraid", "wbraid", "_gl", "gclid", "dclid", "gclsrc", "affiliate", "dap-dev-env", "v"],
      "gsa": ["challenge", "state"],
      "dhs": ["appreceiptnum"],
      "doc": ["station", "meas", "start", "atlc", "epac", "cpac", "basin", "fdays", "cone", "tswind120", "gm_track", "50wind120", "hwind120", "mltoa34", "swath", "radii", "wsurge", "key_messages", "inundation", "rainqpf", "ero", "gage", "wfo", "spanish_key_messages", "key_messages", "sid", "lan", "office", "pil", "product", "site", "lat", "lon"],
      "hhs": ["s_cid", "selectedfacets"],
      "hud": ["postid"],
      "nasa": ["feature", "productid", "selectedfacets"],
      "nps": ["gid", "mapid", "site", "webcam", "id"],
      "nsf": ["meas", "start", "atlc", "epac", "cpac", "basin", "fdays", "cone", "tswind120", "gm_track", "50wind120", "hwind120", "mltoa34", "swath", "radii", "wsurge", "key_messages", "inundation", "rainqpf", "ero", "gage", "wfo", "spanish_key_messages", "key_messages", "sid"],
      "va": ["id"],
      "dod": ["p"],
      "opm": ["l", "soc", "jt", "j", "rmi", "smin", "hp", "g", "d", "a"]
    };
    _allowedQuerystrings =  queries.default.concat(queries[oCONFIG.AGENCY.toLowerCase()]).concat(oCONFIG.SEARCH_PARAMS.toLowerCase().split("|"));
  }

  /**
   * Creates the Auto tracker, YouTube tracker, HTML Video tracker, and USA Site
   * banner tracker.
   */
  function _setUpTrackers() {
    oCONFIG.AUTOTRACKER ? _initAutoTracker() : "";
    oCONFIG.YOUTUBE ? _initYouTubeTracker() : "";
    oCONFIG.HTMLVIDEO ? _initHTMLVideoTracker() : "";
    _initBannerTracker();
  }

  /**
   * calls _setUpTrackers() if the document is loaded.
   * @returns {boolean} true if the document was loaded when this function was
   * called.
   */
  function _setUpTrackersIfReady() {
    return (("interactive" === document.readyState || "complete" === document.readyState) ? (_setUpTrackers(), !0) : !1);
  }
  _setUpTrackersIfReady() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));

  if(typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dap-universal-federated-analytics-load'));
  }
})();
