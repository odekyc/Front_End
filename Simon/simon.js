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
var movesIntSec=800;
var getPlayerMovesInt;
var roundLevel=1;
var count;
var index;

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

     $('#inner_start').on('click', startNewGame);





    $('#switchoff').click(function(){

      poweron=true;
       $('#switchoff').css('visibility', 'hidden');
       $('#switchon').css('visibility', 'visible');
       stricton=false;    
       $('#inner_start').css("pointer-events", "auto");
       $('#inner_strict').css("pointer-events", "auto");
      $('#display').css('color', 'yellow');
      // $(".blue").attr("id", "highlight-blue");

    });

  $('#switchon').click(function(){
      $('#display').text('--');
      $('#display').css('color', '#e6b800');
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
       $('#inner_start').css("background-color", "#ff9900");
      $(".blue").removeAttr("id");
      $(".green").removeAttr("id");
      $(".red").removeAttr("id");
      $(".yellow").removeAttr("id");
      clearInterval(blinkFirstRound);
      $('#display').text('--');
      clearInterval(showCPUMovesInt);
      arrsMatch=true;

       
    });

function startNewGame(){
  $('#inner_start').css("pointer-events", "none");
          genMoves.push(getRandom(1, 4)-1);
          running=true;
         blinkFirstRound=setInterval(function(){
          $('#display').text('');
          setTimeout(function(){
            $('#display').text('--');
            }, 700);
          }, 1400);

         setTimeout(function(){clearInterval(blinkFirstRound);
            $('#display').text(roundLevel);
            CPUTurn();
         }, 5000);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showMove(curMoveID){
  $('.'+color_id[curMoveID]).attr("id", "highlight-"+color_id[curMoveID]);
   $("#audio"+curMoveID).get(0).cloneNode().play();
  setTimeout(function(){
      $('.'+color_id[curMoveID]).removeAttr("id");               
                          
  }, 700);
}

function CPUTurn(){
    var movesNum=genMoves.length;
    $('.fourcolors').css("pointer-events", "none");
    $('#display').text(roundLevel);
    var i=0;
   showCPUMovesInt=setInterval(function(){
      
      if(movesNum>0){
         
         showMove(genMoves[i]);
         i++;
         movesNum--;
     }
     else{
      clearInterval(showCPUMovesInt);
      PlayerTurn();
     }
   }, movesIntSec);
   
}

function PlayerTurn(){
    $('#inner_start').off();
    $('#inner_start').css("pointer-events", "none");
    var playerCurMove;
    var colorblock;
    var color;
    var colorID;
    count=genMoves.length;
    index=0;
    $('.fourcolors').css("pointer-events", "auto");
    $('.fourcolors').off().on('click',function(){
          count--;
          console.log("user clicked a color button");
          console.log("count="+count);
          console.log("index="+index);
          console.log("genMoves length="+genMoves.length);
          colorblock=$(this).attr("class");
          color=colorblock.split(' ')[0];
          colorID=color_id.indexOf(color);
          playerCurMove=colorID;
          showMove(colorID);
          if(playerCurMove!==genMoves[index]){
             $("#audioerr").get(0).cloneNode().play();
             count=genMoves.length;
             index=0;
            console.log("error, user clicked the wrong move");
            console.log("count="+count);
            console.log("index="+index);
            console.log("genMoves length="+genMoves.length);
            setTimeout(CPUTurn, 3000);
            
            
          }
          else if(!count){
                   genMoves.push(getRandom(1, 4)-1);
                   roundLevel++;
                   count=genMoves.length;
                   index=0;
                   console.log("inside count===0, new move generated ^^");
                   console.log("count="+count);
                   console.log("index="+index);
                   console.log("genMoves length="+genMoves.length);
                   setTimeout(CPUTurn, 1000);


          }
          else if(count>0){
            index++;
          }
          
    });
    
    


}


});