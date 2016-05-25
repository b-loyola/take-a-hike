$(function(){
  var totalTimes=$(".times-completed").text();
  totalTimes = totalTimes.replace('You have completed this hike ','');
  totalTimes = totalTimes.replace(/times?/,'');

  $('.hike-complete').on("ajax:success", function(e, data, status, xhr) {
    totalTimes++;
    var plural;
    totalTimes == 1 ? plural = ' time' : plural = ' times';
    var newCount = $('<h5>').text("You have completed this hike " + totalTimes + plural);
    newCount.addClass("times-completed");
    $('#times-completed-container').empty().append(newCount);
      $('.flash').show();
      setTimeout(function(){
        $('.flash').fadeOut();
      }, 2000);
    $(this).blur();
  });

  $('.hike-faved').on("ajax:success", function(e, data, status, xhr) {
    $(this).addClass('favourite');
    $(this).blur();
  });

});
