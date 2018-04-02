$('.dropdown').dropdown();
var addBooks = document.getElementById('add-authors');
addBooks.addEventListener('click',function(){
  $('.ui.modal').modal('show');
});
var cancel = document.getElementsByClassName('cancel')[0];
cancel.addEventListener('click', function(){
  $('.ui.modal').modal('hide');
});

var saveAuthor = document.getElementById('save-author');

saveAuthor.addEventListener('click', function(){
  var name = document.getElementById('author-name').value;
  var age = document.getElementById('author-age').value;
  var gender = document.getElementById('author-gender').value;
  var birthPlace = document.getElementById('author-birth-place').value;
  var about = document.getElementById('about-author').value;
  if(name=='' || age=='' || gender=='' || birthPlace=='' || about==''){
    alert('Fill all the details');
    return;
  }
  saveAuthor.classList.add("loading");
  var request=new XMLHttpRequest();
  request.onreadystatechange=function(){
  	if(request.readyState === XMLHttpRequest.DONE){
  		if(request.status === 200){
        alert(request.responseText);
        window.location.href='/authors';
  		}
  		else
  			alert('Something went wrong!');
  		}
  	}
  request.open('POST',"/add-author",true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({
    name:name,
    age:age,
    gender:gender,
    birthPlace:birthPlace,
    about:about
  }));
});
