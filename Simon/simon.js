$(document).ready(function() {
  
var audio = $("audio")[0];
var orig_colors=["#004d99", "#004d1a" ,"#b30000", "#b3b300"];
var color_arr=["blue","#00cc00","red","yellow"];
var color_id=["blue","green","red","yellow"];
var result_arr=[];
var user_clicked=[];
var stricted=false;
var round_count=0;
var random_num=1;
var user_responded=false;
 

function gameStart(){
     
	round_count+=1;

   random_num=Math.floor(Math.random() * 4);
   
   $("#"+color_id[random_num]).css("background-color", color_arr[random_num]); 
    audio.play();
   $('#display').text(round_count);
   result_arr.push(random_num);

   setTimeout(function(){ 
    
    $("#"+color_id[random_num]).css("background-color", orig_colors[random_num]); 
    

 

    }, 30);

   setTimeout(function(){
    alert("please click on a color");
  
     $('#blue').on('click', function(){
        user_responded=true;
         user_clicked.pop();
        user_clicked.push(0);
     });

     $('#green').on('click', function(){
       user_responded=true;
        user_clicked.pop();
       user_clicked.push(1);
     });

      $('#red').on('click', function(){
       user_responded=true;
        user_clicked.pop();
       user_clicked.push(2);
     });

       $('#yellow').on('click', function(){
       user_responded=true;
        user_clicked.pop();
       user_clicked.push(3);
     });


     }, 1000);

     setTimeout(function(){

    

    if((result_arr.length>user_clicked.length)||(result_arr[result_arr.length-1]!==user_clicked[user_clicked.length-1])){

     blink=setInterval(function(){
      $('#display').text('--');
      $('#display').css('color', '#330000');

      setTimeout(function(){
        $('#display').text('!!');
      $('#display').css('color', 'red');



      }, 500);


     }, 1000 );
     
     setTimeout(function(){
       clearInterval(blink);
       
     }, 3000);

     if(result_arr.length>user_clicked.length){
      result_arr.pop();

      alert("you didn't click a color, please try again!");
     }

     if(result_arr[result_arr.length-1]!== user_clicked[user_clicked.length-1]){
      

      result_arr.pop();
      user_clicked.pop();

      alert("you clicked the wrong color, please try again!")
     }

    
  }
  else{
     alert("you clicked the correct color, next round!");
  }

  }, 7000);
}


function stopGame() {

    clearInterval(myVar);
    clearInterval(blink);
}

$("[name='my-checkbox']").bootstrapSwitch();


$('#bootstrapswitch').on('switchChange.bootstrapSwitch', function (event, state) {
    
   
  
    if(state===true){
    	$('#display').css('color', 'red');

        $('#inner_strict').on('click',function(){
           stricted=!stricted;
           if(state===true){
            if(stricted===true){
        	    $('#strict_alert').css('background-color', 'red');
        	}
            else if(stricted===false){

        		$('#strict_alert').css('background-color', 'grey');
        	
       		 }
           }
        });

 

    	$('#inner_start').on('click', function(){
          if(stricted===false){
          gameStart();
          myVar=setInterval(function(){
          
          gameStart();


          }, 14000);
         
          }
    	});
    }
    
  

    else if(state===false){
    	$('#display').text('--');
    	$('#display').css('color', '#330000');
    	stopGame();
    	alert(result_arr);
      alert(user_clicked);
    	$("#blue").css("background-color", "#004d99"); 
    	$("#green").css("background-color", "#004d1a"); 
    	$("#red").css("background-color", "#b30000"); 
    	$("#yellow").css("background-color", "#b3b300"); 
      result_arr=[];
      user_clicked=[];
    }
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});