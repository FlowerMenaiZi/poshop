$(function () {
  let user = ''
  if ($.cookie('user') === undefined) {
    window.location.href = './login.html'
  } else {
    user = $.cookie('user')
  }
  let allItem = null;
  let item = [];
  let afterItem = []
  allItem = JSON.parse(localStorage.getItem('item'))?JSON.parse(localStorage.getItem('item')):[]
  for (let i = 0; i < allItem.length; i++) {
    if (allItem[i][user] !== undefined) {
      item.push(allItem[i][user])
    } else {
      afterItem.push(allItem[i])
    }
  }
  if (item.length > 0) {
    $('.noItem').css('display', 'none')
    for (let i = 0; i < item.length; i++) {
      $('#itemIn').html(function (v, old) {
        return old + `
          <li>
            <div class="checkbox">
              <input type="checkbox" class="checkboxItem">
            </div>
            <div class="itemImg">
              <img src="${item[i].src}" alt="">
            </div>
            <div class="itemInfo">
              <p class="itemName">${item[i].name}</p>
              <div>
                <select name="color" class="select">
                  <option value="yinse">银色</option>
                  <option value="heise">黑色</option>
                  <option value="baise">白色</option>
                </select>
              </div>
              <span class="reGoods">7天无理由退货</span>
              <p class="guarantee">JSXY担保</p>
              <div  class="priceAll">
                <p class="price">￥<span>${item[i].price}</span></p>
                <div class="num">
                  <span class="reduce">-</span>
                  <p class="itemNum">${item[i].num}</p>
                  <span class="increase">+</span>
                </div>
              </div>
            </div>
          </li>
          `
      })
    }
  } else {
    $('.hasItem').css('display', 'none')
  }
  //单选
  for (let i = 0; i < $('.checkboxItem').length; i++) {
    $('.checkboxItem').eq(i).click(function () {
      if ($('.checkboxItem').eq(i).prop('checked')) {
        let selPrice = parseInt($('.allPrice').text()) + parseInt(item[i].price) * $('.itemNum').eq(i).text()
        $('.allPrice').text(selPrice)
        let isAllSel = 0
        for (let j = 0; j < $('.checkboxItem').length; j++) {
          if ($('.checkboxItem').eq(j).prop('checked')) {
            isAllSel++
          }
          if (isAllSel === $('.checkboxItem').length) {
            $('#allCheck').prop('checked', true)
          }
        }
      } else {
        let selPrice = parseInt($('.allPrice').text()) - parseInt(item[i].price) * $('.itemNum').eq(i).text()
        $('.allPrice').text(selPrice)
        $('#allCheck').prop('checked', false)
      }
    })
  }
  //全选
  $('#allCheck').click(function () {
    if ($('#allCheck').prop('checked')) {
      let allPrice = 0;
      for (let i in item) {
        allPrice = allPrice + parseInt(item[i].price) * $('.itemNum').eq(i).text()
      }
      $('.allPrice').text(allPrice)
      for (let i = 0; i < $('.checkboxItem').length; i++) {
        $('.checkboxItem').eq(i).prop('checked', true)
      }
    } else {
      $('.allPrice').text(0)
      for (let i = 0; i < $('.checkboxItem').length; i++) {
        $('.checkboxItem').eq(i).prop('checked', false)
      }
    }
  })

  //数量加减
  for (let i = 0; i < $('.reduce').length; i++) {
    $('.reduce').eq(i).click(function () {
      if ($('.itemNum').eq(i).text() <= 1) {
        $('.itemNum').eq(i).text(1)
      } else {
        let curNum = parseInt($('.itemNum').eq(i).text())
        curNum--
        item[i].num--
        $('.itemNum').eq(i).text(curNum)
        for (let j = 0;j<item.length;j++){
          let arr = [{
            [user]: item[j]
          }]
          afterItem.push(arr[0])
        }
        localStorage.setItem('item',JSON.stringify(afterItem))

        if ($('.checkboxItem').eq(i).prop('checked')) {
          let newPrice = parseInt($('.allPrice').text()) - parseInt(item[i].price)
          $('.allPrice').text(newPrice)
        }
      }
    })
  }
  for (let i = 0; i < $('.increase').length; i++) {
    $('.increase').eq(i).click(function () {
      if ($('.itemNum').eq(i).text() >= 999) {
        $('.itemNum').eq(i).text(999)
      } else {
        let curNum = parseInt($('.itemNum').eq(i).text())
        curNum++
        item[i].num++
        $('.itemNum').eq(i).text(curNum)
        for (let j = 0;j<item.length;j++){
          let arr = [{
            [user]: item[j]
          }]
          afterItem.push(arr[0])
        }
        localStorage.setItem('item',JSON.stringify(afterItem))
        if ($('.checkboxItem').eq(i).prop('checked')) {
          let newPrice = parseInt($('.allPrice').text()) + parseInt(item[i].price)
          $('.allPrice').text(newPrice)
        }
      }
    })
  }
  $('#settlement').click(function () {
    for (let i = 0; i < item.length; i++) {
      if ($('#allCheck').prop('checked')) {
        item = []
        if (afterItem.length>0){
          localStorage.setItem('item', JSON.stringify(afterItem))
        }else{
          localStorage.removeItem('item')
        }
        window.location.reload()
      } else {
        if ($('.checkboxItem').eq(i).prop('checked')) {
          item.splice(i,1)
          for (let j = 0;j<item.length;j++){
            let arr = [{
              [user]: item[j]
            }]
            afterItem.push(arr[0])
          }
          localStorage.setItem('item',JSON.stringify(afterItem))
          window.location.reload()
        }
      }
    }
  })
})