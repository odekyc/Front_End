$(document).ready(function() {
var value;
var time_value;
    $("#lminus").click(function(){
   
       value=Number(document.getElementById("l").innerHTML);
       if(value>1){
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
       time_value=Number(document.getElementById("time").innerHTML);
       if(value>1){
        value-=1;
       }
       document.getElementById("r").innerHTML=value;
        if(time_value>1){
        time_value-=1;
       }
       document.getElementById("time").innerHTML=time_value;
    });

        $("#rplus").click(function(){
          value=Number(document.getElementById("r").innerHTML);
          value+=1;
          document.getElementById("r").innerHTML=value;
           time_value=Number(document.getElementById("time").innerHTML);
          time_value+=1;
          document.getElementById("time").innerHTML=value;
    });

    
});