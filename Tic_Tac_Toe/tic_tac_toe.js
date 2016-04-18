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
var rev_xy;
var occupied_arr_user=[];
var occupied_arr_AI=[];

$(document).ready(function() {

    genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
    
 
 
// Get the canvas element and its drawing context
          var canvas = document.getElementById('c');
          context = canvas.getContext('2d');
    
    function DrawLine(){
        if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
            context.beginPath();
         context.moveTo(70, 80);
         context.lineTo(420, 80);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('32')>-1)){
            context.beginPath();
         context.moveTo(70, 250);
         context.lineTo(420, 250);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('23')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
        context.beginPath();
         context.moveTo(70, 420);
         context.lineTo(420, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('13')>-1)){
            context.beginPath();
         context.moveTo(76, 80);
         context.lineTo(76, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('23')>-1)){
            context.beginPath();
         context.moveTo(246, 80);
         context.lineTo(246, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('31')>-1)&&(occupied_arr_AI.indexOf('32')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
            context.beginPath();
         context.moveTo(418, 80);
         context.lineTo(418, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
            context.beginPath();
         context.moveTo(70, 80);
         context.lineTo(418, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('31')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('13')>-1)){
            context.beginPath();
         context.moveTo(418, 80);
         context.lineTo(70, 420);
          context.stroke();
          alert("AI WINS");
          occupied_arr_AI=[]
        }

         if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
            context.beginPath();
         context.moveTo(70, 80);
         context.lineTo(420, 80);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('32')>-1)){
            context.beginPath();
         context.moveTo(70, 250);
         context.lineTo(420, 250);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('23')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
        context.beginPath();
         context.moveTo(70, 420);
         context.lineTo(420, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('13')>-1)){
            context.beginPath();
         context.moveTo(76, 80);
         context.lineTo(76, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('23')>-1)){
            context.beginPath();
         context.moveTo(246, 80);
         context.lineTo(246, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('31')>-1)&&(occupied_arr_user.indexOf('32')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
         context.moveTo(418, 80);
         context.lineTo(418, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
         context.moveTo(70, 80);
         context.lineTo(418, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('31')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('13')>-1)){
            context.beginPath();
         context.moveTo(418, 80);
         context.lineTo(70, 420);
          context.stroke();
          alert("USER WINS");
          occupied_arr_user=[];
        }
    }

       
    


    numOccupied+=1;
    
    
    
    rev_xy=placed_arr[genIndex].split('').reverse().join('');

    element_str+="#q"+rev_xy+"in";
    
    $("#X").click(function(e){
        e.stopPropagation();
        x_or_o="X";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "white");
       
         
       $(element_str).text("O");
        
  
    });
  
    $("#O").click(function(e){
        e.stopPropagation();
        x_or_o="O";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "white");

       $(element_str).text("X");
    });

  
    occupied_arr_AI.push(placed_arr[genIndex]);

    placed_arr.splice(genIndex,1);
    
   


    $("#board").click(function(e){ 
        element_str="";

        already_placed=false;
        x=e.clientX;
        y=e.clientY;
       

        if (( x >= 387)&&( x<= 553)){
           xQuadrant=1;

        }
        else if (( x >= 553)&&( x<= 726)){
            xQuadrant=2;
        }
        else if (( x >= 726)&&( x<= 890)){
            xQuadrant=3;
        }

        if (( y >= 78)&&( y<= 243)){
           yQuadrant=1;

        }
        else if (( y >= 243)&&( y<= 413)){
            yQuadrant=2;
        }
        else if (( y >= 413)&&( y<= 578)){
            yQuadrant=3;
        }

        xystr="";

        xystr+=String(xQuadrant)+String(yQuadrant);

        index=placed_arr.indexOf(xystr);
        


            if(index===-1){
                alert("this has already been placed");
            }

            else if(index > -1){
                element_str+="#q"+yQuadrant+xQuadrant+"in";
                $(element_str).text(x_or_o);
                numOccupied+=1;
                element_str="";

                occupied_arr_user.push(placed_arr[index]);
                placed_arr.splice(index,1);
                DrawLine();
                arr_len=placed_arr.length;

                genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
              
              rev_xy=placed_arr[genIndex].split('').reverse().join('');
        
              element_str+="#q"+rev_xy+"in";
              
              if(x_or_o==="O"){
                $(element_str).text("X");
              }
              else{
                $(element_str).text("O");
              }
               
              
              occupied_arr_AI.push(placed_arr[genIndex]);

              placed_arr.splice(genIndex,1);

              numOccupied+=1;

              DrawLine();
               
            }

            element_str="";
     
    });

  
});