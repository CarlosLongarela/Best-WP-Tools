
document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	function show_tab_data_home( tab: any ) {
		var html, https_img, https_txt;

		html = '';

		if ( 'https' === tab.url.substring( 0, 5 ) ) { // Url is https
			https_img = '<img src="../img/http-secure-16.png" width="16" height="16" />';
			https_txt = '<strong class="ok">' + chrome.i18n.getMessage( 'msg_https_on' ) + '</strong>';
		} else {
			https_img = '<img src="../img/http-insecure-16.png" width="16" height="16" />';
			https_txt = '<span class="fail">' + chrome.i18n.getMessage( 'msg_https_off' ) + '</span>';
		}

		if ( tab.favIconUrl ) {
			html += '<p><img class="favicon" src="' + tab.favIconUrl + '" /> ' + chrome.i18n.getMessage( 'msg_favicon' ) + ': <em class="url">' + tab.favIconUrl + '</em></p>';
		} else {
			html += '<p class="fail">' + chrome.i18n.getMessage( 'msg_no_favicon' ) + '</p>';
		}

		html += '<p>' + chrome.i18n.getMessage( 'msg_url' ) + ': <em class="url">' + tab.url + '</em></p>';
		html += '<p>' + chrome.i18n.getMessage( 'msg_title' ) + ': <strong>' + tab.title + '</strong></p>';
		html += '<p>' + chrome.i18n.getMessage( 'msg_width_height' ) + ': <strong>' + tab.width + 'px * ' + tab.height + 'px</strong></p>';

		html += '<p>' + https_img + ' ' + https_txt + '</p>';

		if ( tab.incognito === false ) {
			html += '<p>' + chrome.i18n.getMessage( 'msg_incognito_no' ) + '</p>';
		} else {
			html += '<p>' + chrome.i18n.getMessage( 'msg_incognito_yes' ) + '</p>';
		}

		if ( 'loading' === tab.status ) {
			html += '<p>' + chrome.i18n.getMessage( 'msg_status' ) + ': <span class="fail">' + chrome.i18n.getMessage( 'msg_loading' ) + '</span></p>';
		} else if ( 'complete' === tab.status ) {
			html += '<p>' + chrome.i18n.getMessage( 'msg_status' ) + ': <strong class="ok">' + chrome.i18n.getMessage( 'msg_complete' ) + '</strong></p>';
		}

		html += '<p>' + chrome.i18n.getMessage( 'msg_domain' ) + ': <strong>' + utils.extract_hostname( tab.url ) + '</strong></p>';

		document.getElementById( 'url_info' ).innerHTML = html;

		utils.ajax( 'https://tabernawp.com/wp-total-tools/api/?url=' + encodeURI( tab.url ), info_api_url );
	}

	function info_api_url( response: any ) {
		var html;

		html = '';

		if ( response ) {
			if ( true === response.status_ok ) {

				if ( response.http_code ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_http_code' ) + ': <strong>' + response.http_code + '</strong></p>';
				}

				if ( response.primary_ip ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_ip' ) + ': <strong>' + response.primary_ip + '</strong></p>';
				}

				if ( response.namelookup_time  ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_dns_lookup' ) + ': <strong>' + ( response.namelookup_time * 1000 ).toFixed(2) + ' ms</strong></p>';
				}

				if ( response.connect_time ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_connect_time' ) + ': <strong>' + ( response.connect_time * 1000 ).toFixed( 2 ) + ' ms</strong></p>';
				}

				if ( response.pretransfer_time ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_pretransfer_time' ) + ': <strong>' + ( response.pretransfer_time * 1000 ).toFixed( 2 ) + ' ms</strong></p>';
				}

				if ( response.starttransfer_time ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_starttransfer_time' ) + ': <strong>' + ( response.starttransfer_time * 1000 ).toFixed( 2 ) + ' ms</strong></p>';
				}

				if ( response.total_time ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_total_time' ) + ': <strong>' + ( response.total_time * 1000 ).toFixed( 2 ) + ' ms</strong></p>';
				}

				if ( response.compress ) {
					html += '<p>' + chrome.i18n.getMessage( 'msg_compress' ) + ': <strong class="ok">' + response.compress + '</strong></p>';
				} else {
					html += '<p>' + chrome.i18n.getMessage( 'msg_compress' ) + ': <span class="fail">' + chrome.i18n.getMessage( 'msg_no' ) + '</span></p>';
				}

				if ( response.http_headers_html ) {
					html += '<div id="http_headers"><strong>' + chrome.i18n.getMessage( 'msg_headers' ) + ':</strong>' + response.http_headers_html + '</div>';
				}

				//console.log( response );

			}
		}

		document.getElementById( 'api_url_info' ).innerHTML = html;
	}

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	utils.set_menu( 'home' );

	utils.get_current_tab( show_tab_data_home );

	utils.show_data_div(); // Show principal content.

} );
