(function () {
    // document.addEventListener("DOMContentLoaded", function(event) {

    var internetExplorer;

    var ua = navigator.userAgent.toLowerCase();
    var safari = false;
    try {
      safari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(!window['safari'] || safari.pushNotification);
    } catch (err) {}

    safari = (safari || ((ua.indexOf('safari') != -1) && (!(ua.indexOf('chrome') != -1) && (ua.indexOf('version/') != -1))));

    if (navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1)) {
      internetExplorer = true;
    }


    //locks screen to portrait on mobile
    if (!isBrowserEdge() && !internetExplorer && !safari) {

      screen.orientation.lock('portrait').catch(function () {});

    }

    if (safari) {
      console.log("Safari");
      safariOverlay();
      return;
    }

    function isBrowserEdge() {
      return typeof CSS !== 'undefined' && CSS.supports("(-ms-ime-align:auto)");
    }

    function safariOverlay() {
      $("body").prepend("<div class=\"overlay\"></div>");
      $(".overlay").css({
        "position": "absolute",
        "width": "100vw",
        "height": "100vh",
        "z-index": 99999,
        "background-color": "#000",
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center",
        "align-items": "center"

      }).prepend("<div class=\"safari-msg\"><div>Please use different browser, Safari is not supported, Thanks</div><div>Molim koristite drugi pretraživač, Safari nije podržan, Hvala</div></div>");
      $(".safari-msg").css({
        "background-color": "#ddd",
        "background-image": "linear-gradient(top, #bbb, #eee)",
        "padding":"0 4em", 
        "border":"5px solid #f47321"
      }).children().css({
        "color": "#111", 
        "font-size": "1.5em",
        "margin":"1em 0"
      });
    }