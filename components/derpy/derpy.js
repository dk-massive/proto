(function ($, Drupal) {
  const self = Drupal.behaviors.derpyComponentBehavior = {
    attach: function (context, settings) {
      $('.js-derpy', context).once('derpyComponentBehavior').each(function () {

      });
    }
  };
})(jQuery, Drupal);