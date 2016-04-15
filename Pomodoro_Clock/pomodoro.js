$(document).ready(function() {
var value;
var audio = $("audio")[0]; 
 var countTime = 25;
 var breakTime = 5;
 var pause = false;
 var seconds = 0;
 var minutes = 25;
var innercircle_clicked=false;
var time_value;
var myVar;
var break_session;

    $("#lminus").click(function(){
    if(innercircle_clicked===false){
       value=Number(document.getElementById("l").innerHTML);
       if(value>1){
        value-=1;
       }
       document.getElementById("l").innerHTML=value;
     }
    });

      $("#lplus").click(function(){
        if(innercircle_clicked===false){
          value=Number(document.getElementById("l").innerHTML);
          value+=1;
          document.getElementById("l").innerHTML=value;
      }  
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
 
        time_value=countTime;

        if(time_value.length<=2){
          time_value=Number(time_value)-1;
          document.getElementById("time").innerHTML=String(time_value)+":59";
          minutes=time_value;
          seconds=59;
        }
     
        if( innercircle_clicked===false){
          time_value=Number(document.getElementById("r").innerHTML);
          document.getElementById("time").innerHTML=time_value;
        }

       myVar=setInterval(function(){ 
          if((minutes>0)&&(seconds===0)){
            minutes-=1;
            seconds=59;  
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);  
          }
          if(minutes === 0 && seconds === 1){
        //play the sound on both
        //
           
            audio.play();
          }

          if ((minutes>0)|| (seconds>0)){
              seconds-=1;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }
          
          if((seconds<10)&&(seconds>0)){
             seconds=String(seconds);
             seconds="0"+seconds;
             document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }

          if((minutes > 0 )&& (seconds === 0)){
             minutes-=1;
            seconds=59;
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }

          if((minutes === 0 )&& (seconds === 0)){
            break_session=document.getElementById("session").innerHTML; 
            minutes=0;
            seconds="00";
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
            if (break_session === "SESSION"){

              break_session="Break!"
              minutes=breakTime;
              minutes-=1;
              seconds=59;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
              document.getElementById("session").innerHTML=break_session;
            }
            else if (break_session === "Break!"){
              break_session="SESSION"
              minutes=countTime;
              minutes-=1;
              seconds=59;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
              document.getElementById("session").innerHTML=break_session;
            }              
         }
        }, 1000);
    
    }

    $("#innercircle").click(countdown);
    
});