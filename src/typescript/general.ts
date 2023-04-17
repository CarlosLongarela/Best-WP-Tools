

/* eslint-disable no-unused-vars */
const utils = {
/* eslint-enable no-unused-vars */
	translator: function( html: any ) {
		/**
		 * This is a part of Chrome Extensions Box
		 * Read more on GitHub - https://github.com/onikienko/chrome-extensions-box
		 *
		 * Parse html and replace all {{property name from message.json}} from text nodes, title, alt, value and placeholder attrs
		 * with chrome.i18n.getMessage http://developer.chrome.com/extensions/i18n.html
		 */
		let i,
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
		let request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if ( 4 === request.readyState ) {
				fn( request.response );
			}
		};

		request.open( 'GET', url, true );
		request.responseType = 'json';
		request.send();
	}, // /ajax.

	create: function( htmlStr: string ) {
		let frag = document.createDocumentFragment(),
			temp = document.createElement( 'div' );

		const parser = new DOMParser();
		const parsed = parser.parseFromString( htmlStr, 'text/html' );
		const tags   = parsed.getElementsByTagName( 'body' );

		temp.innerHTML = '';
		for (const tag of tags) {
			temp.appendChild( tag );
		}

		while ( temp.firstChild ) {
			frag.appendChild( temp.firstChild );
		}
		return frag;
	}, // /create.

	get_current_tab: function( fn: any ) {
		let self = this;
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
		let fragment = this.create( '<p>' + chrome.i18n.getMessage( 'msg_only_http' ) + '</p><p>' + chrome.i18n.getMessage( 'msg_2_only_http' ) + ' <a href="https://tabernawp.com/best-wordpress-tools" target="_blank" rel="noopener">https://tabernawp.com/best-wordpress-tools</a></p>' );

		let notice = document.getElementById( 'notice' );
		if ( notice ) {
			notice.appendChild( fragment );
		}

		this.hide_div( 'app_info' );
		this.hide_div( 'no_cache_page' );
		this.show_div( 'notice' );
	}, // /url_not_valid.

	show_div: function( div_id: string ) {
		let our_div: any = document.getElementById( div_id );

		if ( our_div ) {
			our_div.style.display = 'block';
		}
	}, // /show_div.

	hide_div: function( div_id: string ) {
		let our_div: any = document.getElementById( div_id );

		if ( our_div ) {
			our_div.style.display = 'none';
		}
	}, // /hide_div.

	show_hide_div: function( div_id: string ) {
		let our_div: any = document.getElementById( div_id );

		if ( our_div ) {
			if ( 'none' === our_div.style.display ) {
				this.show_div( div_id );
			} else {
				this.hide_div( div_id );
			}
		}
	}, // /show_hide_div.

	sleep: function( milliseconds: number ) {
		let start: number = new Date().getTime();
		for ( let i = 0; i < 1e7; i++ ) {
			if ( ( new Date().getTime() - start ) > milliseconds ) {
				break;
			}
		}
	}, // /sleep

	show_data_div: function() {
		let our_data = document.getElementById( 'data' );

		if ( our_data ) {
			let data_style: CSSStyleDeclaration = our_data.style;

			data_style.height   = 'auto';
			data_style.overflow = 'auto';
			data_style.opacity  = '1';
		}
	}, // /show_data_div.

	copy_text: function( div_id: string ) {
		let self: any     = this;
		let copyText: any = document.getElementById( div_id );
		let our_notice    = document.getElementById( 'notice' );

		copyText.select();

		navigator.clipboard.writeText( copyText.value );

		if ( our_notice ) {
			our_notice.textContent = chrome.i18n.getMessage( 'msg_text_copied' );;
		}

		this.show_div( 'notice' );

		setTimeout( function() {
			self.hide_div( 'notice' );
		}, 4000 );
	}, // /copy_text.

	extract_hostname: function( url: string ) {
		let hostname: string;
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
