$(document).ready(function() {
var value;
var step=0.02;
var audio = $("audio")[0]; 
 var countTime = 25;
 var breakTime = 5;
 var pause = false;
 var seconds = 0;
 var minutes = 25;
var innercircle_clicked=false;
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
        
        if(innercircle_clicked===false){
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
     }
    });

        $("#rplus").click(function(){
          if(innercircle_clicked===false){
          value=Number(document.getElementById("r").innerHTML);
          value+=1;
          document.getElementById("r").innerHTML=value;
           time_value=Number(document.getElementById("time").innerHTML);
          time_value+=1;
          document.getElementById("time").innerHTML=time_value;
      }
    });
    


    function countdown(){

        countTime =document.getElementById("r").innerHTML; 
        breakTime=document.getElementById("l").innerHTML;
     

        if(innercircle_clicked===false){
          innercircle_clicked=true;
        }
        else if(innercircle_clicked===true){
          innercircle_clicked=false;
        }
 
        time_value=document.getElementById("time").innerHTML;
        if(time_value.length<=2){
          time_value=Number(time_value)-1;
          document.getElementById("time").innerHTML=String(time_value)+":59";
          minutes=time_value;
          seconds=59;
          alert(minutes+":"+ seconds);
        }
     
        if( innercircle_clicked===false){
          time_value=Number(document.getElementById("r").innerHTML);
          document.getElementById("time").innerHTML=time_value;
        }

        

        if(minutes === 0 && seconds === 1){
        //play the sound on both
            audio.play();
        }
        if(minutes === 0 && seconds === 0){
            
        }
       
    
    }


    $("#innercircle").click(countdown);
});