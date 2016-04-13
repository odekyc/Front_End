$(document).ready(function() {
var value;
    $("#lminus").click(function(){
   
       value=Number(document.getElementById("l").innerHTML);
       if(value>0){
        value-=1;
       }
       document.getElementById("l").innerHTML=value;
    });

      $("#lplus").click(function(){
          value=Number(document.getElementById("l").innerHTML);
          value+=1;
          document.getElementById("l").innerHTML=value;
    });

       $("#rminus").click(function(){
   
       value=Number(document.getElementById("r").innerHTML);
       if(value>0){
        value-=1;
       }
       document.getElementById("r").innerHTML=value;
    });

        $("#rplus").click(function(){
          value=Number(document.getElementById("r").innerHTML);
          value+=1;
          document.getElementById("r").innerHTML=value;
    });

    
});