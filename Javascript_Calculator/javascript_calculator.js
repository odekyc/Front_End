var id;
var text;
var inner_div_id;
var counter=0;

$(document).ready(function() {
   $( "#AC" ).click(function() {
  $("#input").empty();
});

 $(".keys").click(function() {
     id=$(this).attr('id');

     if(id==="AC"){
        $('#input').empty();
     }

     
     else if((Number(id)>=0)&&(Number(id)<=9)){
        counter+=1;
        if( counter===1){
            document.getElementById('input').innerHTML=id;

        }
        else if(counter>=1){
            text=document.getElementById('input').innerHTML;
            text+=id;
            document.getElementById('input').innerHTML=text;
        }
     }
     else if(id==='+'){
        text=document.getElementById('input').innerHTML;
        text+=id;
        document.getElementById('input').innerHTML=text;
     }
     else if(id==='-'){
        text=document.getElementById('input').innerHTML;
        text+=id;
        document.getElementById('input').innerHTML=text;
     }
     else if(id==='*'){
        text=document.getElementById('input').innerHTML;
        text+=id;
        document.getElementById('input').innerHTML=text;
     }
      else if(id==='/'){
        text=document.getElementById('input').innerHTML;
        text+=id;
        document.getElementById('input').innerHTML=text;
     }
    else if(id==='%'){
        text=document.getElementById('input').innerHTML;
        text+=id;
        document.getElementById('input').innerHTML=text;
     }
});

});