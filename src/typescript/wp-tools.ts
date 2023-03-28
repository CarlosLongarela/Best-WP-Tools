document.addEventListener( 'DOMContentLoaded', () => {
	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	function set_btns_url( tab: any ) {
		let current_url    = tab.url;
		let current_domain = utils.extract_hostname( current_url );
		let current_domain_url;

		if ( 'https' === tab.url.substring( 0, 5 ) ) { // Url is https
			current_domain_url = 'https://' + current_domain;
		} else {
			current_domain_url = 'http://' + current_domain;
		}

		( <HTMLInputElement>document.getElementById( 'wp_site_url' ) ).value = "define( 'WP_SITEURL', '" + current_domain_url + "' );";
		( <HTMLInputElement>document.getElementById( 'wp_home' ) ).value = "define( 'WP_HOME', '" + current_domain_url + "' );";
		( <HTMLInputElement>document.getElementById( 'wp_cookie_domain' ) ).value = "define( 'COOKIE_DOMAIN', '" + current_domain + "' );";
	}

	utils.get_current_tab( set_btns_url );

	let post_autosave = document.getElementById( 'post_autosave' );
	if ( post_autosave ) {
		post_autosave.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'post_autosave_text' ) ).value = "define( 'AUTOSAVE_INTERVAL', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let post_revisions = document.getElementById( 'post_revisions' );
	if ( post_revisions ) {
		post_revisions.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'post_revisions_text' ) ).value = "define( 'WP_POST_REVISIONS', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let disable_file_editor = document.getElementById( 'disable_file_editor' );
	if ( disable_file_editor ) {
		disable_file_editor.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_disable_file_editor' ) ).value = "define( 'DISALLOW_FILE_EDIT', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let ssl_login = document.getElementById( 'ssl_login' );
	if ( ssl_login ) {
		ssl_login.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_ssl_login' ) ).value = "define( 'FORCE_SSL_LOGIN', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let ssl_admin = document.getElementById( 'ssl_admin' );
	if ( ssl_admin ) {
		ssl_admin.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_ssl_admin' ) ).value = "define( 'FORCE_SSL_ADMIN', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let php_front_memory = document.getElementById( 'php_front_memory' );
	if ( php_front_memory ) {
		php_front_memory.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'php_front_memory_text' ) ).value = "define( 'WP_MEMORY_LIMIT', '" + ( <HTMLInputElement>this ).value + "' );";
		} );
	}

	let php_back_memory = document.getElementById( 'php_back_memory' );
	if ( php_back_memory ) {
		php_back_memory.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'php_back_memory_text' ) ).value = "define( 'WP_MAX_MEMORY_LIMIT', '" + ( <HTMLInputElement>this ).value + "' );";
		} );
	}

	let auto_updater = document.getElementById( 'auto_updater' );
	if ( auto_updater ) {
		auto_updater.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_auto_updater' ) ).value = "define( 'AUTOMATIC_UPDATER_DISABLED', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let core_updater = document.getElementById( 'core_updater' );
	if ( core_updater ) {
		core_updater.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_core_updater' ) ).value = "define( 'WP_AUTO_UPDATE_CORE', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	let disable_cron = document.getElementById( 'disable_cron' );
	if ( disable_cron ) {
		disable_cron.addEventListener( 'change', function() {
			( <HTMLInputElement>document.getElementById( 'wp_disable_cron' ) ).value = "define( 'DISABLE_WP_CRON', " + ( <HTMLInputElement>this ).value + " );";
		} );
	}

	utils.show_data_div(); // Show principal content.
} );
