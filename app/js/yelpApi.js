function yelp() {
	var auth = {
		oauth_consumer_key: 'gsSlBzHSmPTFocOOnlKpqQ',
		consumer_secret: 'OmL44ruWPPtwm2oeVvZO3PSeRhs',
		token: 'cPfxv2_sPUjupYLzEH-OSXhYLGsODa89',
		token_secret: '9XtYnUhZP_Ddmz-_n29-QY2uDi8',
		signature_method: 'hmac-sha1'
	};

	var accessor = {
		consumerSecret: auth.consumerSecret,
		tokenSecret: auth.token_secret
	};

	var searchParam = [];
	searchParam.push(['term', 'thesodashop']);
	searchParam.push(['location', 'Gilbert']);
  searchParam.push(['callback', 'cb']);
  searchParam.push(['oauth_consumer_key', auth.oauth_consumer_key]);
  searchParam.push(['oauth_consumer_secret', auth.oauth_consumer_secret]);
  searchParam.push(['oauth_token', auth.token]);
  searchParam.push(['oauth_signature_method', auth.signature_method]);
  var message = {
    'action' : 'http://api.yelp.com/v2/search',
    'method' : 'GET',
    'parameters' : searchParam
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

  $.ajax({
  	'url': message.action,
  	'data': parameterMap,
  	'dataType': 'jsonp',
  	'timeout': 6000,
  	'success': function(data, textStatus, XMLHttpRequest){
  		console.log(data);
  	}
  })
}