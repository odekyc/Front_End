



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
  $("#input").empty();
});

 $(".keys").click(function() {
     id=$(this).attr('id');

     if(id==="AC"){
        $('#input').empty();
     }
      else if(id==='CE'){
        var temp_arr=[];
        text=document.getElementById('input').innerHTML;
        temp_arr.push(text.lastIndexOf('%'));
        temp_arr.push(text.lastIndexOf('/'));
        temp_arr.push(text.lastIndexOf('*'));
        temp_arr.push(text.lastIndexOf('+'));
        temp_arr.push(text.lastIndexOf('-'));

        var max=Math.max.apply(Math, temp_arr);

         text=text.slice(0,max);
         document.getElementById('input').innerHTML=text;
     }
     else if(id==="="){
        alert("id=='='");
        text=document.getElementById('input').innerHTML;
        i=text.search(all_reg);
        alert("i"+i);
        if(i=== -1){
           alert("no operator at all");
           $('#input').text(text);
        }
        else if( i === 0 ){
           is_NAN=true;
           $('#input').text("NAN");
        }
        else{
          revisedText=text;
          i=revisedText.search(multi_div_reg);
         
          if(i===0){
            alert("operator at index 0 beginning");
            is_NAN=true;
            $("#input").text("NAN");
          }
          else if(i>0){
            alert("*\% operators present");
            while(i!== -1){
              firstChunk=revisedText.slice(0,i);
              curOperator=revisedText.slice(i,i+1);
              secondChunk=revisedText.slice(i+1);
              firstChunk_i_arr.push(firstChunk.lastIndexOf("+"));
              firstChunk_i_arr.push(firstChunk.lastIndexOf("-")); 
              firstChunk_i = Math.max.apply(null, firstChunk_i_arr);
              secondChunk_i = secondChunk.search(all_reg);
              if(firstChunk_i == -1){
                alert("firstChunk_i == -1");
                firstChunkfirst="";
                firstChunksecond=firstChunk;
                firstChunkOptr= "";
              }
              else{
                alert("firstChunk_i >0");
                firstChunkfirst=firstChunk.slice(0,firstChunk_i);
                firstChunksecond=firstChunk.slice(firstChunk_i+1);
                firstChunkOptr= firstChunk[firstChunk_i];
              }

              if(secondChunk_i == -1){
                alert("secondChunk_i == -1");
                secondChunkfirst=secondChunk;
                secondChunksecond="";
                secondChunkOptr= "";
              }
              else if(secondChunk_i == 0){
                alert("secondChunk_i == 0");
                is_NAN=true;
                break;
              }
              else{
                alert("secondChunk_i > 0");
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
                  alert("inside + - while loop, i="+i);
                  
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
                    alert("at the end of each +- while loop revisedText"+revisedText);
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
            }
            else{
              $("#input").text(revisedText);
            }
               
        }
     }
     

     
     else if(((Number(id)>=0)&&(Number(id)<=9))||(id==='+')||(id==='-')||(id==='*')||(id==='/')||(id==='%')){
        counter+=1;
        if( counter===1){
            document.getElementById('input').innerHTML=id;

        }
        else if(counter>=1){
            text=document.getElementById('input').innerHTML;
            text+=id;
            document.getElementById('input').innerHTML=text;
        }
     }
     else if(id==='dot'){
        counter+=1;
        if( counter===1){
            document.getElementById('input').innerHTML='.';

        }
        else if(counter>=1){
            text=document.getElementById('input').innerHTML;
            text+='.';
            document.getElementById('input').innerHTML=text;
        }
     }

});

});



// var id;
// var text;
// var inner_div_id;
// var counter=0;
// var result;
// var curOperator;

// $(document).ready(function() {

  
//    $( "#AC" ).click(function() {
//   $("#input").empty();
// });

//  $(".keys").click(function() {
//      id=$(this).attr('id');

//      if(id==="AC"){
//         $('#input').empty();
//      }
//       else if(id==='CE'){
//         var temp_arr=[];
//         text=document.getElementById('input').innerHTML;
//         temp_arr.push(text.lastIndexOf('%'));
//         temp_arr.push(text.lastIndexOf('/'));
//         temp_arr.push(text.lastIndexOf('*'));
//         temp_arr.push(text.lastIndexOf('+'));
//         temp_arr.push(text.lastIndexOf('-'));

//         var max=Math.max.apply(Math, temp_arr);

//          text=text.slice(0,max);
//          document.getElementById('input').innerHTML=text;
//      }
//      else if(id==="="){

//         text=document.getElementById('input').innerHTML;
//         var i=text.search(/[\+\/\-\*\%]/gi);
//          if (i===0){
//             document.getElementById('input').innerHTML='NAN';
           
//          }

//          else{

//             result=Number(text.slice(0,i));
//             curOperator=text.slice(i,i+1);
//             text=text.slice(i+1);
          
//             while(text.length>0){
//                 var x=text.search(/[\+\/\-\*\%]/gi);
//                 if((x===-1)||(x===text.length-1)){
                    
//                     if(curOperator==='+'){
//                         result+=Number(text);
//                     }
//                     else if(curOperator==='-'){
//                         result-=Number(text);
//                     }
//                      else if(curOperator==='%'){
//                         result%=Number(text);
//                     }
//                     else if(curOperator==='*'){
//                         result*=Number(text);
//                     }
//                      else if(curOperator==='/'){
//                         result/=Number(text);
//                     }
//                     break;
//                 }

//                 var tempNum1=Number(text.slice(0,x));
//                 if(curOperator==='+'){
//                     result+=tempNum1;
//                 }
//                 else if(curOperator==='-'){
//                     result-=tempNum1;
//                 }
//                  else if(curOperator==='%'){
//                     result%=tempNum1;
//                 }
//                 else if(curOperator==='*'){
//                     result*=tempNum1;
//                 }
//                  else if(curOperator==='/'){
//                     result/=tempNum1;
//                 }
//                 curOperator=text.slice(x,x+1);

//                 text=text.slice(x+1);
//                 var y=text.search(/[\+\/\-\*\%]/gi);
//                 if(y===0){
//                     document.getElementById('input').innerHTML='NAN';
//                     break;
//                 }
//                 else if (y===-1){
//                 if(curOperator==='+'){
//                     result+=Number(text);
//                 }
//                 else if(curOperator==='-'){
//                     result-=Number(text);
//                 }
//                  else if(curOperator==='%'){
//                     result%=Number(text);
//                 }
//                 else if(curOperator==='*'){
//                     result*= Number(text);
//                 }
//                  else if(curOperator==='/'){
//                     result/=Number(text);
//                 }
//                 text="";
//                 }
//             }
//             document.getElementById('input').innerHTML=result;
//          }
        
    
        
       
//      }

     
//      else if(((Number(id)>=0)&&(Number(id)<=9))||(id==='+')||(id==='-')||(id==='*')||(id==='/')||(id==='%')){
//         counter+=1;
//         if( counter===1){
//             document.getElementById('input').innerHTML=id;

//         }
//         else if(counter>=1){
//             text=document.getElementById('input').innerHTML;
//             text+=id;
//             document.getElementById('input').innerHTML=text;
//         }
//      }
//      else if(id==='dot'){
//         counter+=1;
//         if( counter===1){
//             document.getElementById('input').innerHTML='.';

//         }
//         else if(counter>=1){
//             text=document.getElementById('input').innerHTML;
//             text+='.';
//             document.getElementById('input').innerHTML=text;
//         }
//      }

// });

// });