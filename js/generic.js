$(document).ready(function() {
  $('.toggle-menu').on('click', function () {
    $('body').toggleClass('open');

    return false;
  });

  $("#major-stories .major-story a, #other-stories .story a").attr('target','_blank');

  $('img[src$=".svg"]').each(function() {
      var $img = jQuery(this);
      var imgURL = $img.attr('src');
      var color = $img.attr('attr');

      var attributes = $img.prop("attributes");

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Remove any invalid XML tags
          $svg = $svg.removeAttr('xmlns:a');

          if (color && color.length) {
            $svg.mouseover(function() {
              $path = $svg.find('path');
              $path.css("fill", color);
            });

            $svg.mouseout(function() {
              $path = $svg.find('path');
              $path.css("fill", "#b2b2b2");
            });
          }

          // Loop through IMG attributes and apply on SVG
          $.each(attributes, function() {
              $svg.attr(this.name, this.value);
          });

          // Replace IMG with SVG
          $img.replaceWith($svg);

      }, 'xml');
  });

  $('#select-lang').change(function() {
    location.href = '?lang=' + $('#select-lang').val();
  });

  $("#newsletter form").on('submit', function() {
    var $form = $("#newsletter form");
    var validation = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    var email = $("#newsletter form input.email").val();

    if (validation.test(email)) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (err) { console.log('Could not connect to the registration server. Please try again later.') },
        success: function (data) {
          if (data.result === 'success') {
            // Yeahhhh Success
            $("#newsletter").removeClass("invalid valid").addClass("valid");
          } else {
            // Something went wrong, do something to notify the user.
            console.log(data.msg)
          }
        }
      });
    } else {
      $("#newsletter").removeClass("invalid valid").addClass("invalid");
    }
    return false;
  });

  $("#partners-newsletter form").on('submit', function() {
    var $form = $("#partners-newsletter form");
    var validation = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    var email = $("#partners-newsletter form input.email").val();

    if (validation.test(email)) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (err) { console.log('Could not connect to the registration server. Please try again later.') },
        success: function (data) {
          if (data.result === 'success') {
            // Yeahhhh Success
            $("#partners-newsletter").removeClass("invalid valid").addClass("valid");
          } else {
            // Something went wrong, do something to notify the user.
            console.log(data.msg)
          }
        }
      });
    } else {
      $("#partners-newsletter").removeClass("invalid valid").addClass("invalid");
    }
    return false;
  });
});
