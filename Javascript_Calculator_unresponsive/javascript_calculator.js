

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
  
   $( "#AC" ).click(function() {
     $('#input').attr('readonly', false);
     $("#ACorCE").get(0).cloneNode().play();
     $("#input").empty();
});

 $(".keys").click(function() {

     id=$(this).attr('id');

     if(id==="AC"){
        $('#input').attr('readonly', false);
        $('#input').empty();
       $("#ACorCE").get(0).cloneNode().play();
     }
      else if(id==='CE'){
        $('#input').attr('readonly', false);
        $("#ACorCE").get(0).cloneNode().play();
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
          $("#Result").get(0).cloneNode().play();
        }
        else if( i === 0 ){
           is_NAN=true;
           $('#input').text("NAN");
          $("#Error").get(0).cloneNode().play();
        }
        else{
          revisedText=text;
          i=revisedText.search(multi_div_reg);
         
          if(i===0){
            
            is_NAN=true;
            $("#input").text("NAN");
             $("#Error").get(0).cloneNode().play();
          }
          else if(i>0){
            
            while(i!== -1){
              firstChunk=revisedText.slice(0,i);
              curOperator=revisedText.slice(i,i+1);
              secondChunk=revisedText.slice(i+1);
              firstChunk_i_arr.push(firstChunk.lastIndexOf("+"));
              firstChunk_i_arr.push(firstChunk.lastIndexOf("-")); 
              firstChunk_i = Math.max.apply(null, firstChunk_i_arr);
              secondChunk_i = secondChunk.search(all_reg);
              if(firstChunk_i == -1){
                
                firstChunkfirst="";
                firstChunksecond=firstChunk;
                firstChunkOptr= "";
              }
              else{
                
                firstChunkfirst=firstChunk.slice(0,firstChunk_i);
                firstChunksecond=firstChunk.slice(firstChunk_i+1);
                firstChunkOptr= firstChunk[firstChunk_i];
              }

              if(secondChunk_i == -1){
                
                secondChunkfirst=secondChunk;
                secondChunksecond="";
                secondChunkOptr= "";
              }
              else if(secondChunk_i == 0){
                
                is_NAN=true;
                break;
              }
              else{
                
                secondChunkfirst=secondChunk.slice(0,secondChunk_i);
                secondChunksecond=secondChunk.slice(secondChunk_i+1);
                secondChunkOptr= secondChunk[secondChunk_i];
              }
              if(curOperator == "*"){
                result= Number(firstChunksecond) * Number(secondChunkfirst);
              }
              else if(curOperator == "/"){
                result= Number(firstChunksecond) / Number(secondChunkfirst);
              }
              else if(curOperator == "%"){
                result= Number(firstChunksecond) % Number(secondChunkfirst);
              }     
              revisedText=String(firstChunkfirst)+firstChunkOptr+String(result)+secondChunkOptr+String(secondChunksecond);

              i=revisedText.search(multi_div_reg);
            }
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
              if(i== 0){
                is_NAN=true;
              }
              else{
                while( i!== -1){
                  
                  
                  firstChunk= revisedText.slice(0,i);
                  curOperator= revisedText[i];
                  secondChunk = revisedText.slice(i+1);
                  firstChunksecond=firstChunk;
                  secondChunk_i=secondChunk.search(add_sub_reg);
                  if(secondChunk_i == 0){
                    is_NAN=true;
                    break;
                  }
                  else if(secondChunk_i == -1){
                    if(curOperator=="+"){
                      result = Number(firstChunk)+Number(secondChunk);   
                    }
                    else if(curOperator=="-"){
                      result = Number(firstChunk)-Number(secondChunk);
                    }
                    revisedText=String(result);
                    break;
                  }
                  else if(secondChunk_i > 0){
                    secondChunkfirst = secondChunk.slice(0,secondChunk_i);
                    secondChunkOptr=secondChunk[secondChunk_i];
                    secondChunksecond = secondChunk.slice(secondChunk_i + 1);
                    if(curOperator=="+"){
                      result = Number(firstChunk)+Number(secondChunkfirst);   
                    }
                    else if(curOperator=="-"){
                      result = Number(firstChunk)-Number(secondChunkfirst);
                    }
                    
                    revisedText=String(result) + secondChunkOptr + secondChunksecond;
                    
                  }
                  if(result<0){
                    i=revisedText.slice(1).search(add_sub_reg)+1;
                  }
                  else{
                    i=revisedText.search(add_sub_reg);
                  }
                  
                }
              }
            }
            if(is_NAN == true){
              $("#input").text("NAN");
               $("#Error").get(0).cloneNode().play();
            }
            else{
              $("#input").text(revisedText);
               $("#Result").get(0).cloneNode().play();
            }
               
        }
     }
     

     
     else if(((Number(id)>=0)&&(Number(id)<=9))||(id==='+')||(id==='-')||(id==='*')||(id==='/')||(id==='%')){
        var inputTextLen = $("#input").text().length;
        if(inputTextLen==20){
          $("#Error").get(0).cloneNode().play();
          $('#input').attr('readonly', true);
        }
        else{
            $('#input').attr('readonly', false);
            if((Number(id)>=0)&&(Number(id)<=9)){
          
                $("#NumbersDot").get(0).cloneNode().play();
              
            }
           else{
             $("#Operator").get(0).cloneNode().play();
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
      if(inputTextLen==20){
        $("#Error").get(0).cloneNode().play();
        $('#input').attr('readonly', true);
      }
      else{
         $('#input').attr('readonly', false);
         $("#NumbersDot").get(0).cloneNode().play();
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