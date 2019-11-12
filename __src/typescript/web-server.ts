document.addEventListener( 'DOMContentLoaded', function() {
	'use strict';

	utils.set_menu( 'web-server' );

	// Change from Apache to Nginx and viceversa.
	document.getElementById( 'check_apache_nginx' ).addEventListener( 'click', function() {
		var apache_div = document.getElementById( 'apache_div' );
		var nginx_div = document.getElementById( 'nginx_div' );

		//console.log( 'Apache: ' + apache_div.style.display );
		//console.log( 'Nginx: ' + nginx_div.style.display );

		if ( nginx_div.style.display === 'none' ) {
			apache_div.style.display = 'none';
			nginx_div.style.display = 'block';
		} else {
			nginx_div.style.display = 'none';
			apache_div.style.display = 'block';
		}
	} );

	// Click on copy icon.
	document.getElementById( 'copy_apache' ).addEventListener( 'click', function() {
		utils.copy_text( 'basic_apache' );
	} );

	document.getElementById( 'copy_nginx' ).addEventListener( 'click', function() {
		utils.copy_text( 'basic_nginx' );
	} );

	utils.show_data_div(); // Show principal content.

} );