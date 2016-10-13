jQuery(function($){
//取用户名	
	if($.cookie("user")){
		var $cus=$.cookie("user");
		$(".ulog").children("span").eq(0).html("【"+$cus+"】");
	}
//创建两个对象一个用来遍历一个用来改cookie	
	var goods_list=JSON.parse($.cookie("good"));
	var sure_list=JSON.parse($.cookie("good"));
	var $tbody=$(".tbody");
		var $carnum=$("#product_count_top");
//总价格和商品数		
		var zong=0;
		var total=0;
		var $payable=$(".payable").children();
	$.each(goods_list, function(idx,item) {
		if(item.bianhao!=""){
			total=idx+1;
		}else{
			total=0;
		}
//每次遍历改变总数打折价格乘数量		
	    zong+=item.dazhejia*item.numval;
//每一个对象创建一个ul
		var $ul=$("<ul/>");
		var $li2=$("<li/>").addClass("col2");
		var $pdiv=$("<div/>").addClass("proname");
		$("<li/>").addClass("col1").html(item.bianhao).appendTo($ul);
		$("<a/>").addClass("imga f1").attr("href","#").html('<img src="'+item.pic+'"/>').appendTo($li2);
		$("<a/>").attr("href","#").html(item.goodname).appendTo($pdiv);
		$("<p/>").html(item.size).appendTo($pdiv);
		$("<br>").appendTo($pdiv);
		$pdiv.appendTo($li2);
		$li2.appendTo($ul);
		$("<li/>").addClass("col3").html($("<span/>").addClass("num").html("￥"+item.dazhejia)).appendTo($ul);
		var $li4=$("<li/>").addClass("col4");
		var $inputdiv=$("<div/>").addClass("wrap-input");
		$("<a/>").addClass("btn-reduce").attr("ubable","false").html("减少数量").appendTo($inputdiv);
		$("<input/>").addClass("text").attr({"value":item.numval,"id":"number"}).appendTo($inputdiv);
		$("<a/>").addClass("btn-add").attr("ubable","false").html("增加数量").appendTo($inputdiv);
		$inputdiv.appendTo($li4);
		$li4.appendTo($ul);
		$("<li/>").addClass("col5").html($("<a/>").addClass("cza").html("删除")).appendTo($ul);
		$ul.appendTo($tbody);
	});
		$carnum.html("("+total+")");
//价格后两位00		
		zong=zong.toFixed(2);
	  	$("<em/>").html(zong).appendTo($payable);
//遍历购物车中ul每个加的按钮元素		
		$(".wrap-input .btn-add").each(function(){
			 $(this).on("click",function(){
			 var s= $(this).parent().siblings(".col1").text();
			 var val=parseInt($(this).siblings("input").val());
			 val=val+1;
	    	 $(this).siblings("input").val(val);
			 })
		});
//遍历购物车中ul每个减的按钮元素		
		$(".wrap-input .btn-reduce").each(function(){
			 $(this).on("click",function(){
			 var val=parseInt($(this).siblings("input").val());
//商品数不能少于1			 
			 if(val>1){
			 	val=val-1;
	    	 	$(this).siblings("input").val(val);
			 }
			 })
		});
//遍历删除按钮		
		$(".cza").each(function(){
			$(this).on("click",function(){
				 var s= $(this).parent().siblings(".col1").text();
				 console.log(s);
				 $.each(goods_list, function(idx,item) {
//对象中有编号和商品一样的进行删除，用第一个对象进行遍历取idx值用第二个对象进行写入cookie				 	
				 	if(item.bianhao==s){
 						sure_list.splice(idx,1);
//进行对象转化为json字符串 						
 						var str_sure=JSON.stringify(sure_list);
//写入cookie，覆盖之前的cookie 						
 						$.cookie("good",str_sure,{expires:10,path:"/"});
 						console.log(sure_list);//数组对象
 						console.log(str_sure);//json字符串
				 	}
				 });
//删除页面当前ul元素				  
				  $(this).parent().parent().remove();
//取新cookie进行遍历酸楚总价格写入页面同时购物车数目改变				  	
				  	var zong=0;
					var	new_list=JSON.parse($.cookie("good"));
					$.each(new_list, function(idx,item) {
				   		 zong+=item.dazhejia*item.numval;
					});
					console.log(new_list);
					total=total-1;
					$carnum.html("("+total+")");
					$payable.find("em").remove();
					zong=zong.toFixed(2);
				  	$("<em/>").html(zong).appendTo($payable);
			})
		});
})
