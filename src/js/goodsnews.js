jQuery(function($){
				  var goods = [];
//在刚进入界面检查cookie是否存在商品信息
				 var $carnum=$("#product_count_top");
//total保存cookie商品个数	
				 var total=0;
//登录信息
					if($.cookie("user")){
 						var $cus=$.cookie("user");
 						$(".ulog").children("span").eq(0).html("【"+$cus+"】");
 					}
//商品cookie存在执行遍历					
				 if($.cookie("good")){
					 var goods_list=JSON.parse($.cookie("good"));
					 
//保存之前cookie
					 $.each(goods_list,function(idx,item){
						 goods.push(item);
//如果存在商品
						if(item.bianhao!=""){
//对象遍历0开始存在商品则是idx+1；							
							total=idx+1;
						}else{
							total=0;
						}
					 });
//购物车数字
					 $carnum.html("("+total+")");
					 console.log(goods_list);
				 }
				  
				 var str_goods;
//放大镜				 
				$("#fdj").xzoom({position:'right'});
//取地址栏id值				
				var url = window.location.href;
				var index = url.substring(url.lastIndexOf("?")+1);	
				console.log(index);
				var $specil = $("#specilist");
				var $propic = $(".propic");
				var $name = $(".name");
				var $price = $(".price");
				var $jf = $(".jf");
				var $idnum = $("#idnum");
				var $sell = $("#sell"); 
				var $gift = $("#gift");
				$.ajax({
					url:"../js/goodsnews.json",
					async:false, 
					success:function(res){
						console.log(res);					 
						$.each(res, function(idx,item) {
//取对应json对应id值对象的数据
							if(item.id==index){
								$.each(item.specil, function(idx,img){
									var $li=$("<li/>");
									$li.html('<img src="'+img.imgurl+'"/>').appendTo($specil);
								});
								$.each(item.imgexplain, function(idx,img){
									var $img=$("<img/>");
									$img.attr("src",img.imgurl).appendTo($propic);
								});
								var $h1=$("<h1/>");
								var $p=$("<p/>");
							    var prices = (Math.floor(item.price*item.off)).toFixed(2);
							    var oprices = (Math.floor(item.price)).toFixed(2);
								$h1.html(item.name).appendTo($name);
								$p.html(item.special).appendTo($name);
								$("<span/>").addClass("nprice").html(prices).appendTo($price);
								$("<span/>").addClass("oprice").html(oprices).appendTo($price);
								$("<em/>").html(item.star+"积分").appendTo($jf);
								$("<span/>").attr("class","bianhao").addClass("num").html(item.id).appendTo($idnum);
								$("<span/>").addClass("num").html(item.comentcount+"件").appendTo($sell);
								$("<a/>").attr("href","#").html(item.gift).appendTo($gift);
							}
						}); 	 
					}
				});
				 $("#tabqh-m").children().eq(0).on("click",function(){
				 	$("#page1").css("display","block");
				 	$("#page2").css("display","none");
				 	$("#page3").css("display","none");
				 });
				 $("#tabqh-m").children().eq(1).on("click",function(){
				 	$("#page1").css("display","none");
				 	$("#page2").css("display","block");
				 	$("#page3").css("display","none");
				 });
				 $("#tabqh-m").children().eq(2).on("click",function(){
				 	$("#page1").css("display","none");
				 	$("#page2").css("display","none");
				 	$("#page3").css("display","block");
				 });
				 $("#specilist").children().eq(0).on("click",function(){
				 	$("#fdj").children().attr("src","../img/xiangxi/shui (26).jpg");
				 });
				 $("#specilist").children().eq(1).on("click",function(){
				 	$("#fdj").children().attr("src","../img/xiangxi/shui(32).jpg");
				 });
				 $("#specilist").children().eq(2).on("click",function(){
				 	$("#fdj").children().attr("src","../img/xiangxi/shui (31).jpg");
				 });
				 $("#specilist").children().eq(3).on("click",function(){
				 	$("#fdj").children().attr("src","../img/xiangxi/shui (30).jpg");
				 });
				 var $product = $("#product_count_top");
				 var $btnadd = $(".btn-append");
//加入购物车				  
				$btnadd.on("click",function(){	 
					var $currentimg = $("#fdj").children();
					var $copyimg = $currentimg.clone();
					var curentpos = $currentimg.offset();
					$copyimg.css({
						position:"absolute",
						left:curentpos.left,
						top:curentpos.top	
					}).appendTo("body");
					var productpos = $product.offset();
					 
					console.log(productpos.left);
					$copyimg.animate({left:productpos.left,top:0,height:0,width:0,opacity:0},function(){
						$copyimg.remove();
					});
//取对应值作为对象写入goods[] 			
 					var $pic=$specil.children().first().children().attr("src");
 					var $goodname=$name.children().first().text();
 					var $dazhejia=$(".nprice").text();
 					var $bianhao=$(".bianhao").text();
 					var $size=$(".size").text();
 					var $numval=$number.val();
 					goods.push({pic:$pic,goodname:$goodname,dazhejia:$dazhejia,bianhao:$bianhao,size:$size,numval:$numval});
//将对象解析出字符串
 					str_goods=JSON.stringify(goods);
 					$.cookie("good",str_goods,{expires:10,path:"/"});
				});
				
				var $reduce = $(".btn-reduce");
				var $add = $(".btn-add");
				var $number = $("#number");				 
			 	console.log(parseInt($number.val()))
			 	$add.on("click",function(){
			 		var val = parseInt($number.val());
			 		val=val+1;
			 		$number.val(val);
			 	});
			 	$reduce.on("click",function(){
			 		var val = parseInt($number.val());
			 		if(val>1){
			 		val=val-1;
			 		$number.val(val);
			 		}
			 	});		 
			});