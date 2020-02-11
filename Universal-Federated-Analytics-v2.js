/* name: _URIHandler
 * usage: to unify parameter name of search to be passed to GA */
function _URIHandler(searchParams, pageName) {
  var re = new RegExp('([?&])(' + searchParams + ')(=[^&]*)', 'i');
  if (re.test(pageName)) {
    pageName = pageName.replace(re, '$1query$3');
  }
  return pageName;
}

/* name: _isExcludedReferrer
 * usage: to manually handle Referral Exclusion programmatically */
function _isExcludedReferrer(referrer, subdomainBased, cookieDomain) {
  if (referrer !== '') {
    var refer = referrer
      .replace(/https?\:\/\//, '')
      .split('/')[0]
      .replace('www.', '');
    if (subdomainBased) {
      if (refer.indexOf(cookieDomain) != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (refer === cookieDomain) {
        return true;
      } else {
        return false;
      }
    }
  }
}

/* name: _cleanBooleanParam
 * usage: to map several string values to boolean values */
function _cleanBooleanParam(_paramValue) {
  switch (_paramValue.toString().toLowerCase()) {
    case 'true':
    case 'on':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'off':
    case 'no':
    case '0':
      return false;
    default:
      return _paramValue;
  }
}

/* name: _isValidUANum
 * usage: to check if a string is a valid UA */
function _isValidUANum(_UANumber) {
  _UANumber = _UANumber.toLowerCase();
  var _regEx = /^ua\-([0-9]+)\-[0-9]+$/;
  var match = _UANumber.match(_regEx);

  return match != null && match.length > 0;
}

/* name: _cleanDimensionValue
 * usage: make sure the dimension slot number is passed correctly */
function _cleanDimensionValue(_paramValue) {
  try {
    pattern = /^dimension([1-9]|[1-9][0-9]|1([0-9][0-9])|200)$/;
    if (pattern.test(_paramValue)) return _paramValue;
    if (_paramValue.match(/\d+$/g) !== null) {
      var _tmpValue = 'dimension' + _paramValue.match(/\d+$/g)[0];
      if (pattern.test(_tmpValue)) return _tmpValue;
    }
    return '';
  } catch (err) {
    //console.log(err);
  }
}

module.exports = { _URIHandler, _isExcludedReferrer, _cleanBooleanParam, _isValidUANum, _cleanDimensionValue };
