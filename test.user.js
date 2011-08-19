// ==UserScript==
// @id             test
// @name           test
// @version        1.0
// @namespace      
// @author         Maija
// @description    
// @include        *github.com/*
// @include        about:config
// @run-at         document-end
// ==/UserScript==



/* Tested with Firefox 6.0, Scriptish 0.1.4

   Test method
	m=0	manual clicking
	m=1 target="_blank"
	m=3 event listener
*/
var m = 0;

	
var l = document.getElementsByTagName('a');
for (var i=0; l[i]; i++){
	// highlight the links
	// shows the script has run and which links are actively participating in this test
	l[i].style.cssText = 'background-color:#0f0; padding:2px;';

	switch(m) {
	case 0:
		// manual click test
		// obviously this doesn't do anything here, I added it here for reference
		
		// plain clicking on a link
		// script runs in next page, same tab -works
	
		// Ctrl + Click a link
		// script runs in new tab -works
		// about:config > browser.tabs.loadDivertedInBackground (true|false) -ignored, loads in background either way
		// Options > Tabs > When I open a link in a new tab, switch to it immediately (checked|unchecked) -works
		break;
		
	case 1:
		// target="_blank"
		l[i].setAttribute('target', '_blank');
		// script runs in new tab -doesn't work
		// about:config > browser.tabs.loadDivertedInBackground (true|false) -works
		// Options > Tabs > When I open a link in a new tab, switch to it immediately (checked|unchecked) -switches to new tab either way
		break;
		
	case 2:
		// event listener
		// uncomment/comment each of the different opening methods
		l[i].addEventListener('click', function(e){
			e.stopPropagation();
			e.preventDefault();
			
			GM_openInTab(e.currentTarget);
			// script runs in new tab -works
			// about:config > browser.tabs.loadDivertedInBackground (true|false) -ignored
			// Options > Tabs > When I open a link in a new tab, switch to it immediately (checked|unchecked) -switches to new tab either way
			
//			window.open(e.currentTarget);
			// script runs in new tab -doesn't work
			// about:config > browser.tabs.loadDivertedInBackground (true|false) -works
			// Options > Tabs > When I open a link in a new tab, switch to it immediately (checked|unchecked) -switches to new tab either way

//			window.open(e.currentTarget,'_named');
			// opens in a new named tab, subsiquent links are opened in the same tab
			// script runs in new tab -only works when the new tab is already open
			// about:config > browser.tabs.loadDivertedInBackground (true|false) -works
			// Options > Tabs > When I open a link in a new tab, switch to it immediately (checked|unchecked) -switches to new tab either way
		}, true);
		break;
		
	default:
		//
	}
}

