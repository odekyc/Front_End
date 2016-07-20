$(document).ready(function() {
  
var audio = $("audio")[0];
var audio2=$("audio")[1];
var orig_colors=["#004d99", "#004d1a" ,"#b30000", "#b3b300"];
var color_arr=["blue","#00cc00","red","yellow"];
var color_id=["blue","green","red","yellow"];
var result_arr=[];
var user_clicked=[];
var stricted=false;
var round_count=0;
var random_num=1;
var user_responded=false;
var setTime1;
var setTime2;
var setTime3;
var setTime4;
var setTime5;
var switchon=true;
var restarted=false;

function gameStart(){
            
           
              round_count++;

   random_num=Math.floor(Math.random() * 4);
   
   $("#"+color_id[random_num]).css("background-color", color_arr[random_num]); 
    audio.play();
   $('#display').text(round_count);
   result_arr.push(random_num);
   
   if(switchon){

   setTime1=setTimeout(function(){ 
    
    $("#"+color_id[random_num]).css("background-color", orig_colors[random_num]); 
    
     
 

    }, 30);
 }
   if(switchon){

   setTime2=setTimeout(function(){
   
  
     $('#blue').click (function(){
        user_responded=true;
        user_clicked.push(0);
     });

     $('#green').click( function(){
       user_responded=true;

       user_clicked.push(1);
     });

      $('#red').click(function(){
       user_responded=true;
       user_clicked.push(2);
     });

       $('#yellow').click(function(){
       user_responded=true;
       user_clicked.push(3);
     });
     
     
     }, 1000);
   }

   
     setTime3=setTimeout(function(){
   

     
    if((result_arr.length>user_clicked.length)||(result_arr[result_arr.length-1]!==user_clicked[user_clicked.length-1])){
    if(switchon){
     blink=setInterval(function(){
      $('#display').text('--');
      $('#display').css('color', '#330000');
       if(switchon){
      setTime4=setTimeout(function(){
        audio2.play();
        $('#display').text('!!');
      $('#display').css('color', 'red');
        
      

      }, 500);
      }

     }, 1000 );
     }

     if(switchon){
     setTime5=setTimeout(function(){
       clearInterval(blink);
       
       
     }, 3000);
     }
     if(result_arr.length>user_clicked.length){
      result_arr.pop();

      
     }

     if(result_arr[result_arr.length-1]!== user_clicked[user_clicked.length-1]){
      

      result_arr.pop();
      user_clicked.pop();

     
     }

    
  }


  }
  , 7000);

}


function stopGame() {
    
    

}

$("[name='my-checkbox']").bootstrapSwitch();


$('#bootstrapswitch').on('switchChange.bootstrapSwitch', function (event, state) {
    
   
  
    if(state===true){
      if(switchon===false){
        restarted=true;
      }
      switchon=true;
      


    	$('#display').css('color', 'red');

        $('#inner_strict').on('click',function(){
           stricted=!stricted;
           if(state===true){
            if(switchon===true){

            if(stricted===true){
        	    $('#strict_alert').css('background-color', 'red');
            
        	 }
            else if(stricted===false){

        		$('#strict_alert').css('background-color', 'grey');
        	
       		 }
          }
           }
        });

 

    	$('#inner_start').on('click', function(){
      
        if(switchon===true){
          if(stricted===false){
          
            gameStart();

          myVar=setInterval(function(){
          
            gameStart();
             
            

          }, 12000);
          
          }
        }
    	});
    }
    
  

    else if(state===false){
       switchon=false;
       alert(switchon);
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
      clearInterval(myVar);
      alert("hi");
      

    }
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});