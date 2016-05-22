$(function(){  
  $(".review-block").hide();


  function fillRatings(i, span, rating) {
    if (i < rating) {
      $(span).addClass('filled');
    } else {
      $(span).addClass('empty');    
    }
  }

  var $ratingDiv = $('.total-rating');

  $ratingDiv.find($('.rate-tree')).each(function(i, span){
    var rating = $ratingDiv.data('rating');
    fillRatings(i, span, rating);
  });

  var $individualRatings = $('.review-block').find($('.review-block-rate'));

  $individualRatings.each(function(i, div){
    var rating = $(this).data('rating');
    $(div).find('.rate-tree').each(function(i, span){
      fillRatings(i, span, rating);
    });
  });

  $(".hide-button").on('click',function(){
    $(".review-block").hide();
    $(".hide-button").hide();
    $(".show-button").show();
  });

  $(".show-button").on('click', function(){
    $(".review-block").show();
    $(".hide-button").show();
    $(".show-button").hide();
  });

  // Initialize bar rating plugin
  $('#review_rating').barrating({
    theme: 'bootstrap-trees'
  });

  // Submitting new review
  $('#new_review').on('submit', function(e){
    e.preventDefault();
    var rating = $('#review_rating').val();
    var comment = $('#review_comment').val();

    $.ajax({
      method: 'POST',
      url: window.location.pathname + '/reviews',
      data: {rating: rating, comment: comment},
      success: function(data){

        var rating = data.review.rating;

        var theData = {
          userID: data.review.user_id,
          username: data.username, 
          rating: rating,
          comment: data.review.comment
        };  

        var theTemplateScript = $("#handlebars-review").html();  

        var theTemplate = Handlebars.compile(theTemplateScript);  

        $('#review-block').prepend(theTemplate(theData)).slideDown();

        $('#new_review').fadeOut();

        $('#current-user-rating').find('.rate-tree').each(function(i, span){
          fillRatings(i, span, rating);
        });

      },
      error: function (jqXHR, textStatus, errorThrown){
        // TODO handle error
      }
    });
    return false;
  });
});
