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
var round_count=1;
var random_num=1;
var firsttimeswitchon=true;
var restarted=false;
var poweron=false;

function gameStart(){
            
           
           

}


function stopGame() {
    
    

}



      poweron=true;

      if(poweron){

      if(firsttimeswitchon===false){
        restarted=true;
      }
     
      


    	$('#display').css('color', 'red');

        $('#inner_strict').on('click',function(){
          

           stricton=!stricton;
           
           alert("stricton: "+stricton);

          

            if(stricton===true){
        	    $('#strict_alert').css('background-color', 'red');
            
        	 }
            else if(stricton===false){

        		$('#strict_alert').css('background-color', 'grey');
        	
       		 }
          
           
        });

 

    	$('#inner_start').on('click', function(){
      
    	});
    }
    
  
  

   
      poweron=false;
       firsttimeswitchon=false;
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

      stricton=false;      
      alert("state: "+state);
      alert("poweron: "+poweron);
    
      

    
});

// var cur_state=$('#bootstrapswitch').bootstrapSwitch('state');

// alert(cur_state);

});