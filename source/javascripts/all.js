// Function to provide high-resolution images.
function fetchHighResolutionImages() {

  /**
   * After page is loaded, check the viewport size and display density.
   * If the window size is bigger than 750px, load the medium size assets.
   * If window size is bigger than 750px and retina, or bigger than 1500px,
   * load the higher resolution images.
   */

  var viewpirtWidth = $(window).width();
  var mediumImageSourceAttribute = 'data-image-medium-src';
  var largeImageSourceAttribue = 'data-image-large-src';
  var isHighDensity = (window.devicePixelRatio >= 2) ? true : false;

  if (viewpirtWidth > 750) {
    if (isHighDensity || viewpirtWidth > 1500) {

      // If it's the retina iPad, you can't load large image assets.
      if (navigator.userAgent.match(/iPad/i) != null) {

        $('img').each(function() {
          var img = $(this);
          img.attr('src', img.attr(mediumImageSourceAttribute));
        });

      } else {

        $('img').each(function() {
          var img = $(this);
          img.attr('src', img.attr(largeImageSourceAttribue));
        });
      }

    } else {

      $('img').each(function() {
        var img = $(this);
        img.attr('src', img.attr(mediumImageSourceAttribute));
      });

    }
  };

};

// Function to resize the Featured Project image and video.
function resizeCover() {

  // Constant variables.
  var element = $('#article-cover img'); // Image.
  var container = element.parent(); // Cover container.
  var elementRatio = element.height() / element.width(); // Calculate image ration dynamically.

  // Resize the right element.
  function resizeElement() {

    // Declare variables.
    var windowHeight = $(window).height(); // Window height.
    var windowWidth = $(window).width(); // Window width.

    // Resize Container.
    container.height(windowHeight); // Resize the cover to be the size of the window.

    if ((windowHeight / windowWidth) < elementRatio){
      element.height(windowWidth * elementRatio + 1)
        .width(windowWidth + 1);
    } else {
      element.height(windowHeight + 1)
        .width(windowHeight / elementRatio + 1);
    };

    element.css('left', (windowWidth - element.width()) / 2)
        .css('top', (windowHeight - element.height()) / 2);
  };

  resizeElement();
  element.css('opacity', '1');

  $(window).bind("resize", function(){
    resizeElement();
  });

};

$(document).ready(function() {



  // Apply local scroll to the title.
  $('#article-cover h1, #article-cover h3').click(function() {
    var windowHeight = $(window).height() + 'px';
    $('.article').scrollTo(windowHeight, 600);
  });

  $('.trigger').click(function() {;
    $($(this).attr('data-target')).toggleClass('active');
  });

  $('.close-nav').click(function() {
    $('.nav-toggle').trigger('click');
  });

  $(window).load(function() {
    // Initialize functions.
    resizeCover();
    fetchHighResolutionImages();
  });

});
