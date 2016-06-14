$(function(){
	//构造
	var nowDate=new Date(),//当天
		//nowYear=nowDate.getFullYear(),//当年
		//nowMonth=nowDate.getMonth()+1,//当月
		days=["周日","周一","周二","周三","周四","周五","周六"],
		everyMonthDays,//每月天数
		nowDateNum,
		nowDay;
		
		function calendar(){
		//循环输出日期
		for(var i=0;i<=13;i++){
			nowDateNum=nowDate.getDate();
			nowDay=nowDate.getDay()%7;
				if(nowDay==0||nowDay==5||nowDay==6){
					$("<td class='holiday'><p>"+(nowDateNum)+"</p><p>"+days[nowDay]+"</p></td>").appendTo(".calendar-date");
					}else{
						$("<td><p>"+(nowDateNum)+"</p><p>"+days[nowDay]+"</p></td>").appendTo(".calendar-date");
				};
			nowDate.setDate(nowDate.getDate()+1);
			$(".calendar-til").text(nowDate.getFullYear()+"年"+(nowDate.getMonth()+1)+"月");
			
			};
		//end
		};	
	calendar();
	
	var clickNum=1;	
	//右键
	$(".calendar-right-btn").click(function(){
		$(".calendar-date").children("td").remove();
			calendar();
			clickNum++;
		});
		
	//左键
	$(".calendar-left-btn").click(function(){
		$(".calendar-date").children("td").remove();
			nowDate.setDate(nowDate.getDate()-28);
			calendar();
			clickNum--;
		});
		
		
		
		var betweenN=[14,13,12,11,10,9,8,7,6,5,4,3,2,1];
		$(".calendar-date").on("click","td",function(){
				var d=nowDate;
				d.setDate(d.getDate()-betweenN[$(this).index()]);
				console.log(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())
				$(".select-date").text(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate())
				//alert(nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate())
				nowDate=new Date();
				nowDate.setDate(nowDate.getDate()+14*clickNum);
				console.log(nowDate)
			});
			
			
			
			
	//以下是在构建好的基础上添加的功能	
	//房价房态
	
		$(".rooms-sp-tb").find("tr").children("td").on("mouseenter",function(){
			var touchIndex=$(this).index()-1,
				touchLine=$(this).parent("tr").index();
			$(this).prevAll().addClass("hover");
			$(".calendar-date").children("td").eq(touchIndex).addClass("hover");
			for(var i=0;i<touchLine;i++){
				$(".rooms-sp-tb").find("tr").eq(i).children("td").eq(touchIndex).addClass("hover");
				};
			}).on("mouseleave",function(){
				$(".hover").removeClass("hover");
			}).on("click",function(){
					
					//模拟相应的日期点击
					$(".calendar-date").children("td").eq($(this).index()-1).click();
					//end
					$(".alert-box").hide();
					if($(this).parents("tr").hasClass("x-pay")){
						$(".alert-box.x-pay").show();
						}else{
							$(".alert-box.y-pay").show();
							};
			
					});
		$(".alert-box").children(".close").click(function(){
			$(this).parent().hide();
			});
				
	//筛选房型
	$(".shin-select-copy").click(function(){
		$(this).children(".shin-select-slide").toggle();
		});
	//日期浮动
	$(window).scroll(function(){
		if($(window).scrollTop()>=$(".rooms-sp-block").offset().top-10){
			$(".calendar-block").addClass("sp").css("width",$(".rooms-sp-block").width());
			$(".rooms-sp-block").addClass("sp");
			}else{
				$(".calendar-block").removeClass("sp");
				$(".rooms-sp-block").removeClass("sp");
				};
		});
	//价格模式
	$(".select-room-state").find("label").on("click",function(){
		$(".price-type-tb").addClass("vis");
		switch($(this).index()){
			case 0:
			$(".price-type-tb").find("td").eq(0).removeClass("hide");
			$(".price-type-tb").find("td").eq(1).addClass("hide");
			$(".price-type-tb").find("td").eq(2).removeClass("hide");
			$(".price-type-tb").find("td").eq(3).addClass("hide");
			break;
			case 1:
			$(".price-type-tb").find("td").eq(0).removeClass("hide");
			$(".price-type-tb").find("td").eq(1).removeClass("hide");
			$(".price-type-tb").find("td").eq(2).addClass("hide");
			$(".price-type-tb").find("td").eq(3).removeClass("hide");
			break;
			case 2:
			$(".price-type-tb").find("td").eq(0).addClass("hide");
			$(".price-type-tb").find("td").eq(1).removeClass("hide");
			$(".price-type-tb").find("td").eq(2).removeClass("hide");
			$(".price-type-tb").find("td").eq(3).removeClass("hide");
			};
		});
		//切换酒店
		$(".select-show").click(function(e){
			$(".select-slide").toggle();
			 e.stopPropagation();
			});
		$(".select-slide").find("li").on("click",function(){
			var selectShow=$(this).children("a").text();
			$(".select-now").text(selectShow);
			});
		$("body").click(function(){
				$(".select-slide").hide();
			})
	})