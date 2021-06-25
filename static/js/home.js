$(() => {
  for (let i = 0; i < $('.couponGet').length; i++) {
    $('.couponGet').eq(i).click(() => {
      $('.get').eq(i).css('background-image', 'url(./assets/home/yiling.png)');
      $('.get').eq(i).css('background-repeat', 'no-repeat');
      $('.couponGet').eq(i).text('继续领取')

    })
  }
  for (let i = 0; i < $('.addToCart').length; i++) {
    $('.addToCart').eq(i).click(() => {
      let user = ''
      if ($.cookie('user') === undefined) {
        window.location.href = './login.html'
      } else {
        user = $.cookie('user')
        let text = $('#commodity ul li').eq(i).children('a').children('div.com-con').children('p.com-title').text()
        let price = $('#commodity ul li').eq(i).children('a').children('div.com-con').children('div.com-price-add').children('p').children('span').text()
        let imgSrc = $('#commodity ul li').eq(i).children('a').children('div.com-con').children('p.com-title').attr('title')
        let arr = [{
          [user]: {
            'name': text,
            'price': price,
            'src': imgSrc,
            'num': 1
          }
        }]
        let allGet = JSON.parse(localStorage.getItem('item'))?JSON.parse(localStorage.getItem('item')):[]
        let userIs = false
        for (let i=0;i<allGet.length;i++){
          if (allGet[i][user] !== undefined){
            userIs = true
          }
        }
        if (localStorage.getItem('item')) {
          let get = JSON.parse(localStorage.getItem('item'))
          let isNew = true
          if (userIs){
            for (let i = 0; i < get.length; i++) {
              if (get[i][user] !== undefined){
                if (get[i][user].name == arr[0][user].name) {
                  isNew = false
                  get[i][user].num++
                  console.log(get[i][user].num);
                  localStorage.setItem('item', JSON.stringify(get))
                }
              }
            }
            if (isNew) {
              get.push(arr[0])
              localStorage.setItem('item', JSON.stringify(get))
            }
          } else{
            get.push(arr[0])
            localStorage.setItem('item', JSON.stringify(get))
          }

        } else {
          localStorage.setItem('item', JSON.stringify(arr))
        }
      }
    })
  }
})