var id;
$(document).ready(function() {
   $( "#AC" ).click(function() {
  $( "#input" ).empty();
});

 $( ".keys" ).click(function() {
     id=$(this).attr('id')
     alert(id);
});



});