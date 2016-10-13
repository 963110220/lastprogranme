	jQuery(function($){
		var str = "";
			for(var i=0;i<4;i++){
				str+=parseInt(Math.random()*10);
			}
			$("#suiji").text(str);
//创建随机验证码
		$(".back").on("click",function(){
			$("html body").animate({scrollTop:0});
		});
//返回顶部
			var $p=$("<p/>");
		$(".userphone").blur(function(){
			var $up=$(this).val();
			if($up==""){
				$(this).next("p").remove();
				$p.addClass("swrong").html("<b/>"+"手机号不能为空").insertAfter($(this));
			}else if(!$up.match(/^[1-3]\d{10}$/)){
				$(this).next("p").remove();
				$p.addClass("swrong").html("<b/>"+"手机格式不正确").insertAfter($(this));
				$(this).val("");
			}else{
				$(this).removeClass("inputerro inputfocus");
				$(this).next("p").remove();
			}
		});
		$(".userpsw").blur(function(){
			var $uw=$(this).val();
			if($uw==""){
				$(this).next("p").remove();
				$p.addClass("swrong").html("<b/>"+"密码不能为空").insertAfter($(this));
			}else if(!$uw.match(/^\w{6,20}$/)){
				$(this).next("p").remove();
				$p.addClass("swrong").html("<b/>"+"密码格式不正确").insertAfter($(this));
				$(this).val("");
			}else{
				$(this).removeClass("inputerro inputfocus");
				$(this).next("p").remove();
			}
		});
		$(".pswsure").blur(function(){
			var $ps = $(this).val();
			var $uw = $(".userpsw").val();
			if($ps=="" || $ps!==$uw){
				$(this).next("p").remove();
				$p.addClass("swrong").html("<b/>"+"密码不一致").insertAfter($(this));
				$(this).val("");
			}else{
				$(this).removeClass("inputerro inputfocus");
				$(this).next("p").remove();
			}
		});
		$(".yan").on("click",function(){
			var str = "";
			for(var i=0;i<4;i++){
				str+=parseInt(Math.random()*10);
			}
			$("#suiji").text(str);
		});
		$(".potcheck").blur(function(){
			var $tupian=$("#suiji").text();
			var $ptc=$(this).val();
			var $li=$(this).closest("li");
			if($ptc!==$tupian){
				$li.children("p").remove();
				$p.addClass("swrong").html("<b/>"+"验证码不正确").appendTo($li);
				$(".potcheck").val("");
			}else{
				$(this).removeClass("inputerro inputfocus");
				$li.children("p").remove();
			}
		});
		$(".megcheck").blur(function(){
			var $mgc=$(this).val();
			if($mgc!==""){
				$(this).removeClass("inputerro inputfocus");
			}
		});
		$(".rgsbtn").on("click",function(){
			$("input").each(function(i){
				if($(this).val()==""){
					$(this).addClass("inputerro");
				}
			});
			var $up=$(".userphone").val();
			var $uw=$(".userpsw").val();
			var $ps=$(".pswsure").val();
			var $ptc=$(".potcheck").val();
			var $mgc=$(".megcheck").val();
//每个值不为空就存入cookie			
			if($up!=="" && $uw!=="" && $ps!=="" && $ptc!=="" && $mgc!==""){
				$.cookie("username",$up,{expires:10,path:"/"});
				$.cookie("password",$uw,{expires:10,path:"/"});
				$(".userphone").val("");
				$(".userpsw").val("");
				$(".pswsure").val("");
				$(".potcheck").val("");
				$(".megcheck").val("");
				console.log($.cookie("username"));
				console.log($.cookie("password"));
				alert("注册成功");
//跳转登录页面
				window.location.href="login.html";
				}
			});
			
	});