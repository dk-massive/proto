(function ($, Drupal) {
  const self = Drupal.behaviors.derpComponentBehavior = {
    attach: function (context, settings) {
      $('.js-derp', context).once('derpComponentBehavior').each(function () {

      });
    }
  };
})(jQuery, Drupal);