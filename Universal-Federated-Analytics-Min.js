(function(){function D(){dataLayer.push(arguments)}function v(a){switch(a.toString().toLowerCase()){case "true":case "on":case "yes":case "1":return!0;case "false":case "off":case "no":case "0":return!1;default:return a}}function L(a){a=a.toLowerCase();a=a.match(/^g\-([0-9a-z])+$/);return null!==a&&0<a.length&&a[0]!==d.GWT_GA4ID[0].toLowerCase()}function w(a,b){try{return b=b.replace(/\s/g,"_").replace(/([^\w]+)/g,"").match(/[A-Za-z]\w*$/ig),null!==b?b[0].toLowerCase():"d"===a?"custom_dimension_"+
R++:"dap_event"}catch(c){}}function q(a,b){for(var c="",e=0;e<d.GWT_GA4ID.length;e++)try{c+=d.GA4_NAME+e+","}catch(h){}b=y(E(b),"json");b=M(b);b=N(b);b.send_to=c.replace(/.$/,"");b.event_name_dimension=a;D("event",a,b)}function G(a){q("view_search_results",a);x=!1}function S(){var a=function(c){c=c.href.toLowerCase().replace(/[#?&].*/,"").split(c.hostname)[1].split(".");c=c[c.length-1];return null!=c.match(new RegExp("^("+d.EXTS+")$"))?c:!1},b=function(c){try{if("mousedown"===c.type||"keydown"===
c.type&&13===c.keyCode)if("A"===c.target.nodeName||null!==c.target.closest("a")){var e=d.COOKIE_DOMAIN,h="",l="",g="",f=/^mailto:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/i,m=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i,k="",t="",r={},O=/^(tel:)(.*)$/i,n=c.target.closest("a");"mousedown"===c.type?t="Mouse Click":"keydown"===c.type&&13===c.keyCode&&(t="Enter Key Keystroke");if(f.test(n.href)||m.test(n.href)||O.test(n.href))try{m.test(n.href)?(g=n.hostname.toLowerCase().replace(/^www\./i,
""),k="l"):f.test(n.href)?(g=n.href.split("@")[1].toLowerCase(),k="m"):O.test(n.href)&&(g=n.href,g=g.toLowerCase(),k="t")}catch(T){}(d.SUBDOMAIN_BASED?-1!==g.indexOf(e):g===e)?"m"===k?(h=n.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/),r={link_id:n.id,link_url:h[0],link_domain:h[0].split("@")[1],link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:n.className,interaction_type:t},q("email_click",r)):"l"===k&&a(n)?(h=n.pathname.split(/[#?&?]/)[0],l=a(n),r={file_name:h,file_extension:l,
link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_id:n.id,link_url:n.href.replace(/[#?&].*/,""),link_domain:n.hostname.replace(/^www\./i,""),interaction_type:t},q("file_download",r)):"l"!==k||a(n):"l"===k&&a(n)?(h=n.pathname.split(/[#?&?]/)[0],l=a(n),r={file_name:h,file_extension:l,link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_id:n.id,link_url:n.href.replace(/[#?&].*/,""),link_domain:n.hostname.replace(/^www\./i,""),outbound:!0,interaction_type:t},q("file_download",r)):"l"!==k||
a(n)?"m"===k?(h=n.href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/),r={link_id:n.id,link_url:h[0],link_domain:h[0].split("@")[1],link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:n.className,outbound:!0,interaction_type:t},q("email_click",r)):"t"===k&&(r={link_id:n.id,link_url:n.href.split("tel:")[1],link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:n.className,interaction_type:t},q("telephone_click",r)):(r={link_id:n.id,link_url:n.href.replace(/[#?&].*/,""),
link_domain:n.hostname.replace(/^www\./i,""),link_text:n.text.replace(/(?:[\r\n]+)+/g,"").trim(),link_classes:n.className,outbound:!0,interaction_type:t},q("click",r))}}catch(T){}};document.addEventListener?document.addEventListener("mousedown",b,!1):document.attachEvent&&document.attachEvent("onmousedown",b);document.addEventListener?document.addEventListener("keydown",b,!1):document.attachEvent&&document.attachEvent("onkeydown",b)}function U(){function a(f){var m="VIDEO"===f.target.nodeName?"video":
"audio",k={};"video"===m?k={video_provider:"html5 video",video_title:decodeURIComponent(f.target.currentSrc.split("/")[f.target.currentSrc.split("/").length-1]),video_id:f.target.id,video_url:decodeURIComponent(f.target.currentSrc)}:k={audio_provider:"html5 audio",audio_title:decodeURIComponent(f.target.currentSrc.split("/")[f.target.currentSrc.split("/").length-1]),audio_id:f.target.id,audio_url:decodeURIComponent(f.target.currentSrc)};switch(f.type){case "timeupdate":c[f.target.id].current=Math.round(f.target.currentTime);
var t=Math.floor(100*c[f.target.id].current/Math.round(f.target.duration)),r;for(r in c[f.target.id]._progress_milestones)t>=r&&r>c[f.target.id].latest_milestone&&(c[f.target.id].latest_milestone=r);c[f.target.id].latest_milestone&&!c[f.target.id]._progress_milestones[c[f.target.id].latest_milestone]&&(c[f.target.id]._progress_milestones[c[f.target.id].latest_milestone]=!0,"video"===m?(k.video_current_time=c[f.target.id].current,k.video_duration=Math.round(f.target.duration),k.video_percent=c[f.target.id].latest_milestone):
(k.audio_current_time=c[f.target.id].current,k.audio_duration=Math.round(f.target.duration),k.audio_percent=c[f.target.id].latest_milestone),q(m+"_progress",k));break;case "play":"video"===m?(k.video_current_time=c[f.target.id].current,k.video_duration=Math.round(f.target.duration),k.video_percent=c[f.target.id].latest_milestone):(k.audio_current_time=c[f.target.id].current,k.audio_duration=Math.round(f.target.duration),k.audio_percent=c[f.target.id].latest_milestone);q(0===c[f.target.id].current?
m+"_start":m+"_play",k);break;case "pause":c[f.target.id].current!==Math.round(f.target.duration)&&("video"===m?(k.video_current_time=c[f.target.id].current,k.video_duration=Math.round(f.target.duration),k.video_percent=c[f.target.id].latest_milestone):(k.audio_current_time=c[f.target.id].current,k.audio_duration=Math.round(f.target.duration),k.audio_percent=c[f.target.id].latest_milestone),q(m+"_pause",k));break;case "ended":for("video"===m?(k.video_current_time=c[f.target.id].current,k.video_duration=
Math.round(f.target.duration),k.video_percent="100"):(k.audio_current_time=c[f.target.id].current,k.audio_duration=Math.round(f.target.duration),k.audio_percent="100"),q(m+"_complete",k),c[f.target.id].current=0,c[f.target.id].latest_milestone=0,m=1;m<=100/b;m++)4===100/b&&m===100/b?c[f.target.id].progress_point=95:100!==b*m?c[f.target.id].progress_point=b*m:"",c[f.target.id]._progress_milestones[c[f.target.id].progress_point]=!1}}for(var b=d.YT_MILESTONE,c={},e=document.querySelectorAll("video,audio"),
h=0;h<e.length;h++){var l;e[h].getAttribute("id")?l=e[h].getAttribute("id"):(l="html5_media_"+Math.random().toString(36).slice(2),e[h].setAttribute("id",l));c[l]={};c[l].latest_milestone=0;c[l]._progress_milestones={};for(var g=1;g<=100/b;g++)4===100/b&&g===100/b?c[l].progress_point=95:100!==b*g?c[l].progress_point=b*g:"",c[l]._progress_milestones[c[l].progress_point]=!1;c[l].current=0;e[h].addEventListener("play",a,!1);e[h].addEventListener("pause",a,!1);e[h].addEventListener("ended",a,!1);e[h].addEventListener("timeupdate",
a,!1);e[h].addEventListener("ended",a,!1)}}function N(a){try{if(Object(a)!==a||Array.isArray(a))return a;var b={},c;for(c in a){var e=b;var h="";var l=0;do{var g=c.indexOf(".",l);var f=c.substring(l,-1!==g?g:void 0);e=e[h]||(e[h]=isNaN(parseInt(f))?{}:[]);h=f;l=g+1}while(0<=g);e[h]=a[c]}return b[""]}catch(m){}}function V(a){try{var b={};function c(e,h){if(Object(e)!==e)b[h]=e;else if(Array.isArray(e)){for(var l=0,g=e.length;l<g;l++)c(e[l],h?h+"."+l:""+l);0==g&&(b[h]=[])}else{l=!0;for(g in e)l=!1,
c(e[g],h?h+"."+g:g);l&&(b[h]={})}}c(a,"");return b}catch(c){}}function E(a){return Object.keys(a).reduce(function(b,c,e){e=0===e?"":"&";c=encodeURIComponent(c);var h=encodeURIComponent(a[c]);return[b,e,c,"=",h].join("")},"")}function M(a){var b={};a.split("&").forEach(function(c){var e=c.split("=");c=e[0];e=decodeURIComponent(e[1]||"");!isNaN(Number(e))&&/^(value|metric_(value|delta)|event_time|(video|audio)_(duration|percent|current_time))$/i.test(c)&&(e=Number(e));b[c]?"[object Array]"===Object.prototype.toString.call(b[c])?
b[c].push(e):b[c]=[b[c],e]:b[c]=e});return JSON.parse(JSON.stringify(b))}function H(){return[{name:"EMAIL",regex:/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gi},{name:"TEL",regex:/((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]\d{3}[\s\.\-]\d{4})([^&\s\?\/]*)/gi},{name:"SSN",regex:/((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)\d{2}([\s\.\-\+]|%20)\d{4})([^&\s\?\/]*)/ig},{name:"NAME",regex:/((first|last|middle|sur|f|l|user)([\-_])?)?name=([^&\s\?\/]*)/ig},{name:"PASSWORD",
regex:/(((confirm([\-_])?)?password)|passwd|pwd)=([^&\s\?\/]*)/ig},{name:"ZIP",regex:/(post(al)?[\s]?code|zip[\s]?code|zip)=([^&\s\?\/]*)/gi},{name:"ADDRESS",regex:/add(ress)?([1-2])?=([^&\s\?\/]*)/ig}]}function y(a,b){try{var c=H();a="object"===typeof a&&/json|default/.test(b)?(V(a),a=E(a)):a;H();var e=I.toString().toLowerCase().replace(/,/g,"=|")+"=",h=a.split("&");for(a=0;a<h.length;a++){var l="",g=h[a].split("="),f=2<g.length?g.slice(1).join("="):g[1];g.splice(2);g[1]=f;try{var m=decodeURIComponent(decodeURIComponent(g[1]))}catch(r){m=
decodeURIComponent(g[1])}if((null!=g[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid"))||/query|json/ig.test(b))&&-1<m.indexOf("?")){var k=m.split("?").splice(1).join("&").split("&"),t=[];for(pa=0;pa<k.length;pa++)-1<k[pa].indexOf("?")&&t.push(k[pa].split("?")[1]);k=k.concat(t);for(t=0;t<k.length;t++)null!=k[t].toLowerCase().match(new RegExp(e))&&(l+=k[t]+"&");m=m.replace(/\?.*/,"?"+l.replace(/&$/,""))}"json"===b?c.push({name:"DOB",regex:/(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
format:"YYYY-MM-DD"},{name:"DOB",regex:/(((birth)?date|dob)=)(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,format:"YYYY-DD-MM"},{name:"DOB",regex:/(((birth)?date|dob)=)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,format:"DD-MM-YYYY"},{name:"DOB",regex:/(((birth)?date|dob)=)(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,format:"MM-DD-YYYY"}):
("query"===b||"json"===b&&/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(m))&&c.push({name:"TEL",regex:/((tel|(tele)?phone|mob(ile)?|cell(ular)?)=)?((\+\d{1,2}[\s\.\-]?)?\d{3}[\s\.\-]?\d{3}[\s\.\-]?\d{4})([^&\s\?\/]*)/gi},{name:"SSN",regex:/((full)?(([\-_])?)?ssn=)?(\d{3}([\s\.\-\+]|%20)?\d{2}([\s\.\-\+]|%20)?\d{4})([^&\s\?\/]*)/ig},{name:"DOB",regex:/(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]%20)(0?[1-9]|[12][0-9]|3[01])([^&\s\?\/]*)/ig,
format:"YYYY-MM-DD"},{name:"DOB",regex:/(((birth)?date|dob)=)?(19|20)\d\d([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([^&\s\?\/]*)/ig,format:"YYYY-DD-MM"},{name:"DOB",regex:/(((birth)?date|dob)=)?(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]|%20)(0?[1-9]|1[012])([\s\.\/\-]|%20)(19|20)\d\d([^&\s\?\/]*)/ig,format:"DD-MM-YYYY"},{name:"DOB",regex:/(((birth)?date|dob)=)?(0?[1-9]|1[012])([\s\.\/\-]|%20)(0?[1-9]|[12][0-9]|3[01])([\s\.\/\-]%20)(19|20)\d\d([^&\s\?\/]*)/ig,format:"MM-DD-YYYY"});
if(null!=g[0].match(RegExp("dl|dr|dt|dt|en|ep.|up.|uid"))&&null!=g[0].match(RegExp("ep.agency||ep.subagency|ep.site_topic|ep.site_platform|ep.script_source|ep.version|ep.protocol"))||/query|json|default/ig.test(b))c.forEach(function(r){/^lat$/i.test(g[0])&&/^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/.test(m)||/^lon$/i.test(g[0])&&/^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/.test(m)||(m=m.replace(r.regex,"[REDACTED_"+r.name+"]"))}),g[1]=encodeURIComponent(m.replace(/\?$/,""))||
m.replace(/\?$/,""),h[a]=g.join("=")}H();return h.join("&")}catch(r){}}function W(){try{var a=document.querySelector("section.usa-banner button.usa-accordion__button");a&&a.addEventListener("click",function(b){gas4("official_usa_site_banner_click",{link_text:b.target.textContent.trim(),section:"header"})})}catch(b){}}function J(a){var b=new RegExp("([?&])("+d.SEARCH_PARAMS+")(=[^&]+)","i");b.test(a)&&(a=a.replace(b,"$1query$3"),x=a.match(/([?&])(query=)([^&#?]*)/i)[3]);return a}function B(a){RegExp.escape=
function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")};var b="";a=((new RegExp(`^(https?:\\/\\/(www\\.)?)?${RegExp.escape(document.location.hostname.replace(/^www\\./,""))}`,"ig")).test(a)?a:document.location.protocol+"//"+document.location.hostname+a).toLowerCase();var c=a.split("?")[0];return 1<a.split("?").length?(a.split("?")[1].split("&").forEach(function(e,h){-1<I.toString().toLowerCase().indexOf(e.split("=")[0])&&(b=b+"&"+e)}),0<b.length?c+"?"+y(b.substring(1),"query"):c):c}function P(){d.AUTOTRACKER?
S():"";d.YOUTUBE?_initYouTubeTracker():"";d.HTMLVIDEO?U():"";W()}function Q(){return"interactive"===document.readyState||"complete"===document.readyState?(P(),!0):!1}var x=!1,I=[],d={GWT_GA4ID:["G-CSLL4ZEK4L"],FORCE_SSL:!0,ANONYMIZE_IP:!0,AGENCY:"",SUB_AGENCY:"",VERSION:"20241218 v8.5 - GA4",SITE_TOPIC:"",SITE_PLATFORM:"",SCRIPT_SOURCE:"",URL_PROTOCOL:location.protocol,USE_MAIN_CUSTOM_DIMENSIONS:!0,MAIN_AGENCY_DIMENSION:"agency",MAIN_SUBAGENCY_DIMENSION:"subagency",MAIN_CODEVERSION_DIMENSION:"version",
MAIN_SITE_TOPIC_DIMENSION:"site_topic",MAIN_SITE_PLATFORM_DIMENSION:"site_platform",MAIN_SCRIPT_SOURCE_URL_DIMENSION:"script_source",MAIN_URL_PROTOCOL_DIMENSION:"protocol",MAIN_INTERACTION_TYPE_DIMENSION:"interaction_type",MAIN_USING_PARALLEL_DIMENSION:"using_parallel_tracker",USE_PARALLEL_CUSTOM_DIMENSIONS:!1,PARALLEL_AGENCY_DIMENSION:"agency",PARALLEL_SUBAGENCY_DIMENSION:"subagency",PARALLEL_CODEVERSION_DIMENSION:"version",PARALLEL_SITE_TOPIC_DIMENSION:"site_topic",PARALLEL_SITE_PLATFORM_DIMENSION:"site_platform",
PARALLEL_SCRIPT_SOURCE_URL_DIMENSION:"script_source",PARALLEL_URL_PROTOCOL_DIMENSION:"protocol",PARALLEL_INTERACTION_TYPE_DIMENSION:"interaction_type",PARALLEL_USING_PARALLEL_DIMENSION:"using_parallel_tracker",COOKIE_DOMAIN:location.hostname.replace(/^www\./,"").toLowerCase(),COOKIE_TIMEOUT:63072E3,SEARCH_PARAMS:"q|query|nasaInclude|k|querytext|keys|qt|search_input|search|globalSearch|goog|s|gsearch|search_keywords|SearchableText|sp_q|qs|psnetsearch|locate|lookup|search_api_views_fulltext|keywords|request|_3_keywords|searchString",
YOUTUBE:!1,HTMLVIDEO:!0,YT_MILESTONE:25,AUTOTRACKER:!0,WEBVITALS:!1,EXTS:"doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar",SUBDOMAIN_BASED:!0,GA4_NAME:"GSA_GA4_ENOR",USE_CUSTOM_URL:!1,USE_CUSTOM_TITLE:!1,USING_PARALLEL_TRACKER:"no",ACTIVATE_DEV:!1};(function(){if("undefined"!==typeof _fedParmsGTM){var a=_fedParmsGTM.toLowerCase().split("&");d.SCRIPT_SOURCE="GTM"}else{var b=document.getElementById("_fed_an_ua_tag");
_fullParams=b.src.match(/^([^\?]*)(.*)$/i)[2].replace("?","");a=_fullParams.split("&");d.SCRIPT_SOURCE=b.src.split("?")[0]}for(b=0;b<a.length;b++)switch(_keyValuePair=decodeURIComponent(a[b].toLowerCase()),_key=_keyValuePair.split("=")[0],_value=_keyValuePair.split("=")[1],_key){case "pua":for(var c=_value.split(","),e=0;e<c.length;e++)L(c[e])&&(d.GWT_GA4ID.push(c[e].toUpperCase()),d.USING_PARALLEL_TRACKER="pua");break;case "pga4":c=_value.split(",");for(e=0;e<c.length;e++)L(c[e])&&(d.GWT_GA4ID.push(c[e].toUpperCase()),
d.USING_PARALLEL_TRACKER="pga4");break;case "agency":d.AGENCY=_value.toUpperCase();break;case "subagency":d.SUB_AGENCY=_value.toUpperCase();break;case "sitetopic":d.SITE_TOPIC=_value;break;case "siteplatform":d.SITE_PLATFORM=_value;break;case "parallelcd":_value=v(_value);if(!0===_value||!1===_value)d.USE_PARALLEL_CUSTOM_DIMENSIONS=_value;break;case "custurl":_value=v(_value);if(!0===_value||!1===_value)d.USE_CUSTOM_URL=_value;break;case "custitle":_value=v(_value);if(!0===_value||!1===_value)d.USE_CUSTOM_TITLE=
_value;break;case "dapdev":_value=v(_value);if(!0===_value||!1===_value)d.ACTIVATE_DEV=_value;break;case "palagencydim":_value=w("d",_value);""!==_value&&(d.PARALLEL_AGENCY_DIMENSION=_value);break;case "palsubagencydim":_value=w("d",_value);""!==_value&&(d.PARALLEL_SUBAGENCY_DIMENSION=_value);break;case "palversiondim":_value=w("d",_value);""!==_value&&(d.PARALLEL_CODEVERSION_DIMENSION=_value);break;case "paltopicdim":_value=w("d",_value);""!==_value&&(d.PARALLEL_SITE_TOPIC_DIMENSION=_value);break;
case "palplatformdim":_value=w("d",_value);""!==_value&&(d.PARALLEL_SITE_PLATFORM_DIMENSION=_value);break;case "palscriptsrcdim":_value=w("d",_value);""!==_value&&(d.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION=_value);break;case "palurlprotocoldim":_value=w("d",_value);""!==_value&&(d.PARALLEL_URL_PROTOCOL_DIMENSION=_value);break;case "palinteractiontypedim":_value=w("d",_value);""!==_value&&(d.PARALLEL_INTERACTION_TYPE_DIMENSION=_value);break;case "cto":d.COOKIE_TIMEOUT=2628E3*parseInt(_value);break;case "sp":d.SEARCH_PARAMS+=
"|"+_value.replace(/,/g,"|");break;case "exts":d.EXTS+="|"+_value.replace(/,/g,"|");break;case "htmlvideo":_value=v(_value);if(!0===_value||!1===_value)d.HTMLVIDEO=_value;break;case "yt":_value=v(_value);if(!0===_value||!1===_value)d.YOUTUBE=_value;break;case "ytm":d.YT_MILESTONE=/^(10|20|25)$/.test(_value)?parseInt(_value):25;break;case "autotracker":_value=v(_value);if(!0===_value||!1===_value)d.AUTOTRACKER=_value;break;case "webvitals":_value=v(_value);if(!0===_value||!1===_value)d.WEBVITALS=_value;
break;case "sdor":d.SUBDOMAIN_BASED=v(_value)}})();if(document.location.href.match(/([?&])(dap-dev-env)([^&$]*)/i)||d.ACTIVATE_DEV)d.GWT_GA4ID[0]="G-9TNNMGP8WJ";(function(){/^(\/((index|home(page)?)(\.[a-zA-Z]{2,5})?)?)$/i.test(location.pathname)?d.WEBVITALS=!0:d.WEBVITALS=!1;if(d.WEBVITALS){(function(){var b=document.createElement("script");b.src="https://d3vtlq0ztv2u27.cloudfront.net/web-vitals/dist/web-vitals.attribution.iife.js";b.onload=function(){webVitals.onCLS(a);webVitals.onFID(a);webVitals.onLCP(a);
webVitals.onFCP(a);webVitals.onTTFB(a);webVitals.onINP(a)};document.head.appendChild(b)})();function a({name:b,delta:c,value:e,id:h,rating:l,attribution:g}){q(b,{value:c,metric_id:h,metric_value:e,metric_delta:c,metric_rating:l,debug_target:g?g.largestShiftTarget||g.element||g.eventTarget||"":"(not set)",debug_event_type:g?g.eventType||"":"",debug_timing:g?g.loadState||"":"",event_time:g?g.largestShiftTime||g.lcpEntry&&g.lcpEntry.startTime||g.eventTime||"":""})}}})();var F=document.getElementsByTagName("head").item(0),
z=document.createElement("script");z.setAttribute("type","text/javascript");z.setAttribute("src","https://www.googletagmanager.com/gtag/js?id="+d.GWT_GA4ID[0]);F.appendChild(z);window.dataLayer=window.dataLayer||[];D("js",new Date);D("set",{cookie_flags:"SameSite=Strict;Secure",transport_type:"beacon"});window.gas=function(a,b,c,e,h,l,g){if(void 0!==a&&""!==a&&void 0!==b&&""!==b&&void 0!==c&&""!==c)if("pageview"===b.toLowerCase())try{c=J(B(c)).split(/[#]/)[0],q("page_view",{page_location:c,page_title:void 0===
e||""===e?document.title:e}),x?G({search_term:x}):""}catch(f){}else if("event"===b.toLowerCase()&&void 0!==e&&""!==e)try{a=!1,void 0!==g&&"boolean"===typeof v(g)&&(a=v(g)),q("dap_event",{event_category:c,event_action:e,event_label:void 0===h?"":h,event_value:void 0===l||""===l||isNaN(l)?0:parseInt(l),non_interaction:a})}catch(f){}else-1==b.toLowerCase().indexOf("dimension")&&b.toLowerCase().indexOf("metric")};window.gas4=function(a,b){if(void 0!==a&&""!==a&&void 0!==b&&"object"===typeof b)if(a=w("e",
a),"page_view"===a.toLowerCase())try{0!==Object.keys(b).length&&(b.page_location=J(B(b.page_location?b.page_location:location.href)).split(/[#]/)[0],b.page_title=b.page_title?b.page_title:document.title,q("page_view",b),x?G({search_term:x}):"")}catch(e){}else try{var c=/^(((email|telephone|image|cta|navigation|faq|accordion|social)_)?click|file_download|view_search_results|video_(start|pause|progress|complete|play)|official_USA_site_banner_click|form_(start|submit|progress)|content_view|social_share|error|sort|filter|was_this_helpful_submit)$/gi.test(a)?
a:"dap_event";0!==Object.keys(b).length?q(c,b):q(c)}catch(e){}};(function(){window._isRedacted=window._isRedacted||!1;if(!window._isRedacted){window._isRedacted=!0;try{var a=window.navigator.sendBeacon,b=d.GWT_GA4ID.join("|");window.navigator.sendBeacon=function(){if(arguments&&arguments[0].match(/google-analytics\.com.*v=2&/i)&&arguments[0].match(new RegExp(b))){var c=arguments[0].split("?")[0],e=arguments[0].split("?")[1];e=y(e,"ga4");var h=[];arguments[1]&&arguments[1].split("\r\n").forEach(function(l){h.push(y(l,
"ga4"))});arguments[0]=[c,e].join("?");arguments[1]&&0<h.length&&(h.join("\r\n"),arguments[1]=h.join("\r\n"))}return a.apply(this,arguments)}}catch(c){return a.apply(this,arguments)}}})();/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/.test(d.SUBDOMAIN_BASED.toString())?(d.COOKIE_DOMAIN=d.SUBDOMAIN_BASED.toLowerCase().replace(/^www\./i,""),d.SUBDOMAIN_BASED=!0):!1===d.SUBDOMAIN_BASED?(d.COOKIE_DOMAIN=document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1],
d.SUBDOMAIN_BASED=!0):(d.COOKIE_DOMAIN=location.hostname.toLowerCase().replace(/^www\./i,""),d.SUBDOMAIN_BASED=!1);d.AGENCY=d.AGENCY||"unspecified:"+d.COOKIE_DOMAIN;d.SUB_AGENCY=d.SUB_AGENCY||""+d.COOKIE_DOMAIN;d.SITE_TOPIC=d.SITE_TOPIC||"unspecified:"+d.COOKIE_DOMAIN;d.SITE_PLATFORM=d.SITE_PLATFORM||"unspecified:"+d.COOKIE_DOMAIN;(function(){var a={"default":"utm_id utm_source utm_medium utm_campaign utm_term utm_content utm_source_platform utm_creative_format utm_marketing_tactic gbraid wbraid _gl gclid dclid gclsrc affiliate dap-dev-env v".split(" "),
gsa:["challenge","state"],dhs:["appreceiptnum"],doc:"station meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid lan office pil product site lat lon issuedby wwa".split(" "),hhs:["s_cid","selectedfacets"],hud:["postid"],nasa:["feature","productid","selectedfacets"],nps:["gid","mapid","site","webcam","id"],nsf:"meas start atlc epac cpac basin fdays cone tswind120 gm_track 50wind120 hwind120 mltoa34 swath radii wsurge key_messages inundation rainqpf ero gage wfo spanish_key_messages key_messages sid".split(" "),
va:["id"],dod:["p"],opm:"l soc jt j rmi smin hp g d a".split(" ")};I=a.default.concat(a[d.AGENCY.toLowerCase()]).concat(d.SEARCH_PARAMS.toLowerCase().split("|"))})();(function(a){a=/^\/.*$/i;try{var b=d.USE_CUSTOM_URL&&a.test(custom_dap_data.url)?location.protocol+"//"+location.hostname+custom_dap_data.url.replace(location.protocol+"//"+location.hostname,""):document.location.href;var c=d.USE_CUSTOM_TITLE?custom_dap_data.title:document.title}catch(h){b=document.location.href,c=document.title}a=b.split(document.location.hostname)[1];
-1!==document.title.search(/404|not found/i)&&(a=("/vpv404/"+a).replace(/\/\//g,"/")+(document.referrer?"/"+document.referrer:document.referrer));b=-1!==document.title.search(/404|not found/ig)?document.location.protocol+"//"+document.location.hostname+a:b;b=J(B(b));for(a=0;a<d.GWT_GA4ID.length;a++){if(0===a){var e={groups:d.GA4_NAME+a,cookie_expires:parseInt(d.COOKIE_TIMEOUT),page_location:b,page_title:c,[d.MAIN_AGENCY_DIMENSION]:d.AGENCY.toUpperCase(),[d.MAIN_SUBAGENCY_DIMENSION]:d.SUB_AGENCY.toUpperCase(),
[d.MAIN_SITE_TOPIC_DIMENSION]:d.SITE_TOPIC.toLowerCase(),[d.MAIN_SITE_PLATFORM_DIMENSION]:d.SITE_PLATFORM.toLowerCase(),[d.MAIN_SCRIPT_SOURCE_URL_DIMENSION]:d.SCRIPT_SOURCE.toLowerCase(),[d.MAIN_CODEVERSION_DIMENSION]:d.VERSION.toLowerCase(),[d.MAIN_URL_PROTOCOL_DIMENSION]:d.URL_PROTOCOL.toLowerCase(),[d.MAIN_USING_PARALLEL_DIMENSION]:d.USING_PARALLEL_TRACKER.toLowerCase()};document.referrer&&-1!==document.referrer.search(location.hostname)?e.page_referrer=B(document.referrer):document.referrer;e=
y(E(e),"default")}else e=0<a&&d.USE_PARALLEL_CUSTOM_DIMENSIONS?{groups:d.GA4_NAME+a,cookie_expires:parseInt(d.COOKIE_TIMEOUT),page_location:b,page_title:c,[d.PARALLEL_AGENCY_DIMENSION]:d.AGENCY.toUpperCase(),[d.PARALLEL_SUBAGENCY_DIMENSION]:d.SUB_AGENCY.toUpperCase(),[d.PARALLEL_SITE_TOPIC_DIMENSION]:d.SITE_TOPIC.toLowerCase(),[d.PARALLEL_SITE_PLATFORM_DIMENSION]:d.SITE_PLATFORM.toLowerCase(),[d.PARALLEL_SCRIPT_SOURCE_URL_DIMENSION]:d.SCRIPT_SOURCE.toLowerCase(),[d.PARALLEL_CODEVERSION_DIMENSION]:d.VERSION.toLowerCase(),
[d.PARALLEL_URL_PROTOCOL_DIMENSION]:d.URL_PROTOCOL.toLowerCase(),[d.PARALLEL_USING_PARALLEL_DIMENSION]:d.USING_PARALLEL_TRACKER.toLowerCase()}:{groups:d.GA4_NAME+a,cookie_expires:parseInt(d.COOKIE_TIMEOUT),page_location:b,page_title:c},document.referrer&&-1!==document.referrer.search(location.hostname)?e.page_referrer=B(document.referrer):document.referrer,e=y(E(e),"default");e=M(e);e=N(e);D("config",d.GWT_GA4ID[a],e)}x?G({search_term:x}):""})();var R=1;if(d.YOUTUBE){F=document.createElement("script");
F.src="https://www.youtube.com/iframe_api";z=document.getElementsByTagName("script")[0];z.parentNode.insertBefore(F,z);var C=[],p=[],u=[],A=d.YT_MILESTONE,K=[];onYouTubeIframeAPIReady=function(){for(var a=0;a<C.length;a++)p[a]=new YT.Player(C[a],{events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange,onError:onPlayerError}})};onPlayerReady=function(a){};onPlayerError=function(a){q("video_error",{videotitle:void 0!==a.target.playerInfo?a.target.playerInfo.videoData.title:a.target.getVideoData().title})};
onPlayerStateChange=function(a){try{for(var b=0,c=void 0!==a.target.playerInfo?a.target.playerInfo.videoData.video_id:a.target.getVideoData().video_id,e=0;e<C.length;e++)C[e]==c&&(b=e);var h=void 0!==p[b].playerInfo?Math.round(p[b].playerInfo.currentTime):Math.round(p[b].getCurrentTime()),l=void 0!==p[b].playerInfo?Math.round(p[b].playerInfo.duration):Math.round(p[b].getDuration()),g={video_current_time:h,video_duration:l,video_percent:(h/l*100).toFixed(),video_provider:"youtube",video_title:void 0!==
p[b].playerInfo?p[b].playerInfo.videoData.title:p[b].getVideoData().title,video_id:void 0!==p[b].playerInfo?p[b].playerInfo.videoData.video_id:p[b].getVideoData().video_id,video_url:void 0!==p[b].playerInfo?p[b].playerInfo.videoUrl:p[b].getVideoUrl()};a.data==YT.PlayerState.PLAYING&&0==g.video_percent?(q("video_start",g),cCi=0,A&&(K.push([b,function(f){for(f=1;f<=100/A;f++)4===100/A&&f===100/A?u[f-1]={id:b,milestone:95,triggered:!1}:100!==A*f?u[f-1]={id:b,milestone:A*f,triggered:!1}:"";setInterval(function(){var m=
void 0!==p[b].playerInfo?Math.round(p[b].playerInfo.currentTime):Math.round(p[b].getCurrentTime()),k=void 0!==p[b].playerInfo?Math.round(p[b].playerInfo.duration):Math.round(p[b].getDuration());m={video_current_time:m,video_duration:k,video_percent:(m/k*100).toFixed(),video_provider:"youtube",video_title:void 0!==p[b].playerInfo?p[b].playerInfo.videoData.title:p[b].getVideoData().title,video_id:void 0!==p[b].playerInfo?p[b].playerInfo.videoData.video_id:p[b].getVideoData().video_id,video_url:void 0!==
p[b].playerInfo?p[b].playerInfo.videoUrl:p[b].getVideoUrl()};m.video_percent<=u[u.length-1]&&cCi<u.length&&m.video_percent>=u[cCi].milestone&&!u[cCi].triggered&&u[b].id===b&&(u[cCi].triggered=!0,m.video_percent=u[cCi].milestone,m.video_current_time=Math.round(m.video_duration/u.length*(cCi+1)),q("video_progress",m),cCi++)},(void 0!==p[b].playerInfo?Math.round(p[b].playerInfo.duration):Math.round(p[b].getDuration()))/u.length)}]),K[K.length-1][1](b))):a.data==YT.PlayerState.PLAYING&&q("video_play",
g);a.data==YT.PlayerState.ENDED&&q("video_complete",g);a.data==YT.PlayerState.PAUSED&&q("video_pause",g)}catch(f){}};youtube_parser=function(a){if((a=a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&\?]*).*/))&&11==a[2].length)return a[2]};IsYouTube=function(a){a=a.match(/(.*)(youtu\.be\/|youtube(\-nocookie)?\.([A-Za-z]{2,4}|[A-Za-z]{2,3}\.[A-Za-z]{2})\/)(watch|embed\/|vi?\/)?(\?vi?=)?([^#&\?\/]{11}).*/);return null!=a&&0<a.length};YTUrlHandler=function(a){return a=a.replace(/origin=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})&?/gi,
"origin="+document.location.protocol+"//"+document.location.host),stAdd="",adFlag=!1,-1==a.indexOf("https")&&(a=a.replace("http","https")),-1==a.indexOf("?")&&(stAdd="?flag=1"),-1==a.indexOf("enablejsapi")&&(stAdd+="&enablejsapi=1",adFlag=!0),-1==a.indexOf("origin")&&(stAdd+="&origin="+document.location.protocol+"//"+document.location.host,adFlag=!0),1==adFlag?a+stAdd:a};_initYouTubeTracker=function(){for(var a=0,b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++){var e=b[c].src;IsYouTube(e)&&
(b[c].src=YTUrlHandler(e),e=youtube_parser(e),C[a]=e,b[c].setAttribute("id",e),a++)}}}Q()||(document.addEventListener?document.addEventListener("DOMContentLoaded",P):document.attachEvent&&document.attachEvent("onreadystatechange",Q))})();
