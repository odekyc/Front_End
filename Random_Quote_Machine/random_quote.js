var quote_str=["Everybody pities the weak; jealousy you have to earn.","What we've got here is failure to communicate.", "Listen to me, mister. You're my knight in shining armor. Don't you forget it. You're going to get back on that horse, and I'm going to be right behind you, holding on tight, and away we're gonna go, g","You can only find truth with logic if you have already found truth without it.","If a man does his best, what else is there?","There's no crying in baseball!","The stuff that dreams are made of.","Whether you think that you can, or that you can't, you are usually right.","Life isn't about waiting for the storm to pass; it's about learning to dance in the rain.","I shall not waste my days in trying to prolong them.", "Dancing is silent poetry."];
var author=["Arnold Schwarzenegger", "Paul Newman", "Katherine Hepburn", "G. K. Chesterton","George S. Patton", "Jimmy Dugan", "Carly Simon", "Henry Ford", "Vivian Greene","Jack London", "Simonides",];
var colors=["purple","red", "#a6a6a6", "green", "#ffa31a" , "#cccc00", "olive", "blue", "#996600", "#a64dff", "#669999"];
var apo='\u201C';
var quote_arr;
var num_lines;
var box_height;
var elem;
var CSSprop;
document.getElementById("demo").innerHTML = apo;
document.getElementById("quote").innerHTML = quote_str[0];
document.getElementById("author").innerHTML = "-"+author[0];
var i=0;
$(document).ready(function() {
  
  
    $("#new_quote").click(function(){
        $( "#quote" ).fadeOut();
        $( "#demo" ).fadeOut();
        $( "#author" ).fadeOut();
        if(i<quote_str.length-1){
            i++;
        }
        else if (i===quote_str.length-1){
            i=0;
        }

        quote_arr=quote_str[i].split(" ");
        num_lines=quote_arr.length/7;

         $( "#quote" ).text(quote_str[i]);
         $( "#quote" ).fadeIn();
        $("#author").text("-"+author[i]);
        $( "#demo" ).fadeIn();
        $( "#author" ).fadeIn();
        elem = document.getElementById("middle-box");
        CSSprop = window.getComputedStyle(elem, null).getPropertyValue("height");
        CSSprop=CSSprop.slice(0,CSSprop.length-2);
        
        
        box_height=210+35*num_lines;
        

        $("#middle-box").css("height", String(box_height));
        $("body").animate({"background-color": colors[i]}, "slow");
        $("#new_quote").css("background-color", colors[i]);
        $("#author").css("color", colors[i]);
        $("#demo").css("color", colors[i]);
        $("#quote").css("color", colors[i]);
    });
 
});

    






