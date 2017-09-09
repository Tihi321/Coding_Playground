// FOOTER BUTTONS
// click events and implementation

$(infoWindowBtn).on("click", function() {


    // displays about window
    $(floatingWindow).css("display", "flex");
    $(infoWindow).css("display", "block");
    setTimeout(function() {
        $(floatingWindow).addClass("floating-on");
        $(infoWindow).addClass("info-window-on");
    }, 1);

    // add event listener to document, click anywhere on document where id is not
    // id of paren here is titleLogoId, othervise it registers click event from parent
    $(document).on("click", function(event) {
        if (event.target.id === "floatingWindowBase") {
            $(floatingWindow).css("display", "none");
            $(infoWindow).css("display", "none");
            $(floatingWindow).removeClass("floating-on");
            $(infoWindow).removeClass("info-window-on");
            $(this).unbind(event);

        }
    });

});