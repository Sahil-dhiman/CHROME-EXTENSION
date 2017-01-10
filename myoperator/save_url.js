$(document).on('ready',function(e){
  
  var user = $.cookie("user");                // display the logged in user 
  		console.log(user); 
        if(user != null)
        {
        	console.log("append");
          var login = '<h3>Logged in as <br><i class="fa fa-user fa-lg" aria-hidden="true"> '+user+' </i></h3>';
 		  $(".logged-in").append(login);       
        }

$("#url-form").validate({
	submitHandler:function(form){
		$("form #saved").fadeOut("fast");
		$("form #repeat").fadeOut("fast");
		var url = $(form).find('#url').val();
		var name = $(form).find('#name').val();		
		var crms = [];
		var user_data = null;
		var myop = {};
		var myoperator = CryptoJS.MD5("myoperator").toString();
		console.log("myoperator key value ",myoperator);
		chrome.storage.sync.get(myoperator,function(data){
			
			if(data.hasOwnProperty(myoperator)){
				myop = data[myoperator];	
			}
			if(!myop.hasOwnProperty(user)){
				myop[user] = {};
			}
			user_data = myop[user];

			if(user_data.hasOwnProperty('crms')){
				crms = user_data.crms;
			}

			b = crms.filter(function(value){return value.name == name || value.url == url;});
				
						if(b.length > 0)
							{	
									console.log("already exist");
									$("form #repeat").fadeIn("slow");
			 						return;
			 				}

			setCrms();
		});

		function setCrms(){
		var crm= {name:name,url:url};
		if(crms.length == 0 )
		{
			crms = [crm];
			console.log(crms);
			storeval();			
		}	
		else{
			
				var chck = $.cookie("edit");
						
					if(chck == null)
						{	crms.push(crm);
							console.log("without edit");							
						}
					else
					{
						console.log("with edit");
						crms.splice(chck[1],1,crm);
						$.removeCookie("edit");
					}

					storeval();   
														
			}
			
					function storeval(){

							myop[user]['crms'] = crms;
							var data = {};
							data[myoperator] = myop;
							chrome.storage.sync.set(data,function(){
							 	console.log("Succeed");
								$("form #saved").fadeIn("slow");
								chrome.storage.sync.get(myoperator,function(data){console.log(data);});
							});
				
					}		
				 }
		
			
	}
	});

});
				//var obj = {flag: 0};
			//	console.log("cookie2");
			//	var obj2 = $.cookie("edit");
					//	console.log(obj2);
					//	console.log(obj2.id);

