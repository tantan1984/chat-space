$(function() {
  function buildHTML(message){
    var insertImage = '';
    console.log(message)
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
    }
    var html =
      `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${insertImage}
        </div>`
      return html;
    };

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
  });

  $(function() {
    if($('.chat')[0]) setInterval(reloadMessages, 5000)  
  });   
  var reloadMessages = function(){
    var last_message_id = $('.message').last().data('message-id');
    var urlPathSplit = location.pathname.split('/');
    var reload =('/'+urlPathSplit[1]+'/'+urlPathSplit[2]+'/'+'api/messages');
    $.ajax({
      url: reload,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {  
      var insertHTML = '';
      messages.forEach(function(message){
      insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      });
    })
    .fail(function(){
      alert('error');
    });
  }
});
