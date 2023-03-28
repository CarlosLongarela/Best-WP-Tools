document.addEventListener( 'DOMContentLoaded', () => {
	utils.translator( document.body ); // Only if html page has body strings to translate.
	//utils.translator( document.head ); // Only if html page has head strings to translate.

	utils.show_data_div(); // Show principal content.
} );
