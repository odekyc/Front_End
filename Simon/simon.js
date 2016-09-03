$(document).ready(function() {
var color_id=["blue","green","red","yellow"];
var genMoves=[];
var stricton=false;
var running=false;
var random_num=null;
var poweron=false;
var clicked_num=null;
var arrsMatch=true;
var blinkFirstRound;
var showCPUMovesInt;
var movesIntSec=500;
var getPlayerMovesInt;

function win(){

}


    $('#inner_strict').on('click',function(){
          

          if(stricton){
            stricton=false;
          
            $('#strict_alert').css('background-color', 'grey');
            
          }
          else if(!stricton){
            stricton=true;
            
            $('#strict_alert').css('background-color', 'red');
          }
          
           
        });

     $('#inner_start').on('click', function(){
      $('#inner_start').css("pointer-events", "none");
          genMoves.push(genRandNum());
          running=true;
         blinkFirstRound=setInterval(function(){
          $('#display').text('');
          setTimeout(function(){
            $('#display').text('--');
            }, 700);
          }, 1400);

         setTimeout(function(){clearInterval(blinkFirstRound);
            $('#display').text('1');
            CPUTurn();
         }, 5000);



      });





    $('#switchoff').click(function(){

      poweron=true;
       $('#switchoff').css('visibility', 'hidden');
       $('#switchon').css('visibility', 'visible');
       stricton=false;    
       $('#inner_start').css("pointer-events", "auto");
       $('#inner_strict').css("pointer-events", "auto");
      $('#display').css('color', 'red');
      // $(".blue").attr("id", "highlight-blue");

    });

  $('#switchon').click(function(){
      $('#display').text('--');
      $('#display').css('color', '#330000');
       $('#strict_alert').css('background-color', 'grey');
      $('.fourcolors').css("pointer-events", "none");  
      genMoves=[];
      running=false;
      stricton=false;      
      poweron=false;
       $('#switchoff').css('visibility', 'visible');
       $('#switchon').css('visibility', 'hidden');
       $('#inner_start').css("pointer-events", "none");
       $('#inner_strict').css("pointer-events", "none");
       $('.fourcolors').css("pointer-events", "none");
       $('#inner_start').css("background-color", "red");
      $(".blue").removeAttr("id");
      $(".green").removeAttr("id");
      $(".red").removeAttr("id");
      $(".yellow").removeAttr("id");
      clearInterval(blinkFirstRound);
      arrsMatch=true;

       
    });


function genRandNum(){
  return Math.floor((Math.random() * 4));
}

function showMove(curMoveID){
  $('.'+color_id[curMoveID]).attr("id", "highlight-"+color_id[curMoveID]);
   $("#audio"+curMoveID).get(0).cloneNode().play();
  setTimeout(function(){
      $('.'+color_id[curMoveID]).removeAttr("id");               
                          
  }, 700);
}

function CPUTurn(){
    var count=genMoves.length;

    var index=0;
   showCPUMovesInt=setInterval(function(){
      $('#display').text(genMoves.length);
      if(count>0){
         
         showMove(genMoves[index]);
         index++;
         count--;
     }
     else{
      clearInterval(showCPUMovesInt);
      PlayerTurn();
     }
   }, movesIntSec);
   
}

function PlayerTurn(){

    var playerCurMove;
    var colorblock;
    var color;
    var colorID;
    var count=genMoves.length;
    var index=0;
    $('.fourcolors').css("pointer-events", "auto");
    $('.fourcolors').click(function(){
      if(count>0){
        
        colorblock=$(this).attr("class");
        color=colorblock.split(' ')[0];
        colorID=color_id.indexOf(color);
        playerCurMove=colorID;
        showMove(colorID);
        if(playerCurMove===genMoves[index]){
          count--;
          index++;
          alert(count);
          if(count===0){
             genMoves.push(genRandNum());
             setTimeout(CPUTurn, 3000);
          }
        }
        else{
          $("#audioerr").get(0).cloneNode().play();
          setTimeout(CPUTurn, 3000);
        }
      }
   

    });
    
    


}


});