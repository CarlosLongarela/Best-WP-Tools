document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	function set_btns_url( tab: any ) {
		var current_url    = tab.url;
		var current_domain = utils.extract_hostname( current_url );

		( <HTMLInputElement>document.getElementById( 'https_nginx' ) ).value = "server {\n \tlisten      80;\n \tserver_name " + current_domain + ";\n \trewrite     ^ https://$server_name$request_uri? permanent;\n}";
	}

	utils.get_current_tab( set_btns_url );

	// Change from Apache to Nginx and viceversa.
	document.getElementById( 'check_apache_nginx' ).addEventListener( 'click', function() {
		var apache_div = document.getElementById( 'apache_div' );
		var nginx_div = document.getElementById( 'nginx_div' );

		//console.log( 'Apache: ' + apache_div.style.display );
		//console.log( 'Nginx: ' + nginx_div.style.display );

		if ( 'none' === nginx_div.style.display ) {
			apache_div.style.display = 'none';
			nginx_div.style.display = 'block';
		} else {
			nginx_div.style.display = 'none';
			apache_div.style.display = 'block';
		}
	} );

	// Click on copy icon.
	var copy_btn = document.getElementsByClassName( 'copy_text' );

	for ( var i = 0; i < copy_btn.length; i++ ) {
		copy_btn[i].addEventListener( 'click', function() {
			utils.copy_text( this.dataset.id2copy );
		} );
	}

	utils.show_data_div(); // Show principal content.

} );
