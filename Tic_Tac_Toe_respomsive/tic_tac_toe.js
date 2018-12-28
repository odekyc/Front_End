$(document).ready(function() {
var x;
var y;
var xQuadrant;
var yQuadrant;
var x_or_o;
var EmptyPlcsArr=['11','12','13','21','22','23','31','32','33'];
var already_placed=false;
var genIndex;
var clickIndex;
var numOccupied=0;
var element_str="";
var yxstr="";
var arr_len=EmptyPlcsArr.length;
var occupied_arr_user=[];
var occupied_arr_AI=[];
var gameFinished=false;
var surroundPlcsArr=[];
var surroundEmptyPlcsArr=[];
var lastPlc="";
var lastPlcsArr=[];
var lastPlcsEmptyArr=[];
var lastPlcsEmptyArrLen;

 
   $(".XorO").hover(function(){
       $(this).css({"background-color":"pink",
                     "border-width":"5px"
                   });
		      
		$("#XorO").get(0).cloneNode().play();
		     
		   }, function(){
		       $(this).css({"background-color":"white",
		                     "border-width":"1px"
		                   });
   });
    
 
 
// Get the canvas element and its drawing context
    var canvas = document.getElementById('c');


    var context = canvas.getContext('2d');

 
         // context.moveTo(70, 250);
         // context.lineTo(420, 250);
         //  context.lineWidth = 10;
         //  context.strokeStyle="blue";
         //  context.stroke();
    function DrawLine(){
       if(gameFinished){
         return;
       }
       else{
    
        
        if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
               context.beginPath();
              context.moveTo(111, 21);
         context.lineTo(111, 89);
          context.lineWidth = 4;
            context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('32')>-1)){
            context.beginPath();
       context.moveTo(151, 21);
         context.lineTo(151, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('23')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
        context.beginPath();
           context.moveTo(190, 21);
         context.lineTo(190, 89);
          context.lineWidth = 4;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('12')>-1)&&(occupied_arr_AI.indexOf('13')>-1)){
            context.beginPath();
           context.moveTo(110, 21);
         context.lineTo(180, 21);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
         $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('21')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('23')>-1)){
            context.beginPath();
            context.moveTo(110, 55);
         context.lineTo(191, 55);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('31')>-1)&&(occupied_arr_AI.indexOf('32')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(110, 89);
         context.lineTo(190, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('11')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('33')>-1)){
          context.beginPath();
         context.moveTo(110, 21);
         context.lineTo(190, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
          // $("canvas").css("z-index","3");yes
          $("#winnername").text("AI");
          // $("#whowinsdiv").css("visibility","visible");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }
        else if((occupied_arr_AI.indexOf('13')>-1)&&(occupied_arr_AI.indexOf('22')>-1)&&(occupied_arr_AI.indexOf('31')>-1)){
            context.beginPath();
         context.moveTo(190, 21);
         context.lineTo(111, 89);
          context.lineWidth = 4;
           context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
         $("#winnername").text("AI");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_AI=[]
        }

        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
           context.beginPath();
             context.moveTo(111, 21);
           context.lineTo(111, 89);
           context.lineWidth = 4;
            context.strokeStyle="blue";
          context.stroke();
           gameFinished=true;
            // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
           $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('32')>-1)){
            context.beginPath();
           context.moveTo(151, 21);
         context.lineTo(151, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('23')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
        context.beginPath();
              context.moveTo(190, 21);
         context.lineTo(190, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('12')>-1)&&(occupied_arr_user.indexOf('13')>-1)){
            context.beginPath();
            context.moveTo(110, 21);
         context.lineTo(190, 21);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('21')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('23')>-1)){
            context.beginPath();
         context.moveTo(110, 55);
         context.lineTo(190, 55);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('31')>-1)&&(occupied_arr_user.indexOf('32')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
            context.moveTo(110, 89);
         context.lineTo(191, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('11')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('33')>-1)){
            context.beginPath();
           context.moveTo(111, 21);
         context.lineTo(190, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
        else if((occupied_arr_user.indexOf('13')>-1)&&(occupied_arr_user.indexOf('22')>-1)&&(occupied_arr_user.indexOf('31')>-1)){
            context.beginPath();
          context.moveTo(190, 21);
         context.lineTo(111, 89);
          context.lineWidth = 4;
          context.strokeStyle="blue";
          context.stroke();
          gameFinished=true;
           // $("canvas").css("z-index","3");yes
          $("#winnername").text("User");
          $("#whowinsdiv").animate({ opacity: '1.0'}, 1200);
           $("#Who_won").get(0).cloneNode().play();
          occupied_arr_user=[];
        }
      }
    }

    
    $("#X").click(function(e){
        e.stopPropagation();
        x_or_o="X";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
       genIndex=Math.floor((Math.random() * 8) + 1)-1;
       var tempArr1=['11','12','13','21','23','31','32','33']
       var tempArr2=[tempArr1[genIndex],'22']
       genIndex=Math.floor((Math.random() * 2) + 1)-1;
       numOccupied+=1;
       element_str+="#q"+ tempArr2[genIndex]+"in";
       occupied_arr_AI.push(tempArr2[genIndex]);
       genIndex=EmptyPlcsArr.indexOf(tempArr2[genIndex])
       EmptyPlcsArr.splice(genIndex,1);
       $(element_str).text("O");
        $(element_str).css("visibility", "visible");
        element_str="";

      $(".checkbox").css("pointer-events", "auto");
      $("#AI_move").get(0).cloneNode().play();
    });
  
    $("#O").click(function(e){
        e.stopPropagation();
        x_or_o="O";
        $("#popup").css("visibility", "hidden");
        $("body").css("background-color", "#6666ff");
         genIndex=Math.floor((Math.random() * 8) + 1)-1;
       var tempArr1=['11','12','13','21','23','31','32','33']
       var tempArr2=[tempArr1[genIndex],'22']
       genIndex=Math.floor((Math.random() * 2) + 1)-1;
       numOccupied+=1;
       element_str+="#q"+ tempArr2[genIndex]+"in";
       occupied_arr_AI.push(tempArr2[genIndex]);
       genIndex=EmptyPlcsArr.indexOf(tempArr2[genIndex])
       EmptyPlcsArr.splice(genIndex,1);
       $(element_str).text("X");
       $(element_str).css("visibility", "visible");
       element_str="";

      $(".checkbox").css("pointer-events", "auto");
      $("#AI_move").get(0).cloneNode().play();
    });

  
  
   
 


    $(".checkbox").click(function(e){ 
     
  
       $("#alrdyPlacedDiv").css("visibility","hidden");

        element_str="";
       
        already_placed=false;

        var surPlcIndex;
        var surEmptyArrLen;
        var EmptyPlcsSpliceIndex;
          element_str="";
          surroundPlcsArr=[];
          surroundEmptyPlcsArr=[];
          lastPlc="";
          lastPlcsArr=[];
          lastPlcsEmptyArr=[];
          lastPlcsEmptyArrLen;
  
//         var xoffSet=e.target.offsetLeft;
        

//         x=e.pageX;
//         y=e.pageY;


//         if(xoffSet<468){
//           x+=(468-xoffSet);
//         }

//         if (( x >= 470)&&( x<= 636)){
//            yQuadrant=1;

//         }
//         else if (( x >= 637)&&( x<= 806)){
//             yQuadrant=2;
//         }
//         else if (( x >= 807)&&( x<= 973)){
//             yQuadrant=3;
//         }

//         if (( y >= 78)&&( y<= 243)){
//            xQuadrant=1;

//         }
//         else if (( y >= 243)&&( y<= 413)){
//             xQuadrant=2;
//         }
//         else if (( y >= 413)&&( y<= 578)){
//             xQuadrant=3;
//         }

//         xystr="";

//         xystr=String(xQuadrant)+String(yQuadrant);
        yxstr=$(this).attr('id').slice(1);
 
     
        clickIndex=EmptyPlcsArr.indexOf(yxstr);
        
 
            if(clickIndex===-1){
               $("#alrdyPlacedDiv").css("visibility","visible");
               $("#Error").get(0).cloneNode().play();
               $(".checkbox").css("pointer-events", "none");
               $("#alrdyPlacedDiv").css("pointer-events", "auto");
                      
               $("#placedXDiv").click(function(e){ 
               $(".checkbox").css("pointer-events", "auto");
               $("#alrdyPlacedDiv").css("pointer-events", "auto");
               $("#alrdyPlacedDiv").css("visibility","hidden");
              });
            }

            else if(clickIndex > -1){
                element_str+="#q"+yxstr+"in";
                $(element_str).text(x_or_o);
               $(element_str).css("visibility", "visible");
              $("#User_move").get(0).cloneNode().play();
                numOccupied+=1;
                element_str="";
                // alert(clickIndex);
                // alert(EmptyPlcsArr);
                // alert(EmptyPlcsArr[clickIndex]);
                occupied_arr_user.push(EmptyPlcsArr[clickIndex]);
                EmptyPlcsArr.splice(clickIndex,1);
                DrawLine();

                var AIOccupiedLen=occupied_arr_AI.length;

                if(AIOccupiedLen==1){
                  var tempAIPlc0=occupied_arr_AI[0];
                  var tempUserPlc0=occupied_arr_user[0];
                  if(tempAIPlc0=="22"){
                     if(tempUserPlc0=="11"){
                        surroundEmptyPlcsArr=["12","21"];
                      }
                      else if(tempUserPlc0=="12"){
                        surroundEmptyPlcsArr=["11","13"];
                      }
                      else if(tempUserPlc0=="13"){
                        surroundEmptyPlcsArr=["12","23"];
                      }
                      else if(tempUserPlc0=="21"){
                        surroundEmptyPlcsArr=["11","31"];
                      }
                      else if(tempUserPlc0=="23"){
                        surroundEmptyPlcsArr=["13","33"];
                      }
                      else if(tempUserPlc0=="31"){
                        surroundEmptyPlcsArr=["21","32"];
                      }
                      else if(tempUserPlc0=="32"){
                        surroundEmptyPlcsArr=["31","33"];
                      }
                      else if(tempUserPlc0=="33"){
                        surroundEmptyPlcsArr=["23","32"];
                      }
                    genIndex=Math.floor((Math.random() * 2) + 1)-1;
                    occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);
                    element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                    EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);
                    EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                  }
                  else{
                    if(EmptyPlcsArr.indexOf("22")>-1){
                      genIndex=EmptyPlcsArr.indexOf("22");
                       occupied_arr_AI.push("22");
                       element_str+="#q22in";
                       EmptyPlcsArr.splice(genIndex,1);
                    }
                    else{
                        if(tempAIPlc0=="11"){
                          surroundPlcsArr=["12","21"];
                        }
                        else if(tempAIPlc0=="12"){
                          surroundPlcsArr=["11","13"];
                        }
                        else if(tempAIPlc0=="13"){
                          surroundPlcsArr=["12","23"];
                        }
                        else if(tempAIPlc0=="21"){
                          surroundPlcsArr=["11","31"];
                        }
                        else if(tempAIPlc0=="23"){
                          surroundPlcsArr=["13","33"];
                        }
                        else if(tempAIPlc0=="31"){
                          surroundPlcsArr=["21","32"];
                        }
                        else if(tempAIPlc0=="32"){
                          surroundPlcsArr=["31","33"];
                        }
                        else if(tempAIPlc0=="33"){
                          surroundPlcsArr=["23","32"];
                        }
                        for(var i=0; i<surroundPlcsArr.length; i++){
                            surPlcIndex=EmptyPlcsArr.indexOf(surroundPlcsArr[i])
                            if(surPlcIndex>-1){
                              surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                            }
                        }
                        surEmptyArrLen=surroundEmptyPlcsArr.length;

     
                    
                        genIndex=Math.floor((Math.random() * surEmptyArrLen) + 1)-1;
                        element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                 
                         occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);
                         EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);
                         EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                    }
                  }
                }
                else if(AIOccupiedLen==2){
                   if(occupied_arr_AI.indexOf("22")>-1){
                      if(occupied_arr_AI.indexOf("11")>-1){
                         lastPlc="33";
                      }
                      else if(occupied_arr_AI.indexOf("12")>-1){
                         lastPlc="32";
                      }
                      else if(occupied_arr_AI.indexOf("13")>-1){
                         lastPlc="31";
                      }
                      else if(occupied_arr_AI.indexOf("21")>-1){
                         lastPlc="23";
                      }
                      else if(occupied_arr_AI.indexOf("23")>-1){
                         lastPlc="21";
                      }
                      else if(occupied_arr_AI.indexOf("31")>-1){
                         lastPlc="13";
                      }
                      else if(occupied_arr_AI.indexOf("33")>-1){
                         lastPlc="11";
                      }

                      genIndex=EmptyPlcsArr.indexOf(lastPlc);

                      if(genIndex>-1){
                         element_str+="#q"+lastPlc+"in";
                         occupied_arr_AI.push(lastPlc);
                         EmptyPlcsArr.splice(genIndex,1);
                      }
                      else{
                          var tempUserPlc0=occupied_arr_user[0];
                          if(tempUserPlc0=="11"){
                            surroundPlcsArr=["12","21"];
                          }
                          else if(tempUserPlc0=="12"){
                            surroundPlcsArr=["11","13"];
                          }
                          else if(tempUserPlc0=="13"){
                            surroundPlcsArr=["12","23"];
                          }
                          else if(tempUserPlc0=="21"){
                            surroundPlcsArr=["11","31"];
                          }
                          else if(tempUserPlc0=="23"){
                            surroundPlcsArr=["13","33"];
                          }
                          else if(tempUserPlc0=="31"){
                            surroundPlcsArr=["21","32"];
                          }
                          else if(tempUserPlc0=="32"){
                            surroundPlcsArr=["31","33"];
                          }
                          else if(tempUserPlc0=="33"){
                            surroundPlcsArr=["23","32"];
                          }
                        for(var i=0; i<surroundPlcsArr.length; i++){
                            surPlcIndex=EmptyPlcsArr.indexOf(surroundPlcsArr[i])
                            if(surPlcIndex>-1){
                              surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                            }
                        }
                          
                            surEmptyArrLen=surroundEmptyPlcsArr.length;
                            genIndex=Math.floor((Math.random() * surEmptyArrLen) + 1)-1;
                            element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
                     
                             occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);

                            EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);

                            EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
                      

                      }
                   }
                   else{
                       if(occupied_arr_user.indexOf("22")>-1){
                          if(occupied_arr_user.indexOf("11")>-1){
                             lastPlc="33";
                           }
                          else if(occupied_arr_user.indexOf("12")>-1){
                             lastPlc="32";
                          }
                          else if(occupied_arr_user.indexOf("13")>-1){
                             lastPlc="31";
                          }
                          else if(occupied_arr_user.indexOf("21")>-1){
                             lastPlc="23";
                          }
                          else if(occupied_arr_user.indexOf("23")>-1){
                             lastPlc="21";
                          }
                          else if(occupied_arr_user.indexOf("31")>-1){
                             lastPlc="13";
                          }
                          else if(occupied_arr_user.indexOf("33")>-1){
                             lastPlc="11";
                          }
                          genIndex=EmptyPlcsArr.indexOf(lastPlc);          
                           element_str+="#q"+lastPlc+"in";
                           occupied_arr_AI.push(lastPlc);
                           EmptyPlcsArr.splice(genIndex,1);
                      }
                      // else{
                      //     if(occupied_arr_user.indexOf("11")>-1){
                      //        if(occupied_arr_user.indexOf("12")>-1){
                      //           lastPlc="13";
                      //        }
                      //        else if(occupied_arr_user.indexOf("21")>-1){
                      //           lastPlc="31";
                      //        }
                      //        else if(occupied_arr_user.indexOf("13")>-1){
                      //           lastPlc="12";
                      //        }
                      //        else if(occupied_arr_user.indexOf("31")>-1){
                      //           lastPlc="21";
                      //        }
                      //        else{
                      //           lastPlc="22";
                      //        }
                      //     }
                      //     else if(occupied_arr_user.indexOf("33")>-1){
                      //        if(occupied_arr_user.indexOf("23")>-1){
                      //           lastPlc="13";
                      //        }
                      //        else if(occupied_arr_user.indexOf("13")>-1){
                      //           lastPlc="23";
                      //        }
                      //        else if(occupied_arr_user.indexOf("31")>-1){
                      //           lastPlc="32";
                      //        }
                      //        else if(occupied_arr_user.indexOf("32")>-1){
                      //           lastPlc="31";
                      //        }
                      //        else{
                      //           lastPlc="22";
                      //        }
                      //     }
                      //    genIndex=EmptyPlcsArr.indexOf(lastPlc);

                      //     if(genIndex>-1){
                      //        element_str+="#q"+lastPlc+"in";
                      //        occupied_arr_AI.push(lastPlc);
                      //        EmptyPlcsArr.splice(genIndex,1);
                      //     }
                      //     else{
                      //         arr_len=EmptyPlcsArr.length;
                              
                      //         genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
                      //         element_str+="#q"+EmptyPlcsArr[genIndex]+"in";
                      //         occupied_arr_AI.push(EmptyPlcsArr[genIndex]);
                      //         EmptyPlcsArr.splice(genIndex,1);
                      //       } 
                      //     }
                        }
                      }  
                      else if(AIOccupiedLen>=3){
                         if(occupied_arr_AI.indexOf("22")>-1){
        

                               lastPlcsArr=[];
        
                              if(occupied_arr_AI.indexOf("11")>-1){
                                 lastPlcsArr.push("33");
                              }
                              if(occupied_arr_AI.indexOf("12")>-1){
                                 lastPlcsArr.push("32");
                              }
                              if(occupied_arr_AI.indexOf("13")>-1){
                                 lastPlcsArr.push("31");
                              }
                              if(occupied_arr_AI.indexOf("21")>-1){
                                 lastPlcsArr.push("23");
                              }
                              if(occupied_arr_AI.indexOf("23")>-1){
                                 lastPlcsArr.push("21");
                              }
                              if(occupied_arr_AI.indexOf("31")>-1){
                                 lastPlcsArr.push("13");
                              }
                               if(occupied_arr_AI.indexOf("32")>-1){
                                 lastPlcsArr.push("12");
                              }
                              if(occupied_arr_AI.indexOf("33")>-1){
                                 lastPlcsArr.push("11");
                              }
                           
                        }
                        else{
                            if(occupied_arr_AI.indexOf("11")>-1){
                                 if(occupied_arr_AI.indexOf("13")>-1){
                                     lastPlcsArr.push("12");
                                 }
                                 if(occupied_arr_AI.indexOf("31")>-1){
                                     lastPlcsArr.push("21");
                                 }
                                 if(occupied_arr_AI.indexOf("12")>-1){
                                     lastPlcsArr.push("13");
                                 }
                                 if(occupied_arr_AI.indexOf("21")>-1){
                                     lastPlcsArr.push("31");
                                 }
                                 if(occupied_arr_AI.indexOf("33")>-1){
                                     lastPlcsArr.push("22");
                                 }
                                 
                              }
                              else if(occupied_arr_AI.indexOf("33")>-1){
                                  if(occupied_arr_AI.indexOf("13")>-1){
                                     lastPlcsArr.push("23");
                                  }
                                  if(occupied_arr_AI.indexOf("23")>-1){
                                     lastPlcsArr.push("13");
                                  }
                                  if(occupied_arr_AI.indexOf("31")>-1){
                                     lastPlcsArr.push("32");
                                  }
                                  if(occupied_arr_AI.indexOf("32")>-1){
                                     lastPlcsArr.push("31");
                                  }
                              }                            
                            }

                            for(var i=0; i<lastPlcsArr.length; i++){
                                  
                                  if(EmptyPlcsArr.indexOf(lastPlcsArr[i])>-1){
                                    lastPlcsEmptyArr.push(lastPlcsArr[i]);
                                  }
                            }


                            lastPlcsEmptyArrLen=lastPlcsEmptyArr.length;

                            if (lastPlcsEmptyArrLen>0){
                               
                                genIndex=Math.floor((Math.random() * lastPlcsEmptyArrLen) + 1)-1;
                                element_str+="#q"+lastPlcsEmptyArr[genIndex]+"in";
                                occupied_arr_AI.push(lastPlcsEmptyArr[genIndex]);
                                genIndex=EmptyPlcsArr.indexOf(lastPlcsEmptyArr[genIndex]);  
                                EmptyPlcsArr.splice(genIndex,1);

                            }
                            else if(lastPlcsEmptyArrLen==0){
                                  
                                  if(occupied_arr_user.indexOf("22")>-1){
                                        if(occupied_arr_user.indexOf("11")>-1){
                                           lastPlcsArr.push("33");
                                        }
                                        if(occupied_arr_user.indexOf("12")>-1){
                                           lastPlcsArr.push("32");
                                        }
                                        if(occupied_arr_user.indexOf("13")>-1){
                                           lastPlcsArr.push("31");
                                        }
                                        if(occupied_arr_user.indexOf("21")>-1){
                                           lastPlcsArr.push("23");
                                        }
                                        if(occupied_arr_user.indexOf("23")>-1){
                                           lastPlcsArr.push("21");
                                        }
                                        if(occupied_arr_user.indexOf("31")>-1){
                                           lastPlcsArr.push("13");
                                        }
                                         if(occupied_arr_user.indexOf("32")>-1){
                                           lastPlcsArr.push("12");
                                        }
                                        if(occupied_arr_user.indexOf("33")>-1){
                                           lastPlcsArr.push("11");
                                        }
                                }
                                else{
                                    if(occupied_arr_user.indexOf("11")>-1){
                                         if(occupied_arr_user.indexOf("13")>-1){
                                             lastPlcsArr.push("12");
                                         }
                                         if(occupied_arr_user.indexOf("31")>-1){
                                             lastPlcsArr.push("21");
                                         }
                                         if(occupied_arr_user.indexOf("12")>-1){
                                             lastPlcsArr.push("13");
                                         }
                                         if(occupied_arr_user.indexOf("21")>-1){
                                             lastPlcsArr.push("31");
                                         }
                                         if(occupied_arr_user.indexOf("33")>-1){
                                             lastPlcsArr.push("22");
                                         }
                                         
                                      }
                                      else if(occupied_arr_user.indexOf("33")>-1){
                                          if(occupied_arr_user.indexOf("13")>-1){
                                             lastPlcsArr.push("23");
                                          }
                                          if(occupied_arr_user.indexOf("23")>-1){
                                             lastPlcsArr.push("13");
                                          }
                                          if(occupied_arr_user.indexOf("31")>-1){
                                             lastPlcsArr.push("32");
                                          }
                                          if(occupied_arr_user.indexOf("32")>-1){
                                             lastPlcsArr.push("31");
                                          }
                                      }
                                  }
                                  for(var i=0; i<lastPlcsArr.length; i++){
                                        if(EmptyPlcsArr.indexOf(lastPlcsArr[i])>-1){
                                             lastPlcsEmptyArr.push(lastPlcsArr[i]);
                                        }
                                  }
                                   lastPlcsEmptyArrLen=lastPlcsEmptyArr.length;

                                    if (lastPlcsEmptyArrLen>0){

                                        genIndex=Math.floor((Math.random() * lastPlcsEmptyArrLen) + 1)-1;
                                        element_str+="#q"+lastPlcsEmptyArr[genIndex]+"in";
                                        occupied_arr_AI.push(lastPlcsEmptyArr[genIndex]);
                                        genIndex=EmptyPlcsArr.indexOf(lastPlcsEmptyArr[genIndex]);  
                                        EmptyPlcsArr.splice(genIndex,1);

                                    }
                                    else if(lastPlcsEmptyArrLen==0){
                                        
                                        arr_len = EmptyPlcsArr.length;
                                        genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
                                        element_str+="#q"+EmptyPlcsArr[genIndex]+"in";
                                        occupied_arr_AI.push(EmptyPlcsArr[genIndex]);
                                        EmptyPlcsArr.splice(genIndex,1);

                                    }
                            }

                      }
                // if(yxstr[0]=="1"){
                //     if(yxstr[1]=="1"){
                //       surroundPlcsArr=["12","21", "22"]

                //     }
                //     else if(yxstr[1]=="2"){
                //         surroundPlcsArr=["11","13", "22"]
                //     }
                //     else if(yxstr[1]=="3"){
                //         surroundPlcsArr=["12", "22", "23"]
                //     }
                // }
                // else if(yxstr[0]=="2"){
                //     if(yxstr[1]=="1"){
                //       surroundPlcsArr=["11", "22", "31"]
                //     }
                //     else if(yxstr[1]=="2"){
                //       surroundPlcsArr=["11", "12", "13", "21", "23", "31", "32", "33"]
                //     }
                //     else if(yxstr[1]=="3"){
                //       surroundPlcsArr=["13","22", "33"]
                //     }
                // }
                // else if(yxstr[0]=="3"){
                //     if(yxstr[1]=="1"){
                //       surroundPlcsArr=["21","22", "32"]
                //     }
                //     else if(yxstr[1]=="2"){
                //       surroundPlcsArr=["13","22", "33"]
                //     }
                //     else if(yxstr[1]=="3"){
                //       surroundPlcsArr=["23","22", "32"]
                //     }
                // }


                // for(var i=0; i<surroundPlcsArr.length; i++){
                //     surPlcIndex=EmptyPlcsArr.indexOf(surroundPlcsArr[i])
                //     if(surPlcIndex>-1){
                //       surroundEmptyPlcsArr.push(surroundPlcsArr[i]);
                //     }
                // }
                
                // surEmptyArrLen=surroundEmptyPlcsArr.length;

                // if(surEmptyArrLen==0){
                //      arr_len=EmptyPlcsArr.length;
                //      genIndex=Math.floor((Math.random() * arr_len) + 1)-1;
                //      element_str+="#q"+EmptyPlcsArr[genIndex]+"in";
                //      occupied_arr_AI.push(EmptyPlcsArr[genIndex]);
                //      EmptyPlcsArr.splice(genIndex,1);
                // }
                // else if(surEmptyArrLen > 0){
                //     genIndex=Math.floor((Math.random() * surEmptyArrLen) + 1)-1;
                //     element_str+="#q"+surroundEmptyPlcsArr[genIndex]+"in";
             
                //      occupied_arr_AI.push(surroundEmptyPlcsArr[genIndex]);

                //     EmptyPlcsSpliceIndex=EmptyPlcsArr.indexOf(surroundEmptyPlcsArr[genIndex]);

                //     EmptyPlcsArr.splice(EmptyPlcsSpliceIndex,1);
              
                // }
                
               
              numOccupied+=1;
              
              if(x_or_o==="O"){

                 $(element_str).text("X");
                $(element_str).css("visibility", "visible");
 
                // $("#AI_move").get(0).cloneNode().play();   
                 DrawLine();
              }
              else{
                $(element_str).text("O");
                $(element_str).css("visibility", "visible");

                // $("#AI_move").get(0).cloneNode().play();
                 DrawLine();
              } 
               
            }
        
             
            yxstr="";
            element_str="";
            surroundPlcsArr=[];
            surroundEmptyPlcsArr=[];
            lastPlc="";
            lastPlcsArr=[];
            lastPlcsEmptyArr=[];
            lastPlcsEmptyArrLen;
     
    });

 $("button").click(function(e){
      
       context.clearRect(0, 0, canvas.width, canvas.height);
       $(".in").text("");
     $(".in").css("border", "");
     $(".in").css("visibility", "hidden");
       // $("canvas").css("z-index","6");
       $("#whowinsdiv").css("opacity","0");

    
        $("#alrdyPlacedDiv").css("visibility","hidden");
      $(".checkbox").css("pointer-events", "none");
      $("#alrdyPlacedDiv").css("pointer-events", "auto");
      $("#New_round").get(0).cloneNode().play();
       
x=0;
y=0;
xQuadrant=0;
yQuadrant=0;
x_or_o="";
EmptyPlcsArr=['11','12','13','21','22','23','31','32','33'];
already_placed=false;
clickIndex=0;
numOccupied=0;
element_str="";
yxstr="";
arr_len= EmptyPlcsArr.length;
occupied_arr_user=[];
occupied_arr_AI=[];
gameFinished=false;
surroundPlcsArr=[];
surroundEmptyPlcsArr=[];
lastPlc="";
lastPlcsArr=[];
lastPlcsEmptyArr=[];
lastPlcsEmptyArrLen;

  $("#popup").css("visibility", "visible");
   $("body").css("background-color", "#999999"); 
});
  
});