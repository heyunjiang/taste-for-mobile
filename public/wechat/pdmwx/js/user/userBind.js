
$(function(){
	
	var opts = {
		lines: 13, // 花瓣数目
		length: 7, // 花瓣长度
		width: 4, // 花瓣宽度
		radius: 10, // 花瓣距中心半径
		corners: 1, // 花瓣圆滑度 (0-1)
		rotate: 0, // 花瓣旋转角度
		color: '#000', // 花瓣颜色
		speed: 1, // 花瓣旋转速度
		trail: 60, // 花瓣旋转时的拖影(百分比)
		shadow: false, // 花瓣是否显示阴影
		hwaccel: false, //spinner 是否启用硬件加速及高速旋转            
		className: 'spinner', // spinner css 样式名称
		//zIndex: 2e9, // spinner的z轴 (默认是2000000000)
		//top: 'auto', // spinner 相对父容器Top定位 单位 px
		//left: 'auto'// spinner 相对父容器Left定位 单位 px
	};
	    
	$('#dropBack').spin(opts);
	$("#dropBack").hide();
	
	$("#selProvience").change(function(){
		var 
			sendUrl = $("#appPath").val()+"/fans?method=ajaxGetCity",
			data = "pid="+$(this).val(),
			dataType = "json",
			action = "getCity";
		$("#selCity").empty();
		$("#selEnterprise").empty();
		$("#bindEnterprise").val("");
		receiveAjaxMsg(sendUrl,data,dataType,action);
	});
	$("#selCity").change(function(){
		var 
		sendUrl = $("#appPath").val()+"/fans?method=ajaxGetEnterprise",
		data = "pid="+$("#selProvience").val()+"&cid="+$(this).val(),
		dataType = "json",
		action = "getEnterprise";
		$("#selEnterprise").empty();
		$("#bindEnterprise").val("");
		receiveAjaxMsg(sendUrl,data,dataType,action);
	});
	//用户绑定
	$("#userBindBtn").click(function(){
		var 
		bindEnterpriseName = $("#selEnterprise option:selected").text(),
		sendUrl = $("#appPath").val()+"/fans?method=ajaxBindSubmit",
		data = "pdmUrl="+$("#selEnterprise").val()+"&userName="+$("#userName").val()
				+"&passwd="+$("#passwd").val()+"&enterpriseName="+bindEnterpriseName,
		dataType = "text",
		action = "bindSumit";
		if (!bindEnterpriseName){
			alert("请选择需要绑定的企业！");
			return ;
		}
		alert('绑定成功')
		return ;	
		receiveAjaxMsg(sendUrl,data,dataType,action);
	});
});

function receiveAjaxMsg(url,data,dataType,action){
	console.log(data)
	if (action=="getCity"){
		if(data == 'pid=22'){
			getCity([{"provinceId":"","cityId":"-1","zipCode":"","cityName":"请选择","value":"-1"},
			{"provinceId":"22","cityId":"234","zipCode":"400000","cityName":"重庆市","value":"重庆市"}]);
		}else {
			getCity([{"provinceId":"","cityId":"-1","zipCode":"","cityName":"请选择","value":"-1"},
			{"provinceId":"1","cityId":"234","zipCode":"400000","cityName":"北京市","value":"北京市"}])
		}
	}
	else if (action=="getEnterprise"){
		if(data == 'pid=22&cid=234'){
			getEnterprise([{"correlationEnterprise":"","provinceId":"22","pdmUrl":"http://222.178.39.65:8084/plmES/services/pdmService?wsdl","remark":"","cityId":"234","enterpriseName":"重庆PLM研发中心","cityName":"","state":"1 ","enterpriseId":"","buyYonyouPlm":"","provinceName":"","id":"57","enterpriseAddress":"","stateName":"","countyId":""},
			{"correlationEnterprise":"","provinceId":"22","pdmUrl":"http://123.103.9.191:1180/plmES/services/pdmService?wsdl","remark":"","cityId":"234","enterpriseName":"重庆利德工业制造有限公司","cityName":"","state":"1 ","enterpriseId":"","buyYonyouPlm":"","provinceName":"","id":"56","enterpriseAddress":"","stateName":"","countyId":""},
			{"correlationEnterprise":"","provinceId":"22","pdmUrl":"http://222.179.153.60:8081/plmES/services/pdmService?wsdl","remark":"","cityId":"234","enterpriseName":"重庆润通科技有限公司","cityName":"","state":"1 ","enterpriseId":"","buyYonyouPlm":"","provinceName":"","id":"91","enterpriseAddress":"","stateName":"","countyId":""}]);
		}else {
			getEnterprise([])
		}
	}
	return ;
	$("#dropBack").toggle();
	$.ajax({
		url:url,
		data:data,
		dataType:dataType,
		type:'post',
		cache:false,
		beforeSend:function (XMLHttpRequest) {
		    //锟斤拷锟斤拷图片锟斤拷锟斤拷使锟斤拷锟斤拷锟斤拷
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
		    // 通锟斤拷 textStatus 锟斤拷 errorThrown 之锟斤拷
		    // 只锟斤拷一锟斤拷锟斤拷锟斤拷锟较�
			$("#dropBack").toggle();
		    this; // 锟斤拷锟矫憋拷锟斤拷AJAX锟斤拷锟斤拷时锟斤拷锟捷碉拷options锟斤拷锟斤拷
		},
		success:function(data, textStatus){
			//删除企业注册信息
			$("#dropBack").toggle();
			if (action=="getCity"){
				getCity(data);
			}
			//启用企业
			else if (action=="getEnterprise"){
				getEnterprise(data);
			}
			//用户绑定企业
			else if (action=="bindSumit"){
				bindSumit(data);
			}
		}
	});
}

function getCity(data){
	var jcity = eval(data);
	var option = new Option();
	for (var i=0;i<jcity.length;i++){
		var option = new Option(),
			city = jcity[i];
		option.value = city.cityId;
		option.text = city.cityName;
		$("#selCity")[0].add(option);
	}
	$("#selCity")[0].selectedIndex=0;
}
function getEnterprise(data){
	var jenterprise = eval(data);
	for (var i=0;i<jenterprise.length;i++){
		var option = new Option(),
			enterprise = jenterprise[i];
		option.value = enterprise.pdmUrl;
		option.text = enterprise.enterpriseName;
		$("#selEnterprise")[0].add(option);
	}
	$("#selEnterprise")[0].selectedIndex=0;
	$("#bindEnterprise").val($("#selEnterprise")[0].options[$("#selEnterprise")[0].selectedIndex].text);
}

function bindSumit(data){
	alert(data);
}