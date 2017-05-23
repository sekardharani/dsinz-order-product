$( document ).ready(function() {
 
   //menu hightlight code start here
   $('#main-menu li a').removeClass('active-menu');
   if(window.location.pathname==='/login'){
	
     $('#main-menu li a[href="/dashboard"]').addClass('active-menu');
  
   }
   $('#main-menu li a[href="'+window.location.pathname+'"]').addClass('active-menu');
   //menu hightlight code end here
});
