$(document).ready(function() {
   
$("[name='my-checkbox']").bootstrapSwitch();

$('#bootstrapswitch').on('switchChange.bootstrapSwitch', function (event, state) {
    
    if(state===true){
    	$('#display').css('color', 'red');
    	$('#inner_start').on('click', function(){
          alert("inner_start clicked");
          $('#display').text('01');
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