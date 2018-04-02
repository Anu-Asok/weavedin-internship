var nextIcon = document.getElementById('next-icon');
var prevIcon = document.getElementById('prev-icon');
var curId = window.location.pathname.slice(7);
var prev=new XMLHttpRequest();
prev.onreadystatechange=function(){
  if(prev.readyState === XMLHttpRequest.DONE){
    if(prev.status === 200){
      if (prev.responseText == '#')
        prevIcon.style.display='none';
      else
        prevIcon.setAttribute('href',prev.responseText);
    }
    else
      alert('Something went wrong!');
    }
}
prev.open('GET',"/prev/book/"+curId,true);
prev.send(null);
var next=new XMLHttpRequest();
next.onreadystatechange=function(){
  if(next.readyState === XMLHttpRequest.DONE){
    if(next.status === 200){
      if (next.responseText == '#')
        nextIcon.style.display='none';
      else
        nextIcon.setAttribute('href',next.responseText);
    }
    else
      alert('Something went wrong!');
    }
  }
next.open('GET',"/next/book/"+curId,true);
next.send(null);
