/*批量审批获取任务列表数据*/
var basePath
	 ; 

$(function(){
	//载入代办任务
	basePath = initBasePath();
	initAgencyTask(basePath);
	document.addEventListener('touchmove', function (e) {
		//e.preventDefault(); 
	}, false);
	//初始化加载手机滑屏事件 $("#wrapper")[0]
	document.addEventListener("touchend", function(e){
		loaded(e);
	},false);
});

var myScroll;

function loaded(e) {
	var touch = e.changedTouches[0], 
	//viewH =document.body.clientHeight ,//可见高度
	contentH =document.body.scrollHeight;//内容高度  
	//scrollTop =$(this).scrollTop();//滚动高度  
	//var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	//if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
	//if(scrollTop/(contentH -viewH)==1){
	var domObj = touch.target,
		className = $(domObj).attr("class");
	if (className&&className.indexOf("taskbasic")!=-1){
		return ;
	}
	var isScroll  = (((contentH-touch.pageY)/contentH)*100)<=40;
	//alert(((contentH-touch.pageY)/contentH)*100);
	//异步加载数据信息
	if(isScroll){
		//initAgencyTask(basePath);
	}
}


function initBasePath(){
	var port = window.location.port;
	if (!port){
		port = "80";
	}
	var urlPath = window.location.protocol+"//"+
		window.location.host+"/",
		contextPath = window.location.pathname;
	contextPath = contextPath.substr(1);
	contextPath = contextPath.substring(0,contextPath.indexOf("/"));
	urlPath += contextPath;
	return urlPath;
}

function initAgencyTask(basePath){
	var data = {
		"CheckTask":{
			"3366":{"endtime":"","ruturnTime":"","tpsName":"","tasktype":"CHECK_DOC_TASK","projectCode":"","remark":"","taskid":"3366","tasktypename":"文档审签任务","activeid":"Active:111","partId":"","creator":"柏本雄","bomName":"","checkobject":"交控-型号属性设为必填详细需求.docx","tpsLabel":"","projector":"","receivetime":"2017-12-26 14:11:33","starttime":"2017-12-26 14:11:33","isJoinSign":"N","projectname":"PLM-01-2018","isHuiQian":false,"bomVer":"","documentVer":"10","company":"","personid":"28","partVer":"","taskname":"PDM需求审签流程_需求自评","documentId":"CRDoc-00000247"},
			"3372":{"endtime":"","ruturnTime":"","tpsName":"","tasktype":"CHECK_DOC_TASK","projectCode":"","remark":"","taskid":"3372","tasktypename":"文档审签任务","activeid":"Active:195","partId":"","creator":"沈勇","bomName":"","checkobject":"Req01880文档下发权限优化.xlsx","tpsLabel":"","projector":"","receivetime":"2017-12-27 11:16:32","starttime":"2017-12-27 11:16:32","isJoinSign":"N","projectname":"PLMPortal-12-2017","isHuiQian":false,"bomVer":"","documentVer":"10","company":"","personid":"28","partVer":"","taskname":"功能验证_功能验证","documentId":"Dev-01575"},
			"3363":{"endtime":"","ruturnTime":"","tpsName":"","tasktype":"CHECK_DOC_TASK","projectCode":"","remark":"","taskid":"3363","tasktypename":"文档审签任务","activeid":"Active:116","partId":"","creator":"柏本雄","bomName":"","checkobject":"凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件详细需求.docx","tpsLabel":"","projector":"","receivetime":"2017-12-26 14:13:09","starttime":"2017-12-26 10:22:10","isJoinSign":"N","projectname":"PLM-01-2018","isHuiQian":false,"bomVer":"","documentVer":"10","company":"","personid":"28","partVer":"","taskname":"CAD需求文档审签流程_需求自评","documentId":"CRDoc-00000248"},
			"3373":{"endtime":"","ruturnTime":"","tpsName":"","tasktype":"CHECK_DOC_TASK","projectCode":"","remark":"","taskid":"3373","tasktypename":"文档审签任务","activeid":"Active:195","partId":"","creator":"沈勇","bomName":"","checkobject":"门户-下发的文档（Req01882）.xlsx","tpsLabel":"","projector":"","receivetime":"2017-12-27 11:18:54","starttime":"2017-12-27 11:18:54","isJoinSign":"N","projectname":"PLMPortal-12-2017","isHuiQian":false,"bomVer":"","documentVer":"10","company":"","personid":"28","partVer":"","taskname":"功能验证_功能验证","documentId":"Dev-01576"}
		},
		"PROJECT_TASK":{
			"5754":{"endtime":"2017-11-30 15:00:00","projector":"李川江","ruturnTime":"","tpsName":"","tasktype":"PROJECT_TASK","projectCode":"","starttime":"2017-10-11 15:00:00","remark":"","tasktypename":"项目任务","taskid":"5754","isJoinSign":"S","projectname":"PLMPortal-10-2017","isHuiQian":false,"company":"","personid":"28","tpsLabel":"","taskname":"PLMPortal-10-2017"},"5963":{"endtime":"2017-12-29 17:30:00","projector":"李川江","ruturnTime":"","tpsName":"","tasktype":"PROJECT_TASK","projectCode":"","starttime":"2017-12-18 09:00:00","remark":"","tasktypename":"项目任务","taskid":"5963","isJoinSign":"S","projectname":"PLM-01-2018","isHuiQian":false,"company":"","personid":"28","tpsLabel":"","taskname":"需求"},
			"5962":{"endtime":"2018-02-05 17:30:00","projector":"李川江","ruturnTime":"","tpsName":"","tasktype":"PROJECT_TASK","projectCode":"","starttime":"2017-12-18 09:00:00","remark":"","tasktypename":"项目任务","taskid":"5962","isJoinSign":"S","projectname":"PLM-01-2018","isHuiQian":false,"company":"","personid":"28","tpsLabel":"","taskname":"PLM-01-2018"},"5940":{"endtime":"2017-12-29 16:00:00","projector":"李川江","ruturnTime":"","tpsName":"","tasktype":"PROJECT_TASK","projectCode":"","starttime":"2017-12-01 16:00:00","remark":"","tasktypename":"项目任务","taskid":"5940","isJoinSign":"S","projectname":"PLMPortal-12-2017","isHuiQian":false,"company":"","personid":"28","tpsLabel":"","taskname":"PLMPortal-12-2017"}
		}
	}
	showAgencyTask(JSON.stringify(data));
	return ;
	//异步加载
	$.ajax({
		url:basePath+'/pubcontroller/getPLMAgencyTask.do?date='+new Date(),
		data:null,
		type:'post',
		dataType:'text',
		//发送前--可加载图片
		beforeSend:function(xmlHttpreq){
			$("div.loading").css("display","block");
		},
		//发生异常
		error:function(xmlHttpreq,errorInfo,exception){
			//alert("服务器发生异常,请联系管理员！"+errorInfo);
			$("div.loading").css("display","none");
		},
		//成功
		success:function(data){
			$("div.loading").css("display","none");
			//解析数据
			showAgencyTask(data);
		}
	});
}
/**
 * 显示待办任务
 * @param agencyTask
 */
function showAgencyTask(agencyTask){
	if (agencyTask=="connectRefuse"){
		alert("企业端服务连接拒绝，或者出现异常，请联系管理员！");
		return ;
	}
	var jsonData = eval('('+agencyTask+')');
	//清空待办任务
	//审签任务
	$("#checkTaskHead").html("审签任务(0)")
	$('#checkUITask').html('');
	//项目任务
	$('#projectTaskHead').html("项目任务(0)");
	$('#projectUITask').html('');
	//变更通知
	$('#changeNoticeHead').html("变更通知(0)");
	$('#changeNoticeUITask').html('');
	//发放文档
	$('#faFangDocHead').html("发放文档(0)");
	$('#faFangUITask').html('');
	if (!jsonData||jsonData.length==0){
		alert("没有需要处理的任务！");
		return ;
	}
	for (var key in jsonData){
		var jsonTask = jsonData[key];
		//审签任务
		if (key=="CheckTask"){
			showCheckTaskData(jsonTask);
		}
		//项目任务
		else if (key=="PROJECT_TASK"){
			showProjectTaskData(jsonTask);
		}
		//项目打回任务
		else if (key=="ProjectReturnTask"){
			showProjectReturn(jsonTask);
		}
		//变更通知单申请
		else if (key=="CHANGE_LISTENER"){
			showChangeNotice(jsonTask);
		}
		//发放文档
		else if (key=="FAFANG_NOTICE"){
			showFaFang(jsonTask);
		}
		//通用任务转发
		var taskbasic = $("a.taskbasic");
		if (taskbasic){
			taskbasic.on("click",function(e){
				loadTaskDetail($(this).attr("id"));
			});
		}
	}
}

/**
 * 展示审签任务
 */
function showCheckTaskData(jsonTask){
	var checkTaskCount = 0;
	for (var taskid in jsonTask){
		var checkTask = jsonTask[taskid];
		var	detailUrl = '../wx/taskDetail.html?'
			+'taskId='+checkTask.taskid+'&taskType='+checkTask.tasktype
			+'&receivetime='+checkTask.receivetime
			+'&activeid='+checkTask.activeid;
		var billobjectkey = _generateBillobjectkey(checkTask);
		var htmlText = "<li><a href='#' id='"+detailUrl;
		htmlText += "' workid='"+checkTask.taskid;
		htmlText += "' billtypename='"+checkTask.tasktypename;
		htmlText += "' activeid='"+checkTask.activeid;
		htmlText += "' billobjectkey='"+billobjectkey;
		htmlText += "' userid='"+checkTask.personid;
		htmlText += "' receivetime='"+checkTask.receivetime;
		htmlText += "' tasktype='"+checkTask.tasktype;
		htmlText += "' class='checkTask taskbasic' ><span class='glyphicon glyphicon-pencil' aria-hidden='true'>"
		+"</span>"+checkTask.checkobject+"&nbsp;&nbsp"+checkTask.taskname+"</a></li>";
		$("#checkUITask").append(htmlText);
		checkTaskCount++;
	}
	$("#checkTaskHead").html("审签任务("+checkTaskCount+")")
}
/**
 * 审签任务->生成 billobjectkey
 */
function _generateBillobjectkey(taskInfo){
	if(typeof(taskInfo)!='object'){return ;}
	var billobjectkey = '';
	/*taskInfo.bomName = taskInfo.bomName.replace(/'/g,"/'");
	taskInfo.bomName = encodeURI(taskInfo.bomName);*/
	switch(taskInfo.tasktype) {
		case 'CHECK_DOC_TASK' : billobjectkey += taskInfo.tasktypename + '$$$';
								billobjectkey += taskInfo.documentId + '$$$';
								billobjectkey += taskInfo.documentVer;
								break;
		case 'CHECK_BOM_TASK' : billobjectkey += taskInfo.tasktypename + '$$$';
								billobjectkey += taskInfo.bomName + '$$$';
								billobjectkey += taskInfo.partId + '$$$';
								billobjectkey += taskInfo.partVer + '$$$';
								billobjectkey += taskInfo.bomVer;
								break;
		case 'CHECK_CHG_TASK' : billobjectkey += taskInfo.tasktypename + '$$$129';
								break;
		case 'CHECK_CHGAPP_TASK' : billobjectkey += taskInfo.tasktypename + '$$$85';
								break;
		default : ;
	}
	billobjectkey = encodeURI(billobjectkey).replace(/'/g,'\\"')
	return billobjectkey;
}

/**
 * 加载任务详细信息
 */
function loadTaskDetail(detailUrl){
	location.href=detailUrl+"&date="+new Date();
}


/**
 * 展示项目任务
 */
function showProjectTaskData(jsonTask){
	var projectTaskCount = 0;
	for (var taskid in jsonTask){
		var projectTask = jsonTask[taskid];
		detailUrl = '../wx/taskDetail.html?'
		+'taskId='+projectTask.taskid+'&taskType='+projectTask.tasktype
		;
		var htmlText = "<li>"
		+"<a href='#' id='"+detailUrl+"' class='projectTask taskbasic'><span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span>"
		+projectTask.taskname+"&nbsp;&nbsp;"
		+"</a></li>";
		$("#projectUITask").append(htmlText);
		projectTaskCount++;
	}
	$('#projectTaskHead').html("项目任务("+projectTaskCount+")");
}
/**
 * 展示项目打回任务
 * @param jsonTask
 */
function showProjectReturn(jsonTask){
	for (var taskid in jsonTask){
		var returnTask = jsonTask[taskid];
		var htmlText = "<div class='taskbasic'>项目打回任务&nbsp;&nbsp;"+returnTask.taskname
		+"</div>";
	}
}
/**
 * 展示变更通知单
 * @param jsonTask
 */
function showChangeNotice(jsonTask){
	var changeNoticeCount = 0;
	for (var jsonKey in jsonTask){
		var changeAppTask = jsonTask[jsonKey],
			changeAppObj = eval('('+changeAppTask.jsonobj+')'),
				detailUrl = '../wx/taskDetail.html?'
				+'taskId='+changeAppObj.chgNoticeID+'&taskType='+changeAppTask.tasktype
				+'&receivetime='+changeAppObj.fromAppID
				+'&activeid='+changeAppObj.chgTaskID
				;
		var content = changeAppObj.docid+","+changeAppObj.docver;
		if (!changeAppObj.docver){
			content = changeAppObj.docid;
		}
		var htmlText = "<li><a href='#' id='"+detailUrl+"' class='changeTask taskbasic'><span class='glyphicon glyphicon-comment' aria-hidden='true'></span>"+
				content+"&nbsp;&nbsp;"
				+"</a></li>"
				;
		$("#changeNoticeUITask").append(htmlText);
		changeNoticeCount++;
	}
	$('#changeNoticeHead').html("变更通知("+changeNoticeCount+")");
}
/**
 * 展示发放文档
 * @param jsonTask
 */
function showFaFang(jsonTask){
	var faFangDocCount = 0;
	for (var jsonKey in jsonTask){
		var faTaskObj = jsonTask[jsonKey];
		var faFangObj = eval('('+faTaskObj.jsonobj+')');
		var detailUrl = '../wx/taskDetail.html?'
			+'taskId='+faFangObj.outputid+'&taskType='+faTaskObj.tasktype
			+'&receivetime='+faFangObj.docid+'&activeid='+faFangObj.docver
			;
		var htmlText = "<li><a href='#' id='"+detailUrl+"' class='faFangTask taskbasic'><span class='glyphicon glyphicon-folder-close' aria-hidden='true'></span>"+faFangObj.docid+","
				+faFangObj.docname+","+faFangObj.docver+"&nbsp;&nbsp;发放文档"
				+"</a></li>";
		$("#faFangUITask").append(htmlText);
		faFangDocCount++;
	}
	$('#faFangDocHead').html("发放文档("+faFangDocCount+")");
}