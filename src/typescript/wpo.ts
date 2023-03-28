document.addEventListener( 'DOMContentLoaded', function() {
	const items_wpo: NodeListOf<HTMLElement>   = document.querySelectorAll( '.item_wpo' );

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	function show_section_wpo( this: HTMLElement ) {
		const our_id = document.getElementById( this.id );

		if ( our_id ) {
			const active_tab: HTMLElement              = our_id;
			const active_tabs: NodeListOf<HTMLElement> = document.querySelectorAll( '.active_tab' );
			const tab_wpo: NodeListOf<HTMLElement>     = document.querySelectorAll( '.wpo_tab' );

			for ( let item of active_tabs ) {
				item.classList.remove( 'active_tab' );
			}

			for ( let item of tab_wpo ) {
				item.style.display = 'none';
			}

			active_tab.classList.add( 'active_tab' );

			utils.show_div( 'target_' + this.id );
		}
	}

	function show_tabs_buttons( tab: any ) {
		let current_url: string                  = tab.url;
		let encoded_current_url: string          = encodeURI( current_url );
		let current_domain: string               = utils.extract_hostname( current_url );
		let current_naked_domain: string         = current_domain.replace( 'www.', '' );
		let current_url_without_protocol: string = current_url.replace( 'https://', '' );
		current_url_without_protocol             = current_url_without_protocol.replace( 'http://', '' );

		// WPO.
		let pagespeed_insights = document.getElementById( 'pagespeed_insights' );
		if ( pagespeed_insights ) {
			pagespeed_insights.addEventListener( 'click', function() {
				window.open( 'https://developers.google.com/speed/pagespeed/insights/?url=' + current_url );
			} );
		}

		let geek_flare = document.getElementById( 'geek_flare' );
		if ( geek_flare ) {
			geek_flare.addEventListener( 'click', function() {
				window.open( 'https://tools.geekflare.com/report/speed-test/' + current_url );
			} );
		}

		// Security.
		let sucuri_sitecheck = document.getElementById( 'sucuri_sitecheck' );
		if ( sucuri_sitecheck ) {
			sucuri_sitecheck.addEventListener( 'click', function() {
				window.open( 'https://sitecheck.sucuri.net/results/' + current_url_without_protocol );
			} );
		}

		// TTFB.
		let keycdn_url_speed = document.getElementById( 'keycdn_url_speed' );
		if ( keycdn_url_speed ) {
			keycdn_url_speed.addEventListener( 'click', function() {
				window.open( 'https://tools.keycdn.com/performance?url=' + current_url );
			} );
		}

		let sucuri_loadtimetester = document.getElementById( 'sucuri_loadtimetester' );
		if ( sucuri_loadtimetester ) {
			sucuri_loadtimetester.addEventListener( 'click', function() {
				window.open( 'https://performance.sucuri.net/domain/' + current_domain );
			} );
		}

		let byte_check = document.getElementById( 'byte_check' );
		if ( byte_check ) {
			byte_check.addEventListener( 'click', function() {
				window.open( 'http://www.bytecheck.com/results?resource=' + encoded_current_url );
			} );
		}

		// HTTP/2
		let http2_pro = document.getElementById( 'http2_pro' );
		if ( http2_pro ) {
			http2_pro.addEventListener( 'click', function() {
				window.open( 'https://http2.pro/check?url=' + encoded_current_url );
			} );
		}

		let http2_geek_flare = document.getElementById( 'http2_geek_flare' );
		if ( http2_geek_flare ) {
			http2_geek_flare.addEventListener( 'click', function() {
				window.open( 'https://tools.geekflare.com/report/http2-test/' + current_url );
			} );
		}

		// DNS.
		let pingdom_dns_health = document.getElementById( 'pingdom_dns_health' );
		if ( pingdom_dns_health ) {
			pingdom_dns_health.addEventListener( 'click', function() {
				window.open( 'http://dnscheck.pingdom.com/?domain=' + current_naked_domain );
			} );
		}

		let mx_toolbox = document.getElementById( 'mx_toolbox' );
		if ( mx_toolbox ) {
			mx_toolbox.addEventListener( 'click', function() {
				window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=dns%3a' + current_naked_domain + '&run=toolpage' );
			} );
		}

		let dns_checker = document.getElementById( 'dns_checker' );
		if ( dns_checker ) {
			dns_checker.addEventListener( 'click', function() {
				window.open( 'https://dnschecker.org/#A/' + current_domain );
			} );
		}

		let dns_checker_ipv6 = document.getElementById( 'dns_checker_ipv6' );
		if ( dns_checker_ipv6 ) {
			dns_checker_ipv6.addEventListener( 'click', function() {
				window.open( 'https://dnschecker.org/#AAAA/' + current_domain );
			} );
		}

		// Gzip.
		let check_gzip_compression = document.getElementById( 'check_gzip_compression' );
		if ( check_gzip_compression ) {
			check_gzip_compression.addEventListener( 'click', function() {
				window.open( 'https://checkgzipcompression.com/?url=' + encoded_current_url );
			} );
		}

		// Mail.
		let mx_mx_toolbox = document.getElementById( 'mx_mx_toolbox' );
		if ( mx_mx_toolbox ) {
			mx_mx_toolbox.addEventListener( 'click', function() {
				window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=mx%3a' + current_naked_domain + '&run=toolpage' );
			} );
		}

		let smtp_mx_toolbox = document.getElementById( 'smtp_mx_toolbox' );
		if ( smtp_mx_toolbox ) {
			smtp_mx_toolbox.addEventListener( 'click', function() {
				window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=smtp%3a' + current_naked_domain + '&run=toolpage' );
			} );
		}

		let blacklist_mx_toolbox = document.getElementById( 'blacklist_mx_toolbox' );
		if ( blacklist_mx_toolbox ) {
			blacklist_mx_toolbox.addEventListener( 'click', function() {
				window.open( 'https://mxtoolbox.com/SuperTool.aspx?action=blacklist%3a' + current_naked_domain + '&run=toolpage' );
			} );
		}

		let mx_gsuite = document.getElementById( 'mx_gsuite' );
		if ( mx_gsuite ) {
			mx_gsuite.addEventListener( 'click', function() {
				window.open( 'https://toolbox.googleapps.com/apps/checkmx/check?domain=' + current_naked_domain + '&dkim_selector=' );
			} );
		}
	}

	utils.get_current_tab( show_tabs_buttons );

	for ( let item of items_wpo ) {
		item.addEventListener( 'click', show_section_wpo );
	}


	utils.show_data_div(); // Show principal content.

} );
