var nextIcon = document.getElementById('next-icon');
var prevIcon = document.getElementById('prev-icon');
var curId = window.location.pathname.slice(9);
var prev=new XMLHttpRequest();
prev.onreadystatechange=function(){
  if(prev.readyState === XMLHttpRequest.DONE){
    if(prev.status === 200){
      if (prev.responseText == '#')
        prevIcon.style.display='none';
      else
        prevIcon.setAttribute('href','/authors/'+prev.responseText);
    }
    else
      alert('Something went wrong!');
    }
}
prev.open('GET',"/prev/author/"+curId,true);
prev.send(null);
var next=new XMLHttpRequest();
next.onreadystatechange=function(){
  if(next.readyState === XMLHttpRequest.DONE){
    if(next.status === 200){
      if (next.responseText == '#')
        nextIcon.style.display='none';
      else
        nextIcon.setAttribute('href','/authors/'+next.responseText);
    }
    else
      alert('Something went wrong!');
    }
  }
next.open('GET',"/next/author/"+curId,true);
next.send(null);
