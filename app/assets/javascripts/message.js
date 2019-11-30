$(function(){

  function buildMessage(message){
    if (message.image) {
      var html = `<div class="message">
                    <div class="message__upper-message">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                    </div>
                    <p class="message__text">
                    </p>
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    <img class="lower-message__image" src="${message.image}">
                    <p></p>
                  </div>`
      return  html;
    } else {
      var html = `<div class="message">
                    <div class="message__upper-message">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                    </div>
                    <p class="message__text">
                    </p><p class="message__text__content">
                      ${message.content}
                    </p>
                    
                    <p></p>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#message_content').val('');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    
    });
    return false;
  });
});