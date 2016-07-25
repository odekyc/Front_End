$(document).ready(function() {
  
var audio = $("audio")[0];
var audio2=$("audio")[1];
var orig_colors=["#004d99", "#004d1a" ,"#b30000", "#b3b300"];
var color_arr=["blue","#00cc00","red","yellow"];
var color_id=["blue","green","red","yellow"];
var result_arr=[];
var result_arrCounter=0;
var user_clicked=[];
var user_clickedCounter=0;
var stricton=false;
var running=false;
var round_level=1;
var random_num=null;
var poweron=false;
var b4runblink;
var playResultInt;
var playIntTime=14700;
var clicked_num=null;

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

     $('#inner_start').on('click', function(){
            
            
             if(running){
              running=false;
             
              $('#inner_strict').css("pointer-events", "auto");
              $('#inner_start').css("background-color", "red");
              $("#blue").css("background-color", "#004d99"); 
              $("#green").css("background-color", "#004d1a"); 
              $("#red").css("background-color", "#b30000"); 
              $("#yellow").css("background-color", "#b3b300");
              $('#display').text('--');
              clearInterval(b4runblink);
              clearInterval(playResultInt);
              clearTimeout(presetlv1);
              round_level=1;
              result_arr=[];
              user_clicked=[];

              round_level=1;


             }
             else if(!running){
                running=true;
               
                $('#inner_strict').css("pointer-events", "none");
                $('#inner_start').css("background-color", "green");

                random_num=Math.floor((Math.random() * 4));
                result_arr.push(random_num);
                result_arrCounter++;
               
                   b4runblink=setInterval(function(){
                       $('#display').text('');
                       setTimeout(function(){
                          $('#display').text('--');
                       }, 700);
                   }, 1400);
                   
                   var presetlv1=setTimeout(function(){
                    clearInterval(b4runblink);   
                    $('#display').text('1');
                    $('#'+color_id[random_num]).css("background-color",color_arr[random_num]);
                    $("#audio"+random_num).get(0).cloneNode().play();
                    setTimeout(function(){
                          $('#'+color_id[random_num]).css("background-color",orig_colors[random_num]);
                          
                    }, 1000);
                    
                   }, 5100);

                   
                   
                   $('.fourcolors').css("pointer-events", "auto");
                   $(".fourcolors").click(function(e){
                       result_arrCounter=0;
                      
                       var clickColor=e.target.id;
                       switch(clickColor){
                        case "blue":
                            clicked_num=0;
                           
                            break;
                        case "green":
                            clicked_num=1;
                            
                            break;
                        case "red":
                            clicked_num=2;
                            
                            break;

                        case "yellow":
                            clicked_num=3;
                          
                            break;
                       }

                     $("#audio"+clicked_num).get(0).cloneNode().play();

                   
                     user_clickedCounter++;

                if(user_clickedCounter===result_arr.length){
                     $('.fourcolors').css("pointer-events", "none");
                     result_arrCounter=0;
                    random_num=Math.floor((Math.random() * 4));
                    result_arr.push(random_num);
                    round_level++;
                      playResultInt=setInterval(function(){
                             
                             $('#display').text(round_level);
                             $('#'+color_id[result_arr[result_arrCounter]]).css("background-color",color_arr[result_arr[result_arrCounter]]);
                              $("#audio"+result_arr[result_arrCounter]).get(0).cloneNode().play();
                              setTimeout(function(){
                                    $('#'+color_id[result_arr[result_arrCounter]]).css("background-color",orig_colors[result_arr[result_arrCounter]]);
                                     result_arrCounter++;
                                    
                              if(result_arrCounter===result_arr.length){
                                  user_clickedCounter=0;
                                  clearInterval(playResultInt);
                                  $('.fourcolors').css("pointer-events", "auto");  
                                }
                              }, 1000);
                             
                              
                      }, 2500);

                  }
                   });
                
                   
             }
           
      });





    $('#switchoff').click(function(){

      poweron=true;
       $('#switchoff').css('visibility', 'hidden');
       $('#switchon').css('visibility', 'visible');
       stricton=false;
       if(poweron){
       
       $('#inner_start').css("pointer-events", "auto");
       $('#inner_strict').css("pointer-events", "auto");
     
       


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
        clearInterval(b4runblink);
        clearInterval(playResultInt);
        clearTimeout(presetlv1);
       
    });




});