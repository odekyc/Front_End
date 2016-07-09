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

 

function gameStart(){
     
	round_count+=1;

    
   random_num=Math.floor(Math.random() * 4);

   $("#"+color_id[random_num]).css("background-color", color_arr[random_num]); 
    audio.play();
   $('#display').text(round_count);
   result_arr.push(random_num);
   

  
}

function stopGame() {

    clearInterval(myVar);
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
          myVar=setInterval(function(){ 
            $("#"+color_id[random_num]).css("background-color",orig_colors[random_num]);
          	gameStart(); 
           

   			
             
          }, 1000);
         
          }
    	});
    }
    
  

    else if(state===false){
    	$('#display').text('--');
    	$('#display').css('color', '#330000');
    	stopGame();
    	alert(result_arr);
    	$("#blue").css("background-color", "#004d99"); 
    	$("#green").css("background-color", "#004d1a"); 
    	$("#red").css("background-color", "#b30000"); 
    	$("#yellow").css("background-color", "#b3b300"); 
    }
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});