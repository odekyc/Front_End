$(document).ready(function() {

  var value=5;
  var audio = $("audio")[0]; 
   var countTime=document.getElementById("r").innerHTML; 
   var breakTime=document.getElementById("l").innerHTML;

   var pause = false;
   var seconds = 0;
   var minutes = 25;
  var innercircle_clicked=false;
  var time_value=25;
  var myVar;
  var break_session;
  var paused_time;

    $("#lminus").click(function(){
    
    if(innercircle_clicked===false){
       time_value=Number(document.getElementById("l").innerHTML);
       if(time_value>1){
        time_value-=1;
       }
       document.getElementById("l").innerHTML=time_value;
        if(break_session=== "Break!"){
       document.getElementById("time").innerHTML=time_value;
     }
     }
    });

      $("#lplus").click(function(){
        if(innercircle_clicked===false){
          time_value=Number(document.getElementById("l").innerHTML);
          time_value+=1;
          document.getElementById("l").innerHTML=time_value;
           if(break_session=== "Break!"){
       document.getElementById("time").innerHTML=time_value;
     }
      }  
    });

       $("#rminus").click(function(){
        break_session=document.getElementById("session").innerHTML;

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
       if(break_session=== "SESSION"){
       document.getElementById("time").innerHTML=time_value;
     }
     }
    });

        $("#rplus").click(function(){
          if(innercircle_clicked===false){
          value=Number(document.getElementById("r").innerHTML);
          value+=1;
          document.getElementById("r").innerHTML=value;
           time_value=Number(document.getElementById("time").innerHTML);
          time_value+=1;
          if(break_session=== "SESSION"){
          document.getElementById("time").innerHTML=time_value;
        }
      }
    });
    


    function countdown(){
        

        countTime=document.getElementById("r").innerHTML; 
        breakTime=document.getElementById("l").innerHTML;
        alert(countTime);

        if( pause===false){
          pause=true;
        }
        else if(pause===true){
          pause=false;
        }
        

        if(innercircle_clicked===false){
          innercircle_clicked=true;
        }
        else if(innercircle_clicked===true){
          innercircle_clicked=false;
        }

        if( pause===false){

          minutes=document.getElementById("time").innerHTML;
          var i=minutes.indexOf(":");

          minutes=Number(minutes.slice(0,i));
          minutes+=1;
          document.getElementById("time").innerHTML=minutes;
          clearInterval(myVar);
        }
        
        else if(pause===true){

        if(break_session==="SESSION"){
           time_value=countTime;
        }
        else if(break_session==="Break!"){
           time_value=breakTime;
        }
 
        

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
           if((minutes === 0) && (seconds === 1)){

            audio.play();
          }

          if((minutes>0)&&(seconds===0)){
            minutes-=1;
            seconds=59;  
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);  
          }
         

          if ((minutes>0)|| (seconds>0)){
              seconds-=1;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }
          
          if((seconds<10)&&(seconds>0)){
          
             document.getElementById("time").innerHTML=String(minutes)+":"+"0"+String(seconds);
          }

          if((minutes > 0 )&& (seconds === 0)){
             minutes-=1;
            seconds=59;
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }

          if((minutes === 0 )&& (seconds === 0)){
            break_session=document.getElementById("session").innerHTML; 
            minutes=0;

            document.getElementById("time").innerHTML=String(minutes)+":00";
            if (break_session === "SESSION"){
              breakTime=document.getElementById("l").innerHTML;
              break_session="Break!"
              minutes=breakTime;
              minutes-=1;
              seconds=59;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
              document.getElementById("session").innerHTML=break_session;
            }
            else if (break_session === "Break!"){
              countTime =document.getElementById("r").innerHTML; 
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
    }

    $("#innercircle").click(countdown);
    
});