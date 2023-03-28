document.addEventListener( 'DOMContentLoaded', function() {

	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	function set_btns_url( tab: any ) {
		let current_url    = tab.url;
		let current_domain = utils.extract_hostname( current_url );

		( <HTMLInputElement>document.getElementById( 'https_nginx' ) ).value = "server {\n \tlisten      80;\n \tserver_name " + current_domain + ";\n \trewrite     ^ https://$server_name$request_uri? permanent;\n}";
	}

	utils.get_current_tab( set_btns_url );

	// Change from Apache to Nginx and viceversa.
	let check_apache_nginx = document.getElementById( 'check_apache_nginx' );

	if ( check_apache_nginx ) {
		check_apache_nginx.addEventListener( 'click', function() {
			let apache_div = document.getElementById( 'apache_div' );
			let nginx_div  = document.getElementById( 'nginx_div' );

			if ( apache_div && nginx_div ) {
				if ( 'none' === nginx_div.style.display ) {
					apache_div.style.display = 'none';
					nginx_div.style.display  = 'block';
				} else {
					nginx_div.style.display  = 'none';
					apache_div.style.display = 'block';
				}
			}
		} );
	}

	// Click on copy icon.
	let copy_btn = document.getElementsByClassName( 'copy_text' );

	for (const element of copy_btn) {
		element.addEventListener( 'click', function( this: HTMLElement ) {
			if ( this.dataset.id2copy ) {
				utils.copy_text( this.dataset.id2copy );
			}
		} );
	}

	utils.show_data_div(); // Show principal content.

} );
