var id;
var text;
var inner_div_id;
var counter=0;
var result;
var curOperator;

$(document).ready(function() {

  
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

        text=document.getElementById('input').innerHTML;
        var i=text.search(/[\+\/\-\*\%]/gi);
         if (i===0){
            document.getElementById('input').innerHTML='NAN';
           
         }

         else{

            result=Number(text.slice(0,i));
            curOperator=text.slice(i,i+1);
            text=text.slice(i+1);
          
            while(text.length>0){
                var x=text.search(/[\+\/\-\*\%]/gi);
                if(x===-1){
                    
                    if(curOperator==='+'){
                        result+=Number(text);
                    }
                    else if(curOperator==='-'){
                        result-=Number(text);
                    }
                     else if(curOperator==='%'){
                        result%=Number(text);
                    }
                    else if(curOperator==='*'){
                        result*=Number(text);
                    }
                     else if(curOperator==='/'){
                        result/=Number(text);
                    }
                    break;
                }
                var tempNum1=Number(text.slice(0,x));
                if(curOperator==='+'){
                    result+=tempNum1;
                }
                else if(curOperator==='-'){
                    result-=tempNum1;
                }
                 else if(curOperator==='%'){
                    result%=tempNum1;
                }
                else if(curOperator==='*'){
                    result*=tempNum1;
                }
                 else if(curOperator==='/'){
                    result/=tempNum1;
                }
                curOperator=text.slice(x,x+1);
                text=text.slice(x+1);
                var y=text.search(/[\+\/\-\*\%]/gi);
                if(y===0){
                    document.getElementById('input').innerHTML='NAN';
                    break;
                }
                else if (y===-1){
                if(curOperator==='+'){
                    result+=Number(text);
                }
                else if(curOperator==='-'){
                    result-=Number(text);
                }
                 else if(curOperator==='%'){
                    result%=Number(text);
                }
                else if(curOperator==='*'){
                    result*= Number(text);
                }
                 else if(curOperator==='/'){
                    result/=Number(text);
                }
                text="";
                }
            }
            document.getElementById('input').innerHTML=result;
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