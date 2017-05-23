var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
     console.log("Hello World from controller");
     

     $scope.currentPage = 1;
     $scope.msg=""
     $scope.phno=""


  $scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
  }

function get_open_orders(){
    $http.post('/openorder/getorders').success(function(response){


      for(var i=0;i<response.length;i++){
        response[i]["checked"] = false;
      }
      $scope.open_orders_no = i;
      console.log("open-orders",response);

      $scope.open_orders = {
        model:null,
        order: response
       };

    });
}
get_open_orders();

function get_pending_orders() {
    $http.post('/pendingorder/getorders' ).success(function(response){
      for(i=0;i<response.length;i++){
        response[i]["checked"] = false;
      }
      $scope.pending_orders_no = i;
    
      console.log("pending-orders",response);
      $scope.pending_orders = {
        model:null,
        order: response
       };

    });
}

get_pending_orders();


function get_completed_orders() {
    $http.post('/completeorder/getorders').success(function(response){
      for(i=0;i<response.length;i++){
        response[i]["checked"] = false;
      }
      $scope.completed_orders_no = i;

    
      console.log("completed-orders_no",response);
      $scope.complete_orders = {
        model:null,
        order: response
       };

    });

}

get_completed_orders();


$scope.update= function() {
    console.log($scope.open_orders);
    console.log($scope.actions);
    var orders;
    if($scope.actions=="Move to started"){
        orders = $scope.open_orders.order
    }else if ($scope.actions=="Move to completed"){
        orders = $scope.pending_orders.order
    }else{
        orders = $scope.completed_orders.order
    }

    var status =$scope.actions.replace("Move to","").trim();
    var selected_list = [];
    var selected_phnos = [];
    var selected_emails =[];
    if (/Move to/.test($scope.actions)){
        for(index in orders){
            if (orders[index]["checked"]==true){

                selected_list.push(orders[index]["_id"])
                selected_phnos.push(String(orders[index]["phno"]));
                selected_emails.push(orders[index]["email"]);
            }
        }
        console.log("selected list",selected_list);
        params={"selected":selected_list,status:status};
        $http.post("/dashboard/moveto",params).success(function(response){
            console.log("successfully moved",response);
            var msg = "Your ticket successfully moved to "+status;
            send_message_mail(selected_phnos,selected_emails,msg);
            if($scope.actions=="Move to started"){
                get_open_orders();
            }else if ($scope.actions=="Move to completed"){
                get_pending_orders();
            }else{
                get_completed_orders();
            }
            setTimeout(function(){
              $scope.actions="";
            },1000);
        });
    }
}



    // check whether it is a valid phone no
	function phonenumber(inputtxt)  
	{  
	  var phoneno = /^\+?\d{12}$/;  
	  if (inputtxt.match(phoneno)){  
	          return true;  
	      }  
	      else  
	      {  
	          return false;  
	      }  
    } 

    function email_validate(emailtxt) {
	  
	    var atpos = emailtxt.indexOf("@");
	    var dotpos = emailtxt.lastIndexOf(".");
	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailtxt.length) {
	        return false;
	    }else {
	    	return true;
	    }

    } 


     $scope.send_message = function(){
     	 $scope.errors="";
     	 $scope.info="";
     	 // split the phnos
         var phnos=$scope.phno.split(",");
         console.log("phonenos",phnos);

         for (var phno in phnos){

            if (phno!=undefined && !phonenumber(phnos[phno])){
                $scope.errors="Enter a valid phone number For example:+912323223232,+912323223232"
                return false;
	        }
         }
         
         for (var phno in phnos) {
             if (phno!=undefined)
	         $http.post('/message/',{phno:phnos[phno],msg:$scope.msg}).success(function(response) {
	         	console.log(response);
	            $scope.info = "Message sent successfully";

	         })
	         .error(function(response) {
	         	console.log(response);
	            $scope.error = "Message send failed";
	   
	         });

         } 

     }
     $scope.create_order = function(){
     	 $scope.errors="";
     	 $scope.info="";
     	 // split the phnos
         console.log("hello inside");
     	 var phno = $scope.phno;
         var email = $scope.email;
         var name = $scope.name;
         var service = $scope.service;
         var msg = $scope.msg;



         if (!phonenumber(phno) ) {
             $scope.errors="Enter a valid phone number For example:+912323223232,+912323223232"
             return false;
	     }
	     if (!email_validate(email)){
                $scope.errors="Not a valid mail example abc@gmail.com"
                return false;
	     }


         $http.post('/createorder/saveorder/',{phno:phno,
         	                          email:email,
         	                          name:name,
         	                          service:service,
         	                          msg:msg
         }).success(function(response) {
         	console.log(response);
            $scope.info = "Message sent successfully";

         })
         .error(function(response) {
         	console.log(response);
            $scope.error = "Message send failed";
   
         });

       
     }

     function send_message_mail(phnos,emails,msg){
     	 $scope.errors="";
     	 $scope.info="";
     	 // split the phnos
         var phnos = phnos;
         var emails = emails;
         var msg = msg;
         console.log("phonenos",phnos);
         console.log("emails",emails);

         for (var i=0;i<phnos.length;i++){
            if (!phonenumber(String(phnos[i]))){
                $scope.errors="Enter a valid phone number For example:+912323223232,+912323223232"
                return false;
	        }
         }
         for (var i=0;i<emails.length;i++){
            if (!email_validate(emails[i])){
                $scope.errors="Not a valid mail example abc@gmail.com"
                return false;
	        }
         }
         
         for (var i=0;i<phnos.length;i++){
	         $http.post('/message/',{phno:phnos[i],msg:msg}).success(function(response) {
	         	console.log(response);
	            $scope.info = "Message sent successfully";

	         })
	         .error(function(response) {
	         	console.log(response);
	            $scope.error = "Message send failed";
	   
	         });

         } 

         for (var i=0;i<emails.length;i++){
	         $http.post('/emailer/send',{email:emails[i],msg:msg}).success(function(response) {
	         	console.log(response);
	            $scope.info = "email sent successfully";

	         })
	         .error(function(response) {
	         	console.log(response);
	            $scope.error = "email send failed";
	   
	         });

         }

     }


}]);
