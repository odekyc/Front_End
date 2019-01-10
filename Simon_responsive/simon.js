$(document).ready(function() {
var color_id=["blue","orange","red","yellow"];
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


 soundManager.setup({
    url: './soundmanager2-swf/',
    flashVersion: 9,
    preferFlash: true,
    onready: function() {
        soundManager.createSound({
            id: "audio0",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/simonSound1.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "audio1",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/simonSound2.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "audio2",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/simonSound3.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "audio3",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/simonSound4.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "audioerr",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/simonError.mp3"],
            autoLoad: true,
            autoPlay: false
        });
    }
});


function win(){
  $('.fourcolors').css("pointer-events", "none");
  setTimeout(function(){
      showMove(0);
   }, 2000); 

  setTimeout(function(){
      showMove(1);
   }, 3500); 

    setTimeout(function(){
      showMove(2);
   }, 4000); 

  setTimeout(function(){
      showMove(3);
   }, 4500); 

   setTimeout(function(){
      showMove(2);
   }, 5000); 

    setTimeout(function(){
      showMove(3);
   }, 5500); 

    setTimeout(function(){
      showMove(0);
   }, 6000);

   setTimeout(function(){
      showMove(0);
   }, 6500);  

   setTimeout(function(){
      showMove(0);
   }, 7000);  
   
    setTimeout(function(){
      showMove(3);
   }, 7500);  

     setTimeout(function(){
      showMove(1);
   }, 8000);  

      setTimeout(function(){
      showMove(3);
   }, 8500);  

  setTimeout(function(){
      showMove(1);
   }, 8700);  

    setTimeout(function(){
      showMove(2);
   }, 8900);  

    setTimeout(function(){
      showMove(1);
   }, 9100); 

    setTimeout(function(){
      showMove(2);
   }, 9300);  

    setTimeout(function(){
      showMove(0);
   }, 9500);  

     setTimeout(function(){
      showMove(3);
   }, 9700);  

     setTimeout(function(){
      showMove(1);
   }, 9900); 

  setTimeout(function(){
      showMove(1);
   }, 10100); 

  setTimeout(function(){
      showMove(0);
   }, 10300); 

  setTimeout(function(){
      showMove(3);
   }, 10500); 

  setTimeout(function(){
      showMove(2);
   }, 10700); 

   setTimeout(function(){
      showMove(1);
   }, 10900); 
   
    setTimeout(function(){
      showMove(0);
   }, 11100); 

   setTimeout(function(){
      showMove(3);
      showMove(2);
   }, 11300); 

   setTimeout(function(){
      showMove(3);
      showMove(2);
   }, 11400); 

    setTimeout(function(){
      showMove(0);
      showMove(1);
      showMove(3);
      showMove(2);
   }, 11600); 

      setTimeout(function(){
      showMove(0);
      showMove(1);
      showMove(3);
      showMove(2);
   }, 11800); 


        setTimeout(function(){
      showMove(0);
      showMove(1);
      showMove(3);
      showMove(2);
   }, 12000); 

       setTimeout(function(){


       $('.'+color_id[0]).attr("id", "highlight-"+color_id[0]);
       $('.'+color_id[1]).attr("id", "highlight-"+color_id[1]);
       $('.'+color_id[2]).attr("id", "highlight-"+color_id[2]);
       $('.'+color_id[3]).attr("id", "highlight-"+color_id[3]);
       soundManager.play("audio1");
       setTimeout(function(){
          $('.'+color_id[0]).removeAttr("id"); 
          $('.'+color_id[1]).removeAttr("id");
          $('.'+color_id[2]).removeAttr("id");  
          $('.'+color_id[3]).removeAttr("id"); 
       }, 600);
   }, 13000); 


      setTimeout(function(){
       $('.'+color_id[0]).attr("id", "highlight-"+color_id[0]);
       $('.'+color_id[1]).attr("id", "highlight-"+color_id[1]);
       $('.'+color_id[2]).attr("id", "highlight-"+color_id[2]);
       $('.'+color_id[3]).attr("id", "highlight-"+color_id[3]);
       soundManager.play("audio3");
       setTimeout(function(){
          $('.'+color_id[0]).removeAttr("id"); 
          $('.'+color_id[1]).removeAttr("id");
          $('.'+color_id[2]).removeAttr("id");  
          $('.'+color_id[3]).removeAttr("id"); 
       }, 600);
   }, 14000);  

       setTimeout(function(){
       $('.'+color_id[0]).attr("id", "highlight-"+color_id[0]);
       $('.'+color_id[1]).attr("id", "highlight-"+color_id[1]);
       $('.'+color_id[2]).attr("id", "highlight-"+color_id[2]);
       $('.'+color_id[3]).attr("id", "highlight-"+color_id[3]);
       soundManager.play("audio2");
       setTimeout(function(){
          $('.'+color_id[0]).removeAttr("id"); 
          $('.'+color_id[1]).removeAttr("id");
          $('.'+color_id[2]).removeAttr("id");  
          $('.'+color_id[3]).removeAttr("id"); 
       }, 600);
   }, 15000); 


      setTimeout(function(){
       $('.'+color_id[0]).attr("id", "highlight-"+color_id[0]);
       $('.'+color_id[1]).attr("id", "highlight-"+color_id[1]);
       $('.'+color_id[2]).attr("id", "highlight-"+color_id[2]);
       $('.'+color_id[3]).attr("id", "highlight-"+color_id[3]);
       soundManager.play("audio0");
       setTimeout(function(){
          $('.'+color_id[0]).removeAttr("id"); 
          $('.'+color_id[1]).removeAttr("id");
          $('.'+color_id[2]).removeAttr("id");  
          $('.'+color_id[3]).removeAttr("id"); 
       }, 600);
   }, 16000); 


  
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
      
      startNewGame();
    });





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
       $('#inner_start').css("pointer-events", "none");
      genMoves=[];
      running=false;
      stricton=false;      
      poweron=false;
       $('#switchoff').css('visibility', 'visible');
       $('#switchon').css('visibility', 'hidden');
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
 
    $('.fourcolors').css("pointer-events", "none");
            genMoves=[];
            roundLevel=1;
            index=0;
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
   soundManager.play("audio"+curMoveID);
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
            $('.fourcolors').css("pointer-events", "none");
             soundManager.play("audioerr");
             count=genMoves.length;
             index=0;
            console.log("error, user clicked the wrong move");
            console.log("count="+count);
            console.log("index="+index);
            console.log("genMoves length="+genMoves.length);
          if(stricton){
          
            setTimeout(startNewGame, 2000);
          }
          else{
            setTimeout(CPUTurn, 3000);
          }
            
            
          }
          else if(!count){

                  if(roundLevel===20){
                     
                    win();
                    return;
                  }
                  else{
                   $('.fourcolors').css("pointer-events", "none");
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

          }
          else if(count>0){
            index++;
          }
          
    });
    
    


}


});