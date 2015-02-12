/*
				    .ooooo.          ooo. .oo.     .ooooo.    oooo d8b
				   d88" `88b         `888P"Y88b   d88" `88b   `888""8P
				   888888888  88888   888   888   888   888    888
				   888        88888   888   888   888   888    888       
				   `"88888"          o888o o888o  `Y8bod8P"   d888b      

***********************************************************************************************************
Copyright 2014 by E-Nor Inc.
Author: Mohamed Adel
Universal Federated Analytics: Google Analytics Government Wide Site Usage Measurement.
09/04/2014 Version: 1.00
***********************************************************************************************************/

_mHostName = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];

/*
 * oConfig holds all settings with default values.
 * Most of the settings can be changed by passing a new value
 * in the query string when referencing this file.
 */
var oCONFIG = {
    VERSION: '20140904 v1.00 - Universal Analytics',
    AGENCY: '',
    SUB_AGENCY: '',
    USE_MAIN_CUSTOM_DIMENSIONS: true,
    USE_PARALLEL_CUSTOM_DIMENSIONS: false,
    MAIN_AGENCY_CUSTOM_DIMENSION_SLOT: 'dimension1',
    MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT: 'dimension2',
    MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT: 'dimension3',
    PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT: 'dimension1',
    PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT: 'dimension2',
    PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT: 'dimension3',
    SEARCH_PARAMS: 'q|querytext|nasaInclude|k|QT|',
    HOST_DOMAIN_OR: _mHostName,
    GWT_UAID: ['UA-38209789-1'],	//testing
//  GWT_UAID: ['UA-33523145-1'],	//production
    COOKIE_TIMEOUT: 24,
    ANONYMIZE_IP: true,
    /* only change to false in rare circumustances where GeoIP location accuracy is critical*/
    YOUTUBE: true,
    AUTOTRACKER: true,
    EXTS: 'doc|docx|xls|xlsx|xlsm|ppt|pptx|exe|zip|pdf|js|txt|csv|dxf|dwgd|rfa|rvt|dwfx|dwg|wmv|jpg|msi|7z|gz|tgz|wma|mov|avi|mp3|mp4|csv|mobi|epub|swf|rar',
    SUBDOMAIN_BASED: true,
    DOUNBLECLICK_LINK: false,
    ENHANCED_LINK: false,
    FORCE_SSL: false,
    OPTOUT_PAGE: false,
    PUA_NAME: 'GSA_CP'
};

/*
 * name: _initElements
 * usage: to read query string and parse the key-value pairs,
 * override default values by values passed in the query string
 */
function _initElements() {
    var _JSElement = document.getElementById('_fed_an_ua_tag').getAttribute('src');
	_JSElement = _JSElement.replace(/\?/g,'&');
    var _JSElement_Splited = _JSElement.split('&');
    for (var st01 = 1; st01 < _JSElement_Splited.length; st01++) {
        _thisElement = _JSElement_Splited[st01].toLowerCase();

        if (_thisElement.split('=')[0] == 'agency') {
            oCONFIG.AGENCY = _thisElement.split('=')[1].toUpperCase();
        } else if (_thisElement.split('=')[0] == 'subagency') {
            oCONFIG.SUB_AGENCY = _thisElement.split('=')[1].toUpperCase();
        } else if (_thisElement.split('=')[0] == 'sp') {
            oCONFIG.SEARCH_PARAMS += _thisElement.replace(/(b|,)/g, '|').split('=')[1];
        } else if (_thisElement.split('=')[0] == 'exts') {
            oCONFIG.EXTS += '|' + _thisElement.split('=')[1].replace(',', '|');
        } else if (_thisElement.split('=')[0] == 'yt') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.YOUTUBE = ('true' == _thisElement) ? true : !('false' == _thisElement);
        } else if (_thisElement.split('=')[0] == 'sdor') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.SUBDOMAIN_BASED = ('true' == _thisElement) ? true : !('false' == _thisElement);
        } else if (_thisElement.split('=')[0] == 'dclink') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.DOUNBLECLICK_LINK = ('true' == _thisElement) ? true : false;
        } else if (_thisElement.split('=')[0] == 'aip') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.ANONYMIZE_IP = ('true' == _thisElement) ? true : !('false' == _thisElement);
        } else if (_thisElement.indexOf('pua') > -1) {
            _thisElement = _thisElement.split('=')[1];
            var _thisElementSplit = _thisElement.split(',');
            for (var st02 = 0; st02 < _thisElementSplit.length; st02++) {
                if (_isValidUANum( _thisElementSplit[st02])){
				oCONFIG.GWT_UAID[st02 + 1] = _thisElementSplit[st02].toUpperCase();
				}
            }
        } else if (_thisElement.split('=')[0] == 'enhlink') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.ENHANCED_LINK = ('true' == _thisElement) ? true : false;
        } else if (_thisElement.split('=')[0] == 'autotracker') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.AUTOTRACKER = ('true' == _thisElement) ? true : !('false' == _thisElement);
        } else if (_thisElement.split('=')[0] == 'forcessl') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.FORCE_SSL = ('true' == _thisElement) ? true : false;
        } else if (_thisElement.split('=')[0] == 'optout') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.OPTOUT_PAGE = ('true' == _thisElement) ? true : false;
        } else if (_thisElement.split('=')[0] == 'fedagencydim') {
            oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'fedsubagencydim') {
            oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'fedversiondim') {
            oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'palagencydim') {
            oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'palsubagencydim') {
            oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'palversiondim') {
            oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT = _thisElement.split('=')[1].toLowerCase();
            if (oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT.indexOf('dimension') == -1) {
                oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT = 'dimension' + oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT;
            }
        } else if (_thisElement.split('=')[0] == 'maincd') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.USE_MAIN_CUSTOM_DIMENSIONS = ('true' == _thisElement) ? true : !('false' == _thisElement);
        } else if (_thisElement.split('=')[0] == 'parallelcd') {
            _thisElement = _unionParams(_thisElement.split('=')[1]);
            oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS = ('true' == _thisElement) ? true : false;
        } else if (_thisElement.split('=')[0] == 'cto') {
            oCONFIG.COOKIE_TIMEOUT = parseInt(_thisElement.split('=')[1]);
        }
    }

    /* In case Agency or Sub-Agency are not set */
    if (oCONFIG.SUBDOMAIN_BASED) {
		var _ObtHostName = '';
		try{
			_ObtHostName = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}([^.\/]+\.)[^.\/]{2,4})|(([^.\/]+\.)([^.\/]+\.)[^.\/]{2,4}([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
			}
		catch(domError)
		{
			_ObtHostName = 'www.'+document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
			}
		
        oCONFIG.HOST_DOMAIN_OR = _ObtHostName;
    }
	
	
    oCONFIG.AGENCY = oCONFIG.AGENCY || 'unspecified:' + oCONFIG.HOST_DOMAIN_OR;
    oCONFIG.SUB_AGENCY = oCONFIG.SUB_AGENCY || ('' + oCONFIG.HOST_DOMAIN_OR);
    oCONFIG.SUB_AGENCY = oCONFIG.AGENCY + ' - ' + oCONFIG.SUB_AGENCY;
    oCONFIG.COOKIE_TIMEOUT = CookieTimeoutCalc_Months(oCONFIG.COOKIE_TIMEOUT);
}

_initElements();

/*
 * name: _sendCustomDimension
 * usage: to set custom dimension before sending the hit
 */
function _sendCustomDimension(_slotNo, _val) {
    if (_slotNo != '' && _val != '') {
        _slotNo = _slotNo.split(',');

        for (var _s = 0; _s < _slotNo.length; _s++) {
            if (_slotNo[_s].indexOf('dimension') == 1) {
                _slotNo[_s] = 'dimension' + _slotNo[_s];
            }

        }


        for (var dfev = 0; dfev < oCONFIG.GWT_UAID.length; dfev++) {
            if (dfev == 0) {
                if (_slotNo[0] != 'dimension0') {
                    gascp('set', _slotNo[0], _val);
                }
            } else {
                if (_slotNo[1] != undefined && _slotNo[1] != 'dimension0')
                    gascp(oCONFIG.PUA_NAME + dfev + '.set', _slotNo[1], _val);
            }

        }


    }
}

/*
 * name: _sendCustomMetrics
 * usage: to set custom metric before sending the hit
 */
function _sendCustomMetrics(_slotNo, _val) {
    if (_slotNo != '' && _val != '') {
        _slotNo = _slotNo.split(',');

        for (var _s = 0; _s < _slotNo.length; _s++) {
            if (_slotNo[_s].indexOf('metric') == 1) {
                _slotNo[_s] = 'metric' + _slotNo[_s];
            }

        }


        for (var dfev = 0; dfev < oCONFIG.GWT_UAID.length; dfev++) {
            if (dfev == 0) {
                if (_slotNo[0] != 'dimension0') {
                    gascp('set', _slotNo[0], _val);
                }
            } else {
                if (_slotNo[1] != undefined && _slotNo[1] != 'metric0')
                    gascp(oCONFIG.PUA_NAME + dfev + '.set', _slotNo[1], _val);
            }

        }


    }
}

/*
 * name: _sendEvent
 * usage: to set hit type to Event with proper parameters
 */
function _sendEvent(_cat, _act, _lbl, _val) {
    if (_cat != '' && _act != '') {
        if (_val == '') {
            _val = 0;
        }
        if (_lbl == '') {
            _lbl == '';
        }

        for (var dfev = 0; dfev < oCONFIG.GWT_UAID.length; dfev++) {
            if (dfev == 0) {
                gascp('send', 'event', _cat, _act, _lbl, _val);
            } else {
                gascp(oCONFIG.PUA_NAME + dfev + '.send', 'event', _cat, _act, _lbl, _val);
            }

        }


    }
}

/*
 * name: _sendExceptionEvent
 * usage: to set hit type to Event with proper parameters, event category 'Exception'
 */
function _sendExceptionEvent(_act, _lbl, _val) {
	var _cat = 'Exception';
    if (_cat != '' && _act != '') {
        if (_val == '') {
            _val = 0;
        }
        if (_lbl == '') {
            _lbl == '';
        }

        for (var dfev = 0; dfev < oCONFIG.GWT_UAID.length; dfev++) {
            if (dfev == 0) {
                gascp('send', 'event', _cat, _act, _lbl, _val);
            } else {
                gascp(oCONFIG.PUA_NAME + dfev + '.send', 'event', _cat, _act, _lbl, _val);
            }
        }
   }
}

/*
 * name: _sendPageview
 * usage: to set hit type to Pageview with proper parameters
 */
function _sendPageview(_virtualPath, _virtualTitle) {
    if (_virtualPath != '') {

        for (var dfev = 0; dfev < oCONFIG.GWT_UAID.length; dfev++) {
            if (dfev == 0) {
                if (_virtualTitle != '') {
                    gascp('set', 'title', _virtualTitle);
                } else {
                    gascp('set', 'title', document.title);
                }
                gascp('send', 'pageview', _virtualPath);
            } else {
                if (_virtualTitle != '') {
                    gascp(oCONFIG.PUA_NAME + dfev + '.set', 'title', _virtualTitle);
                } else {
                    gascp(oCONFIG.PUA_NAME + dfev + '.set', 'title', document.title);
                }
                gascp(oCONFIG.PUA_NAME + dfev + '.send', 'pageview', _virtualPath);
            }

        }


    }
}

/*
 * name: gas
 * usage: to set hit parameters or send hits, all types of hits.
 * This is the only public function that should be called by users.
 */
function gas(_send, _hitType, _param1, _param2, _param3, _param4, _param5) {
    if (_send == undefined) {
        _send = '';
    }
    if (_hitType == undefined) {
        _hitType = '';
    }
    if (_param1 == undefined) {
        _param1 = '';
    }
    if (_param2 == undefined) {
        _param2 = '';
    }
    if (_param3 == undefined) {
        _param3 = '';
    }
    if (_param4 == undefined) {
        _param4 = '';
    }
    if (_param5 == undefined) {
        _param5 = '';
    }

    if (_hitType == 'event') {
        if (_param4 == '' || isNaN(_param4)) {
            _param4 = '0';
        }
        _sendEvent(_param1, _param2, _param3, parseInt(_param4));
    } else if (_hitType == 'pageview') {
        _sendPageview(_param1, _param2);
    } else if (_hitType.indexOf('dimension') > -1) {
        _sendCustomDimension(_hitType, _param1);
    } else if (_hitType.indexOf('metric') > -1) {
        _sendCustomMetrics(_hitType, _param1);
    }
}

/*
 * name: _URIHandler
 * usage: to unify parameter name of search to be passed to GA
 */
function _URIHandler(pageName) {
    var re = new RegExp('([?&])(' + oCONFIG.SEARCH_PARAMS + ')(=[^&]*)', 'i');
    if (re.test(pageName)) {
        pageName = pageName.replace(re, '$1query$3');
    }
    return pageName;
}

/**** Start Basic Tracker *******/
/*
 * build GA tracking code
 * according to configurations saved in oConfig 
 */
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'gascp');

for (var dpv = 0; dpv < oCONFIG.GWT_UAID.length; dpv++) {

    var _adjPageUri = _URIHandler(document.location.pathname + document.location.search + document.location.hash);

    if (dpv == 0) {
        if (oCONFIG.OPTOUT_PAGE) {
            window['ga-disable-' + oCONFIG.GWT_UAID[dpv]] = true;
        }
        if (!oCONFIG.SUBDOMAIN_BASED) {
            gascp('create', oCONFIG.GWT_UAID[dpv], oCONFIG.HOST_DOMAIN_OR, {
                'allowLinker': true,
                'cookieExpires': parseInt(oCONFIG.COOKIE_TIMEOUT)
            });
            gascp('require', 'linker');
            gascp('linker:autoLink', [oCONFIG.HOST_DOMAIN_OR]);
        } else {
			var _ObtHostName = '';
		try{
			_ObtHostName = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}([^.\/]+\.)[^.\/]{2,4})|(([^.\/]+\.)([^.\/]+\.)[^.\/]{2,4}([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
			}
		catch(domError)
		{
			_ObtHostName = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
			}
		
        

            gascp('create', oCONFIG.GWT_UAID[dpv], _ObtHostName, {
                'cookieExpires': parseInt(oCONFIG.COOKIE_TIMEOUT)
            });
        }

        if (oCONFIG.ANONYMIZE_IP) {
            gascp('set', 'anonymizeIp', oCONFIG.ANONYMIZE_IP);
        }
        if (oCONFIG.DOUNBLECLICK_LINK) {
            gascp('require', 'displayfeatures');
        }
        if (oCONFIG.ENHANCED_LINK) {
            gascp('require', 'linkid', 'linkid.js');
        }
        if (oCONFIG.FORCE_SSL) {
            gascp('set', 'forceSSL', true);
        }
        if (oCONFIG.USE_MAIN_CUSTOM_DIMENSIONS) {
            gascp('set', oCONFIG.MAIN_AGENCY_CUSTOM_DIMENSION_SLOT, oCONFIG.AGENCY);
            gascp('set', oCONFIG.MAIN_SUBAGENCY_CUSTOM_DIMENSION_SLOT, oCONFIG.SUB_AGENCY);
            gascp('set', oCONFIG.MAIN_CODEVERSION_CUSTOM_DIMENSION_SLOT, oCONFIG.VERSION);
        }

        gascp('send', 'pageview', _adjPageUri);

    } else {
        if (oCONFIG.OPTOUT_PAGE) {
            window['ga-disable-' + oCONFIG.GWT_UAID[dpv]] = true;
        };

        if (!oCONFIG.SUBDOMAIN_BASED) {
            gascp('create', oCONFIG.GWT_UAID[dpv], oCONFIG.HOST_DOMAIN_OR, {
                'name': oCONFIG.PUA_NAME + dpv,
                'allowLinker': true,
                'cookieExpires': parseInt(oCONFIG.COOKIE_TIMEOUT)
            });


            gascp(oCONFIG.PUA_NAME + dpv + '.require', 'linker');
            gascp(oCONFIG.PUA_NAME + dpv + '.linker:autoLink', [oCONFIG.HOST_DOMAIN_OR]);
        } else {
            gascp('create', oCONFIG.GWT_UAID[dpv], oCONFIG.HOST_DOMAIN_OR, {
                'name': oCONFIG.PUA_NAME + dpv,
                'cookieExpires': parseInt(oCONFIG.COOKIE_TIMEOUT)
            });
        }

        if (oCONFIG.ANONYMIZE_IP) {
            gascp(oCONFIG.PUA_NAME + dpv + '.set', 'anonymizeIp', oCONFIG.ANONYMIZE_IP);
        }
        if (oCONFIG.DOUNBLECLICK_LINK) {
            gascp(oCONFIG.PUA_NAME + dpv + '.require', 'displayfeatures');
        }
        if (oCONFIG.ENHANCED_LINK) {
            gascp(oCONFIG.PUA_NAME + dpv + '.require', 'linkid', 'linkid.js');
        }
        if (oCONFIG.FORCE_SSL) {
            gascp(oCONFIG.PUA_NAME + dpv + '.set', 'forceSSL', true);
        }
        if (oCONFIG.USE_PARALLEL_CUSTOM_DIMENSIONS) {
            gascp(oCONFIG.PUA_NAME + dpv + '.set', oCONFIG.PARALLEL_AGENCY_CUSTOM_DIMENSION_SLOT, oCONFIG.AGENCY);
            gascp(oCONFIG.PUA_NAME + dpv + '.set', oCONFIG.PARALLEL_SUBAGENCY_CUSTOM_DIMENSION_SLOT, oCONFIG.SUB_AGENCY);
            gascp(oCONFIG.PUA_NAME + dpv + '.set', oCONFIG.PARALLEL_CODEVERSION_CUSTOM_DIMENSION_SLOT, oCONFIG.VERSION);
        }
		if (document.title.search(/404|not found/i) !== -1)
		{
			var vpv404 = '/vpv404/' + _adjPageUri;
			_adjPageUri = vpv404.replace(/\/\//g, '/') + '/' + document.referrer;
			
			}
        gascp(oCONFIG.PUA_NAME + dpv + '.send', 'pageview', _adjPageUri);


    }

}
/**** End Basic Tracker *******/


/*
 * name: _initAutoTracker
 * usage: to automatically tag outbound links / e-mails / downloads
 */
function _initAutoTracker() {
    var aSETTINGS = {
        DEBUGGING_MODE: false,
        TRACK_OUTBOUND_DOWNLOADS: true,
        TRACK_OUTBOUND_EMAILS: true,
        DOWNLOADS_EXTs: oCONFIG.EXTS,
        WEBSITE_HOSTNAME: oCONFIG.HOST_DOMAIN_OR,
        EMAIL_CATEGORY: 'Mailto',
        DOWNLOADS_CATEGORY: 'Downloads',
        TELEPHONE_CATEGORY: 'Telephone Clicks',
        OUTBOUND_LINK_CATEGORY: 'Outbound',
        OUTBOUND_DOWNLOAD_CATEGORY: 'Outbound Downloads',
        OUTBOUND_EMAIL_CATEGORY: 'Outbound MailTo',
    };
    var _allDocLinks = document.getElementsByTagName('a');

    for (var iki = 0; iki < _allDocLinks.length; iki++) {
        try {
            var _ThisLink = _allDocLinks[iki].getAttribute('href');
            var _thisObject = _allDocLinks[iki];
            var _thisHostName = _thisObject.hostname;
            var _thisPathName = _thisObject.pathname;
            var _thisProtocol = _thisObject.protocol;
            if (!_thisHostName.match(/(.*)\.(.*)\.(.*)/g)) {
                _thisHostName = 'www.' + _thisHostName;
            }
            var _completeURL = _thisProtocol + "//" + _thisHostName + _thisPathName;
            if (_thisHostName != '' && _thisPathName != '' && _thisHostName != 'www.') { /* Major Case (Link) #1*/
                if (_thisHostName.toLowerCase().indexOf(aSETTINGS.WEBSITE_HOSTNAME) > -1) { /* Minor Case - Internal Link #1/1 */
                    _isDownload(_thisPathName, aSETTINGS.DOWNLOADS_EXTs) == true ? _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.DOWNLOADS_CATEGORY, _getDownloadExt(_thisPathName, aSETTINGS.DOWNLOADS_EXTs), _completeURL, 0) : false;
                } else { /* Minor Case - Externak Link (Outbound) #1/2 */
                    _isDownload(_thisPathName, aSETTINGS.DOWNLOADS_EXTs) && aSETTINGS.TRACK_OUTBOUND_DOWNLOADS == true ? _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.OUTBOUND_DOWNLOAD_CATEGORY, _getDownloadExt(_thisPathName, aSETTINGS.DOWNLOADS_EXTs), _completeURL, 0) : _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.OUTBOUND_LINK_CATEGORY, _thisHostName, _thisPathName, 0);
                }
            } else { /* Major Case (Email & Telephone) #2 */
                if (_isEmailAddr(_ThisLink)) {
                    var _thisEmailAddress = _getEmailAddr(_ThisLink);
                    var _thisEmailHost = _getEmailAddrHost(_thisEmailAddress);
                    if (aSETTINGS.WEBSITE_HOSTNAME.replace('www.', '') == _thisEmailHost) {
                        _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.EMAIL_CATEGORY, _thisEmailAddress, '', 0);
                    } else if (_thisEmailHost.indexOf(aSETTINGS.WEBSITE_HOSTNAME) > -1) {
                        _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.EMAIL_CATEGORY, _thisEmailAddress, '', 0);
                    } else if (aSETTINGS.TRACK_OUTBOUND_EMAILS) {
                        _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.OUTBOUND_EMAIL_CATEGORY, _thisEmailAddress, '', 0);
                    }

                } else if (_isTelNum(_ThisLink)) {
                    _addEventListener(_thisObject, aSETTINGS.DEBUGGING_MODE, aSETTINGS.TELEPHONE_CATEGORY, _getTelNum(_ThisLink), '', 0);

                }

            }
        } catch (ePR) { _sendExceptionEvent('AutoTracker : Invlid Link Structure',document.location.href,0);}
    }


}


/**** Start Utility functions for AutoTracker ***/
/*
 * name: _isDownload
 * usage: to check if a link points to a download file
 */
function _isDownload(url, extensions) {
    if (url.toLowerCase().match(new RegExp("^(.*)(" + extensions + ")(.*)$")) != null) return true;
    else return false;
}

/*
 * name: _getDownloadExt
 * usage: to extract downloadable file extension
 */
function _getDownloadExt(url, extensions) {
    return url.toLowerCase().match(new RegExp("\.(" + extensions + ")"))[0].replace('.', '');
}

/*
 * name: _isEmailAddr
 * usage: to check if a string is a valid email
 */
function _isEmailAddr(url) {
    if (url.toLowerCase().match(/^mailto\:[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})/g)) return true;
    else return false;
}

/*
 * name: _getEmailAddr
 * usage: to extract the email address
 */
function _getEmailAddr(url) {
    return url.toLowerCase().match(/[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})/g).toString();
}

/*
 * name: _getEmailAddrHost
 * usage: to extract the host of the email address 
 */
function _getEmailAddrHost(_emailaddr) {
    return _emailaddr.toString().split("@")[1];
}

/*
 * name: _isTelNum
 * usage: to check if a string is a valid phone number
 */
function _isTelNum(url){
    if (url.toLowerCase().match(/^tel\:(.*)([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g)) return true;
    else return false;
}

/*
 * name: _getTelNum
 * usage: to extract the phone number
 */
function _getTelNum(url){
    var telNum = url.toLowerCase().match(/^tel\:(.*)([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g).toString();
    return telNum.toString().replace('tel:', '');
}

/*
 * name: _unionParams
 * usage: to map several string values to boolean values
 */
function _unionParams(_stringValue){
	if (_stringValue=='true'||_stringValue=='on'||_stringValue=='yes'||_stringValue=='1'){
		return 'true';
	} else if (_stringValue=='false'||_stringValue=='off'||_stringValue=='no'||_stringValue=='0'){
		return 'false';
	} else {
		return _stringValue;
	}
}

/*
 * name: _isValidUANum
 * usage: to check if a string is a valid UA
 */
function _isValidUANum(_stringVal){
	_stringVal = _stringVal.toLowerCase();
    var _regEx = /^ua\-([0-9]+)\-[0-9]+$/;
    var match = _stringVal.match(_regEx);
    if (match != null && match.length > 0) {
        return true;
    } else {
        return false;
    }
}

/*
 * name: _addEventListener
 * usage: 
 * add event listener to an HTML element
 * and set the parameters of the event hit type
 * if debugging mode is enabled, (evAppendType=true), onmousedown mechanism will be used.
 * if debugging mode is disabled, (evAppendType=false), javascript listener mechanism will be used.
 */
function _addEventListener(evObj, evAppendType, evCat, evAct, evLbl, evVal){
        if (evAppendType == true) {
            var currentOnMouseDown = evObj.getAttribute('onmousedown');
            evObj.setAttribute('onmousedown', "_sendEvent('" + evCat + "','" + evAct + "','" + evLbl + "'," + evVal + ");" + (currentOnMouseDown != null ? currentOnMouseDown : ""));
			} else if (evAppendType == false) {
            evObj.addEventListener('mousedown', function() {
                _sendEvent(evCat, evAct, evLbl, evVal);
            });
        }
    }
/**** End Utility functions for AutoTracker ***/


/*** Start YouTube Tracking - Used for Youtube video tracking (Play / Pause / Watch to End ***/
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videoArray = new Array();
var playerArray = new Array();
var _f33 = false;
var _f66 = false;
var _f90 = false;

/*
 * name: youtube_parser
 * usage: to extract youtube video id from youtube URI
 */
function youtube_parser(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {}
}

/*
 * name: IsYouTube
 * usage: to check if the string is a valid youtube URL
 */
function IsYouTube(url) {
    var YouTubeLink_regEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(YouTubeLink_regEx);
    if (match != null && match.length > 0) {
        return true;
    } else {
        return false;
    }
}

/*
 * name: YTUrlHandler
 * usage: to correct minor errors in youtube URLs
 * and make sure it's trackable
 */
function YTUrlHandler(url) {
    stAdd = '';
    adFlag = false;
    if (url.indexOf('https') == -1) {
        url = url.replace('http', 'https');
    }
    if (url.indexOf('?') == -1) {
        stAdd = '?flag=1';
    }
    if (url.indexOf('enablejsapi') == -1) {
        stAdd += '&enablejsapi=1';
        adFlag = true;
    }
    if (url.indexOf('origin') == -1) {
        stAdd += '&origin=' + document.location.host;
        adFlag = true;
    }
    if (adFlag == true) {
        return url + stAdd;
    } else {
        return url;
    }
}

/*
 * name: _initYouTubeTracker
 * usage: initiate yoututbe tracker libraries
 * and loop over all youtube iframes
 */
function _initYouTubeTracker() {
    var _iframes = document.getElementsByTagName('iframe');
    var vArray = 0;
    for (var ytifrm = 0; ytifrm < _iframes.length; ytifrm++) {
        _thisVideoObj = _iframes[ytifrm]
        var _thisSrc = _thisVideoObj.src;
        if (IsYouTube(_thisSrc)) {
            _thisVideoObj.src = YTUrlHandler(_thisSrc);
            var youtubeid = youtube_parser(_thisSrc);
            _thisVideoObj.setAttribute('id', youtubeid);
            videoArray[vArray] = youtubeid;
            vArray++;
        }
    }
}

/*
 * name: onYouTubeIframeAPIReady
 * usage: to assign video array items to player array of Youtube Tracker API
 */
function onYouTubeIframeAPIReady() {
    for (var i = 0; i < videoArray.length; i++) {
        playerArray[i] = new YT.Player(videoArray[i], {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

/*
 * name: onPlayerReady
 * usage: fired when the player is ready
 * function added for compatibility of Youtube tracker API
 */
function onPlayerReady(event){
	// left blank on purpose
}

/* 
 * name: onPlayerStateChange
 * usage: fired when user interacts with the video player
 * such as pressing play/ pause buttons
 * and sends proper Events to GA
 */
function onPlayerStateChange(event) {
    var videoURL = event.target.getVideoUrl();
    var videoId = youtube_parser(videoURL);
    if (event.data == YT.PlayerState.PLAYING) {
        _thisDuration = ((event.target.getCurrentTime() / event.target.getDuration()) * 100).toFixed();

        if (_thisDuration == 0) {
            _f33 = false;
            _f66 = false;
            _f90 = false;
        }
        _sendEvent('YouTube Video', 'play', videoURL, 0);
    } else if (event.data == YT.PlayerState.ENDED) {
        _sendEvent('YouTube Video', 'finish', videoURL, 0);
    } else if (event.data == YT.PlayerState.PAUSED) {
        _sendEvent('YouTube Video', 'pause', videoURL, 0);
        var duration = ((event.target.getCurrentTime() / event.target.getDuration()) * 100).toFixed();
        if (duration < 100) {
            var precentage = ((event.target.getCurrentTime() / event.target.getDuration()) * 100).toFixed();
            if (precentage > 0 && precentage <= 33 && _f33 == false) {
                _sendEvent('YouTube Video', '33%', videoURL, 0);
            } else if (precentage > 0 && precentage <= 66 && _f66 == false) {
                _sendEvent('YouTube Video', '66%', videoURL, 0);
            } else if (precentage > 0 && precentage <= 90 && _f90 == false) {
                _sendEvent('YouTube Video', '90%', videoURL, 0);
            }
        }
    }
}
/*** End YouTube Tracking - Used for Youtube video tracking (Play / Pause / Watch to End ***/

/*
 * name: _initIdAssigner
 * usage: assign unique Id to HTML elements without any id.
 * useful for Enhanced Link Attribution
 */
function _initIdAssigner() {
    var _allDocLinks = document.getElementsByTagName('a');
    for (var sid = 0; sid < _allDocLinks.length; sid++) {
        var currentId = _allDocLinks[sid].getAttribute('id');
        if (currentId == null || currentId == '') {
            _allDocLinks[sid].setAttribute('id', 'anch_' + sid);
        }
    }
}

/*
 * name: CookieTimeoutCalc_Months
 * usage: to convert cookie time out from months to seconds
 */
function CookieTimeoutCalc_Months(valInMonths) {
        var retValue = 60 * 60 * 24 * 30.416667;
        return retValue * valInMonths;
    }

/*
 * once the document is loaded and ready
 * call enabled functions according to oConfig settings
 **/
document.addEventListener('DOMContentLoaded', function() {
    oCONFIG.ENHANCED_LINK == true ? _initIdAssigner() : '';
    oCONFIG.AUTOTRACKER == true ? _initAutoTracker() : '';
    oCONFIG.YOUTUBE == true ? _initYouTubeTracker() : '';
});
