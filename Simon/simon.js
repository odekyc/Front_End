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
var b4runblink;
var gameInt;

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
            
            
             if(running){
              running=false;
             
              $('#inner_strict').css("pointer-events", "auto");
              $('#inner_start').css("background-color", "red");
              $('#display').text('--');
              clearInterval(b4runblink);
              clearTimeout(presetlv1);
             }
             else if(!running){
                running=true;
               
                 $('#inner_strict').css("pointer-events", "none");
                $('#inner_start').css("background-color", "green");
               
                   b4runblink=setInterval(function(){
                       $('#display').text('');
                       setTimeout(function(){
                          $('#display').text('--');
                       }, 700);
                   }, 1400);
                   
                   var presetlv1=setTimeout(function(){
                    clearInterval(b4runblink);   
                    $('#display').text('1');
                   }, 6500);
                   
                   gameInt=setInterval(function(){
                    alert("in game interval");
                        $('#display').text(round_level);
                        Math.floor((Math.random() * 4));
                        round_level+=1;
                        
                        $("#audio2").get(0).cloneNode().play();
                   },15000);

                  
                   
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
       $('#inner_start').css("background-color", "red");
       clearInterval(gameInt)
       
    });




});