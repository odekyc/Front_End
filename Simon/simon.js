$(document).ready(function() {
  
var audio = $("audio")[0];
var color_arr=["blue","green","red","yellow"];
var result_arr=[];
var user_clicked=[];
var stricted=false;
var round_count=0;

function gameStart(){
   round_count+=1;
   $('#display').text(round_count);
   audio.play();
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
           
            if(stricted===true){
        	    $('#strict_alert').css('background-color', 'red');
        	}
            else if(stricted===false){

        		$('#strict_alert').css('background-color', 'grey');
        	
       		 }
           
        });

 

    	$('#inner_start').on('click', function(){
          if(stricted===false){
          myVar=setInterval(function(){ gameStart() }, 7000);
         
          }
    	});
    }
    
  

    else if(state===false){
    	alert("state false");
    	$('#display').text('--');
    	$('#display').css('color', '#330000');
    	stopGame();
    	
    }
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});