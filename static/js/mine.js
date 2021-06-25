$(function () {
  if ($.cookie('user') === undefined){
    $('#mainContent').addClass('isShow')
  }else{
    $('#mainContent').removeClass('isShow')
    $('#userName').text($.cookie('user'))
    $('#disHref').click(function () {
      return false
    })
  }
})