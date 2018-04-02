$('.dropdown').dropdown();
var addBooks = document.getElementById('add-books');
addBooks.addEventListener('click',function(){
  $('.ui.modal').modal('show');
});
var cancel = document.getElementsByClassName('cancel')[0];
cancel.addEventListener('click', function(){
  $('.ui.modal').modal('hide');
});
var saveBook = document.getElementById('save-book');

saveBook.addEventListener('click', function(){
  var title = document.getElementById('book-title').value;
  var author_id = document.getElementById('book-author').value;
  var isbn = document.getElementById('book-isbn').value;
  var description = document.getElementById('description').value;
  if(title=='' || author_id=='' || isbn=='' || description==''){
    alert('Fill all the details');
    return;
  }
  saveBook.classList.add("loading");
  var request=new XMLHttpRequest();
  request.onreadystatechange=function(){
  	if(request.readyState === XMLHttpRequest.DONE){
  		if(request.status === 200){
        alert(request.responseText);
        window.location.href='/';
  		}
  		else
  			alert('Something went wrong!');
  		}
  	}
  request.open('POST',"/add-book",true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({
    title:title,
    author_id:author_id,
    isbn:isbn,
    description:description
  }));
});

var selectAuthor = document.getElementById('book-author');
var reqAuthors=new XMLHttpRequest();
reqAuthors.onreadystatechange=function(){
  if(reqAuthors.readyState === XMLHttpRequest.DONE){
    if(reqAuthors.status === 200){
      selectAuthor.innerHTML = reqAuthors.responseText
    }
    else
      alert('Something went wrong!');
    }
  }
reqAuthors.open('GET',"/get-authors",true);
reqAuthors.send(null);
