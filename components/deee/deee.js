(function ($, Drupal) {
  const self = Drupal.behaviors.deeeComponentBehavior = {
    attach: function (context, settings) {
      $('.js-deee', context).once('deeeComponentBehavior').each(function () {

      });
    },
  }
})(jQuery, Drupal);
