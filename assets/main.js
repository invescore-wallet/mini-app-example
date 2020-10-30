$.fn.digits = function () {
  return this.each(() => {
    $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'));
  })
};

let totalAmount = 0;
let consumerToken = null;

$(() => {

  window.onload = function () {
    Pocket.getToken({}, (params) => {
      if (params.error) {
        console.log(params.errorMessage);
      } else {
        consumerToken = params.data.accessToken;
        console.log(Pocket.decodeToken(consumerToken));
      }
    });
  }
  $('#back').click((e) => {
    Pocket.goBack({}, (params) => {
      if (params.error) {
        console.log(params.errorMessage);
      } else {
        console.log("success");
      }
    });
  })
  $('#payInvoice').click((e) => {
    $.ajax({
      type: 'POST',
      url: '/total',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        consumerToken,
        amount: totalAmount,
      }),
      success({amount, info, terminalId, id}) {
        e.preventDefault();
        document.getElementById('payInvoice').remove();
        Pocket.payButton({
            amount: amount.toFixed(2), // мөнгөн дүн
            info: info, // гүйлгээний утга
            terminalId: terminalId,
            id: id // invoiceId
          },
          (params) => {
            if (params.error) {
              alertWindow(50, false);
              console.log(params.errorMessage);
            } else {
              alertWindow(50, true);
            }
          })
      },
      error: (jqXHR, textStatus, err) => {
        console.error(textStatus + err);
      },
    })
  });

  $('.add').click((e) => {
    const price = parseInt($(e.target).siblings().data('price'));

    if ($(e.target).text() === 'Нэмэх') {
      totalAmount += price;
      $(e.target).removeClass('add-css').addClass('delete-css');
      $(e.target).text('Устгах');
    } else {
      totalAmount -= price;
      $(e.target).removeClass('delete-css').addClass('add-css');
      $(e.target).text('Нэмэх');
    }
    $('#total-sum').text(`${totalAmount} ₮`).digits();
  });

  function alertWindow(nr, isSuccess) {
    if (!isSuccess) {
      document.getElementById("btnCheck").innerHTML = "&#10005;"
      document.getElementById("msgTitle").innerText = "Амжилтгүй";
      document.getElementById("btnCheck").style.backgroundColor = "#E33054";
      document.getElementById("ok").style.backgroundColor = "#E33054";
      $('#ok').click(function () {
        alertWindow(500, false)
      });
    }else {
      document.getElementById("msgTitle").innerText = "Амжилттай";
      $('#ok').click(function () {
        alertWindow(500, true)
      });
    }
    $('.bb').fadeToggle(200);
    $('.message').toggleClass('comein');
    $('.check').toggleClass('scaledown');
    $('#go').fadeToggle(nr);
  }
});
