var tObjectCheck,_allowedQuerystrings=[],isSearch=!1,oCONFIG={GWT_UAID:["UA-33523145-1"],GWT_GA4ID:["G-CSLL4ZEK4L"],FORCE_SSL:!0,ANONYMIZE_IP:!0,AGENCY:"",SUB_AGENCY:"",VERSION:"20240426 v7.02 - Dual Tracking",SITE_TOPIC:"",SITE_PLATFORM:"",SCRIPT_SOURCE:"",URL_PROTOCOL:location.protocol,USE_MAIN_CUSTOM_DIMENSIONS:!0,MAIN_AGENCY_CUSTOM_DIMENSION_SLOT:"dimension1",MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT:"dimension2",MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT:"dimension3",MAIN_SITE_TOPIC_CUSTOM_DIMENSION_SLOT:"dimension4",
MAIN_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT:"dimension5",MAIN_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT:"dimension6",MAIN_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT:"dimension7",MAIN_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT:"dimension8",USE_PARALLEL_CUSTOM_DIMENSIONS:!1,PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT:"dimension1",PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT:"dimension2",PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT:"dimension3",PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT:"dimension4",PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT:"dimension5",
PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT:"dimension6",PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT:"dimension7",PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT:"dimension8",COOKIE_DOMAIN:location.hostname.replace(/^www\./,"").toLowerCase(),COOKIE_TIMEOUT:63072E3,SEARCH_PARAMS:"q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
YOUTUBE:!1,YT_MILESTONE:25,AUTOTRACKER:!0,EXTS:"doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",SUBDOMAIN_BASED:!0,PUA_NAME:"GSA_ENOR",GA4_NAME:"GSA_GA4_ENOR",USE_CUSTOM_URL:!1,USE_CUSTOM_TITLE:!1};document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i)&&(oCONFIG.GWT_UAID[0]="UA-33523145-1",oCONFIG.GWT_GA4ID[0]="G-9TNNMGP8WJ");var head=document.getElementsByTagName("head").item(0),GA4Object=document.createElement("script");
GA4Object.setAttribute("type","text/javascript");GA4Object.setAttribute("src","https://www.googletagmanager.com/gtag/js?id="+oCONFIG.GWT_GA4ID[0]);head.appendChild(GA4Object);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date);gtag("set","cookie_flags","SameSite=Strict;Secure");
"undefined"===typeof window.GoogleAnalyticsObject&&function(a,b,c,d,h,g,k){a.GoogleAnalyticsObject=h;a[h]=a[h]||function(){(a[h].q=a[h].q||[]).push(arguments)};a[h].l=1*new Date;g=b.createElement(c);k=b.getElementsByTagName(c)[0];g.async=1;g.src=d;k.parentNode.insertBefore(g,k)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga");tObjectCheck=window.GoogleAnalyticsObject;var trackerFlag=!0;
function _onEveryPage(){_payloadInterceptor();_updateConfig();_defineCookieDomain();_defineAgencyCDsValues();_setAllowedQS();createTracker(trackerFlag)}_onEveryPage();
function _defineCookieDomain(){/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(oCONFIG.SUBDOMAIN_BASED.toString())?(oCONFIG.COOKIE_DOMAIN=oCONFIG.SUBDOMAIN_BASED.toLowerCase().replace(/^www\./i,""),oCONFIG.SUBDOMAIN_BASED=!0):!1===oCONFIG.SUBDOMAIN_BASED?(oCONFIG.COOKIE_DOMAIN=document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1],oCONFIG.SUBDOMAIN_BASED=!0):(oCONFIG.COOKIE_DOMAIN=location.hostname.toLowerCase().replace(/^www\./i,
""),oCONFIG.SUBDOMAIN_BASED=!1)}function _defineAgencyCDsValues(){oCONFIG.AGENCY=oCONFIG.AGENCY||"unspecified:"+oCONFIG.COOKIE_DOMAIN;oCONFIG.SUB_AGENCY=oCONFIG.SUB_AGENCY||""+oCONFIG.COOKIE_DOMAIN;oCONFIG.SITE_TOPIC=oCONFIG.SITE_TOPIC||"unspecified:"+oCONFIG.COOKIE_DOMAIN;oCONFIG.SITE_PLATFORM=oCONFIG.SITE_PLATFORM||"unspecified:"+oCONFIG.COOKIE_DOMAIN}
function _cleanBooleanParam(a){switch(a.toString().toLowerCase()){case "true":case "on":case "yes":case "1":return!0;case "false":case "off":case "no":case "0":return!1;default:return a}}function _isValidUANum(a){a=a.toLowerCase();a=a.match(/^ua\-([0-9]+)\-[0-9]+$/);return null!==a&&0<a.length&&a[0]!==oCONFIG.GWT_UAID[0].toLowerCase()}function _isValidGA4Num(a){a=a.toLowerCase();a=a.match(/^g\-([0-9a-z])+$/);return null!==a&&0<a.length&&a[0]!==oCONFIG.GWT_GA4ID[0].toLowerCase()}
function _cleanDimensionValue(a){try{pattern=/^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;if(pattern.test(a))return a;if(null!==a.match(/\d+$/g)){var b="dimension"+a.match(/\d+$/g)[0];if(pattern.test(b))return b}return""}catch(c){}}
function _updateConfig(){if("undefined"!==typeof _fedParmsGTM){var a=_fedParmsGTM.toLowerCase().split("&");oCONFIG.SCRIPT_SOURCE="GTM"}else{var b=document.getElementById("_fed_an_ua_tag");_fullParams=b.src.match(/^([^\?]*)(.*)$/i)[2].replace("?","");a=_fullParams.split("&");oCONFIG.SCRIPT_SOURCE=b.src.split("?")[0]}for(b=0;b<a.length;b++)switch(_keyValuePair=decodeURIComponent(a[b].toLowerCase()),_key=_keyValuePair.split("=")[0],_value=_keyValuePair.split("=")[1],_key){case "pua":for(var c=_value.split(","),
d=0;d<c.length;d++)_isValidUANum(c[d])&&oCONFIG.GWT_UAID.push(c[d].toUpperCase());break;case "pga4":c=_value.split(",");for(d=0;d<c.length;d++)_isValidGA4Num(c[d])&&oCONFIG.GWT_GA4ID.push(c[d].toUpperCase());break;case "agency":oCONFIG.AGENCY=_value.toUpperCase();break;case "subagency":oCONFIG.SUB_AGENCY=_value.toUpperCase();break;case "sitetopic":oCONFIG.SITE_TOPIC=_value;break;case "siteplatform":oCONFIG.SITE_PLATFORM=_value;break;case "parallelcd":_value=_cleanBooleanParam(_value);if(!0===_value||
!1===_value)oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS=_value;break;case "custurl":_value=_cleanBooleanParam(_value);if(!0===_value||!1===_value)oCONFIG.USE_CUSTOM_URL=_value;break;case "custitle":_value=_cleanBooleanParam(_value);if(!0===_value||!1===_value)oCONFIG.USE_CUSTOM_TITLE=_value;break;case "palagencydim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT=_value);break;case "palsubagencydim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT=
_value);break;case "palversiondim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT=_value);break;case "paltopicdim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT=_value);break;case "palplatformdim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT=_value);break;case "palscriptsrcdim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT=
_value);break;case "palurlprotocoldim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT=_value);break;case "palinteractiontypedim":_value=_cleanDimensionValue(_value);""!==_value&&(oCONFIG.PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT=_value);break;case "cto":oCONFIG.COOKIE_TIMEOUT=2628E3*parseInt(_value);break;case "sp":oCONFIG.SEARCH_PARAMS+="|"+_value.replace(/,/g,"|");break;case "exts":oCONFIG.EXTS+="|"+_value.replace(/,/g,"|");break;case "yt":_value=
_cleanBooleanParam(_value);if(!0===_value||!1===_value)oCONFIG.YOUTUBE=_value;break;case "ytm":oCONFIG.YT_MILESTONE=/^(10|20|25)$/.test(_value)?parseInt(_value):25;break;case "autotracker":_value=_cleanBooleanParam(_value);if(!0===_value||!1===_value)oCONFIG.AUTOTRACKER=_value;break;case "sdor":oCONFIG.SUBDOMAIN_BASED=_cleanBooleanParam(_value)}}
function _sendCustomDimensions(a,b){if(0<a.length&&""!==b&&void 0!==b){tObjectCheck!==window.GoogleAnalyticsObject&&createTracker(!1);for(var c=0;c<oCONFIG.GWT_UAID.length;c++)if("dimension0"!==a[c])try{window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",a[c],b)}catch(d){}}}
function _sendCustomMetrics(a,b){if(0<a.length&&""!==b&&void 0!==b){tObjectCheck!=window.GoogleAnalyticsObject&&createTracker(!1);for(var c=0;c<oCONFIG.GWT_UAID.length;c++)if("metric0"!==a[c])try{window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",a[c],b)}catch(d){}}}
function _sendEvent(a,b){!/^(page_view|view_search_results)$/i.test(a)&&_mapGA4toUA(a,b);for(var c="",d=0;d<oCONFIG.GWT_GA4ID.length;d++)try{c+=oCONFIG.GA4_NAME+d+","}catch(h){}b.send_to=c.replace(/.$/,"");b.event_name_dimension=a;gtag("event",a,b)}
function _mapGA4toUA(a,b){var c;var d=b.link_url;var h=b.event_value?b.event_value:0;var g=b.non_interaction||!1;var k=b.interaction_type;switch(a){case "file_download":b.outbound?c="Outbound Downloads":c="Download";var e=b.file_extension;break;case "email_click":b.outbound?c="Outbound MailTo":c="Mailto";e=b.link_url;d="";break;case "click":c="Outbound";e=b.link_domain;d=b.link_url.split(b.link_domain)[1];break;case "telephone_click":c="Telephone Clicks";e=b.link_url;d="";break;case "video_start":c=
"YouTube Video";e="play";d=b.video_url;break;case "video_play":c="YouTube Video";e="play";d=b.video_url;break;case "video_pause":c="YouTube Video";e="pause";d=b.video_url;break;case "video_progress":c="YouTube Video";e=String(b.video_percent)+"%";d=b.video_url;break;case "video_complete":c="YouTube Video";e="finish";d=b.video_url;break;case "dap_event":c=b.event_category,e=b.event_action,d=b.event_label}if(""!==c&&void 0!==c&&""!==e&&void 0!==e)for(a=oCONFIG.MAIN_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT,
tObjectCheck!==window.GoogleAnalyticsObject&&createTracker(!1),b=0;b<oCONFIG.GWT_UAID.length;b++)try{0<b&&(!0===oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS?a=oCONFIG.PARALLEL_INTERACTION_TYPE_CUSTOM_DIMENSION_SLOT:k=void 0),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+b+".set",a,k),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+b+".send","event",c,e,void 0!==d?d:"",""===h&&isNaN(h)&&void 0===h?0:parseInt(h),{nonInteraction:g})}catch(l){}}
function _sendPageview(a,b){if(""!==a&&void 0!==a){a=_URIHandler(_scrubbedURL(a)).split(/[#]/)[0];tObjectCheck!==window.GoogleAnalyticsObject&&createTracker(!1);for(var c=0;c<oCONFIG.GWT_UAID.length;c++)try{window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".send","pageview",{page:a.split(location.hostname)[1],title:""!==b||void 0!==b?b:document.title})}catch(d){}_sendEvent("page_view",{page_location:a,page_title:""!==b||void 0!==b?b:document.title,ignore_referrer:_isExcludedReferrer()?!0:!1});
_sendViewSearchResult(a)}}
function gas(a,b,c,d,h,g,k){if(void 0!==a&&""!==a&&void 0!==b&&""!==b&&void 0!==c&&""!==c)if("pageview"===b.toLowerCase())try{_sendPageview(c,void 0===d||""===d?document.title:d)}catch(p){}else if("event"===b.toLowerCase()&&void 0!==d&&""!==d)try{var e=!1;void 0!==k&&"boolean"===typeof _cleanBooleanParam(k)&&(e=_cleanBooleanParam(k));_sendEvent("dap_event",{event_category:c,event_action:d,event_label:void 0===h?"":h,event_value:void 0===g||""===g||isNaN(g)?0:parseInt(g),non_interaction:e})}catch(p){}else if(-1!=
b.toLowerCase().indexOf("dimension"))try{e=b.toLowerCase().split(",");var l=[];dimsPattern=/^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;for(var n=0;n<e.length;n++)if(dimsPattern.test(e[n]))l.push(e[n]);else{var m="dimension"+e[n].match(/\d+$/g)[0];(dimsPattern.test(m)||"dimension0"===m)&&l.push(m)}0<l.length&&_sendCustomDimensions(l,void 0===c?"":c)}catch(p){}else if(-1!=b.toLowerCase().indexOf("metric"))try{l=b.toLowerCase().split(",");e=[];mtrcsPattern=/^metric([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
for(m=0;m<l.length;m++)mtrcsPattern.test(l[m])?e.push(l[m]):(n="metric"+l[m].match(/\d+$/g)[0],(mtrcsPattern.test(n)||"metric0"===n)&&e.push(n));0<e.length&&_sendCustomMetrics(e,void 0===c||""===c||isNaN(c)?1:parseFloat(c))}catch(p){}}function _URIHandler(a){var b=new RegExp("([?&])("+oCONFIG.SEARCH_PARAMS+")(=[^&]+)","i");b.test(a)&&(a=a.replace(b,"$1query$3"),isSearch=!0);return a}
function _sendViewSearchResult(a){isSearch&&(_sendEvent("view_search_results",{search_term:_URIHandler(a).match(/([?&])(query=)([^&#?]*)/i)[3],page_location:_URIHandler(_scrubbedURL(a))}),isSearch=!1)}function _isExcludedReferrer(){if(""!==document.referrer){var a=document.referrer.replace(/https?:\/\//i,"").split("/")[0].replace(/^www\./i,"");return oCONFIG.SUBDOMAIN_BASED?-1!=a.indexOf(oCONFIG.COOKIE_DOMAIN)?!0:!1:a===oCONFIG.COOKIE_DOMAIN?!0:!1}}
function createTracker(a){for(var b,c=0;c<oCONFIG.GWT_UAID.length;c++){b=/^\/.*$/i;try{var d=oCONFIG.USE_CUSTOM_URL&&b.test(custom_dap_data.url)?location.protocol+"//"+location.hostname+custom_dap_data.url.replace(location.protocol+"//"+location.hostname,""):document.location.href;var h=oCONFIG.USE_CUSTOM_TITLE?custom_dap_data.title:document.title}catch(k){d=document.location.href,h=document.title}b=_URIHandler(_scrubbedURL(d));var g=b.split(document.location.hostname)[1];window[window.GoogleAnalyticsObject]("create",
oCONFIG.GWT_UAID[c],oCONFIG.COOKIE_DOMAIN,{name:oCONFIG.PUA_NAME+c,allowLinker:!0,cookieExpires:parseInt(oCONFIG.COOKIE_TIMEOUT),cookieFlags:"SameSite=Strict;Secure"});window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set","customTask",_customTask());window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set","transport","beacon");if(oCONFIG.ANONYMIZE_IP)window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set","anonymizeIp",oCONFIG.ANONYMIZE_IP);if(oCONFIG.FORCE_SSL)window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+
c+".set","forceSSL",!0);if(_isExcludedReferrer())window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set","referrer","");oCONFIG.USE_MAIN_CUSTOM_DIMENSIONS&&0===c&&(window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT,oCONFIG.AGENCY),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT,oCONFIG.SUB_AGENCY),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT,
oCONFIG.VERSION),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_SITE_TOPIC_CUSTOM_DIMENSION_SLOT,oCONFIG.SITE_TOPIC),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT,oCONFIG.SITE_PLATFORM),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT,oCONFIG.SCRIPT_SOURCE),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.MAIN_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT,
oCONFIG.URL_PROTOCOL));oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS&&0<c&&(window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT,oCONFIG.AGENCY),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT,oCONFIG.SUB_AGENCY),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT,oCONFIG.VERSION),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+
c+".set",oCONFIG.PARALLEL_SITE_TOPIC_CUSTOM_DIMENSION_SLOT,oCONFIG.SITE_TOPIC),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_SITE_PLATFORM_CUSTOM_DIMENSION_SLOT,oCONFIG.SITE_PLATFORM),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_SCRIPT_SOURCE_URL_CUSTOM_DIMENSION_SLOT,oCONFIG.SCRIPT_SOURCE),window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".set",oCONFIG.PARALLEL_URL_PROTOCOL_CUSTOM_DIMENSION_SLOT,oCONFIG.URL_PROTOCOL));-1!==
document.title.search(/404|not found/i)&&(g=("/vpv404/"+g).replace(/\/\//g,"/")+(document.referrer?"/"+document.referrer:document.referrer));if(a)window[window.GoogleAnalyticsObject](oCONFIG.PUA_NAME+c+".send","pageview",g,{title:h})}c=-1!==document.title.search(/404|not found/ig)?document.location.protocol+"//"+document.location.hostname+g:d;a=_URIHandler(_scrubbedURL(c));for(c=0;c<oCONFIG.GWT_GA4ID.length;c++)0===c||0<c&&oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS?gtag("config",oCONFIG.GWT_GA4ID[c],
{groups:oCONFIG.GA4_NAME+c,cookie_expires:parseInt(oCONFIG.COOKIE_TIMEOUT),page_location:a,page_title:h,agency:oCONFIG.AGENCY.toUpperCase(),subagency:oCONFIG.SUB_AGENCY.toUpperCase(),site_topic:oCONFIG.SITE_TOPIC.toLowerCase(),site_platform:oCONFIG.SITE_PLATFORM.toLowerCase(),script_source:oCONFIG.SCRIPT_SOURCE.toLowerCase(),version:oCONFIG.VERSION.toLowerCase(),protocol:oCONFIG.URL_PROTOCOL}):gtag("config",oCONFIG.GWT_GA4ID[c],{groups:oCONFIG.GA4_NAME+c,cookie_expires:parseInt(oCONFIG.COOKIE_TIMEOUT),
page_location:a,page_title:h});_sendViewSearchResult(b)}
function _initAutoTracker(){var a=function(a){a=a.href.toLowerCase().replace(/[#?&].*/,"").split(a.hostname)[1].split(".");a=a[a.length-1];return null!=a.match(new RegExp("^("+oCONFIG.EXTS+")$"))?a:!1},b=function(a){try{var b=JSON.stringify(a);return JSON.parse(b.toLowerCase())}catch(g){}},c=function(c){try{if("mousedown"===c.type||"keydown"===c.type&&13===c.keyCode)if("A"===c.target.nodeName||null!==c.target.closest("a")){var d=oCONFIG.COOKIE_DOMAIN,g="",k="",e="",l=/^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,
n=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,m="",p="",q={},r=/^(tel:)(.*)$/i,f=c.target.closest("a");"mousedown"===c.type?p="Mouse Click":"keydown"===c.type&&13===c.keyCode&&(p="Enter Key Keystroke");if(l.test(f.href)||n.test(f.href)||r.test(f.href))try{n.test(f.href)?(e=f.hostname.toLowerCase().replace(/^www\./i,""),m="l"):l.test(f.href)?(e=f.href.split("@")[1].toLowerCase(),m="m"):r.test(f.href)&&(e=f.href,e=e.toLowerCase(),m="t")}catch(t){}(oCONFIG.SUBDOMAIN_BASED?
-1!==e.indexOf(d):e===d)?"m"===m?(g=f.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/),q={link_id:f.id,link_url:g[0],link_domain:g[0].split("@")[1],link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:f.className,interaction_type:p},_sendEvent("email_click",b(q))):"l"===m&&a(f)?(g=f.pathname.split(/[#?&?]/)[0],k=a(f),q={file_name:g,file_extension:k,link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_id:f.id,link_url:f.href.replace(/[#?&].*/,""),link_domain:f.hostname.replace(/^www\./i,
""),interaction_type:p},_sendEvent("file_download",b(q))):"l"!==m||a(f):"l"===m&&a(f)?(g=f.pathname.split(/[#?&?]/)[0],k=a(f),q={file_name:g,file_extension:k,link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_id:f.id,link_url:f.href.replace(/[#?&].*/,""),link_domain:f.hostname.replace(/^www\./i,""),outbound:!0,interaction_type:p},_sendEvent("file_download",b(q))):"l"!==m||a(f)?"m"===m?(g=f.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/),q={link_id:f.id,link_url:g[0],link_domain:g[0].split("@")[1],
link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:f.className,outbound:!0,interaction_type:p},_sendEvent("email_click",b(q))):"t"===m&&(q={link_id:f.id,link_url:f.href.split("tel:")[1],link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:f.className,interaction_type:p},_sendEvent("telephone_click",b(q))):(q={link_id:f.id,link_url:f.href.replace(/[#?&].*/,""),link_domain:f.hostname.replace(/^www\./i,""),link_text:f.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:f.className,
outbound:!0,interaction_type:p},_sendEvent("click",b(q)))}}catch(t){}};document.addEventListener?document.addEventListener("mousedown",c,!1):document.attachEvent&&document.attachEvent("onmousedown",c);document.addEventListener?document.addEventListener("keydown",c,!1):document.attachEvent&&document.attachEvent("onkeydown",c)}
if(oCONFIG.YOUTUBE){var tag=document.createElement("script");tag.src="https://www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var videoArray=[],playerArray=[],_buckets=[],_milestoneController=oCONFIG.YT_MILESTONE,ytUtils=[];onYouTubeIframeAPIReady=function(){for(var a=0;a<videoArray.length;a++)playerArray[a]=new YT.Player(videoArray[a],{events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange,
onError:onPlayerError}})};onPlayerReady=function(a){};onPlayerError=function(a){_sendEvent("video_error",{videotitle:void 0!==a.target.playerInfo.title?a.target.playerInfo.title:a.target.getVideoData().title})};cCi=0;onPlayerStateChange=function(a){try{for(var b=0,c=void 0!==a.target.playerInfo.videoData.video_id?a.target.playerInfo.videoData.video_id:a.target.getVideoData().video_id,d=0;d<videoArray.length;d++)videoArray[d]==c&&(b=d);var h=void 0!==playerArray[b].playerInfo.currentTime?Math.round(playerArray[b].playerInfo.currentTime):
Math.round(playerArray[b].getCurrentTime()),g=void 0!==playerArray[b].playerInfo.duration?Math.round(playerArray[b].playerInfo.duration):Math.round(playerArray[b].getDuration()),k={video_current_time:h,video_duration:g,video_percent:(h/g*100).toFixed(),video_provider:"youtube",video_title:void 0!==playerArray[b].playerInfo.title?playerArray[b].playerInfo.title:playerArray[b].getVideoData().title,video_id:void 0!==playerArray[b].playerInfo.videoData.video_id?playerArray[b].playerInfo.videoData.video_id:
playerArray[b].getVideoData().video_id,video_url:void 0!==playerArray[b].playerInfo.videoUrl?playerArray[b].playerInfo.videoUrl:playerArray[b].getVideoUrl()};a.data==YT.PlayerState.PLAYING&&0==k.video_percent?(_sendEvent("video_start",k),_milestoneController&&(ytUtils.push([b,function(a){for(a=1;a<=100/_milestoneController;a++)4===100/_milestoneController&&a===100/_milestoneController?_buckets[a-1]={milestone:95,triggered:!1}:100!==_milestoneController*a?_buckets[a-1]={milestone:_milestoneController*
a,triggered:!1}:"";setInterval(function(){var a=void 0!==playerArray[b].playerInfo.currentTime?Math.round(playerArray[b].playerInfo.currentTime):Math.round(playerArray[b].getCurrentTime()),c=void 0!==playerArray[b].playerInfo.duration?Math.round(playerArray[b].playerInfo.duration):Math.round(playerArray[b].getDuration());a={video_current_time:a,video_duration:c,video_percent:(a/c*100).toFixed(),video_provider:"youtube",video_title:void 0!==playerArray[b].playerInfo.title?playerArray[b].playerInfo.title:
playerArray[b].getVideoData().title,video_id:void 0!==playerArray[b].playerInfo.videoData.video_id?playerArray[b].playerInfo.videoData.video_id:playerArray[b].getVideoData().video_id,video_url:void 0!==playerArray[b].playerInfo.videoUrl?playerArray[b].playerInfo.videoUrl:playerArray[b].getVideoUrl()};a.video_percent<=_buckets[_buckets.length-1]&&cCi<_buckets.length&&a.video_percent>=_buckets[cCi].milestone&&!_buckets[cCi].triggered&&(_buckets[cCi].triggered=!0,a.video_percent=_buckets[cCi].milestone,
a.video_current_time=Math.round(a.video_duration/_buckets.length*(cCi+1)),_sendEvent("video_progress",a),cCi++)},(void 0!==playerArray[b].playerInfo.duration?Math.round(playerArray[b].playerInfo.duration):Math.round(playerArray[b].getDuration()))/_buckets.length)}]),ytUtils[ytUtils.length-1][1](b))):a.data==YT.PlayerState.PLAYING&&_sendEvent("video_play",k);a.data==YT.PlayerState.ENDED&&_sendEvent("video_complete",k);a.data==YT.PlayerState.PAUSED&&_sendEvent("video_pause",k)}catch(e){}};youtube_parser=
function(a){if((a=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/))&&11==a[2].length)return a[2]};IsYouTube=function(a){a=a.match(/(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/);return null!=a&&0<a.length};YTUrlHandler=function(a){return a=a.replace(/origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi,"origin="+document.location.protocol+"//"+document.location.host),stAdd="",adFlag=
!1,-1==a.indexOf("https")&&(a=a.replace("http","https")),-1==a.indexOf("?")&&(stAdd="?flag=1"),-1==a.indexOf("enablejsapi")&&(stAdd+="&enablejsapi=1",adFlag=!0),-1==a.indexOf("origin")&&(stAdd+="&origin="+document.location.protocol+"//"+document.location.host,adFlag=!0),1==adFlag?a+stAdd:a};_initYouTubeTracker=function(){for(var a=0,b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++){var d=b[c].src;IsYouTube(d)&&(b[c].src=YTUrlHandler(d),d=youtube_parser(d),videoArray[a]=d,b[c].setAttribute("id",
d),a++)}}}
function _payloadInterceptor(){window._isRedacted=window._isRedacted||!1;if(!window._isRedacted){window._isRedacted=!0;try{var a=window.navigator.sendBeacon;window.navigator.sendBeacon=function(){if(arguments&&arguments[0].match(/google-analytics\.com.*v=2&/i)){var b=arguments[0].split("?")[0],c=arguments[0].split("?")[1];c=_piiRedactor(c,"ga4");var d=[];arguments[1]&&arguments[1].split("\r\n").forEach(function(a){d.push(_piiRedactor(a,"ga4"))});arguments[0]=[b,c].join("?");arguments[1]&&0<d.length&&
(d.join("\r\n"),arguments[1]=d.join("\r\n"))}return a.apply(this,arguments)}}catch(b){return a.apply(this,arguments)}}}
function _piiRedactor(a,b){var c=[{name:"EMAIL",regex:/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi},{name:"TEL",regex:/((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s\.\-]?\d{4})([^&\s\?\/]*)/gi},{name:"NAME",regex:/((first|last|middle|sur|f|l)([\-_])?)?name=([^&\s\?\/]*)/ig},{name:"PASSWORD",regex:/(((confirm([\-_])?)?password)|passwd|pwd)=([^&\s\?\/]*)/ig},{name:"ZIP",regex:/((postcode=)|(zipcode=)|(zip=))([^&\s\?\/]*)/gi},{name:"ADDRESS",regex:/add(ress)?([1-2])?=([^&\s\?\/]*)/ig},
{name:"SSN",regex:/((full)?(([\-_])?)?ssn=)?(\d{3}[\s\.\-]?\d{2}[\s\.\-]?\d{4})([^&\s\?\/]*)/ig},{name:"DOB",regex:/(((birth)?date|dob)=)?(19|20)\d\d[\-\/\.](0?[1-9]|1[012])[\-\/\.](0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,format:"YYYY-MM-DD"},{name:"DOB",regex:/(((birth)?date|dob)=)?(19|20)\d\d[\-\/\.](0?[1-9]|[12][0-9]|3[01])[\-\/\.](0?[1-9]|1[012])([^&\s\?\/]*)/ig,format:"YYYY-DD-MM"},{name:"DOB",regex:/(((birth)?date|dob)=)?(0?[1-9]|[12][0-9]|3[01])[\-\/\.](0?[1-9]|1[012])[\-\/\.](19|20)\d\d([^&\s\?\/]*)/ig,
format:"DD-MM-YYYY"},{name:"DOB",regex:/(((birth)?date|dob)=)?(0?[1-9]|1[012])[\-\/\.](0?[1-9]|[12][0-9]|3[01])[\-\/\.](19|20)\d\d([^&\s\?\/]*)/ig,format:"MM-DD-YYYY"}];try{var d=_allowedQuerystrings.toString().replace(/,/g,"=|")+"=";b="ga4"===b?"dl|dp|dr|dt|en|ep.|up.|uid":"dl|dp|dr|dt|ec|ea|el|uid|cd\\d{1,3}|pr\\d{1,3}cd\\d{1,3}";var h=a.split("&");for(a=0;a<h.length;a++){var g="",k=h[a].split("=");try{var e=decodeURIComponent(decodeURIComponent(k[1])).replace(/\s/g,"")}catch(m){e=decodeURIComponent(k[1]).replace(/\s/g,
"")}if(null!=k[0].match(new RegExp(b))&&-1<e.indexOf("?")){var l=e.split("?").splice(1).join("&").split("&"),n=[];for(pa=0;pa<l.length;pa++)-1<l[pa].indexOf("?")&&n.push(l[pa].split("?")[1]);l=l.concat(n);for(n=0;n<l.length;n++)null!=l[n].toLowerCase().match(new RegExp(d))&&(g+=l[n]+"&");e=e.replace(/\?.*/,"?"+g.replace(/&$/,""))}null!=k[0].match(new RegExp(b))&&(c.forEach(function(a){e=e.replace(a.regex,"[REDACTED_"+a.name+"]")}),k[1]=encodeURIComponent(e.replace(/\?$/,""))||e.replace(/\?$/,""),
h[a]=k.join("="))}return h.join("&")}catch(m){}}function _initIdAssigner(){for(var a=document.getElementsByTagName("a"),b=0;b<a.length;b++){var c=a[b].getAttribute("id");null!==c&&""!==c&&void 0!==c||a[b].setAttribute("id","anch_"+b)}}
function _customTask(){return function(a){window._ga_originalSendHitTask=window._ga_originalSendHitTask||a.get("sendHitTask");a.set("sendHitTask",function(a){var b=window._ga_originalSendHitTask;try{var d=a.get("hitPayload"),h=_piiRedactor(d,"UA");a.set("hitPayload",h,!0);b(a)}catch(g){b(a)}})}}
function _scrubbedURL(a){RegExp.escape=function(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")};var b="";a=((new RegExp("^(https?:\\/\\/(www\\.)?)?"+RegExp.escape(document.location.hostname.replace(/^www\\./,"")),"ig")).test(a)?a:document.location.protocol+"//"+document.location.hostname+a).toLowerCase();var c=a.split("?")[0];return 1<a.split("?").length?(a.split("?")[1].split("&").forEach(function(a,c){-1<_allowedQuerystrings.indexOf(a.split("=")[0])&&(b=b+"&"+a)}),0<b.length?c+"?"+b.substring(1):
c):c}
function _setAllowedQS(){var a={"default":"utm_id utm_source utm_medium utm_campaign utm_term utm_content utm_source_platform utm_creative_format utm_marketing_tactic gbraid wbraid _gl gclid dclid gclsrc affiliate dap-dev-env v".split(" "),gsa:["challenge","state"],dhs:["appreceiptnum"],doc:"station meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid lan office pil".split(" "),hhs:["s_cid",
"selectedFacets"],hud:["PostID"],nasa:["feature","ProductID","selectedFacets"],nps:["gid","mapid","site","webcam","id"],nsf:"meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid".split(" "),va:["id"],dod:["p"],opm:"l soc jt j rmi smin hp g d a".split(" ")};_allowedQuerystrings=a.default.concat(a[oCONFIG.AGENCY.toLowerCase()]).concat(oCONFIG.SEARCH_PARAMS.toLowerCase().split("|"))}
function _setUpTrackers(){tObjectCheck!==window.GoogleAnalyticsObject&&createTracker(!1);oCONFIG.ENHANCED_LINK?_initIdAssigner():"";oCONFIG.AUTOTRACKER?_initAutoTracker():"";oCONFIG.YOUTUBE?_initYouTubeTracker():""}function _setUpTrackersIfReady(){return"interactive"===document.readyState||"complete"===document.readyState?(_setUpTrackers(),!0):!1}
_setUpTrackersIfReady()||(document.addEventListener?document.addEventListener("DOMContentLoaded",_setUpTrackers):document.attachEvent&&document.attachEvent("onreadystatechange",_setUpTrackersIfReady));
//# sourceMappingURL=Federated.js.map