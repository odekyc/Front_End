  $(document).ready(function() {
     
    var value=5;
  var audio = $("audio")[0]; 
  var audio1 = $("audio")[1]; 
  var audio2 = $("audio")[2];
  var audio3 = $("audio")[3];
  var audio4 = $("audio")[4];
    
  var firstrun=true;

   var countTime=document.getElementById("r").innerHTML; 
   var breakTime=document.getElementById("l").innerHTML;

   var pause = false;
   var seconds=0;
   var minutes=25;
  var innercircle_clicked=false;
  var time_value =25;
  var myVar;
  var break_session;
  var paused_time;
var backgrd_fill_intv;
var time_intv;
    
    
   

 document.getElementById("time").innerHTML=25;

    $("#lminus").click(function(){
      
    if(innercircle_clicked===false){
      
         break_session=document.getElementById("session").innerHTML;
      audio1.play(); 
       time_value=Number(document.getElementById("l").innerHTML);
       if(time_value>1){
        time_value-=1;
       }

      
       document.getElementById("l").innerHTML=time_value;
        if(break_session=== "Break!"){
       document.getElementById("time").innerHTML=time_value;
       }
      seconds=59;
     }
    });

      $("#lplus").click(function(){
        
        if(innercircle_clicked===false){
          break_session=document.getElementById("session").innerHTML;
           audio1.play();
          time_value=Number(document.getElementById("l").innerHTML);
          time_value+=1;
          document.getElementById("l").innerHTML=time_value;
           if(break_session=== "Break!"){
             document.getElementById("time").innerHTML=time_value;
           }
          seconds=59;
      }  
    });

       $("#rminus").click(function(){

        if(innercircle_clicked===false){
          break_session=document.getElementById("session").innerHTML;
          audio1.play(); 
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
          seconds=59;
     }
    });

    $("#rplus").click(function(){
         

        if(innercircle_clicked===false){
          audio1.play(); 
         break_session=document.getElementById("session").innerHTML;
       value=Number(document.getElementById("r").innerHTML);
       time_value=Number(document.getElementById("time").innerHTML);
       if(value>=1){
        value+=1;
       }
       document.getElementById("r").innerHTML=value;
      if(time_value>=1){
        time_value+=1;
       }
       if(break_session=== "SESSION"){
       document.getElementById("time").innerHTML=time_value;
        }
          seconds=59;
      }
    });
    


    function countdown(){
        
        
       audio3.play();
        countTime=document.getElementById("r").innerHTML; 
        breakTime=document.getElementById("l").innerHTML;
       


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
 
        backgrd_fill_intv=time_value/70;
        time_intv=backgrd_fill_intv*60000;
       
          time_value=Number(time_value);
          minutes=time_value-1;
          
          if(firstrun){
            seconds=59;
          }
          
          document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
        
     
        if( innercircle_clicked===false){
          time_value=Number(document.getElementById("r").innerHTML);
          document.getElementById("time").innerHTML=time_value;
        }
          

       myVar=setInterval(function(){ 
           audio4.play();
         
         if((minutes>0)&&(seconds===0)){
            minutes-=1;
            seconds=59;  
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);  
          }
         
          else if ((minutes>=0)&& (seconds>0)&&(seconds>10)){
              seconds-=1;
              document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
          }  
          else if((seconds<=10)&&(seconds>0)&&(minutes>=0)){
             seconds-=1;
             document.getElementById("time").innerHTML=String(minutes)+":"+"0"+String(seconds);
          }

          else if((minutes > 0 )&& (seconds === 0)){
            break_session=document.getElementById("session").innerHTML; 
             minutes-=1;
            seconds=59;
            document.getElementById("time").innerHTML=String(minutes)+":"+String(seconds);
            if (break_session === "SESSION"){
            document.getElementById("r").innerHTML=String(minutes+1);
            }
            else if (break_session === "Break!"){
              document.getElementById("l").innerHTML=String(minutes+1);
            }
          }

          else if((minutes === 0 )&& (seconds === 0)){
            audio.play();
            
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
      
      firstrun=false;
      
    }

    $("#innercircle").click(countdown);
    
});