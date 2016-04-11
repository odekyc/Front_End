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

    while(numOccupied<10){

        xGenerated=Math.floor((Math.random() * 3) + 1);
        yGenerated=Math.floor((Math.random() * 3) + 1);
        
        placed_arr.push([xGenerated,yGenerated]);
        numOccupied+=1;
    }

$(document).ready(function() {
    
     $("#X").click(function(e){
        e.stopPropagation();
        x_or_o="x";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "white");
        $(".borders").css("stroke", "#ffff80");

    });
  
    $("#O").click(function(e){
        e.stopPropagation();
        x_or_o="o";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "white");
        $(".borders").css("stroke", "#ffff80");
        
    });

    $("#board").click(function(e){
        already_placed=false;




        x=e.clientX;
        y=e.clientY;

        if (( x >= 396)&&( x<= 566)){
           xQuadrant=1;

        }
        else if (( x >= 566)&&( x<= 726)){
            xQuadrant=2;
        }
        else if (( x >= 726)&&( x<= 895)){
            xQuadrant=3;
        }

        if (( y >= 76)&&( y<= 236)){
           yQuadrant=1;

        }
        else if (( y >= 236)&&( y<= 396)){
            yQuadrant=2;
        }
        else if (( y >= 396)&&( y<= 577)){
            yQuadrant=3;
        }
      




        if(placed_arr.length===0){
            placed_arr.push([xQuadrant,yQuadrant]);
        }

        else{
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
                numOccupied+=1;
            }
        }

        
    });
 
});
