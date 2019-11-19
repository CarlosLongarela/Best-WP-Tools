document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	var items_wpo: any   = document.getElementsByClassName( 'item_wpo' );
	var active_tabs: any = document.getElementsByClassName( 'item_wpo active_tab' );
	var tab_wpo: any     = document.getElementsByClassName( 'wpo_tab' );

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	function show_section_wpo() {
		var active_tab = document.getElementById( this.id );

		while ( active_tabs[0] ) {
			active_tabs[0].classList.remove( 'active_tab' );
		}

		for ( var i = 0; i < tab_wpo.length; i++ ) {
			tab_wpo[i].style.display = 'none';
		}

		active_tab.classList.add( 'active_tab' );

		utils.show_div( 'target_' + this.id );
	}

	function show_tabs_buttons( tab: any ) {
		var current_url: string                  = tab.url;
		var encoded_current_url: string          = encodeURI( current_url );
		var current_domain: string               = utils.extract_hostname( current_url );
		var current_naked_domain: string         = current_domain.replace( 'www.', '' );
		var current_url_without_protocol: string = current_url.replace( 'https://', '' );
		current_url_without_protocol             = current_url_without_protocol.replace( 'http://', '' );

		// WPO.
		document.getElementById( 'pagespeed_insights' ).addEventListener( 'click', function() {
			window.open( 'https://developers.google.com/speed/pagespeed/insights/?url=' + current_url );
		} );

		document.getElementById( 'geek_flare' ).addEventListener( 'click', function() {
			window.open( 'https://tools.geekflare.com/report/speed-test/' + current_url );
		} );

		// Security.
		document.getElementById( 'sucuri_sitecheck' ).addEventListener( 'click', function() {
			window.open( 'https://sitecheck.sucuri.net/results/' + current_url_without_protocol );
		} );

		// TTFB.
		document.getElementById( 'keycdn_url_speed' ).addEventListener( 'click', function() {
			window.open( 'https://tools.keycdn.com/performance?url=' + current_url );
		} );

		document.getElementById( 'sucuri_loadtimetester' ).addEventListener( 'click', function() {
			window.open( 'https://performance.sucuri.net/domain/' + current_domain );
		} );

		document.getElementById( 'byte_check' ).addEventListener( 'click', function() {
			window.open( 'http://www.bytecheck.com/results?resource=' + encoded_current_url );
		} );

		// HTTP/2
		document.getElementById( 'http2_pro' ).addEventListener( 'click', function() {
			window.open( 'https://http2.pro/check?url=' + encoded_current_url );
		} );

		document.getElementById( 'http2_geek_flare' ).addEventListener( 'click', function() {
			window.open( 'https://tools.geekflare.com/report/http2-test/' + current_url );
		} );

		// DNS.
		document.getElementById( 'pingdom_dns_health' ).addEventListener( 'click', function() {
			window.open( 'http://dnscheck.pingdom.com/?domain=' + current_naked_domain );
		} );

		document.getElementById( 'mx_toolbox' ).addEventListener( 'click', function() {
			window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=dns%3a' + current_naked_domain + '&run=toolpage' );
		} );

		document.getElementById( 'dns_checker' ).addEventListener( 'click', function() {
			window.open( 'https://dnschecker.org/#A/' + current_domain );
		} );

		document.getElementById( 'dns_checker_ipv6' ).addEventListener( 'click', function() {
			window.open( 'https://dnschecker.org/#AAAA/' + current_domain );
		} );

		// Gzip.
		document.getElementById( 'check_gzip_compression' ).addEventListener( 'click', function() {
			window.open( 'https://checkgzipcompression.com/?url=' + encoded_current_url );
		} );

		// Mail.
		document.getElementById( 'mx_mx_toolbox' ).addEventListener( 'click', function() {
			window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=mx%3a' + current_naked_domain + '&run=toolpage' );
		} );

		document.getElementById( 'smtp_mx_toolbox' ).addEventListener( 'click', function() {
			window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=smtp%3a' + current_naked_domain + '&run=toolpage' );
		} );

		document.getElementById( 'blacklist_mx_toolbox' ).addEventListener( 'click', function() {
			window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a' + current_naked_domain + '&run=toolpage' );
		} );

		document.getElementById( 'mx_gsuite' ).addEventListener( 'click', function() {
			window.open( 'https://toolbox.googleapps.com/apps/checkmx/check?domain=' + current_naked_domain + '&dkim_selector=' );
		} );
	}

	//utils.set_menu( 'wpo' );

	utils.get_current_tab( show_tabs_buttons );

	for ( var j = 0; j < items_wpo.length; j++ ) {
		items_wpo[j].addEventListener( 'click', show_section_wpo );
	}

	utils.show_data_div(); // Show principal content.

} );
