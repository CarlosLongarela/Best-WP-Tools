

/* eslint-disable no-unused-vars */
var utils = {
/* eslint-enable no-unused-vars */
	translator: function( html: any ) {
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

		function replacer( text: string ) {
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

		if ( 3 === html.nodeType ) { //text node
			html.data = replacer( html.data );
		} else {
			for ( i = 0, length = html.childNodes.length; i < length; i++ ) {
				this.translator( html.childNodes[i] );
			}
		}
	}, // /translator.

	ajax: function( url: string, fn: any ) {
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

	create: function( htmlStr: string ) {
		var frag = document.createDocumentFragment(),
			temp = document.createElement( 'div' );

		temp.innerHTML = htmlStr;

		while ( temp.firstChild ) {
			frag.appendChild( temp.firstChild );
		}
		return frag;
	}, // /create.

	get_current_tab: function( fn: any ) {
		'use strict';

		var self = this;
		chrome.tabs.query( { 'active': true, 'currentWindow': true }, function( tabs: any ) {
			if ( tabs.length > 0 ) {
				if ( 'http' !== tabs[0].url.substring( 0, 4 ) ) { // Url don't begin with http or https.
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

		var fragment = this.create( '<p>' + chrome.i18n.getMessage( 'msg_only_http' ) + '</p><p>' + chrome.i18n.getMessage( 'msg_2_only_http' ) + ' <a href="https://tabernawp.com/best-wordpress-tools" target="_blank" rel="noopener">https://tabernawp.com/best-wordpress-tools</a></p>' );

		console.log( fragment );

		document.getElementById( 'notice' ).appendChild( fragment );

		this.hide_div( 'app_info' );
		this.show_div( 'notice' );
	}, // /url_not_valid.

	show_div: function( div_id: string ) {
		'use strict';

		document.getElementById( div_id ).style.display = 'block';
	}, // /show_div.

	hide_div: function( div_id: string ) {
		'use strict';

		document.getElementById( div_id ).style.display = 'none';
	}, // /hide_div.

	show_hide_div: function( div_id: string ) {
		'use strict';

		if ( document.getElementById( div_id ).style.display === 'none' ) {
			this.show_div( div_id );
		} else {
			this.hide_div( div_id );
		}
	}, // /show_hide_div.

	sleep: function( milliseconds: number ) {
		var start = new Date().getTime();
		for ( var i = 0; i < 1e7; i++ ) {
			if ( ( new Date().getTime() - start ) > milliseconds ) {
				break;
			}
		}
	}, // /sleep

	show_data_div: function() {
		var data_style = document.getElementById( 'data' ).style;

		data_style.height   = 'auto';
		data_style.overflow = 'auto';
		data_style.opacity  = '1';
	}, // /show_data_div.

	copy_text: function( div_id: string ) {
		'use strict';

		var self: any     = this;
		var copyText: any = document.getElementById( div_id );

		copyText.select();

		navigator.clipboard.writeText( copyText.value );

		document.getElementById( 'notice' ).textContent = chrome.i18n.getMessage( 'msg_text_copied' );
		this.show_div( 'notice' );

		setTimeout( function() {
			self.hide_div( 'notice' );
		}, 4000 );
	}, // /copy_text.

	extract_hostname: function( url: string ) {
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
