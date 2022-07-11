var tObjectCheck, _filePath, oCONFIG = {
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
		COOKIE_TIMEOUT: 63072e3,
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
	},
	_allowedHostnames = [],
	_allowedQuerystrings = [],
	_mimeType = "application/json",
	_xmlhttp = new XMLHttpRequest,
	script = document.createElement("script");

function gtag() {
	dataLayer.push(arguments)
}

function _updateConfig() {
	var e, t;
	for ("undefined" != typeof _fedParmsGTM ? (e = _fedParmsGTM.toLowerCase().split("&"), oCONFIG.SCRIPT_SOURCE = "GTM") : (t = document.getElementById("_fed_an_ua_tag"), _fullParams = t.src.match(/^([^\?]*)(.*)$/i)[2].replace("?", ""), e = _fullParams.split("&"), oCONFIG.SCRIPT_SOURCE = t.src.split("?")[0]), t = 0; t < e.length; t++) switch (_keyValuePair = decodeURIComponent(e[t].toLowerCase()), _key = _keyValuePair.split("=")[0], _value = _keyValuePair.split("=")[1], _key) {
		case "pga4":
			var o = _value.split(",");
			for (a = 0; a < o.length; a++) oCONFIG.GWT_GA4ID.push(o[a].toUpperCase());
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
			oCONFIG.COOKIE_TIMEOUT = 86400 * (parseInt(_value) + 1);
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
			"xhr" !== _value && "beacon" !== _value && "image" !== _value || (oCONFIG.TRANSPORT = _value)
	}
}

function _onEveryPage() {
	_updateConfig(), _defineCookieDomain(), _defineAgencyCDsValues(), _sendPageview(), _URIHandler(document.location.href).indexOf("query=") > -1 && _sendSearchEvent()
}

function _sendCustomDimensions(e, t) {
	if (0 < e.length && "" !== t && void 0 !== t) {
		window.GoogleAnalyticsObject;
		for (var o = 0; o < oCONFIG.GWT_GA4ID.length; o++)
			if ("dimension0" !== e[o]) try {
				window[window.GoogleAnalyticsObject](oCONFIG.PGA4_NAME + o + ".set", e[o], t)
			} catch (e) {}
	}
}

function _sendCustomMetrics(e, t) {
	if (0 < e.length && "" !== t && void 0 !== t) {
		window.GoogleAnalyticsObject;
		for (var o = 0; o < oCONFIG.GWT_GA4ID.length; o++)
			if ("metric0" !== e[o]) try {
				window[window.GoogleAnalyticsObject](oCONFIG.PGA4_NAME + o + ".set", e[o], t)
			} catch (e) {}
	}
}

function _sendPageview() {
	if (_allowedDomains())
		for (var e = 0; e < oCONFIG.GWT_GA4ID.length; e++) try {
			gtag("config", oCONFIG.GWT_GA4ID[e], {
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
			})
		} catch (e) {}
}

function _sendEvent(e, t, o, a, n, r) {
	if ("" !== e && void 0 !== e && "" !== t && void 0 !== t) {
		window.GoogleAnalyticsObject;
		for (var i = 0; i < oCONFIG.GWT_GA4ID.length; i++) try {
			gtag("event", e.toLowerCase(), {
				event_action: t.toLowerCase(),
				event_label: o.toLowerCase(),
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
			})
		} catch (e) {}
	}
}

function _sendCustomEvent(e, t, o) {
	if ("" !== e && void 0 !== e && "" !== t && void 0 !== t) {
		window.GoogleAnalyticsObject;
		for (var a = 0; a < oCONFIG.GWT_GA4ID.length; a++) try {
			gtag("event", "dap_event", {
				event_category: e.toLowerCase(),
				event_action: t.toLowerCase(),
				event_label: o.toLowerCase(),
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
			})
		} catch (e) {}
	}
}

function _sendVirtualPageview(e, t) {
	if (_allowedDomains())
		for (var o = 0; o < oCONFIG.GWT_GA4ID.length; o++) try {
			gtag("config", oCONFIG.GWT_GA4ID[o], {
				page_location: e.toLowerCase(),
				page_title: t.toLowerCase(),
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
			})
		} catch (e) {}
}

function _sendSearchEvent() {
	for (var e = 0; e < oCONFIG.GWT_GA4ID.length; e++) try {
		gtag("event", "view_search_results", {
			search_term: _URIHandler(_scrubbedURL()).split("query=")[1].split("&")[0],
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
		})
	} catch (e) {}
}

function gas(e, t, o, a, n, r, i) {
	if (void 0 !== e && "" !== e && void 0 !== t && "" !== t && void 0 !== o && "" !== o)
		if ("pageview" === t.toLowerCase()) try {
			_sendVirtualPageview(o, void 0 === a || "" === a ? document.title : a)
		} catch (e) {} else if ("event" === t.toLowerCase() && void 0 !== a && "" !== a) try {
			var s = !1;
			void 0 !== i && "boolean" == typeof _cleanBooleanParam(i) && (s = _cleanBooleanParam(i)), _sendCustomEvent(o, a, void 0 === n ? "" : n)
		} catch (e) {} else if (-1 != t.toLowerCase().indexOf("dimension")) try {
			s = t.toLowerCase().split(",");
			var l = [];
			dimsPattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
			for (var _ = 0; _ < s.length; _++)
				if (dimsPattern.test(s[_])) l.push(s[_]);
				else {
					var c = "dimension" + s[_].match(/\d+$/g)[0];
					(dimsPattern.test(c) || "dimension0" === c) && l.push(c)
				} 0 < l.length && _sendCustomDimensions(l, void 0 === o ? "" : o)
		} catch (e) {} else if (-1 != t.toLowerCase().indexOf("metric")) try {
			for (l = t.toLowerCase().split(","), s = [], mtrcsPattern = /^metric([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/, c = 0; c < l.length; c++) mtrcsPattern.test(l[c]) ? s.push(l[c]) : (_ = "metric" + l[c].match(/\d+$/g)[0], (mtrcsPattern.test(_) || "metric0" === _) && s.push(_));
			0 < s.length && _sendCustomMetrics(s, void 0 === o || "" === o || isNaN(o) ? 1 : parseFloat(o))
		} catch (e) {}
}

function _allowedDomains() {
	var t = [];
	try {
		_filePath = oCONFIG.HOSTNAME_JSON, _xmlhttp.open("GET", _filePath, !1), null !== _mimeType && _xmlhttp.overrideMimeType && _xmlhttp.overrideMimeType(_mimeType), _xmlhttp.send(), 200 == _xmlhttp.status && 4 == _xmlhttp.readyState && (t = (_allowedHostnames = JSON.parse(_xmlhttp.responseText))._com.concat(_allowedHostnames._gov, _allowedHostnames._mil, _allowedHostnames._org, _allowedHostnames._edu, _allowedHostnames._net, _allowedHostnames._us, _allowedHostnames._info, _allowedHostnames._cn))
	} catch (e) {}
	var a = !1;
	try {
		for (var n = 0; n < t.length; n++)
			if (document.location.hostname.toString().trim().indexOf(t[n].toString().trim()) > -1) {
				a = !0;
				break
			}
	} catch (e) {}
	return a
}

function _scrubbedURL() {
	try {
		_filePath = oCONFIG.QUERYSTRING_JSON, _xmlhttp.open("GET", _filePath, !1), null !== _mimeType && _xmlhttp.overrideMimeType && _xmlhttp.overrideMimeType(_mimeType), _xmlhttp.send(), 200 == _xmlhttp.status && 4 == _xmlhttp.readyState && (_allowedQuerystrings = JSON.parse(_xmlhttp.responseText))
	} catch (e) {}
	var e = ("_allowedQuerystrings." + oCONFIG.AGENCY).concat(_allowedQuerystrings.default, oCONFIG.SEARCH_PARAMS.split("|")),
		t = "",
		o = 0 === document.location.hostname.indexOf("www.") ? document.location.hostname.replace(/^www\./, "") + document.location.pathname + document.location.search : document.location.hostname + document.location.pathname + document.location.search,
		a = o.split("?")[0];
	return o.split("?").length > 1 ? (o.split("?")[1].split("&").forEach((function(o, a) {
		e.indexOf(o.split("=")[0]) > -1 && (t = t + "&" + o)
	})), t.length > 0 ? a + "?" + t.substring(1) : a) : a
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
			var t = "dimension" + e.match(/\d+$/g)[0];
			if (pattern.test(t)) return t
		}
		return ""
	} catch (e) {}
}

function _URIHandler(e) {
	var t = new RegExp("([?&])(" + oCONFIG.SEARCH_PARAMS + ")(=[^&]*)", "i");
	return t.test(e) && (e = e.replace(t, "$1query$3")), e
}

function _isExcludedReferrer() {
	if ("" !== document.referrer) {
		var e = document.referrer.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
		return oCONFIG.SUBDOMAIN_BASED ? -1 != e.indexOf(oCONFIG.COOKIE_DOMAIN) : e === oCONFIG.COOKIE_DOMAIN
	}
}

function _initAutoTracker(e) {
	var t = oCONFIG.COOKIE_DOMAIN,
		o = oCONFIG.EXTS.split("|");
	for (e = e || document.getElementsByTagName("a"), i = 0; i < e.length; i++) {
		var a = 0,
			n = "",
			r = /^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
			s = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,
			l = /^(tel:)(.*)$/i;
		if (r.test(e[i].href) || s.test(e[i].href) || l.test(e[i].href)) {
			try {
				s.test(e[i].href) ? n = e[i].hostname.toLowerCase().replace("www.", "") : r.test(e[i].href) ? n = e[i].href.split("@")[1].toLowerCase() : l.test(e[i].href) && (n = (n = e[i].href).toLowerCase())
			} catch (e) {
				continue
			}
			if (oCONFIG.SUBDOMAIN_BASED ? -1 !== n.indexOf(t) : n === t) {
				if (-1 !== e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:")) r = e[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/), _tagClicks(e[i], "Mailto", r[0], "", 0);
				else if (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 !== e[i].href.toLowerCase().indexOf("tel:")) _tagClicks(e[i], "Telephone Clicks", e[i].href.split("tel:")[1], "", 0);
				else if (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:"))
					for (a = 0; a < o.length; a++)
						if ((r = (r = e[i].href.split("."))[r.length - 1].split(/[#?&?]/))[0].toLowerCase() === o[a]) {
							_tagClicks(e[i], "Download", r[0].toLowerCase(), e[i].href.split(/[#?&?]/)[0], 0);
							break
						}
			} else
				for (n = 0; n < o.length; n++) {
					if ((r = (r = e[i].href.split("."))[r.length - 1].split(/[#?]/))[0].toLowerCase() === o[n]) {
						e[i].href.split(o[n]), _tagClicks(e[i], "Outbound Downloads", r[0].toLowerCase(), e[i].href.split(/[#?&?]/)[0], 0);
						break
					}
					r[0].toLowerCase() !== o[n] && ++a === o.length && (-1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:") ? _tagClicks(e[i], "Outbound", e[i].hostname, e[i].pathname, 0) : o.length && -1 !== e[i].href.toLowerCase().indexOf("mailto:") && -1 === e[i].href.toLowerCase().indexOf("tel:") ? (r = e[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i), _tagClicks(e[i], "Outbound MailTo", r[0], "", 0)) : o.length && -1 === e[i].href.toLowerCase().indexOf("mailto:") && -1 !== e[i].href.toLowerCase().indexOf("tel:") && _tagClicks(e[i], "Telephone Clicks", e[i].href.split("tel:")[1], "", 0))
				}
		}
	}
}

function _initIdAssigner() {
	for (var e = document.getElementsByTagName("a"), t = 0; t < e.length; t++) {
		var o = e[t].getAttribute("id");
		null !== o && "" !== o && void 0 !== o || e[t].setAttribute("id", "anch_" + t)
	}
}

function _tagClicks(e, t, o, a, n) {
	e.addEventListener ? (e.addEventListener("mousedown", (function() {
		_sendEvent(t, o, a, n, !1, "Mouse Click")
	})), e.addEventListener("keydown", (function(e) {
		13 === e.keyCode && _sendEvent(t, o, a, n, !1, "Enter Key Keystroke")
	}))) : e.attachEvent && (e.attachEvent("onmousedown", (function() {
		_sendEvent(t, o, a, n, !1, "Mouse Click")
	})), e.attachEvent("onkeydown", (function(e) {
		13 === e.keyCode && _sendEvent(t, o, a, n, !1, "Enter Key Keystroke")
	})))
}

function _setUpTrackers() {
	window.GoogleAnalyticsObject, oCONFIG.ENHANCED_LINK && _initIdAssigner(), oCONFIG.AUTOTRACKER && _initAutoTracker(), oCONFIG.YOUTUBE && _initYouTubeTracker()
}

function _setUpTrackersIfReady() {
	return ("interactive" === document.readyState || "complete" === document.readyState) && (_setUpTrackers(), !0)
}
script.async = 1, script.src = "https://www.googletagmanager.com/gtag/js?id=" + oCONFIG.GWT_GA4ID[0], document.getElementsByTagName("head")[0].appendChild(script), window.dataLayer = window.dataLayer || [], gtag("js", new Date), _onEveryPage();
var videoArray_fed = [],
	playerArray_fed = [],
	_f33 = !1,
	_f66 = !1,
	_f90 = !1,
	tag = document.createElement("script");
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
		for (var e = document.getElementsByTagName("iframe"), t = 0, o = 0; o < e.length; o++) {
			_thisVideoObj = e[o];
			var a = _thisVideoObj.src;
			IsYouTube_fed(a) && (_thisVideoObj.src = YTUrlHandler_fed(a), a = youtube_parser_fed(a), _thisVideoObj.setAttribute("id", a), videoArray_fed[t] = a, t++)
		}
	};
_setUpTrackersIfReady() || (document.addEventListener ? document.addEventListener("DOMContentLoaded", _setUpTrackers) : document.attachEvent && document.attachEvent("onreadystatechange", _setUpTrackersIfReady));
