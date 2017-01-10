"use strict";
$(document).on('ready', function(e){

   var user = $.cookie("user");                // display the logged in user 
      console.log(user); 
        if(user != null)
        {
          console.log("append");
          var login = '<h3>Logged in as <br><i class="fa fa-user fa-lg" aria-hidden="true"> '+user+' </i></h3>';
      $(".logged-in").append(login);       
        }
        user = "1239871235";
     
        var myoperator = CryptoJS.MD5("myoperator").toString();
    chrome.storage.sync.get(myoperator, function(data){
              console.log(myoperator);
              var list  = ""; 
             if(data[myoperator][user].hasOwnProperty('crms')){
              for (var i = 0; i < data[myoperator][user].crms.length; i++) {
                console.log(data[myoperator][user].crms[i]);
                list +='<div class = "item"><div class = "left" id = "le'+ i +'"><span><i class="fa fa-user" aria-hidden="true"></i>'+data[myoperator][user].crms[i].name+ '<br></span>'+ data[myoperator][user].crms[i].url +'</div><div class = "right"><button class="edit" id = "e'+ i +'">Edit</button><button class="delete" id = "d'+ i +'">Delete</button></div><div class="clear"></div></div>';
              }
              console.log(list);
              $(".list").append(list);

              //button click method    

            $(".edit").click(function(){
              var id = this.id;
              $(location).attr('href', 'save_url.html')
              $.cookie("edit",id);
               }); 

             $(".delete").click(function(){
              var id  = this.id;
              var crms = null;
                    chrome.storage.sync.get(myoperator, function(data){
                          crms = data[myoperator][user].crms;
                          crms.splice(id[1],1);
                          console.log(id[1]);
                          console.log(crms);
                          var data2 = {};
                          data[myoperator][user].crms = crms;
                          chrome.storage.sync.set(data,function(){
                           console.log("Delete");
                          location.reload();
                          });
                        });
                          
             });


         return;
          }
             console.log("No CRM data found");
              console.log(list);
              list +='<div class = "item"><div class = "empty"><span>No Entry Found</span></div><div class = "right"></div><div class="clear"></div></div>';
              console.log(list);
              $(".list").append(list);
          
                
           
          
        });






});