(function() {
// document.addEventListener("DOMContentLoaded", function(event) {

var internetExplorer;

if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1))
{
  internetExplorer = true;
}


//locks screen to portrait on mobile
if(!isBrowserEdge() && !internetExplorer){

	screen.orientation.lock('portrait').catch(function() {
	});

}

function isBrowserEdge() {
    return typeof CSS !== 'undefined' && CSS.supports("(-ms-ime-align:auto)");
}