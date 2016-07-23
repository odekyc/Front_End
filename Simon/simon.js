$(document).ready(function() {
  
var audio = $("audio")[0];
var audio2=$("audio")[1];
var orig_colors=["#004d99", "#004d1a" ,"#b30000", "#b3b300"];
var color_arr=["blue","#00cc00","red","yellow"];
var color_id=["blue","green","red","yellow"];
var result_arr=[];
var user_clicked=[];
var stricton=false;
var running=false;
var round_level=1;
var random_num=null;
var poweron=false;


    $('#inner_strict').on('click',function(){
          

          if(stricton){
            stricton=false;
            alert("stricton: "+stricton);
            $('#strict_alert').css('background-color', 'grey');
            
          }
          else if(!stricton){
            stricton=true;
            alert("stricton: "+stricton);
            $('#strict_alert').css('background-color', 'red');
          }
          
           
        });

     $('#inner_start').on('click', function(){
            
            alert("inner_start clicked");
             if(running){
              running=false;
             alert("running is false");
              $('#inner_strict').css("pointer-events", "auto");
              $('#inner_start').css("background-color", "red");
             }
             else if(!running){
                running=true;
                alert("running is true");
                 $('#inner_strict').css("pointer-events", "none");
                $('#inner_start').css("background-color", "green");
             }
           
      });



    $('.fourcolors').click(function(e){
        alert(e.target.id);
    });


    $('#switchoff').click(function(){

      poweron=true;
       $('#switchoff').css('visibility', 'hidden');
       $('#switchon').css('visibility', 'visible');
       stricton=false;
       if(poweron){
       
       $('#inner_start').css("pointer-events", "auto");
       $('#inner_strict').css("pointer-events", "auto");
       
       alert("power's on");
     
       $('.fourcolors').css("pointer-events", "auto");


      $('#display').css('color', 'red');


       }
    });

  $('#switchon').click(function(){
      $('#display').text('--');
      $('#display').css('color', '#330000');
       $('#strict_alert').css('background-color', 'grey');
      $("#blue").css("background-color", "#004d99"); 
      $("#green").css("background-color", "#004d1a"); 
      $("#red").css("background-color", "#b30000"); 
      $("#yellow").css("background-color", "#b3b300");
      $("#"+color_id[random_num]).css("background-color", orig_colors[random_num]);  
      result_arr=[];
      user_clicked=[];
      running=false;
      stricton=false;      
      round_level=1;
      poweron=false;
       $('#switchoff').css('visibility', 'visible');
       $('#switchon').css('visibility', 'hidden');
       $('#inner_start').css("pointer-events", "none");
       $('#inner_strict').css("pointer-events", "none");
       $('.fourcolors').css("pointer-events", "none");
       alert("running is false");
    });




});