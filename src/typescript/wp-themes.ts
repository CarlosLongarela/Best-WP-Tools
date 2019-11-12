document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	utils.set_menu( 'wp-themes' );

	utils.show_data_div(); // Show principal content.

} );
/*
chrome.webRequest.onHeadersReceived.addListener(
	function(details) {
	  for (var i = 0; i < details.requestHeaders.length; ++i) {
		  console.log( details );
		if (details.requestHeaders[i].name === 'User-Agent') {
		  details.requestHeaders.splice(i, 1);
		  break;
		}
	  }
	  return {requestHeaders: details.requestHeaders};
	},
	{urls: ["<all_urls>"]},
	["blocking", "requestHeaders"]);
	*/