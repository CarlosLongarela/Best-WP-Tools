document.addEventListener( 'DOMContentLoaded', () => {
	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	let html;
	let version = chrome.runtime.getManifest().version;
	let app_name = chrome.runtime.getManifest().name;

	html = '';

	html += '<p>' + app_name + ' version: <strong>' + version + '</strong></p>';

	let fragment = utils.create( html );
	let app_info = document.getElementById( 'app_info' );

	if ( app_info ) {
		app_info.appendChild( fragment );
	}

	utils.show_data_div(); // Show principal content.
} );
