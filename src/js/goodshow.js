jQuery(function(){
 			if($.cookie("user")){
				var $cus=$.cookie("user");
				$(".ulog").children("span").eq(0).html("【"+$cus+"】");
 			}
 			var url = window.location.href;
			var index = url.substring(url.lastIndexOf("?")+1);	
//json取数据读取写入页面			
			$.ajax({
				url:"../js/goodsnews.json",
				success:function(res){
					var $ul=$("<ul/>");
					$ul.addClass("picu1232");
					$.each(res, function(idx,item) {
						if(item.types==index&&item.pageNo==1){
							var $li=$("<li/>");
							var price = (Math.floor(item.price*item.off)).toFixed(2);
							var $a=$("<a/>");
							 $("<img/>").attr({src:item.imgurl}).appendTo($a);
					 		 $("<span/>").addClass("sprice").html("&yen;"+price).appendTo($a);
					 		 $("<span/>").addClass("sname").html(item.name).appendTo($a);
					 		 $("<span/>").addClass("sbg").appendTo($a);
					 		 $a.attr({href:"goodsnews.html?"+item.id}).appendTo($li);
					 		 $li.appendTo($ul);
						}
					});
					$ul.appendTo(".thpro");
				}
			});
//懒加载			
			var i=2;
 			$(window).on('scroll',function(){
				// 获取滚动条滚动过的距离
				var scrollTop = $(window).scrollTop();
				
				// 当差不多滚动到底部是加载更多内容
				if(scrollTop >= $(document).height() - $(window).height() - 100){
//取第二页					
					if(i<=2){
					$.ajax({
				url:"../js/goodsnews.json",
				success:function(res){
					var $ul=$("<ul/>");
					$ul.addClass("picu1232");
					console.log(res);
					$.each(res, function(idx,item) {
						if(item.types==index&&item.pageNo==2){
							var $li=$("<li/>");
							var price = (Math.floor(item.price*item.off)).toFixed(2);
							var $a=$("<a/>");
							 $("<img/>").attr({src:item.imgurl}).appendTo($a);
					 		 $("<span/>").addClass("sprice").html("&yen;"+price).appendTo($a);
					 		 $("<span/>").addClass("sname").html(item.name).appendTo($a);
					 		 $("<span/>").addClass("sbg").appendTo($a);
					 		 $a.attr({href:"goodsnews.html?"+item.id}).appendTo($li);
					 		 $li.appendTo($ul);
						}
					});
					$ul.appendTo(".thpro");
				}
			}); i=i+1;
			 }
				}
			});
//商品cookie遍历total写入购物车数字					
					if($.cookie("good")){
					var goods_list=JSON.parse($.cookie("good"));
					var $carnum=$("#product_count_top");
					var total=0;
					$.each(goods_list, function(idx,item) {
//cookie里面编号不为空就将total+1；否则为没有商品					
					if(item.bianhao!=""){
						total=idx+1;
					}else{
						total=0;
					}
					});
					$carnum.html("("+total+")");
					}
		})