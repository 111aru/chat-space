$(function(){

  function buildMessage(message){
      var image = message.image ?  `<img class="lower-message__image" src=${message.image}></img>` : "";
      var content = message.content ? message.content : "";

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
                      ${content}
                    </p>
                      ${image}
                    <p></p>
                  </div>`
      return html;
  };

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