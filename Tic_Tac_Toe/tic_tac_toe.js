$(document).ready(function() {
var x;
var y;
var xQuadrant;
var yQuadrant;
var x_or_o;
var placed_arr=['11','12','13','21','22','23','31','32','33'];
var already_placed=false;
var genIndex;
var clickIndex;
var numOccupied=0;
var element_str="";
var xystr="";
var arr_len=placed_arr.length;
var occupied_arr_user=[];
var occupied_arr_AI=[];
var gameFinished=false;
  

    
 
 
// Get the canvas element and its drawing context
    var canvas = document.getElementById('c');
    context = canvas.getContext('2d');
 
         // context.moveTo(70, 250);
         // context.lineTo(420, 250);
         //  context.lineWidth = 10;
         //  context.strokeStyle="blue";
         //  context.stroke();
    function DrawLine(){
       if(gameFinished){
         return;
       }
       else{
        if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
               context.beginPath();
             context.moveTo(70, 80);
           context.lineTo(70, 420);
           context.lineWidth = 10;
            context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('32')>-1)){
            context.beginPath();
            context.moveTo(246, 80);
         context.lineTo(246, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('23')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
        context.beginPath();
          context.moveTo(418, 80);
         context.lineTo(418, 420);
          context.lineWidth = 10;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('13')>-1)){
            context.beginPath();
           context.moveTo(70, 80);
         context.lineTo(420, 80);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('23')>-1)){
            context.beginPath();
             context.moveTo(70, 250);
         context.lineTo(420, 250);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('31')>-1)&&(occupied_arr_AI.indexOf('32')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(70, 420);
         context.lineTo(418, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
          context.beginPath();
         context.moveTo(70, 80);
         context.lineTo(418, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
          // $("canvas").css("z-index","3");
          $("#winnername").text("AI");
          // $("#whowinsdiv").css("visibility","visible");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
            context.beginPath();
         context.moveTo(418, 80);
         context.lineTo(70, 420);
          context.lineWidth = 10;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_AI=[]
        }

        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
           context.beginPath();
             context.moveTo(70, 80);
           context.lineTo(70, 420);
           context.lineWidth = 10;
            context.strokeStyle="blue";
          context.stroke();
           gameFinished=true;
            // $("canvas").css("z-index","3");
          $("#winnername").text("User");
           $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('32')>-1)){
            context.beginPath();
           context.moveTo(246, 80);
         context.lineTo(246, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('23')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
        context.beginPath();
              context.moveTo(418, 80);
         context.lineTo(418, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('13')>-1)){
            context.beginPath();
            context.moveTo(70, 80);
         context.lineTo(418, 80);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('23')>-1)){
            context.beginPath();
         context.moveTo(70, 250);
         context.lineTo(420, 250);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('31')>-1)&&(occupied_arr_user.indexOf('32')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(70, 420);
         context.lineTo(418, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(70, 80);
         context.lineTo(418, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
            context.beginPath();
          context.moveTo(418, 80);
         context.lineTo(70, 420);
          context.lineWidth = 10;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
          occupied_arr_user=[];
        }
      }
    }

    
    $("#X").click(function(e){
        e.stopPropagation();
        x_or_o="X";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
       genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
    numOccupied+=1;
    element_str+="#q"+placed_arr[genIndex]+"in";
       occupied_arr_AI.push(placed_arr[genIndex]);
       placed_arr.splice(genIndex,1);
       $(element_str).text("O");
        
        element_str="";

      $(".checkbox").css("pointer-events", "auto");
    });
  
    $("#O").click(function(e){
        e.stopPropagation();
        x_or_o="O";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
        genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
    numOccupied+=1;
    element_str+="#q"+placed_arr[genIndex]+"in";
       occupied_arr_AI.push(placed_arr[genIndex]);
       placed_arr.splice(genIndex,1);
       $(element_str).text("X");
       element_str="";

      $(".checkbox").css("pointer-events", "auto");
    });

  
  
    
   $(".XorO").hover(function(){
       $(this).css({"background-color":"pink",
                     "border-width":"5px"
                   });
      
     
   }, function(){
       $(this).css({"background-color":"white",
                     "border-width":"1px"
                   });
   });
  



    $(".checkbox").click(function(e){ 
     
  
       $("#alrdyPlacedDiv").css("visibility","hidden");

        element_str="";
       
        already_placed=false;
    
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
xystr=$(this).attr('id').slice(1);
     
        index=placed_arr.indexOf(xystr);
        
 
            if(index===-1){
       $("#alrdyPlacedDiv").css("visibility","visible");
      $(".checkbox").css("pointer-events", "none");
       $("#alrdyPlacedDiv").css("pointer-events", "auto");
              
   $("#placedXDiv").click(function(e){ 
      $(".checkbox").css("pointer-events", "auto");
     $("#alrdyPlacedDiv").css("pointer-events", "auto");
        $("#alrdyPlacedDiv").css("visibility","hidden");
  });
            }

            else if(index > -1){
                element_str+="#q"+xystr+"in";
                $(element_str).text(x_or_o);
                numOccupied+=1;
                element_str="";

                occupied_arr_user.push(placed_arr[index]);
                placed_arr.splice(index,1);
                DrawLine();
                arr_len=placed_arr.length;
                genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
              element_str+="#q"+placed_arr[genIndex]+"in";
              
               occupied_arr_AI.push(placed_arr[genIndex]);

              placed_arr.splice(genIndex,1);
              
              numOccupied+=1;
              
              if(x_or_o==="O"){
                $(element_str).text("X");
                
                 DrawLine();
              }
              else{
                $(element_str).text("O");
                
                 DrawLine();
              } 
               
            }
             
            xystr="";
            element_str="";
     
    });

 $("button").click(function(e){
      
       context.clearRect(0, 0, canvas.width, canvas.height);
       $(".in").text("");
       // $("canvas").css("z-index","6");
       $("#whowinsdiv").css("opacity","0");
    
        $("#alrdyPlacedDiv").css("visibility","hidden");
      $(".checkbox").css("pointer-events", "none");
      $("#alrdyPlacedDiv").css("pointer-events", "auto");
       
  x=0;
y=0;
xQuadrant=0;
yQuadrant=0;
x_or_o="";
placed_arr=['11','12','13','21','22','23','31','32','33'];
already_placed=false;
clickIndex=0;
numOccupied=0;
element_str="";
xystr="";
arr_len=placed_arr.length;
occupied_arr_user=[];
occupied_arr_AI=[];
gameFinished=false;

  $("#popup").css("visibility", "visible");
   $("body").css("background-color", "#999999"); 
});
  
});