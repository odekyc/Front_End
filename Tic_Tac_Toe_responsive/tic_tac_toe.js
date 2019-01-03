$(document).ready(function() {
var x;
var y;
var xQuadrant;
var yQuadrant;
var x_or_o; // X or O, which one the user has selected to represent the User in the game
var EmptyPlcsArr=['11','12','13','21','22','23','31','32','33']; // an array holding all the currently empty places(chessboxes) on the board
var already_placed=false; 
var genIndex;  //the index position randomly generated from an array of empty, occupiable chessboxes
var clickIndex;  // the index position of the chessbox the user clicks on within the EmptyPlacsArr, used to check whether clickIndex==-1 (user has
//clicked on a chessbox that is already occupied by the User or AI) or the chessbox the user clicked is still empty
var numOccupied=0;  // number of chessboxed already occupied by both user and AI added together
var element_str="";  // the value of id attribute of the chessbox(for class .in) 
var yxstr="";
var arr_len=EmptyPlcsArr.length;  //the length of the EmptyPlacsArr
var occupied_arr_user=[];  // an array holding all the places(chessboxes) currently occupied by the User's chesses
var occupied_arr_AI=[];    // an array holding all the places(chessboxes) currently occupied by the AI's chesses
var gameFinished=false;     //whether User or AI has already won and a line connecting 3 adjacent chesses(chessboxes) has already been drawn.
//used in cases when both the User and AI has 3 adjacent chesses and wins in the same step. to prevent drawing winning line connecting
//3 adjacent chesses twice for both User and AI, gameFinished will be set to True and game will end as soon as either User or AI 
//wins first and a winning line connecting 3 adjacent chesses has already been drawn. 
var bestAIMovesPlcs=[]; // of all the possible moves for AI, this arr contains the best tactical moves (all moves in this arr rank
//tactically equivalent to one another in terms of how good it ranks among all possible moves to help AI win the game)
var bestAIMovesPlcsLen;  // length of bestAIMovesPlcs arr. 
var surroundPlcsArr=[];  // an array containing all(may or may not be empty) the places(chessboxes) which are immediately adjacent to and 
//surrounds an already occupied chessbox
var surroundEmptyPlcsArr=[];  //an array containing all the empty, unoccupied places(chessboxes) which are immediately adjacent to and 
//surrounds an already occupied chessbox 
var surPlcIndex;  // the index position of a chessbox(place) from surroundPlcsArr within EmptyPlcsArr
var surEmptyArrLen;  // the length of surroundEmptyPlcsArr
var EmptyPlcsSpliceIndex;  // after a empty chessbox place is randomly selected from surroundEmptyPlcsArr, EmptyPlcsSpliceIndex is the index
// of this selected empty chessbox place within EmptyPlcsArr. used to splice out this empty chessbox place from all the empty chessboxes places 
//from EmptyPlcsArr after this selected empty chessbox is added to occupied_arr_AI and become one of the AI occupied chessboxes(no longer empty).
var lastPlc=""; //the last chessbox(place) (may or may not be empty)that the user/AI can occupy to make a line connecting 3 adjacent chesses(chessboxes) and win the game 
// for instance, if the user currently already has chesses on chessboxes '11' and  '22', '33' would be the last chessbox(place) the user need to occupy
//to successfully make a line connecting 3 adjacent chesses(chessboxes) and win the game
var lastPlcsArr=[];  // an array of all the lastPlc(last chessboxes(places)), which may or may not be empty, that the user/AI can occupy to make
//line connecting 3 adjacent chesses(chessboxes) and win the game. for instance, if the user currently already has chesses on 
//chessboxes '11' and '22', the lastPlc the user can occupy to win the game would be '33'. however, if, besides these the user also currently
//already has chess on '21', the lastPlacsArr containing all the possible lastPlc places/chessboxes would be ['33','31','23'].(all the possible 
//winning line combinations are: '11'+'22'+'33', '11'+'21'+'31', '21'+'22'+'23').
var lastPlcsEmptyArr=[];  // all the empty, occupied chessboxes(places) from lastPlcsArr
var lastPlcsEmptyArrLen;  // the length of lastPlcsEmptyArr
var whoFirstMove = "User";  //User or AI, who has the first move. Default is User



// Get the canvas element and its drawing context
    var canvas = document.getElementById('c');


    var context = canvas.getContext('2d');

    soundManager.setup({
    url: './soundmanager2-swf/',
    flashVersion: 9,
    preferFlash: true,
    onready: function() {
        soundManager.createSound({
            id: "Game_start",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactow-game_start.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Who_won",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-won_anime.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "New_round",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-new_game.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Error",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-error.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "XorO",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-XorO.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Pick_who_first",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-pick_who_first.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "User_move",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/tictactoe-user_move.mp3"],
            autoLoad: true,
            autoPlay: false
        });
    }
});


   var board_width = $("#board").width();

   $("#board").css({"height": board_width+"px"});

   

   var popup_width = $("#popup").width();

   $("#popup").css({"height": 0.45*popup_width+"px",
                    "top": 0.42*board_width+"px"
});

    var alrdyPlacedDiv_width = $("#alrdyPlacedDiv").width();
    $("#alrdyPlacedDiv").css({"height": 0.45*alrdyPlacedDiv_width+"px",
                    "top": 0.42*board_width+"px"
});

     var whowinsdiv_width = $("#whowinsdiv").width();
    $("#whowinsdiv").css({"height": 0.30*whowinsdiv_width+"px",
                    "top": 0.42*board_width+"px"
});

     var canvas_width = $("canvas").width();

     $("canvas").css({"height": canvas_width+"px"});

     var button_width = $("button").width();

   $("button").css({"height": 0.45*button_width+"px"});


   $(window).resize(function(){
      

   
   	  

       board_width = $("#board").width();
	   $("#board").css({"height": board_width+"px"});
	     var popup_width = $("#popup").width();

	   $("#popup").css({"height": 0.45*popup_width+"px",
	                    "top": 0.42*board_width+"px"
	    });

	    alrdyPlacedDiv_width = $("#alrdyPlacedDiv").width();
	    $("#alrdyPlacedDiv").css({"height": 0.45*popup_width+"px",
	                    "top": 0.42*board_width+"px"
	    });


	    whowinsdiv_width = $("#whowinsdiv").width();
	    $("#whowinsdiv").css({"height": 0.30*whowinsdiv_width+"px",
	                    "top": 0.42*board_width+"px"
	    });

	     canvas_width = $("canvas").width();

            $("canvas").css({"height": canvas_width+"px"});

	     button_width = $("button").width();

	   $("button").css({"height": 0.45*button_width+"px"});


});

 
   $(".XorO").hover(function(){
       $(this).css({"background-color":"pink",
                     "border-width":"5px"
                   });

		soundManager.play("XorO");
		// $("#XorO").get(0).cloneNode().play();
		     
		   }, function(){
		       $(this).css({"background-color":"white",
		                     "border-width":"1px"
		                   });
   });


    $("#userMoveFirst").click(function(e){
       $("#userMoveFirst").addClass("active-button");
       $("#AIMoveFirst").removeClass("active-button");
       $("#userMoveFirst").css("top", "4.3%");
       $("#AIMoveFirst").css("top", "5%");
       soundManager.play("Pick_who_first");
       // $("#Pick_who_first").get(0).cloneNode().play();
       whoFirstMove="User";
   });
   
 
 $("#AIMoveFirst").click(function(e){
      $("#AIMoveFirst").addClass("active-button");
      $("#userMoveFirst").removeClass("active-button");
      $("#AIMoveFirst").css("top", "4.3%");
      $("#userMoveFirst").css("top", "5%");
      soundManager.play("Pick_who_first");
      // $("#Pick_who_first").get(0).cloneNode().play();
      whoFirstMove="AI";
   });

    


 
    function DrawLine(){
       if(gameFinished){
         return;
       }
       else{
    
        
        if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
               context.beginPath();
            context.moveTo(111, 9);
            context.lineTo(111, 55);
            context.lineWidth = 4;
            context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('32')>-1)){
            context.beginPath();
       context.moveTo(151, 9);
         context.lineTo(151, 55);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('23')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
        context.beginPath();
           context.moveTo(190, 9);
         context.lineTo(190, 55);
          context.lineWidth = 4;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('13')>-1)){
            context.beginPath();
       context.moveTo(111, 11);
     context.lineTo(190, 11);
     context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('23')>-1)){
            context.beginPath();
           context.moveTo(111, 31);
          context.lineTo(190, 31);
          context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('31')>-1)&&(occupied_arr_AI.indexOf('32')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
            context.beginPath();
        context.moveTo(111, 50);
     context.lineTo(190, 50);
     context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
          context.beginPath();
          context.moveTo(111, 10);
          context.lineTo(190, 50);
          context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
          // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          // $("#whowinsdiv").css("visibility","visible");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
            context.beginPath();
         context.moveTo(190, 10);
           context.lineTo(111, 50);
          context.lineWidth = 2.5;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
            soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }

        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
           context.beginPath();
             context.moveTo(111, 9);
            context.lineTo(111, 55);
            context.lineWidth = 4;
            context.strokeStyle="blue";
          context.stroke();
           gameFinished=true;
            // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
           $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
            soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('32')>-1)){
            context.beginPath();
          context.moveTo(151, 9);
         context.lineTo(151, 55);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('23')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
        context.beginPath();
            context.moveTo(190, 9);
         context.lineTo(190, 55);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('13')>-1)){
            context.beginPath();
             context.moveTo(111, 11);
            context.lineTo(190, 11);
            context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('23')>-1)){
            context.beginPath();
         context.moveTo(111, 31);
          context.lineTo(190, 31);
          context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('31')>-1)&&(occupied_arr_user.indexOf('32')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
             context.moveTo(111, 50);
	     context.lineTo(190, 50);
	     context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(111, 10);
          context.lineTo(190, 50);
          context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
            context.beginPath();
          context.moveTo(190, 10);
           context.lineTo(111, 50);
          context.lineWidth = 2.5;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           soundManager.play("Who_won");
           //$("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
      }
    }

    
    $("#X").click(function(e){
      $("#userMoveFirst").css("pointer-events", "none");
       $("#AIMoveFirst").css("pointer-events", "none");
        e.stopPropagation();
        x_or_o="X";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
        $(".chessbox").css("pointer-events", "auto");
        $("#Game_start").get(0).cloneNode().play();
        if(whoFirstMove == 'AI'){
           genIndex=Math.floor((Math.random() * 8) + 1)-1;
           var tempArr1=['11','12','13','21','23','31','32','33']
           var tempArr2=[tempArr1[genIndex],'22']
           genIndex=Math.floor((Math.random() * 2) + 1)-1;
           numOccupied+=1;
           element_str+="#q"+ tempArr2[genIndex]+"in";
           occupied_arr_AI.push(tempArr2[genIndex]);
           genIndex=EmptyPlcsArr.indexOf(tempArr2[genIndex])
           EmptyPlcsArr.splice(genIndex,1);
           $(element_str).text("O");
          $(element_str).css("visibility", "visible");
          element_str="";
          
        }
    });
  
    $("#O").click(function(e){
      $("#userMoveFirst").css("pointer-events", "none");
       $("#AIMoveFirst").css("pointer-events", "none");
        e.stopPropagation();
        x_or_o="O";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
        $(".chessbox").css("pointer-events", "auto");
        $("#Game_start").get(0).cloneNode().play();
        if(whoFirstMove == 'AI'){
           genIndex=Math.floor((Math.random() * 8) + 1)-1;
           var tempArr1=['11','12','13','21','23','31','32','33']
           var tempArr2=[tempArr1[genIndex],'22']
           genIndex=Math.floor((Math.random() * 2) + 1)-1;
           numOccupied+=1;
           element_str+="#q"+ tempArr2[genIndex]+"in";
           occupied_arr_AI.push(tempArr2[genIndex]);
           genIndex=EmptyPlcsArr.indexOf(tempArr2[genIndex])
           EmptyPlcsArr.splice(genIndex,1);
           $(element_str).text("X");
           $(element_str).css("visibility", "visible");
           element_str="";           
      }
    });

    var tacticWhenGreater2AILen=function(){
         if(occupied_arr_AI.indexOf("22")>-1){
        
              
               lastPlcsArr=[];

              if(occupied_arr_AI.indexOf("11")>-1){
                 lastPlcsArr.push("33");
              }
              if(occupied_arr_AI.indexOf("12")>-1){
                 lastPlcsArr.push("32");
              }
              if(occupied_arr_AI.indexOf("13")>-1){
                 lastPlcsArr.push("31");
              }
              if(occupied_arr_AI.indexOf("21")>-1){
                 lastPlcsArr.push("23");
              }
              if(occupied_arr_AI.indexOf("23")>-1){
                 lastPlcsArr.push("21");
              }
              if(occupied_arr_AI.indexOf("31")>-1){
                 lastPlcsArr.push("13");
                 
              }
               if(occupied_arr_AI.indexOf("32")>-1){
                 lastPlcsArr.push("12");
              }
              if(occupied_arr_AI.indexOf("33")>-1){
                 lastPlcsArr.push("11");
              }
           
        }
        else{
            if(occupied_arr_AI.indexOf("11")>-1){
                 if(occupied_arr_AI.indexOf("13")>-1){
                     lastPlcsArr.push("12");
                 }
                 if(occupied_arr_AI.indexOf("31")>-1){
                     lastPlcsArr.push("21");
                 }
                 if(occupied_arr_AI.indexOf("12")>-1){
                     lastPlcsArr.push("13");
                 }
                 if(occupied_arr_AI.indexOf("21")>-1){
                     lastPlcsArr.push("31");
                 }
                 if(occupied_arr_AI.indexOf("33")>-1){
                     lastPlcsArr.push("22");
                 }
                 
              }
              else if(occupied_arr_AI.indexOf("33")>-1){
                  if(occupied_arr_AI.indexOf("13")>-1){
                     lastPlcsArr.push("23");
                  }
                  if(occupied_arr_AI.indexOf("23")>-1){
                     lastPlcsArr.push("13");
                  }
                  if(occupied_arr_AI.indexOf("31")>-1){
                     lastPlcsArr.push("32");
                  }
                  if(occupied_arr_AI.indexOf("32")>-1){
                     lastPlcsArr.push("31");
                  }
              }                            
            }

            for(var i=0; i<lastPlcsArr.length; i++){
                  
                  if(EmptyPlcsArr.indexOf(lastPlcsArr[i])>-1){
                    lastPlcsEmptyArr.push(lastPlcsArr[i]);
                  }
            }


            lastPlcsEmptyArrLen=lastPlcsEmptyArr.length;

            if (lastPlcsEmptyArrLen>0){
                genIndex=Math.floor((Math.random() * lastPlcsEmptyArrLen) + 1)-1;
                element_str+="#q"+lastPlcsEmptyArr[genIndex]+"in";
                occupied_arr_AI.push(lastPlcsEmptyArr[genIndex]);
                genIndex=EmptyPlcsArr.indexOf(lastPlcsEmptyArr[genIndex]);  
                EmptyPlcsArr.splice(genIndex,1);

            }
            else if(lastPlcsEmptyArrLen==0){
                  
                  if(occupied_arr_user.indexOf("22")>-1){
                        if(occupied_arr_user.indexOf("11")>-1){
                           lastPlcsArr.push("33");
                        }
                        if(occupied_arr_user.indexOf("12")>-1){
                           lastPlcsArr.push("32");
                        }
                        if(occupied_arr_user.indexOf("13")>-1){
                           lastPlcsArr.push("31");
                        }
                        if(occupied_arr_user.indexOf("21")>-1){
                           lastPlcsArr.push("23");
                        }
                        if(occupied_arr_user.indexOf("23")>-1){
                           lastPlcsArr.push("21");
                        }
                        if(occupied_arr_user.indexOf("31")>-1){
                           lastPlcsArr.push("13");
                        }
                         if(occupied_arr_user.indexOf("32")>-1){
                           lastPlcsArr.push("12");
                        }
                        if(occupied_arr_user.indexOf("33")>-1){
                           lastPlcsArr.push("11");
                        }
                }
                else{
                    if(occupied_arr_user.indexOf("11")>-1){
                         if(occupied_arr_user.indexOf("13")>-1){
                             lastPlcsArr.push("12");
                         }
                         if(occupied_arr_user.indexOf("31")>-1){
                             lastPlcsArr.push("21");
                         }
                         if(occupied_arr_user.indexOf("12")>-1){
                             lastPlcsArr.push("13");
                         }
                         if(occupied_arr_user.indexOf("21")>-1){
                             lastPlcsArr.push("31");
                         }
                         if(occupied_arr_user.indexOf("33")>-1){
                             lastPlcsArr.push("22");
                         }
                         
                      }
                      else if(occupied_arr_user.indexOf("33")>-1){
                          if(occupied_arr_user.indexOf("13")>-1){
                            
                             lastPlcsArr.push("23");
                          }
                          if(occupied_arr_user.indexOf("23")>-1){
                             lastPlcsArr.push("13");
                          }
                          if(occupied_arr_user.indexOf("31")>-1){
                             lastPlcsArr.push("32");
                          }
                          if(occupied_arr_user.indexOf("32")>-1){
                             lastPlcsArr.push("31");
                          }
                      }
                  }

                  for(var i=0; i<lastPlcsArr.length; i++){
                        if(EmptyPlcsArr.indexOf(lastPlcsArr[i])>-1){
                             lastPlcsEmptyArr.push(lastPlcsArr[i]);
                        }
                  }

                  
                   lastPlcsEmptyArrLen=lastPlcsEmptyArr.length;

                    if (lastPlcsEmptyArrLen>0){

                        genIndex=Math.floor((Math.random() * lastPlcsEmptyArrLen) + 1)-1;
                        element_str+="#q"+lastPlcsEmptyArr[genIndex]+"in";
                        occupied_arr_AI.push(lastPlcsEmptyArr[genIndex]);
                        genIndex=EmptyPlcsArr.indexOf(lastPlcsEmptyArr[genIndex]);  
                        EmptyPlcsArr.splice(genIndex,1);

                    }
                    else if(lastPlcsEmptyArrLen==0){

                        var tempArr1;
                        if(occupied_arr_AI.indexOf("11")>-1){
                          tempArr1 = ['12', '22', '21'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }
                        if(occupied_arr_AI.indexOf("12")>-1){
                          tempArr1 = ['11', '22', '13'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                        if(occupied_arr_AI.indexOf("13")>-1){
                          tempArr1 = ['12', '22', '23'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }
                        if(occupied_arr_AI.indexOf("21")>-1){
                          tempArr1 = ['11', '22', '31'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                        if(occupied_arr_AI.indexOf("22")>-1){
                          tempArr1 = ['11', '12', '13', '21', '23', '31', '32', '33'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                    
                        
                        if(occupied_arr_AI.indexOf("23")>-1){
                          tempArr1 = ['13', '22', '33'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                        if(occupied_arr_AI.indexOf("31")>-1){
                          tempArr1 = ['21', '22', '32'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                        if(occupied_arr_AI.indexOf("32")>-1){
                          tempArr1 = ['31', '22', '33'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                             
                          }
                        }

                        if(occupied_arr_AI.indexOf("33")>-1){
                          tempArr1 = ['23', '22', '32'];

                          for(var i=0; i < tempArr1.length; i++){
                              if(!surroundPlcsArr.includes(tempArr1[i])){
                                 surroundPlcsArr.push(tempArr1[i]);
                              }
                              
                          }
                        }

                        for (var i=0; i<surroundPlcsArr.length; i++){
                             if(EmptyPlcsArr.indexOf(surroundPlcsArr[i])>-1){
                                  surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                             }
                        }

                       
                        bestAIMovesPlcs=[];
                        for (var i=0; i<surroundEmptyPlcsArr.length; i++){
                              if(surroundEmptyPlcsArr[i]=='11'){
                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('33') >-1)){
                                      bestAIMovesPlcs.push('11');
                                  }

                                  if((occupied_arr_AI.includes('12')) && (EmptyPlcsArr.indexOf('13') >-1)){
                                      bestAIMovesPlcs.push('11');
                                  }

                                  if((occupied_arr_AI.includes('13')) && (EmptyPlcsArr.indexOf('12') >-1)){
                                      bestAIMovesPlcs.push('11');
                                  }

                                  if((occupied_arr_AI.includes('21')) && (EmptyPlcsArr.indexOf('31') >-1)){
                                      bestAIMovesPlcs.push('11');
                                  }

                                  if((occupied_arr_AI.includes('31')) && (EmptyPlcsArr.indexOf('21') >-1)){
                                      bestAIMovesPlcs.push('11');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='12'){
                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('32') >-1)){
                                      bestAIMovesPlcs.push('12');
                                  }

                                  if((occupied_arr_AI.includes('11')) && (EmptyPlcsArr.indexOf('13') >-1)){
                                      bestAIMovesPlcs.push('12');
                                  }

                                  if((occupied_arr_AI.includes('13')) && (EmptyPlcsArr.indexOf('11') >-1)){
                                      bestAIMovesPlcs.push('12');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='13'){

                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('31') >-1)){
                                      bestAIMovesPlcs.push('13');
                                  }

                                  if((occupied_arr_AI.includes('12')) && (EmptyPlcsArr.indexOf('11') >-1)){
                                      bestAIMovesPlcs.push('13');
                                  }

                                  if((occupied_arr_AI.includes('11')) && (EmptyPlcsArr.indexOf('12') >-1)){
                                      bestAIMovesPlcs.push('13');
                                  }
                                  if((occupied_arr_AI.includes('23')) && (EmptyPlcsArr.indexOf('33') >-1)){
                                      bestAIMovesPlcs.push('13');
                                  }

                                  if((occupied_arr_AI.includes('33')) && (EmptyPlcsArr.indexOf('23') >-1)){
                                      bestAIMovesPlcs.push('13');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='21'){
                                  
                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('23') >-1)){
                                      bestAIMovesPlcs.push('21');
                                  }

                                  if((occupied_arr_AI.includes('11')) && (EmptyPlcsArr.indexOf('31') >-1)){
                                      bestAIMovesPlcs.push('21');
                                  }

                                  if((occupied_arr_AI.includes('31')) && (EmptyPlcsArr.indexOf('11') >-1)){
                                      bestAIMovesPlcs.push('21');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='23'){

                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('21') >-1)){
                                      bestAIMovesPlcs.push('23');
                                  }

                                  if((occupied_arr_AI.includes('13')) && (EmptyPlcsArr.indexOf('33') >-1)){
                                      bestAIMovesPlcs.push('23');
                                  }

                                  if((occupied_arr_AI.includes('33')) && (EmptyPlcsArr.indexOf('13') >-1)){
                                      bestAIMovesPlcs.push('23');
                                  }


                              }
                              else if(surroundEmptyPlcsArr[i]=='31'){

                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('13') >-1)){
                                      bestAIMovesPlcs.push('31');
                                  }

                                  if((occupied_arr_AI.includes('21')) && (EmptyPlcsArr.indexOf('11') >-1)){
                                      bestAIMovesPlcs.push('31');
                                  }

                                  if((occupied_arr_AI.includes('11')) && (EmptyPlcsArr.indexOf('21') >-1)){
                                      bestAIMovesPlcs.push('31');
                                  }
                                  if((occupied_arr_AI.includes('32')) && (EmptyPlcsArr.indexOf('33') >-1)){
                                      bestAIMovesPlcs.push('31');
                                  }

                                  if((occupied_arr_AI.includes('33')) && (EmptyPlcsArr.indexOf('32') >-1)){
                                      bestAIMovesPlcs.push('31');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='32'){

                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('12') >-1)){
                                      bestAIMovesPlcs.push('32');
                                  }

                                  if((occupied_arr_AI.includes('31')) && (EmptyPlcsArr.indexOf('33') >-1)){
                                      bestAIMovesPlcs.push('32');
                                  }

                                  if((occupied_arr_AI.includes('33')) && (EmptyPlcsArr.indexOf('31') >-1)){
                                      bestAIMovesPlcs.push('32');
                                  }

                              }
                              else if(surroundEmptyPlcsArr[i]=='33'){

                                  if((occupied_arr_AI.includes('22')) && (EmptyPlcsArr.indexOf('11') >-1)){
                                      bestAIMovesPlcs.push('33');
                                  }

                                  if((occupied_arr_AI.includes('23')) && (EmptyPlcsArr.indexOf('13') >-1)){
                                      bestAIMovesPlcs.push('33');
                                  }
                                  if((occupied_arr_AI.includes('13')) && (EmptyPlcsArr.indexOf('23') >-1)){
                                      bestAIMovesPlcs.push('33');
                                  }
                                  if((occupied_arr_AI.includes('32')) && (EmptyPlcsArr.indexOf('31') >-1)){
                                      bestAIMovesPlcs.push('33');
                                  }
                                  if((occupied_arr_AI.includes('31')) && (EmptyPlcsArr.indexOf('32') >-1)){
                                      bestAIMovesPlcs.push('33');
                                  }
                              }
                        }
                       
                        bestAIMovesPlcsLen=bestAIMovesPlcs.length;

                        
                        if(bestAIMovesPlcsLen>0){
                            genIndex=Math.floor((Math.random() * bestAIMovesPlcsLen) + 1)-1;
                            occupied_arr_AI.push(bestAIMovesPlcs[genIndex]);
                            element_str+="#q"+bestAIMovesPlcs[genIndex]+"in";
                            EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(bestAIMovesPlcs[genIndex]);
                            EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                        }
                        if(bestAIMovesPlcsLen==0){
                            
                            arr_len = EmptyPlcsArr.length;
                            genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
                            element_str+="#q"+EmptyPlcsArr[genIndex]+"in";
                            occupied_arr_AI.push(EmptyPlcsArr[genIndex]);
                            EmptyPlcsArr.splice(genIndex,1);
                }
             }  
          }
        }
  



    $(".chessbox").click(function(e){ 
     
  
       $("#alrdyPlacedDiv").css("visibility","hidden");

        element_str="";
       
        already_placed=false;

          surPlcIndex;
          surEmptyArrLen;
          EmptyPlcsSpliceIndex;
          element_str="";
          surroundPlcsArr=[];
          surroundEmptyPlcsArr=[];
          lastPlc="";
          lastPlcsArr=[];
          lastPlcsEmptyArr=[];
          lastPlcsEmptyArrLen;
  
//         var xoffSet=e.target.offsetLeft;
        

//         x=e.pageX;
//         y=e.pageY;


//         if(xoffSet<468){
//           x+=(468-xoffSet);
//         }

//         if (( x >= 470)&&( x<= 636)){
//            yQuadrant=1;

//         }
//         else if (( x >= 637)&&( x<= 806)){
//             yQuadrant=2;
//         }
//         else if (( x >= 807)&&( x<= 973)){
//             yQuadrant=3;
//         }

//         if (( y >= 78)&&( y<= 243)){
//            xQuadrant=1;

//         }
//         else if (( y >= 243)&&( y<= 413)){
//             xQuadrant=2;
//         }
//         else if (( y >= 413)&&( y<= 578)){
//             xQuadrant=3;
//         }

//         xystr="";

//         xystr=String(xQuadrant)+String(yQuadrant);
        yxstr=$(this).attr('id').slice(1);
 
     
        clickIndex=EmptyPlcsArr.indexOf(yxstr);
        
 
            if(clickIndex===-1){
               $("#alrdyPlacedDiv").css("visibility","visible");
               $("#Error").get(0).cloneNode().play();
               $(".checkbox").css("pointer-events", "none");
               $("#alrdyPlacedDiv").css("pointer-events", "auto");
                      
               $("#placedXDiv").click(function(e){ 
               $(".checkbox").css("pointer-events", "auto");
               $("#alrdyPlacedDiv").css("pointer-events", "none");
               $("#alrdyPlacedDiv").css("visibility","hidden");
              });
            }

            else if(clickIndex > -1){
                element_str+="#q"+yxstr+"in";
                $(element_str).text(x_or_o);
               $(element_str).css("visibility", "visible");
              $("#User_move").get(0).cloneNode().play();
                numOccupied+=1;
                element_str="";
                // alert(clickIndex);
                // alert(EmptyPlcsArr);
                // alert(EmptyPlcsArr[clickIndex]);
                occupied_arr_user.push(EmptyPlcsArr[clickIndex]);
                EmptyPlcsArr.splice(clickIndex,1);
                DrawLine();

            if(whoFirstMove == "AI"){
              
                if(numOccupied < 9){
                var AIOccupiedLen=occupied_arr_AI.length;

                if(AIOccupiedLen==1){
                  var tempAIPlc0=occupied_arr_AI[0];
                  var tempUserPlc0=occupied_arr_user[0];
                  if(tempAIPlc0=="22"){
                     if(tempUserPlc0=="11"){
                        surroundEmptyPlcsArr=["12","21"];
                      }
                      else if(tempUserPlc0=="12"){
                        surroundEmptyPlcsArr=["11","13"];
                      }
                      else if(tempUserPlc0=="13"){
                        surroundEmptyPlcsArr=["12","23"];
                      }
                      else if(tempUserPlc0=="21"){
                        surroundEmptyPlcsArr=["11","31"];
                      }
                      else if(tempUserPlc0=="23"){
                        surroundEmptyPlcsArr=["13","33"];
                      }
                      else if(tempUserPlc0=="31"){
                        surroundEmptyPlcsArr=["21","32"];
                      }
                      else if(tempUserPlc0=="32"){
                        surroundEmptyPlcsArr=["31","33"];
                      }
                      else if(tempUserPlc0=="33"){
                        surroundEmptyPlcsArr=["23","32"];
                      }
                    genIndex=Math.floor((Math.random() * 2) + 1)-1;
                    occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);
                    element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                    EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);
                    EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                  }
                  else{
                    if(EmptyPlcsArr.indexOf("22")>-1){
                      genIndex=EmptyPlcsArr.indexOf("22");
                       occupied_arr_AI.push("22");
                       element_str+="#q22in";
                       EmptyPlcsArr.splice(genIndex,1);
                    }
                    else{
                        if(tempAIPlc0=="11"){
                          surroundPlcsArr=["12","21"];
                        }
                        else if(tempAIPlc0=="12"){
                          surroundPlcsArr=["11","13"];
                        }
                        else if(tempAIPlc0=="13"){
                          surroundPlcsArr=["12","23"];
                        }
                        else if(tempAIPlc0=="21"){
                          surroundPlcsArr=["11","31"];
                        }
                        else if(tempAIPlc0=="23"){
                          surroundPlcsArr=["13","33"];
                        }
                        else if(tempAIPlc0=="31"){
                          surroundPlcsArr=["21","32"];
                        }
                        else if(tempAIPlc0=="32"){
                          surroundPlcsArr=["31","33"];
                        }
                        else if(tempAIPlc0=="33"){
                          surroundPlcsArr=["23","32"];
                        }
                        for(var i=0; i<surroundPlcsArr.length; i++){
                            surPlcIndex=EmptyPlcsArr.indexOf(surroundPlcsArr[i])
                            if(surPlcIndex>-1){
                              surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                            }
                        }
                        surEmptyArrLen=surroundEmptyPlcsArr.length;

     
                    
                        genIndex=Math.floor((Math.random() * surEmptyArrLen) + 1)-1;
                        element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                 
                         occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);
                         EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);
                         EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                    }
                  }
                }
                // else if(AIOccupiedLen==2){
                //    if(occupied_arr_AI.indexOf("22")>-1){
                //       if(occupied_arr_AI.indexOf("11")>-1){
                //          lastPlc="33";
                //       }
                //       else if(occupied_arr_AI.indexOf("12")>-1){
                //          lastPlc="32";
                //       }
                //       else if(occupied_arr_AI.indexOf("13")>-1){
                //          lastPlc="31";
                //       }
                //       else if(occupied_arr_AI.indexOf("21")>-1){
                //          lastPlc="23";
                //       }
                //       else if(occupied_arr_AI.indexOf("23")>-1){
                //          lastPlc="21";
                //       }
                //       else if(occupied_arr_AI.indexOf("31")>-1){
                //          lastPlc="13";
                //       }
                //       else if(occupied_arr_AI.indexOf("32")>-1){
                //          lastPlc="12";
                //       }
                //       else if(occupied_arr_AI.indexOf("33")>-1){
                //          lastPlc="11";
                //       }

                //       genIndex=EmptyPlcsArr.indexOf(lastPlc);

                //       if(genIndex>-1){
                //          element_str+="#q"+lastPlc+"in";
                //          occupied_arr_AI.push(lastPlc);
                //          EmptyPlcsArr.splice(genIndex,1);
                //       }
                //       else{
                //           var tempUserPlc0=occupied_arr_user[0];
                //           if(tempUserPlc0=="11"){
                //             surroundPlcsArr=["12","21"];
                //           }
                //           else if(tempUserPlc0=="12"){
                //             surroundPlcsArr=["11","13"];
                //           }
                //           else if(tempUserPlc0=="13"){
                //             surroundPlcsArr=["12","23"];
                //           }
                //           else if(tempUserPlc0=="21"){
                //             surroundPlcsArr=["11","31"];
                //           }
                //           else if(tempUserPlc0=="23"){
                //             surroundPlcsArr=["13","33"];
                //           }
                //           else if(tempUserPlc0=="31"){
                //             surroundPlcsArr=["21","32"];
                //           }
                //           else if(tempUserPlc0=="32"){
                //             surroundPlcsArr=["31","33"];
                //           }
                //           else if(tempUserPlc0=="33"){
                //             surroundPlcsArr=["23","32"];
                //           }
                //         for(var i=0; i<surroundPlcsArr.length; i++){
                //             surPlcIndex=EmptyPlcsArr.indexOf(surroundPlcsArr[i])
                //             if(surPlcIndex>-1){
                //               surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                //             }
                //         }
                          
                //             surEmptyArrLen=surroundEmptyPlcsArr.length;
                //             genIndex=Math.floor((Math.random() * surEmptyArrLen) + 1)-1;
                //             element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                     
                //              occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);

                //             EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);

                //             EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                      

                //       }
                //    }
                //    else{
                //        if(occupied_arr_user.indexOf("22")>-1){
                //           if(occupied_arr_user.indexOf("11")>-1){
                //              lastPlc="33";
                //            }
                //           else if(occupied_arr_user.indexOf("12")>-1){
                //              lastPlc="32";
                //           }
                //           else if(occupied_arr_user.indexOf("13")>-1){
                //              lastPlc="31";
                //           }
                //           else if(occupied_arr_user.indexOf("21")>-1){
                //              lastPlc="23";
                //           }
                //           else if(occupied_arr_user.indexOf("23")>-1){
                //              lastPlc="21";
                //           }
                //           else if(occupied_arr_user.indexOf("31")>-1){
                //              lastPlc="13";
                //           }
                //            else if(occupied_arr_user.indexOf("32")>-1){
                //              lastPlc="12";
                //           }
                //           else if(occupied_arr_user.indexOf("33")>-1){
                //              lastPlc="11";
                //           }
                //           genIndex=EmptyPlcsArr.indexOf(lastPlc); 
                //           if(genIndex == -1){
                //              genIndex=Math.floor((Math.random() * EmptyPlcsArr.length) + 1)-1;
                //              element_str+="#q"+EmptyPlcsArr[genIndex]+"in";
                //              occupied_arr_AI.push(EmptyPlcsArr[genIndex]);
	               //           EmptyPlcsArr.splice(genIndex,1);
	                         
                //           }
                //           else{
	                                 
	               //             element_str+="#q"+lastPlc+"in";
	                           
	               //             occupied_arr_AI.push(lastPlc);
	               //             EmptyPlcsArr.splice(genIndex,1);
	                          

                //           }
                          
                //       }
                     
                //     }
                //   }  
                      else if(AIOccupiedLen>=2){
                           tacticWhenGreater2AILen();
                      }
                    
                  }
                }
                else if(whoFirstMove == "User"){
                   if(numOccupied==8){
                      element_str+="#q"+EmptyPlcsArr[0]+"in";
                      occupied_arr_AI.push(EmptyPlcsArr[0]);
                      EmptyPlcsArr.splice(0,1);
                   }
                   if(numOccupied < 9){

                   var AIOccupiedLen=occupied_arr_AI.length;
                   if(AIOccupiedLen==0){

                       EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf('22');
                       if (EmptyPlcsSpliceIndex>-1){
                            occupied_arr_AI.push('22');
                            EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                            element_str="#q22in";
                       }
                       else{
                          var temp4CornersArr = ['11', '13', '31', '33'];
                          genIndex=Math.floor((Math.random() * 4) + 1)-1;
                          element_str="#q"+temp4CornersArr[genIndex]+"in";
                          occupied_arr_AI.push(temp4CornersArr[genIndex]);
                          EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(temp4CornersArr[genIndex]);
                          EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                       }
 
                   }
                   else if(AIOccupiedLen==1){

                       if(occupied_arr_user[0]=='22'){
                        
                          if(occupied_arr_user[1]=='11'){
                              lastPlc="33";
                          }
                          else if(occupied_arr_user[1]=='12'){
                              lastPlc="32";
                          }
                          else if(occupied_arr_user[1]=='13'){
                              lastPlc="31";
                          }
                          else if(occupied_arr_user[1]=='21'){
                              lastPlc="23";
                          }
                          else if(occupied_arr_user[1]=='23'){
                              lastPlc="21";
                          }
                          else if(occupied_arr_user[1]=='31'){
                              lastPlc="13";
                          }
                           else if(occupied_arr_user[1]=='32'){
                              lastPlc="12";
                          }
                          else if(occupied_arr_user[1]=='33'){
                              lastPlc="11";
                          }

                          if(occupied_arr_AI[0] == lastPlc){

                              var tempPossibleCornersArr=[];

                               if(occupied_arr_AI[0]=='11'){
                                    tempPossibleCornersArr=['13','31'];
                                }
                                else if(occupied_arr_AI[0]=='13'){
                                    tempPossibleCornersArr=['11','33'];
                                }
                                else if(occupied_arr_AI[0]=='31'){
                                    tempPossibleCornersArr=['11','33'];
                                }
                                else if(occupied_arr_AI[0]=='33'){
                                    tempPossibleCornersArr=['13','31'];
                                }
                                genIndex = Math.floor((Math.random() * 2) + 1)-1;
                                element_str="#q"+tempPossibleCornersArr[genIndex]+"in";
                                occupied_arr_AI.push(tempPossibleCornersArr[genIndex]);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(tempPossibleCornersArr[genIndex]);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);

                          }
                          else{
                              element_str="#q"+lastPlc+"in";
                              occupied_arr_AI.push(lastPlc);
                              EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                              EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                          }
                       }
                       else if(occupied_arr_user[0]!='22'){
                           if(occupied_arr_user.indexOf('11')>-1 && occupied_arr_user.indexOf('12')>-1){
                                lastPlc="13";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                           else if(occupied_arr_user.indexOf('11')>-1 && occupied_arr_user.indexOf('21')>-1){
                                lastPlc="31";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                           else if(occupied_arr_user.indexOf('11')>-1 && occupied_arr_user.indexOf('13')>-1){
                                lastPlc="12";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                           else if(occupied_arr_user.indexOf('11')>-1 && occupied_arr_user.indexOf('31')>-1){
                                lastPlc="21";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                            else if(occupied_arr_user.indexOf('11')>-1 && occupied_arr_user.indexOf('31')>-1){
                                lastPlc="21";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                           else if(occupied_arr_user.indexOf('13')>-1 && occupied_arr_user.indexOf('33')>-1){
                                lastPlc="23";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                          else if(occupied_arr_user.indexOf('13')>-1 && occupied_arr_user.indexOf('12')>-1){
                                lastPlc="11";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                          }
                          else if(occupied_arr_user.indexOf('13')>-1 && occupied_arr_user.indexOf('23')>-1){
                                lastPlc="33";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                          }
                          else if(occupied_arr_user.indexOf('31')>-1 && occupied_arr_user.indexOf('33')>-1){
                                lastPlc="32";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                          else if(occupied_arr_user.indexOf('31')>-1 && occupied_arr_user.indexOf('21')>-1){
                                lastPlc="11";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }
                          else if(occupied_arr_user.indexOf('31')>-1 && occupied_arr_user.indexOf('32')>-1){
                                lastPlc="33";
                                 element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                           }

                          else if(occupied_arr_user.indexOf('33')>-1 && occupied_arr_user.indexOf('23')>-1){
                                lastPlc="13";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                          }

                          else if(occupied_arr_user.indexOf('33')>-1 && occupied_arr_user.indexOf('32')>-1){
                                lastPlc="31";
                                element_str="#q"+lastPlc+"in";
                                occupied_arr_AI.push(lastPlc);
                                EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(lastPlc);
                                EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                          }

                          else{
                               
                                
                                var tempAllPossiblePlcs=[]
                                bestAIMovesPlcs=[]; 
                                if(occupied_arr_user.indexOf('11')>-1){
                                  if(occupied_arr_user.indexOf('33')>-1){
                                     bestAIMovesPlcs.push('13');
                                     bestAIMovesPlcs.push('31');
                                  }
                                  else if(occupied_arr_user.indexOf('23')>-1){
                                     tempAllPossiblePlcs.push('12');
                                     tempAllPossiblePlcs.push('21');
                                     tempAllPossiblePlcs.push('13');
                                     tempAllPossiblePlcs.push('32');
                                  }
                                  else if(occupied_arr_user.indexOf('32')>-1){
                                     tempAllPossiblePlcs.push('12');
                                     tempAllPossiblePlcs.push('21');
                                     tempAllPossiblePlcs.push('31');
                                     tempAllPossiblePlcs.push('33');

                                  }

                                }
                                else if(occupied_arr_user.indexOf('13')>-1){
                                  if(occupied_arr_user.indexOf('31')>-1){
                                      bestAIMovesPlcs.push('11');
                                      bestAIMovesPlcs.push('33'); 
                                  }
                                  else if(occupied_arr_user.indexOf('21')>-1){
                                     tempAllPossiblePlcs.push('12');
                                     tempAllPossiblePlcs.push('23');
                                     tempAllPossiblePlcs.push('11');
                                     tempAllPossiblePlcs.push('31');

                                  }
                                  else if(occupied_arr_user.indexOf('32')>-1){
                                     tempAllPossiblePlcs.push('12');
                                     tempAllPossiblePlcs.push('23');
                                     tempAllPossiblePlcs.push('31');
                                     tempAllPossiblePlcs.push('33');
                                  }
                                }
                                else if(occupied_arr_user.indexOf('31')>-1){
                                  if(occupied_arr_user.indexOf('12')>-1){
                                     tempAllPossiblePlcs.push('21');
                                     tempAllPossiblePlcs.push('32');
                                     tempAllPossiblePlcs.push('11');
                                     tempAllPossiblePlcs.push('13');
                                  }
                                  else if(occupied_arr_user.indexOf('23')>-1){
                                     tempAllPossiblePlcs.push('21');
                                     tempAllPossiblePlcs.push('32');
                                     tempAllPossiblePlcs.push('13');
                                     tempAllPossiblePlcs.push('33');
                                  }
                                }
                                else if(occupied_arr_user.indexOf('33')>-1){
                                  if(occupied_arr_user.indexOf('12')>-1){
                                    
                                     tempAllPossiblePlcs.push('23');
                                     tempAllPossiblePlcs.push('32');
                                     tempAllPossiblePlcs.push('11');
                                     tempAllPossiblePlcs.push('13');
                                  }
                                  else if(occupied_arr_user.indexOf('21')>-1){
                                     tempAllPossiblePlcs.push('23');
                                     tempAllPossiblePlcs.push('32');
                                     tempAllPossiblePlcs.push('11');
                                     tempAllPossiblePlcs.push('31');
                                  }
                                }
                            
                          
                            var tempAllPossiblePlcsLen=tempAllPossiblePlcs.length;

                            if(tempAllPossiblePlcsLen){
                                for(var i=0; i < tempAllPossiblePlcsLen; i++){
                                    if(tempAllPossiblePlcs[i]=='11'){
                                        if(occupied_arr_user.indexOf('33')==-1){
                                         
                                           bestAIMovesPlcs.push('11');
                                           
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='12'){
                                        if(occupied_arr_user.indexOf('32')==-1){
                                           bestAIMovesPlcs.push('12');
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='13'){
                                        if(occupied_arr_user.indexOf('31')==-1){
                                         
                                           bestAIMovesPlcs.push('13');
                                           
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='21'){
                                        if(occupied_arr_user.indexOf('23')==-1){
                                           bestAIMovesPlcs.push('21');
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='23'){
                                        if(occupied_arr_user.indexOf('21')==-1){
                                           bestAIMovesPlcs.push('23');
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='31'){
                                        if(occupied_arr_user.indexOf('13')==-1){
                                           bestAIMovesPlcs.push('31');
                                        }
                                    }
                                    else if(tempAllPossiblePlcs[i]=='32'){
                                        if(occupied_arr_user.indexOf('12')==-1){
                                           bestAIMovesPlcs.push('32');
                                        }
                                    }

                                    else if(tempAllPossiblePlcs[i]=='33'){
                                        if(occupied_arr_user.indexOf('11')==-1){
                                           bestAIMovesPlcs.push('33');
                                        }
                                    }
                                }
                            }

                            
                           
                            genIndex=Math.floor((Math.random() * bestAIMovesPlcs.length) + 1)-1;
                            occupied_arr_AI.push(bestAIMovesPlcs[genIndex]);
                            element_str="#q"+bestAIMovesPlcs[genIndex]+"in";
                            EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(bestAIMovesPlcs[genIndex]);
                            EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);

                           

                          }
                       }
                   }
                   else if(AIOccupiedLen>=2){
                      tacticWhenGreater2AILen();
                                      

                  }    
                }
            }
            
                
               
              numOccupied+=1;
              
              if(x_or_o==="O"){

                 $(element_str).text("X");
                $(element_str).css("visibility", "visible");
  
                 DrawLine();
              }
              else{
                $(element_str).text("O");
                $(element_str).css("visibility", "visible");

                 DrawLine();
              } 
               
            }
        
             
            yxstr="";
            element_str="";
            surroundPlcsArr=[];
            surroundEmptyPlcsArr=[];
            lastPlc="";
            lastPlcsArr=[];
            lastPlcsEmptyArr=[];
            lastPlcsEmptyArrLen;
            bestAIMovesPlcs=[];
     
    });

 $("#startOverBut").click(function(e){
      
       context.clearRect(0, 0, canvas.width, canvas.height);
       $(".in").text("");
     $(".in").css("visibility", "hidden");
       // $("canvas").css("z-index","6");
       $("#whowinsdiv").css("opacity","0");
    
        $("#alrdyPlacedDiv").css("visibility","hidden");
      $(".chessbox").css("pointer-events", "none");
      $("#alrdyPlacedDiv").css("pointer-events", "auto");
      $("#New_round").get(0).cloneNode().play();
      $("#userMoveFirst").css("pointer-events", "auto");
       $("#AIMoveFirst").css("pointer-events", "auto");
       
x=0;
y=0;
xQuadrant=0;
yQuadrant=0;
x_or_o="";
EmptyPlcsArr=['11','12','13','21','22','23','31','32','33'];
already_placed=false;
clickIndex=0;
numOccupied=0;
element_str="";
yxstr="";
arr_len= EmptyPlcsArr.length;
occupied_arr_user=[];
occupied_arr_AI=[];
gameFinished=false;
surroundPlcsArr=[];
surroundEmptyPlcsArr=[];
lastPlc="";
lastPlcsArr=[];
lastPlcsEmptyArr=[];
lastPlcsEmptyArrLen;
surPlcIndex;
surEmptyArrLen;
EmptyPlcsSpliceIndex;

  $("#popup").css("visibility", "visible");
   $("body").css("background-color", "#999999"); 
});
  
});