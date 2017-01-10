$(document).on('ready',function(e){

    var user = $.cookie("user");                // geting the user 
      console.log(user); 
          

 

    chrome.storage.sync.get('adjnjskkpi',function(data){

	    	if(data.hasOwnProperty('adjnjskkpi')){

	    		$('nav #sign-in').fadeOut(0.001);
	    		var list = '<li style="float:right;" id = "Sign-out"><a class="active1" href="login.html"><i class="fa fa-sign-out fa-lg"></i> Sign-out</a></li>';
	    		//var list2 = '<h2></i>Sucessfully signed in as<span><i class="fa fa-user fa-lg" aria-hidden="true" >  '+ data.adjnjskkpi.asdf3 +'</i></h2>';
	    		$('.nav-bar').append(list);
	    		//$('.content-inner').append(list2);
	    		console.log(list);

	    			$("#Sign-out").click(function(){    // remove the cookie for  log out
	     						$.removeCookie("user");
	     						console.log("cookie removed");
	     					chrome.storage.sync.remove('adjnjskkpi'); // remove the session data
	     				});

    		}
		

    	//	chrome.storage.sync.get('adjnjskkpi',function(data){
             var nocall = $('<div class = "call-log id = "nocall"><h3><span class = "center" Style = "color:red">'+"OOP'S NO CALL"+' </span><span class = "right"></span></h3></div>');
           // $(".content-inner").append(nocall);
            var flag = 0;
    		var timechk = [];	
    		var list = [];
           
    	 	var conn = new ab.Session('wss://ws1.myoperator.co:8443',
    	 		function ()
            		{
            			
            			destination = '{"did":"911130798597","token":"6d84e186b8b8657fee2299837f933108"}';
                		//destination = '{"did":"'+data.adjnjskkpi.asdf1+'","token":"'+data.adjnjskkpi.asdf2 +'"}';
                		console.log(destination);
                					 	
                		conn.subscribe(destination, function (topic, data)
                				{
             					//	console.log(data);
             						var uid  = data.data.uid.replace(/\./g,"_");
             					//	console.log(uid);

                                    // appending d first content 
                                            if(flag  == 0)
                                            {
                                                $("#nocall").remove();
                                                $(".content-inner").append('<div class = "index" id = "indx"><h3>USER<span class = "icenter">STATUS</span><span class = "right">CALLER</span></h3></div>');                  						
                                                    flag = 1;
                                            }

             						if(data.data)
             							{
             								var caller = "----";
                                            var status = data.data.dial_string;
             													
             												


             								 if(list.indexOf(data.data.uid)<0) // checking if the call is already going on or not.
             									   	{

             											var obj  = {uid: uid , time: new Date($.now())};
             											timechk.push(obj);
             											//console.log("null loop");
             											var ele = $('<div class = "call-log" id= "'+uid+'"><h3>'+data.data.clid+'<span class = "center">'+ data.data.dial_string +' </span><span class = "right">'+caller+'</span></h3></div><button class = "srch-bttn"data-clid = "'+data.data.clid+'"id ="b'+uid+'"><i class="fa fa-search "></i></button><div id="db'+uid+'" class="dropdown-content">');
             											$(".content-inner").append(ele);
                                                        console.log(ele);
             											list.push(data.data.uid);
             										
             										}
             													

             								else 
             										{

             											

             											for(var i =0 ;i <timechk.length;i++)
             												  {
             										  			if(timechk[i].uid == uid)
             										  				timechk[i].time = new Date($.now()); 
             												  }
                                                         //     console.log(data.data.dial_string.length);
                                                         //     console.log("caller",caller);
                                                         //           console.log("status",status);
                                                              if(data.data.dial_string.length > 11)
                                                                {
                                                                    caller = data.data.dial_string;
                                                                    caller = caller.split('/')[1];
                                                                    caller = caller.substr(0,11);
                                                                    status = data.data.dial_string;
                                                                    status = status.substring(0,status.indexOf("/"));
                                                           //         console.log("caller",caller);
                                                            //        console.log("status",status);
                                                                }
             										console.log("changed");
             										var chnge = $('<h3>'+data.data.clid+'<span class = "center">'+status+' </span><span class = "right">'+caller+'</span></h3>//change');
	             									$("#"+uid).html(chnge);
	             								//	console.log("after change",$(".content-inner").html());
             									}
             							}

             						else 
             						{
             							console.log("no call going on");
             						}	

                
        $('.srch-bttn').on('click',function(e){9 
             e.preventDefault();
               var id  = this.id;
               console.log(id);
               var clid = $(this).data("clid");  // to generate clid of button clicked
               console.log(clid);
               user = "1239871235";      // just for testing user will be generated from cookie
               console.log($(".content-inner").html());
             var myoperator = CryptoJS.MD5("myoperator").toString();
             chrome.storage.sync.get(myoperator, function(data){
                          var list  = ""; 

                         if(data[myoperator][user].hasOwnProperty('crms') )
                         {      
                                if(!$("#d"+id).html())
                                {
                                console.log("fetching data");
                                 for (var i = 0; i < data[myoperator][user].crms.length; i++) 
                                      {
                                       
                                        list +='<a class = "crms" data-url = "'+data[myoperator][user].crms[i].url+'"href="#">'+ data[myoperator][user].crms[i].name +'</a>';
                                      }

                                       var le = $(list);
                                       console.log(list);
                                       $("#d"+id).append(le);
                                       console.log("list data shown appended");
                                }  
                                else
                                 console.log("already fethced");           

                        }
                     else
                         {           // if there is no crm data present.
                                var nocrm = '<a href="#"> NO CRM DATA </a>';
                                 $(".dropdown-content").append(nocrm);
                         }

                            $('.crms').on('click',function(e){
                                            console.log("show crm");
                                            console.log($(this).data("url"));
                                            var url = $(this).data("url");
                                             url = url.replace("{number}",clid);
                                            console.log(url);



                             });
           

                   

                           // if dropdown is alreay visible 
                            // hide that
                        if($('.dropdown-content').is(':visible')){
                            $('.dropdown-content').hide();
                            $(".dropdown-content").html("");
                        }
                        else{

                            $('.dropdown-content').show();
                        }
   

                          $(window).on('click',function(e){
                            console.log(e.target);
                            console.log("end ");
                            if(!e.target.id == '#123'){
                                if($('.dropdown-content').is(':visible')){
                                    $('.dropdown-content').hide();
                                }
                                    }
                        });


                 });
         });







	                					 
             			var interval = setInterval(checkcall,10000);
             				 function checkcall () {
             										 if (timechk.length == 0)
             											{	
             												 	console.log("calls clear");
             												 	$(document).find("#indx").remove();
                                                                 if(flag = 1)
                                                                    $(".content-inner").html(nocall);
             												 		flag = 0;
             											} 


		             										else
		             												{		 
		             													console.log("set time",timechk);
		             												 		var tme = new Date();
		             												 		console.log("timechkength  ",timechk.length);
		             												 		console.log(tme - timechk[0].time);
		             														for(var i =0 ;i <timechk.length;i++)
		             														{
		             													 		if(tme - (timechk[i].time ) > 10000)
		             													 			{
				             													 	     	console.log("delte " + "#" + timechk[i].uid);
																							$(document).find("#"+timechk[i].uid).remove(); 				//remove the element fromt the webpage
																							$(document).find("#b"+timechk[i].uid).remove();            													 			
	             																	 		timechk.splice(i,1);
	             																	 		list.splice(i,1); 							// remove the call from timechk array
	             													    			}
	             															}
      													
      																}	
														}
               					 });
             		
					},function()
						{
						console.warn("WS connection closed")
	             		$(".content-inner").html(nocall);
						}
					,{
						skipSubprotocolCheck:true

					 //});

      		});


      


    });
});
