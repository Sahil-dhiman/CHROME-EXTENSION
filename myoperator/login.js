$(document).on('ready',function(e){
$("#login-form").validate({
		submitHandler:function(form){

		var dnumber = $(form).find('#dnumber').val();
		var user = $(form).find('#user').val();	
		var pass = $(form).find('#password').val();	
		console.log(dnumber);
		console.log(user);
		console.log(pass);
		
		$.ajax({

			url:'http://newstageapi.voicetree.info/fetch/token',
			data:{data:JSON.stringify({mobile_number:user,password:pass,display_number:dnumber})},
			type:'POST',
			success:function(response){
				if(response.status == "success")
					{
						var adjnjskkpi = {asdf1: response.did , asdf2 : response.token , asdf3: user} // storing the user ,token and display number of the user logged in .
						var list = '<h2></i>Sucessfully signed in as<span><i class="fa fa-user fa-lg" aria-hidden="true" >  '+user+'</i></h2>';
						$("#login-form").fadeOut(0.1);
						$(".sign-in").append(list);
						console.log(response);
						console.log(adjnjskkpi);

						chrome.storage.sync.set({'adjnjskkpi': adjnjskkpi}); // saving user,token and display number in chrome stotrage
						$.cookie("user",user);
						console.log("cookie saved" , user)
					}
			

			},
			error:function(e,r,t){
				console.log(t);
				console.log(e);
				console.log(r);
			}

		});


		}

	});
});