jQuery(function($){
 				 
				$(".back").on("click",function(){
					$("html body").animate({scrollTop:0});
				});
//之前登录过取cookie值user			
 					if($.cookie("user") && $.cookie("pass")){						
 						var $cus=$.cookie("user");
 						var $cps=$.cookie("pass");
 						$(".ulog").children("span").eq(0).html("【"+$cus+"】");
 						$("#username").val($cus);
 						$("#password").val($cps);
 					}
					var $cookuser=$.cookie("username");
					var $cookpass=$.cookie("password");
					console.log($cookuser,$cookpass);
					$("#username").blur(function(){
						var $user=$("#username").val();
						if(!$user.match(/^[1-3]\d{10}$/)){
							$("#error_msg").html("手机格式错误");
							$("#error_msg").css("display","block");
							$(".p_inp").css("margin-top","0px");
							
						}else{
							 $("#error_msg").html("");
							 $("#error_msg").css("display","none");
							 $("#ptop").css("margin-top","60px");
						}
					});
					$("#password").blur(function(){
						var $pass=$("#password").val();
						if(!$pass.match(/^\w{6,20}$/)){
							$("#error_msg").html("密码格式错误");
							$("#error_msg").css("display","block");
							$(".p_inp").css("margin-top","0px");						 
						}else{
							$("#error_msg").html("");
							$("#error_msg").css("display","none");
							$("#ptop").css("margin-top","60px");
						}
					});
					$("#login").on("click",function(){
						var $user=$("#username").val();
						var $pass=$("#password").val();
						var $check=$("#check");
							console.log($cookuser,$cookpass);
						if($user==$cookuser && $pass==$cookpass){
							if($check.prop("checked")){								
								$.cookie("user",$user,{expires:10,path:"/"});
								$.cookie("pass",$pass,{expires:10,path:"/"});
							}
							alert("登录成功");
							window.location.href="../index.html";
						}else{
							$("#error_msg").html("用户名和密码不匹配");
							$("#error_msg").css("display","block");
							$(".p_inp").css("margin-top","0px");
						}
					})		
		});