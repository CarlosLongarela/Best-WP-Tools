( function () {
	'use strict';

	// Google Analytics.
	var _gaq = Array()
	_gaq = _gaq || [];
	_gaq.push( ['_setAccount', 'UA-74049753-5'] );
	_gaq.push( ['_trackPageview'] );

	( function() {
		var ga   = document.createElement( 'script' );
		ga.type  = 'text/javascript';
		ga.async = true;
		ga.src   = 'https://ssl.google-analytics.com/ga.js';
		var s    = document.getElementsByTagName( 'script' )[0];
		s.parentNode.insertBefore( ga, s );
	} )();

}() );

/* eslint-disable no-unused-vars */
var utils = {
/* eslint-enable no-unused-vars */
	translator: function( html ) {
		'use strict';

		/**
		 * This is a part of Chrome Extensions Box
		 * Read more on GitHub - https://github.com/onikienko/chrome-extensions-box
		 *
		 * Parse html and replace all {{property name from message.json}} from text nodes, title, alt, value and placeholder attrs
		 * with chrome.i18n.getMessage http://developer.chrome.com/extensions/i18n.html
		 */
		var i,
			length,
			attrs_to_check = ['title', 'alt', 'placeholder', 'value', 'href'];

		function replacer( text : string ) {
			return text.replace(/\{\{([\s\S]*?)\}\}/gm, function( str, g1 ) {
				return chrome.i18n.getMessage( g1.trim() ) || str;
			});
		}

		if ( html.attributes ) {
			attrs_to_check.forEach( function ( el ) {
				if ( html.attributes[el] ) {
					html.attributes[el].value = replacer( html.attributes[el].value );
				}
			});
		}

		if ( html.nodeType === 3 ) { //text node
			html.data = replacer( html.data );
		} else {
			for ( i = 0, length = html.childNodes.length; i < length; i++ ) {
				this.translator( html.childNodes[i] );
			}
		}
	}, // /translator.

	ajax: function( url : string, fn ) {
		'use strict';

		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if ( 4 === request.readyState ) {
				//console.log( request.response );
				fn( request.response );
			}
		};

		request.open( 'GET', url, true );
		request.responseType = 'json';
		request.send();
	}, // /ajax.

	set_menu: function( active_item ) {
		'use strict';

		var html_menu = '';
		var sections, sections_length;

		sections = [ 'home', 'wpo', 'web-server', 'wp-tools', 'wp-plugins', 'wp-themes', 'hosting' ];
		sections_length = sections.length;

		if ( document.getElementById( 'primary_menu' ) ) {
			for ( var i = 0; i < sections_length; i++ ) {
				if ( active_item === sections[i] ) {
					html_menu += '<div id="' + sections[i] + '_home" class="item"><img src="../img/' + sections[i] + '-48.png" /></div>';
				} else {
					html_menu += '<div id="' + sections[i] + '_home" class="item"><a href="' + sections[i] + '.html"><img src="../img/' + sections[i] + '-48.png" /></a></div>';
				}
			}

			document.getElementById( 'primary_menu' ).innerHTML = html_menu;
		} else {
			return null;
		}
	}, // /set_menu.

	get_current_tab: function( fn ) {
		'use strict';

		var self = this;
		chrome.tabs.query( { 'active': true, 'currentWindow': true }, function( tabs ) {
			if ( tabs.length > 0 ) {
				if ( tabs[0].url.substring( 0, 4 ) !== 'http' ) { // Url don't begin with http or https.
					self.url_not_valid();
				} else {
					fn( tabs[0] );
				}
			} else {
				self.url_not_valid();
			}
		} );
	}, // /get_current_tab

	url_not_valid: function() {
		'use strict';

		document.getElementById( 'data' ).innerHTML = '<div id="notice"><p>' + chrome.i18n.getMessage( 'msg_only_http' ) + '</p><p>' + chrome.i18n.getMessage( 'msg_2_only_http' ) + ' <a href="https://tabernawp.com/great-wp-tools/" target="_blank" rel="noopener">https://tabernawp.com/great-wp-tools/</a></p></div>';

		this.show_div( 'notice' );
	}, // /url_not_valid.

	show_div: function( div_id ) {
		'use strict';

		document.getElementById( div_id ).style.display = 'block';
	}, // /show_div.

	hide_div: function( div_id ) {
		'use strict';

		document.getElementById( div_id ).style.display = 'none';
	}, // /hide_div.

	show_hide_div: function( div_id ) {
		'use strict';

		if ( document.getElementById( div_id ).style.display === 'none' ) {
			this.show_div( div_id );
		} else {
			this.hide_div( div_id );
		}
	}, // /show_hide_div.

	show_data_div: function() {
		var data_style = document.getElementById( 'data' ).style;

		data_style.height   = 'auto';
		data_style.overflow = 'auto';
		data_style.opacity  = 1;
	}, // /show_data_div.

	copy_text: function( div_id ) {
		'use strict';

		var self = this;
		var copyText = document.getElementById( div_id );

		copyText.select();

		document.execCommand( 'copy' );

		document.getElementById( 'notice' ).innerHTML = chrome.i18n.getMessage( 'msg_text_copied' );
		this.show_div( 'notice' );

		setTimeout( function() {
			self.hide_div( 'notice' );
		}, 4000 );
	}, // /copy_text.

	extract_hostname: function( url ) {
		'use strict';

		var hostname;
		//find & remove protocol (http, ftp, etc.) and get hostname

		if ( url.indexOf( '://' ) > -1 ) {
			hostname = url.split('/')[2];
		} else {
			hostname = url.split('/')[0];
		}

		// Find & remove port number.
		hostname = hostname.split(':')[0];
		// Find & remove "?".
		hostname = hostname.split('?')[0];

		return hostname;
	}, // /extract_hostname.

};
