var x;
var y;
var xQuadrant;
var yQuadrant;
var tempx;
var tempy;
$(document).ready(function() {
     $("#X").click(function(e){
        tempx=e.clientX;
        tempy=e.clientY;
        alert(tempx);
    });
  
    $("#board").click(function(e){
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

        if (( y >= 76)&&( x<= 236)){
           yQuadrant=1;

        }
        else if (( y >= 236)&&( y<= 396)){
            yQuadrant=2;
        }
        else if (( y >= 396)&&( y<= 577)){
            yQuadrant=3;
        }


        
    });
 
});
