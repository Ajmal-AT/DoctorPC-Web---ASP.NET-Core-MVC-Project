(function($) {
    "use strict";

// Password Show or hide
$(".toggle-password").click(function() {
              $(this).toggleClass("mdi-eye-outline mdi-eye-off-outline");
              var input = $($(this).attr("toggle"));
              if (input.attr("type") == "password") {
                input.attr("type", "text");
              } else {
                input.attr("type", "password");
              }
            });
    
    })(jQuery);