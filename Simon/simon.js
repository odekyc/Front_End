$(document).ready(function() {
  
var audio = $("audio")[0];
var color_arr=["blue","green","red","yellow"];
var result_arr=[];
var user_clicked=[];
var stricted=false;

$("[name='my-checkbox']").bootstrapSwitch();


$('#bootstrapswitch').on('switchChange.bootstrapSwitch', function (event, state) {
    
  
    if(state===true){
    	$('#display').css('color', 'red');

        $('#inner_strict').on('click',function(){
           stricted=!stricted;
           alert(stricted);
            if(stricted===true){
        	    $('#strict_alert').css('background-color', 'red');
        	}
            else if(stricted===false){
        		$('#strict_alert').css('background-color', 'grey');
       		 }
           
        });

 

    	$('#inner_start').on('click', function(){
          alert("inner_start clicked");
          $('#display').text('01');
          audio.play();
          
    	});
    }

    else if(state===false){
    	$('#display').text('--');
    	$('#display').css('color', '#330000');
    }
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});