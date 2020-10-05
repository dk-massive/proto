(function ($, Drupal) {
  const self = Drupal.behaviors.${machineName}ComponentBehavior = {
    attach: function (context, settings) {
      $('.js-${machineName}', context).once('${machineName}ComponentBehavior').each(function () {

      });
    }
  };
})(jQuery, Drupal);
