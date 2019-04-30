$(document).ready(function() {

var id;
var text;
var inner_div_id;
var counter=0;
var result;
var curOperator;
var firstChunkfirst="";
var firstChunksecond="";
var secondChunkfirst="";
var secondChunksecond="";
var firstChunk="";
var secondChunk="";
var firstChunk_i;
var secondChunk_i;
var temp_firstChunk_i;
var firstChunk_i_arr=[];
var i;
var revisedText="";
var firstChunkOptr="";
var secondChunkOptr="";
var all_reg=/[\+\/\-\*\%]/gi;
var multi_div_reg= /[\/\*\%]/gi;
var add_sub_reg= /[\+\-]/gi;
var is_NAN=false;
var is_first_sec_chunk_neg=false;
var is_sec_first_chunk_neg=false;


 var window_width = $(window).width();

  $("#calculator").css({"width": 0.35*window_width+"px"});
   $("#calculator").css({"height": 0.45*window_width+"px"});
    $("#innerkeyboard").css({"width": 0.28*window_width+"px"});
    $("#innerkeyboard").css({"height": 0.27*window_width+"px"});
    $(".keys").css({"width": 0.06*window_width+"px"});
    $(".keys").css({"height": 0.045*window_width+"px"});
   $(window).resize(function(){
      window_width = $(window).width();
      $("#calculator").css({"width": 0.35*window_width+"px"});
      $("#calculator").css({"height": 0.45*window_width+"px"});
      $("#innerkeyboard").css({"width": 0.28*window_width+"px"});
      $("#innerkeyboard").css({"height": 0.27*window_width+"px"});
      $(".keys").css({"width": 0.06*window_width+"px"});
      $(".keys").css({"height": 0.045*window_width+"px"});
});


   soundManager.setup({
    url: './soundmanager2-swf/',
    flashVersion: 9,
    preferFlash: true,
    onready: function() {
        soundManager.createSound({
            id: "ACorCE",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/js_calculator-click-sound.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "NumbersDot",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/js_calculator-clean-button-click.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Operator",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/js_calculator-interface.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Result",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/js_calculator-marimba-sparkle.mp3"],
            autoLoad: true,
            autoPlay: false
        });
        soundManager.createSound({
            id: "Error",
            url: ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/734159/js_calculator-calculator_error.mp3"],
            autoLoad: true,
            autoPlay: false
        });
    }
});

// function pos_to_neg(num)
// {
//     return -Math.abs(num);
// }
  
   $( "#AC" ).click(function() {
     $('#input').attr('readonly', false);
     soundManager.play("ACorCE");
     // $("#ACorCE").get(0).cloneNode().play();
     $("#input").empty();
});

 $(".keys").click(function() {

     id=$(this).attr('id');

     if(id==="AC"){
        $('#input').attr('readonly', false);
        $('#input').empty();
        soundManager.play("ACorCE");
       // $("#ACorCE").get(0).cloneNode().play();
     }
      else if(id==='CE'){
        $('#input').attr('readonly', false);
        soundManager.play("ACorCE");
        // $("#ACorCE").get(0).cloneNode().play();
        var temp_arr=[];
        text=$("#input").text();
        // temp_arr.push(text.lastIndexOf('%'));
        // temp_arr.push(text.lastIndexOf('/'));
        // temp_arr.push(text.lastIndexOf('*'));
        // temp_arr.push(text.lastIndexOf('+'));
        // temp_arr.push(text.lastIndexOf('-'));

        // var max=Math.max.apply(Math, temp_arr);

         text=text.slice(0,-1);
         $("#input").text(text);
     }
     else if(id==="="){
        $('#input').attr('readonly', false);
        text=$("#input").text();
        i=text.search(all_reg);
        
        if(i=== -1){
           
           $('#input').text(text);
           soundManager.play("Result");
          // $("#Result").get(0).cloneNode().play();
        }
        else{
           if(i===0){
              if(text.charAt(0) !== "-"){
                  is_NAN=true;
                  $('#input').text("NaN");
                  soundManager.play("Error");
               // $("#Error").get(0).cloneNode().play();
              }
           }
          
        
          revisedText=text;
          i=revisedText.search(multi_div_reg);
         
            
            while(i!== -1){

              if(is_NAN){
                break;
              }
            
              firstChunk=revisedText.slice(0,i);
              // alert("firstChunk"+firstChunk);
              curOperator=revisedText.slice(i,i+1);
              secondChunk=revisedText.slice(i+1);
              // alert("secondChunk"+secondChunk);
              firstChunk_i_arr.length = 0;
              firstChunk_i_arr.push(firstChunk.lastIndexOf("+"));
              firstChunk_i_arr.push(firstChunk.lastIndexOf("-")); 
              firstChunk_i = Math.max.apply(null, firstChunk_i_arr);
              // alert(firstChunk_i_arr);
              secondChunk_i = secondChunk.search(all_reg);
              if(firstChunk_i == -1){
                
                firstChunkfirst="";
                firstChunksecond=firstChunk;
                firstChunkOptr= "";
              }
              else{

                if(firstChunk.charAt(firstChunk_i) === "-"){
                      if(['-', '/','+','*','%'].includes(firstChunk.charAt(firstChunk_i-1))){
                          // alert("first chunk character at first chunk i is -, and there is another operator right before it!")
                          firstChunk_i -= 1;
                          is_first_sec_chunk_neg=true;
                      }

                }
                
                firstChunkfirst=firstChunk.slice(0,firstChunk_i);
                firstChunksecond=firstChunk.slice(firstChunk_i+1);
                firstChunkOptr= firstChunk[firstChunk_i];
                // alert("firstChunk splitting operator "+firstChunk[firstChunk_i]+" at index "+firstChunk_i);
              }

              if(secondChunk_i == -1){
                
                secondChunkfirst=secondChunk;
                secondChunksecond="";
                secondChunkOptr= "";
              }
              else if(secondChunk_i !== -1){
                if(secondChunk_i === 0){
                    if(secondChunk.charAt(0) === "-"){
                       secondChunk_i = secondChunk.slice(1).search(all_reg)+1;
                       is_sec_first_chunk_neg = true;
                       if(secondChunk_i == 0){
                          // alert("secondChunk splitting operator none index -1")
                          secondChunkfirst=secondChunk;
                          secondChunksecond="";
                          secondChunkOptr= "";

                       }
                       else{
                            secondChunkfirst=secondChunk.slice(0,secondChunk_i);
                            secondChunksecond=secondChunk.slice(secondChunk_i+1);
                            secondChunkOptr= secondChunk[secondChunk_i];
                       }
                    }
                    else{
                       is_NAN=true;
                       break;
                    }
                }
                else{

                    secondChunkfirst=secondChunk.slice(0,secondChunk_i);
                    secondChunksecond=secondChunk.slice(secondChunk_i+1);
                    secondChunkOptr= secondChunk[secondChunk_i];

                }
                 // alert("secondChunk splitting operator "+secondChunk[secondChunk_i]+" at index "+secondChunk_i);
              }
              
              // alert("firstChunksecond "+firstChunksecond);
              // alert("secondChunkfirst "+secondChunkfirst);
              if(curOperator == "*"){
                result= Number(firstChunksecond) * Number(secondChunkfirst);
              }
              else if(curOperator == "/"){
                result= Number(firstChunksecond) / Number(secondChunkfirst);
              }
              else if(curOperator == "%"){
                result= Number(firstChunksecond) % Number(secondChunkfirst);
              }     

              // alert("result "+result);
              revisedText=String(firstChunkfirst)+firstChunkOptr+String(result)+secondChunkOptr+String(secondChunksecond);
              // alert("revisedText"+revisedText);
              is_first_sec_chunk_neg=false;
              is_sec_first_chunk_neg=false;
              i=revisedText.search(multi_div_reg);
            }
          
            curOperator="";
            firstChunkfirst="";
            firstChunksecond="";
            secondChunkfirst="";
            secondChunksecond="";
            firstChunk="";
            secondChunk="";
            firstChunk_i=0;
            secondChunk_i=0;
            temp_firstChunk_i=0;
            firstChunk_i_arr=[];
            firstChunkOptr="";
            secondChunkOptr="";
            i=revisedText.search(add_sub_reg);
         
            if(i!== -1){
              if(i === 0){
                
                  if(revisedText.charAt(0)!=='-'){
                     is_NAN=true;
                  }
                  else{
                      i=revisedText.slice(1).search(add_sub_reg)+1;
                      is_first_sec_chunk_neg=true;
                  }
                  
               }
              
                while( i!== -1){

                  if(is_NAN){
                    break;
                  }
                  
                  firstChunk= revisedText.slice(0,i);
                  curOperator= revisedText[i];
                  secondChunk = revisedText.slice(i+1);
                  firstChunksecond=firstChunk;
                  secondChunk_i=secondChunk.search(add_sub_reg);
                  // alert("firstChunk "+ firstChunk);
                  // alert("secondChunk "+secondChunk);
                  // alert("curOperator "+curOperator);
                  // alert("secondChunk_i "+secondChunk_i);
                  if(secondChunk_i == -1){
                    if(curOperator=="+"){
                      result = Number(firstChunk)+Number(secondChunk);   
                    }
                    else if(curOperator=="-"){
                      result = Number(firstChunk)-Number(secondChunk);
                    }
                    revisedText=String(result);
                    break;
                  }
                  else{
                      if(secondChunk_i == 0){
                        if(secondChunk.charAt(0)=== '-'){
                           // alert("in the right place");
                           is_sec_first_chunk_neg=true;
                           secondChunk_i=secondChunk.slice(1).search(add_sub_reg)+1;
                           // alert("secondChunk in the right place "+secondChunk);
                           // alert("secondChunk_i in the right place "+secondChunk_i);
                           if(secondChunk_i==0){
                               // alert("in the right right place");
                               if(curOperator=="+"){
                                  result = Number(firstChunk)+Number(secondChunk);   
                                }
                                else if(curOperator=="-"){
                                  result = Number(firstChunk)-Number(secondChunk);
                                }
                                revisedText=String(result);
                                break;
                           }

                        }
                        else{
                             is_NAN=true;
                             break;
                        }
                        
                      }
                  

                     // alert("secondChunk_i "+secondChunk_i);
                    secondChunkfirst = secondChunk.slice(0,secondChunk_i);
                    secondChunkOptr=secondChunk[secondChunk_i];
                    secondChunksecond = secondChunk.slice(secondChunk_i + 1);
                    if(curOperator=="+"){
                      result = Number(firstChunk)+Number(secondChunkfirst);   
                    }
                    else if(curOperator=="-"){
                      result = Number(firstChunk)-Number(secondChunkfirst);
                    }
                    // alert("result "+result);
                    // alert("secondChunkOptr "+secondChunkOptr);
                    // alert("secondChunksecond "+secondChunksecond);
                    revisedText=String(result) + secondChunkOptr + secondChunksecond;
                    // alert("revisedText "+revisedText);
                    is_first_sec_chunk_neg=false;
                    is_sec_first_chunk_neg=false;
                    if(result<0){
                        i=revisedText.slice(1).search(add_sub_reg)+1;
                    }else{
                        i=revisedText.search(add_sub_reg);
                    }
                    
                  
                 } 
                }
              
            }
            if(is_NAN == true){
              $("#input").text("NaN");
              soundManager.play("Error");
               // $("#Error").get(0).cloneNode().play();
            }
            else{

              $("#input").text(revisedText);
              soundManager.play("Result");
               // $("#Result").get(0).cloneNode().play();
            }
               
        }
     }
     

     
     else if(((Number(id)>=0)&&(Number(id)<=9))||(id==='+')||(id==='-')||(id==='*')||(id==='/')||(id==='%')){
        var inputTextLen = $("#input").text().length;
        if(inputTextLen==22){
          soundManager.play("Error");
          // $("#Error").get(0).cloneNode().play();
          $('#input').attr('readonly', true);
        }
        else{
            $('#input').attr('readonly', false);
            if((Number(id)>=0)&&(Number(id)<=9)){
            soundManager.play("NumbersDot");
            // $("#NumbersDot").get(0).cloneNode().play();
              
            }
           else{
            soundManager.play("Operator");
             // $("#Operator").get(0).cloneNode().play();
           }
            counter+=1;
            if( counter===1){
                $("#input").text(id);

            }
            else if(counter>=1){
                text=$("#input").text();
                text+=id;
                $("#input").text(text);
            }
        }
     }
     else if(id==='dot'){
      var inputTextLen = $("#input").text().length;
      if(inputTextLen==22){
        soundManager.play("Error");
        // $("#Error").get(0).cloneNode().play();
        $('#input').attr('readonly', true);
      }
      else{
         $('#input').attr('readonly', false);
         soundManager.play("NumbersDot");
         // $("#NumbersDot").get(0).cloneNode().play();
          counter+=1;
          if( counter===1){
              $("#input").text('.');

          }
          else if(counter>=1){
              text=$("#input").text();
              text+='.';
              $("#input").text(text);
          }
      }
     }

});

});
