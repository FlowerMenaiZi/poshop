$(function () {


  let imgArr = ['./assets/pc/1.jpg', './assets/pc/2.jpg', './assets/pc/3.jpg', './assets/pc/4.jpg']
  $('#bannerImg').attr('src', imgArr[0])
  let curIndex = 1
  let timer = null

  function changeBanner() {
    timer = setInterval(() => {
      if (curIndex > imgArr.length - 1) {
        curIndex = 0
      }
      $('#bannerImg').attr('src', imgArr[curIndex])
      $('.navPoint').eq(curIndex-1).removeClass('cur')
      $('.navPoint').eq(curIndex).addClass('cur')
      curIndex++
    }, 3000)
  }
  $('#bannerImg').mouseenter(()=>{
    clearInterval(timer)
  })
  $('#bannerImg').mouseleave(()=>{
    changeBanner()
  })
  changeBanner()
  for (let i = 0;i<$('.navPoint').length;i++){
    $('.navPoint').eq(i).click(()=>{
      curIndex = i
      $('#bannerImg').attr('src', imgArr[curIndex])
      for (let i=0;i<$('.navPoint').length;i++){
        $('.navPoint').eq(i).removeClass('cur')
      }
      $('.navPoint').eq(curIndex).addClass('cur')
    })
  }
})