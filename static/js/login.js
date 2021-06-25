$(function () {
  // /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  function checkPhone(){
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    return reg.test($('#phoneNumber').val());
  }
  $('#getCode').click(function () {
    if (!checkPhone()){
      $('#tip').text('请输入正确的手机号')
      return false
    }
    $('#getCode').text('获取成功')
    $('#tip').text('')
    $('#codeNumber').val(getRndInteger(100000,1000000))
  })
  $('#loginBtn').click(function () {
    if (!checkPhone()){
      $('#tip').text('请输入正确的手机号')
      return false
    }else if ($('#codeNumber').val()==""){
      $('#tip').text('请获取验证码')
      return false
    }
    $.cookie('user',$('#phoneNumber').val())
    window.location.href='./mine.html'
  })
})