document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	function set_btns_url( tab: any ) {
		var current_url    = tab.url;
		var current_domain = utils.extract_hostname( current_url );
		var current_domain_url;

		if ( 'https' === tab.url.substring( 0, 5 ) ) { // Url is https
			current_domain_url = 'https://' + current_domain;
		} else {
			current_domain_url = 'http://' + current_domain;
		}

		( <HTMLInputElement>document.getElementById( 'wp_site_url' ) ).value = "define( 'WP_SITEURL', '" + current_domain_url + "' );";
		( <HTMLInputElement>document.getElementById( 'wp_home' ) ).value = "define( 'WP_HOME', '" + current_domain_url + "' );";
		( <HTMLInputElement>document.getElementById( 'wp_cookie_domain' ) ).value = "define( 'COOKIE_DOMAIN', '" + current_domain + "' );";
	}

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	utils.set_menu( 'wp-tools' );

	utils.get_current_tab( set_btns_url );

	document.getElementById( 'post_autosave' ).addEventListener( 'change', function() {
		( <HTMLInputElement>document.getElementById( 'post_autosave_text' ) ).value = "define( 'AUTOSAVE_INTERVAL', " + ( <HTMLInputElement>this ).value + " );";
	} );

	document.getElementById( 'post_revisions' ).addEventListener( 'change', function() {
		( <HTMLInputElement>document.getElementById( 'post_revisions_text' ) ).value = "define( 'WP_POST_REVISIONS', " + ( <HTMLInputElement>this ).value + " );";
	} );

	utils.show_data_div(); // Show principal content.
} );
