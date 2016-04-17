var x;
var y;
var xQuadrant;
var yQuadrant;
var x_or_o;
var placed_arr=[];
var already_placed=false;
var xGenerated;
var yGenerated;
var xQPlaced;
var yQPlaced;
var numOccupied=0;
var element_str="";
var index=0;

$(document).ready(function() {
   
   

    xGenerated=Math.floor((Math.random() * 3) + 1);
    yGenerated=Math.floor((Math.random() * 3) + 1);
        
    placed_arr.push([xGenerated,yGenerated]);
    numOccupied+=1;
    
    function DrawLine(){

    }
    
    element_str+="#q"+yGenerated+xGenerated+"in";
    
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
      

        for( var i=0; i<placed_arr.length; i++){

            if((placed_arr[i][0]===xQuadrant)&&(placed_arr[i][1]===yQuadrant)){
                already_placed=true;
            }

        }


            if(already_placed===true){
                alert("this has already been placed");
            }

            else if(already_placed===false){

                placed_arr.push([xQuadrant,yQuadrant]);
                element_str+="#q"+yQuadrant+xQuadrant+"in";
                $(element_str).text(x_or_o);
                numOccupied+=1;
                element_str="";
                 
                xGenerated=Math.floor((Math.random() * 3) + 1);
                yGenerated=Math.floor((Math.random() * 3) + 1);

            while( index < placed_arr.length){

                if((placed_arr[index][0]===xGenerated)&&(placed_arr[index][1]===yGenerated)){
                     xGenerated=Math.floor((Math.random() * 3) + 1);
                     yGenerated=Math.floor((Math.random() * 3) + 1);
                     index=0;
                }  
                else{

                    index++;
                }

            }
             
              element_str+="#q"+yGenerated+xGenerated+"in";
              
              if(x_or_o==="O"){
                $(element_str).text("X");
              }
              else{
                $(element_str).text("O");
              }
               

              placed_arr.push([xGenerated,yGenerated]);
              
              numOccupied+=1;
               
            }

            element_str="";

      alert(placed_arr);

    });

 
});
