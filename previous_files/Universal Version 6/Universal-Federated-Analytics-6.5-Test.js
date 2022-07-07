// ****** Configuration Functions ******
var tObjectCheck, oCONFIG = {
    GWT_GA4ID: ["G-FQ8Q9Q0WC0"],
    HOSTNAME_JSON: "https://dap.digitalgov.gov/hostnames.json",
    QUERYSTRING_JSON: "https://dap.digitalgov.gov/querystrings.json",
    FORCE_SSL: !0,
    ANONYMIZE_IP: !0,
    AGENCY: "",
    SUB_AGENCY: "",
    VERSION: "20210628 v6.5 - GA4",
    SITE_TOPIC: "",
    SITE_PLATFORM: "",
    SCRIPT_SOURCE: "",
    URL_PROTOCOL: location.protocol,
    COOKIE_DOMAIN: location.hostname.replace("www.", "").toLowerCase(),
    COOKIE_TIMEOUT: 63072000,
    SEARCH_PARAMS: "q|querytext|nasaInclude|k|qt",
    YOUTUBE: !1,
    AUTOTRACKER: !0,
    EXTS: "doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",
    SUBDOMAIN_BASED: !0,
    DOUBLECLICK_LINK: !1,
    ENHANCED_LINK: !1,
    OPTOUT_PAGE: !1,
    TRANSPORT: "beacon",
    PGA4_NAME: "GSA_ENOR"
};

var _allowedHostnames = [], _allowedQuerystrings = [], _filePath, _mimeType = "application/json", _xmlhttp = new XMLHttpRequest(), script = document.createElement("script");
script.async = 1;
script.src = "https://www.googletagmanager.com/gtag/js?id=" + oCONFIG.GWT_GA4ID[0];
document.getElementsByTagName("head")[0].appendChild(script);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

function _updateConfig() {
    var e, o;
    if ("undefined" != typeof _fedParmsGTM) {
        e = _fedParmsGTM.toLowerCase().split("&");
        oCONFIG.SCRIPT_SOURCE = "GTM";
    } else {
        o = document.getElementById("_fed_an_ua_tag");
        _fullParams = o.src.match(/^([^\?]*)(.*)$/i)[2].replace("?", ""), e = _fullParams.split("&"), oCONFIG.SCRIPT_SOURCE = o.src.split("?")[0];
    }
    for (o = 0; o < e.length; o++) switch (_keyValuePair = decodeURIComponent(e[o].toLowerCase()), _key = _keyValuePair.split("=")[0], _value = _keyValuePair.split("=")[1], _key) {
        case "pga4":
            var t = _value.split(",");
            for (a = 0; a < t.length; a++) oCONFIG.GWT_GA4ID.push(t[a].toUpperCase());
            break;
        case "agency":
            oCONFIG.AGENCY = _value.toLowerCase();
            break;
        case "subagency":
            oCONFIG.SUB_AGENCY = _value.toLowerCase();
            break;
        case "sitetopic":
            oCONFIG.SITE_TOPIC = _value;
            break;
        case "siteplatform":
            oCONFIG.SITE_PLATFORM = _value;
            break;
        case "cto":
            oCONFIG.COOKIE_TIMEOUT = 86400 * (parseInt(_value)+1);
            break;
        case "sp":
            oCONFIG.SEARCH_PARAMS += "|" + _value.replace(/,/g, "|");
            break;
        case "exts":
            oCONFIG.EXTS += "|" + _value.replace(/,/g, "|");
            break;
        case "yt":
            _value = _cleanBooleanParam(_value), !0 !== _value && !1 !== _value || (oCONFIG.YOUTUBE = _value);
            break;
        case "autotracker":
            _value = _cleanBooleanParam(_value), !0 !== _value && !1 !== _value || (oCONFIG.AUTOTRACKER = _value);
            break;
        case "sdor":
            oCONFIG.SUBDOMAIN_BASED = _cleanBooleanParam(_value);
            break;
        case "dclink":
            _value = _cleanBooleanParam(_value), !0 !== _value && !1 !== _value || (oCONFIG.DOUBLECLICK_LINK = _value);
            break;
        case "enhlink":
            _value = _cleanBooleanParam(_value), !0 !== _value && !1 !== _value || (oCONFIG.ENHANCED_LINK = _value);
            break;
        case "optout":
            _value = _cleanBooleanParam(_value), !0 !== _value && !1 !== _value || (oCONFIG.OPTOUT_PAGE = _value);
            break;
        case "transport":
            "xhr" !== _value && "beacon" !== _value && "image" !== _value || (oCONFIG.TRANSPORT = _value);
    }
}

function _onEveryPage() {
    _updateConfig(), _defineCookieDomain(), _defineAgencyCDsValues(), _sendPageview();
    if (_URIHandler(document.location.href).indexOf("query=") > -1) {
       _sendSearchEvent();
    }
}
_onEveryPage();

// ****** Tracker Functions
function _sendCustomDimensions(e, o) {
    if (0 < e.length && "" !== o && void 0 !== o) {
        tObjectCheck !== window.GoogleAnalyticsObject;
        for (var t = 0; t < oCONFIG.GWT_GA4ID.length; t++)
            if ("dimension0" !== e[t]) try {
                window[window.GoogleAnalyticsObject](oCONFIG.PGA4_NAME + t + ".set", e[t], o);
            } catch (e) {}
    }
}

function _sendCustomMetrics(e, o) {
    if (0 < e.length && "" !== o && void 0 !== o) {
        tObjectCheck != window.GoogleAnalyticsObject;
        for (var t = 0; t < oCONFIG.GWT_GA4ID.length; t++)
            if ("metric0" !== e[t]) try {
                window[window.GoogleAnalyticsObject](oCONFIG.PGA4_NAME + t + ".set", e[t], o);
            } catch (e) {}
    }
}

function _sendPageview() {
    if (_allowedDomains()) {
        for (var t = 0; t < oCONFIG.GWT_GA4ID.length; t++) try {
            gtag("config", oCONFIG.GWT_GA4ID[t], {
                page_location: _scrubbedURL(),
                agency: oCONFIG.AGENCY.toLowerCase(),
                subagency: oCONFIG.SUB_AGENCY.toLowerCase(),
                version: oCONFIG.VERSION,
                site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
                site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
                script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
                url_protocol: oCONFIG.URL_PROTOCOL.toLowerCase(),
                cookie_domain: oCONFIG.COOKIE_DOMAIN,
                cookie_expires: oCONFIG.COOKIE_TIMEOUT,
                transport_type: oCONFIG.TRANSPORT
            });
        } catch (e) {}
    }
}

function _sendEvent(e, o, t, a, n, i) {
    if ("" !== e && void 0 !== e && "" !== o && void 0 !== o) {
        tObjectCheck !== window.GoogleAnalyticsObject;
        for (var O = 0; O < oCONFIG.GWT_GA4ID.length; O++) try {
            gtag("event", e.toLowerCase(), {
                event_action: o.toLowerCase(),
                event_label: t.toLowerCase(),
                agency: oCONFIG.AGENCY.toLowerCase(),
                subagency: oCONFIG.SUB_AGENCY.toLowerCase(),
                version: oCONFIG.VERSION,
                site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
                site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
                script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
                url_protocol: oCONFIG.URL_PROTOCOL.toLowerCase(),
                cookie_domain: oCONFIG.COOKIE_DOMAIN,
                cookie_expires: oCONFIG.COOKIE_TIMEOUT,
                transport_type: oCONFIG.TRANSPORT
            });
        } catch (e) {}
    }
}

function _sendCustomEvent(e, o, t) {
    if ("" !== e && void 0 !== e && "" !== o && void 0 !== o) {
        tObjectCheck !== window.GoogleAnalyticsObject;
        for (var O = 0; O < oCONFIG.GWT_GA4ID.length; O++) try {
            gtag("event", "dap_event", {
                event_category: e.toLowerCase(),
                event_action: o.toLowerCase(),
                event_label: t.toLowerCase(),
                agency: oCONFIG.AGENCY.toLowerCase(),
                subagency: oCONFIG.SUB_AGENCY.toLowerCase(),
                version: oCONFIG.VERSION,
                site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
                site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
                script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
                url_protocol: oCONFIG.URL_PROTOCOL.toLowerCase(),
                cookie_domain: oCONFIG.COOKIE_DOMAIN,
                cookie_expires: oCONFIG.COOKIE_TIMEOUT,
                transport_type: oCONFIG.TRANSPORT
            });
        } catch (e) {}
    }
}

function _sendVirtualPageview(u,p) {
    if (_allowedDomains()) {
        for (var t = 0; t < oCONFIG.GWT_GA4ID.length; t++) try {
            gtag("config", oCONFIG.GWT_GA4ID[t], {
                page_location: u.toLowerCase(),
                page_title: p.toLowerCase(),
                agency: oCONFIG.AGENCY.toLowerCase(),
                subagency: oCONFIG.SUB_AGENCY.toLowerCase(),
                version: oCONFIG.VERSION,
                site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
                site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
                script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
                url_protocol: oCONFIG.URL_PROTOCOL.toLowerCase(),
                cookie_domain: oCONFIG.COOKIE_DOMAIN,
                cookie_expires: oCONFIG.COOKIE_TIMEOUT,
                transport_type: oCONFIG.TRANSPORT
            });
        } catch (e) {}
    }
}

function _sendSearchEvent() {
    for (var t = 0; t < oCONFIG.GWT_GA4ID.length; t++) try {
        gtag("event", "view_search_results", {
            search_term: _URIHandler( _scrubbedURL()).split("query=")[1].split("&")[0],
            agency: oCONFIG.AGENCY.toLowerCase(),
            subagency: oCONFIG.SUB_AGENCY.toLowerCase(),
            version: oCONFIG.VERSION,
            site_topic: oCONFIG.SITE_TOPIC.toLowerCase(),
            site_platform: oCONFIG.SITE_PLATFORM.toLowerCase(),
            script_source: oCONFIG.SCRIPT_SOURCE.toLowerCase(),
            url_protocol: oCONFIG.URL_PROTOCOL.toLowerCase(),
            cookie_domain: oCONFIG.COOKIE_DOMAIN,
            cookie_expires: oCONFIG.COOKIE_TIMEOUT,
            transport_type: oCONFIG.TRANSPORT
        });
    } catch (e) {}
}

function gas(e, o, t, a, n, i, _) {
    if (void 0 !== e && "" !== e && void 0 !== o && "" !== o && void 0 !== t && "" !== t)
        if ("pageview" === o.toLowerCase()) try {
            _sendVirtualPageview(t, void 0 === a || "" === a ? document.title : a);
        } catch (e) {}
        else if ("event" === o.toLowerCase() && void 0 !== a && "" !== a) try {
            var O = !1;
            void 0 !== _ && "boolean" == typeof _cleanBooleanParam(_) && (O = _cleanBooleanParam(_)),
            _sendCustomEvent(t, a, void 0 === n ? "" : n);
        } catch (e) {}


        else if (-1 != o.toLowerCase().indexOf("dimension")) try {
            O = o.toLowerCase().split(",");
            var r = [];
            dimsPattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
            for (var s = 0; s < O.length; s++)
                if (dimsPattern.test(O[s])) r.push(O[s]);
                else {
                    var I = "dimension" + O[s].match(/\d+$/g)[0];
                    (dimsPattern.test(I) || "dimension0" === I) && r.push(I);
                } 0 < r.length && _sendCustomDimensions(r, void 0 === t ? "" : t);
        } catch (e) {}
        else if (-1 != o.toLowerCase().indexOf("metric")) try {
            for (r = o.toLowerCase().split(","), O = [], mtrcsPattern = /^metric([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/, I = 0; I < r.length; I++) mtrcsPattern.test(r[I]) ? O.push(r[I]) : (s = "metric" + r[I].match(/\d+$/g)[0], (mtrcsPattern.test(s) || "metric0" === s) && O.push(s));
            0 < O.length && _sendCustomMetrics(O, void 0 === t || "" === t || isNaN(t) ? 1 : parseFloat(t));
        } catch (e) {}
}

// ****** Utility Functions
function _allowedDomains(){
    var a = [];
    try {
        _filePath = oCONFIG.HOSTNAME_JSON;
        _xmlhttp.open("GET",_filePath,false);
        if (_mimeType !== null) {
            if (_xmlhttp.overrideMimeType) {
              _xmlhttp.overrideMimeType(_mimeType);
            }
        }
        _xmlhttp.send();
        if (_xmlhttp.status == 200 && _xmlhttp.readyState == 4 ){
            _allowedHostnames = JSON.parse(_xmlhttp.responseText);
            a = _allowedHostnames._com.concat(_allowedHostnames._gov,_allowedHostnames._mil,_allowedHostnames._org,_allowedHostnames._edu,_allowedHostnames._net,_allowedHostnames._us,_allowedHostnames._info,_allowedHostnames._cn)
        }
    } catch(e){}

    var _allowed = false;
    try {
        for (var i=0; i < a.length; i++) {
            if (a[i].toString().trim() == document.location.hostname.toString().trim() ) {
                _allowed = true;
                break;
            }
        }
    } catch(e) {}

    return _allowed;
}

function _scrubbedURL() {
    try {
        _filePath = oCONFIG.QUERYSTRING_JSON;
        _xmlhttp.open("GET",_filePath,false);
        if (_mimeType !== null) {
            if (_xmlhttp.overrideMimeType) {
              _xmlhttp.overrideMimeType(_mimeType);
            }
        }
        _xmlhttp.send();
        if (_xmlhttp.status == 200 && _xmlhttp.readyState == 4 ){
            _allowedQuerystrings = JSON.parse(_xmlhttp.responseText);
        }
    } catch(e){}

    var x = "_allowedQuerystrings."+oCONFIG.AGENCY,
        a = x.concat(_allowedQuerystrings.default, oCONFIG.SEARCH_PARAMS.split("|")),
        t = '',
        p = '',
        s = (document.location.hostname.indexOf('www.') === 0) ? document.location.hostname.replace(/^www\./,'') + document.location.pathname + document.location.search : document.location.hostname + document.location.pathname + document.location.search,
        b = s.split('?')[0];

    if (s.split('?').length > 1) {
      t = s.split('?')[1].split('&');
      t.forEach(function(elem, index) {
        if (a.indexOf(elem.split('=')[0]) > -1) {
          p = p + "&" + elem;
        }
      });

      if (p.length > 0) {
        return b + "?" + p.substring(1);
      } else {
        return b;
      }
    } else {
      return b;
    }
}

function _defineCookieDomain() {
    /(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(oCONFIG.SUBDOMAIN_BASED.toString()) ? (oCONFIG.COOKIE_DOMAIN = oCONFIG.SUBDOMAIN_BASED.toLowerCase().replace("www.", ""), oCONFIG.SUBDOMAIN_BASED = !0) : !1 === oCONFIG.SUBDOMAIN_BASED ? (oCONFIG.COOKIE_DOMAIN = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1], oCONFIG.SUBDOMAIN_BASED = !0) : (oCONFIG.COOKIE_DOMAIN = location.hostname.toLowerCase().replace("www.", ""), oCONFIG.SUBDOMAIN_BASED = !1)
}

function _defineAgencyCDsValues() {
    oCONFIG.AGENCY = oCONFIG.AGENCY || "unspecified:" + oCONFIG.COOKIE_DOMAIN, oCONFIG.SUB_AGENCY = oCONFIG.SUB_AGENCY || "" + oCONFIG.COOKIE_DOMAIN, oCONFIG.SUB_AGENCY = oCONFIG.AGENCY + " - " + oCONFIG.SUB_AGENCY, oCONFIG.SITE_TOPIC = oCONFIG.SITE_TOPIC || "unspecified:" + oCONFIG.COOKIE_DOMAIN, oCONFIG.SITE_PLATFORM = oCONFIG.SITE_PLATFORM || "unspecified:" + oCONFIG.COOKIE_DOMAIN
}

function _cleanBooleanParam(e) {
    switch (e.toString().toLowerCase()) {
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
            return e
    }
}

function _isValidUANum(e) {
    return null != (e = (e = e.toLowerCase()).match(/^ua\-([0-9]+)\-[0-9]+$/)) && 0 < e.length
}

function _cleanDimensionValue(e) {
    try {
        if (pattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/, pattern.test(e)) return e;
        if (null !== e.match(/\d+$/g)) {
            var o = "dimension" + e.match(/\d+$/g)[0];
            if (pattern.test(o)) return o
        }
        return ""
    } catch (e) {}
}

function _URIHandler(e) {
    var o = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]*)", "i");
    return o.test(e) && (e = e.replace(o, "$1query$3")), e
}

function _isExcludedReferrer() {
    if ("" !== document.referrer) {
        var e = document.referrer.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
        return oCONFIG.SUBDOMAIN_BASED ? -1 != e.indexOf(oCONFIG.COOKIE_DOMAIN) : e === oCONFIG.COOKIE_DOMAIN
    }
}

function _initAutoTracker(e) {
    var o = oCONFIG.COOKIE_DOMAIN, t = oCONFIG.EXTS.split("|");
    for (e = e || document.getElementsByTagName("a"), i = 0; i < e.length; i++) {
        var a = 0,
            n = "",
            _ = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
            O = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
            r = /^(tel:)(.*)$/i;
        if (_.test(e[i].href) || O.test(e[i].href) || r.test(e[i].href)) {
            try {
                O.test(e[i].href) ? n = e[i].hostname.toLowerCase().replace("www.", "") : _.test(e[i].href) ? n = e[i].href.split("@")[1].toLowerCase() : r.test(e[i].href) && (n = (n = e[i].href).toLowerCase())
            } catch (e) {
                continue
            }
            if (oCONFIG.SUBDOMAIN_BASED ? -1 !== n.indexOf(o) : n === o) {
                if (-1 !== e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:")) _ = e[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), _tagClicks(e[i], "Mailto", _[0], "", 0);
                else if (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 !== e[i].href.toLowerCase().indexOf("tel:")) _tagClicks(e[i], "Telephone Clicks", e[i].href.split("tel:")[1], "", 0);
                else if (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:"))
                    for (a = 0; a < t.length; a++)
                        if ((_ = (_ = e[i].href.split("."))[_.length - 1].split(/[#?&?]/))[0].toLowerCase() === t[a]) {
                            _tagClicks(e[i], "Download", _[0].toLowerCase(), e[i].href.split(/[#?&?]/)[0], 0);
                            break
                        }
            } else
                for (n = 0; n < t.length; n++) {
                    if ((_ = (_ = e[i].href.split("."))[_.length - 1].split(/[#?]/))[0].toLowerCase() === t[n]) {
                        e[i].href.split(t[n]), _tagClicks(e[i], "Outbound Downloads", _[0].toLowerCase(), e[i].href.split(/[#?&?]/)[0], 0);
                        break
                    }
                    _[0].toLowerCase() !== t[n] && (++a === t.length && (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:") ? _tagClicks(e[i], "Outbound", e[i].hostname, e[i].pathname, 0) : t.length && -1 !== e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:") ? (_ = e[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i), _tagClicks(e[i], "Outbound MailTo", _[0], "", 0)) : t.length && -1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 !== e[i].href.toLowerCase().indexOf("tel:") && _tagClicks(e[i], "Telephone Clicks", e[i].href.split("tel:")[1], "", 0)))
                }
        }
    }
}

function _initIdAssigner() {
    for (var e = document.getElementsByTagName("a"), o = 0; o < e.length; o++) {
        var t = e[o].getAttribute("id");
        null !== t && "" !== t && void 0 !== t || e[o].setAttribute("id", "anch_" + o)
    }
}

function _tagClicks(e, o, t, a, n) {
    e.addEventListener ? (e.addEventListener("mousedown", function() {
        _sendEvent(o, t, a, n, !1, "Mouse Click")
    }), e.addEventListener("keydown", function(e) {
        13 === e.keyCode && _sendEvent(o, t, a, n, !1, "Enter Key Keystroke")
    })) : e.attachEvent && (e.attachEvent("onmousedown", function() {
        _sendEvent(o, t, a, n, !1, "Mouse Click")
    }), e.attachEvent("onkeydown", function(e) {
        13 === e.keyCode && _sendEvent(o, t, a, n, !1, "Enter Key Keystroke")
    }))
}

function _setUpTrackers() {
    tObjectCheck !== window.GoogleAnalyticsObject, oCONFIG.ENHANCED_LINK && _initIdAssigner(), oCONFIG.AUTOTRACKER && _initAutoTracker(), oCONFIG.YOUTUBE && _initYouTubeTracker()
}

function _setUpTrackersIfReady() {
    return ("interactive" === document.readyState || "complete" === document.readyState) && (_setUpTrackers(), !0)
}

// ****** Youtube Functions
var videoArray_fed = [], playerArray_fed = [], _f33 = !1, _f66 = !1, _f90 = !1, tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var youtube_parser_fed = function(e) {
    if ((e = e.match(/^(https?:)?(\/\/)?(www\.)?(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*$/)) && 11 === e[9].length) return e[9]
    },
    IsYouTube_fed = function(e) {
        return !!/^(https?:)?(\/\/)?(www\.)?(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*$/.test(e.toString())
    },
    YTUrlHandler_fed = function(e) {
        return e = e.replace(/origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi, "origin=" + document.location.protocol + "//" + document.location.host), stAdd = "", adFlag = !1, -1 === e.indexOf("https") && (e = e.replace("http", "https")), -1 === e.indexOf("?") && (stAdd = "?flag=1"), -1 === e.indexOf("enablejsapi") && (stAdd += "&enablejsapi=1", adFlag = !0), -1 === e.indexOf("html5") && (stAdd += "&html5=1", adFlag = !0), -1 === e.indexOf("origin") && (stAdd += "&origin=" + document.location.protocol + "//" + document.location.host, adFlag = !0), !0 === adFlag ? e + stAdd : e
    },
    _initYouTubeTracker = function() {
        for (var e = document.getElementsByTagName("iframe"), o = 0, t = 0; t < e.length; t++) {
            _thisVideoObj = e[t];
            var a = _thisVideoObj.src;
            IsYouTube_fed(a) && (_thisVideoObj.src = YTUrlHandler_fed(a), a = youtube_parser_fed(a), _thisVideoObj.setAttribute("id", a), videoArray_fed[o] = a, o++)
        }
    }

_setUpTrackersIfReady() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));
