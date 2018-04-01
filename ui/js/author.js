$('.dropdown').dropdown();
var addBooks = document.getElementById('add-authors');
addBooks.addEventListener('click',function(){
  $('.ui.modal').modal('show');
});
var cancel = document.getElementsByClassName('cancel')[0];
cancel.addEventListener('click', function(){
  $('.ui.modal').modal('hide');
});
