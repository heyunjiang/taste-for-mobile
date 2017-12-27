var showDetail = angular.module("showDetailApp", ['ngTable']);
showDetail.controller("showDetailController",['$scope','ngTableParams','$http',
function ($scope, ngTableParams,$http) {
	var curWwwPath=window.document.location.href;
  //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
  var pathName=window.document.location.pathname;
  var pos=curWwwPath.indexOf(pathName);
  //获取主机地址，如： http://localhost:8083
  var localhostPaht=curWwwPath.substring(0,pos);
  //获取带"/"的项目名，如：/uimcardprj
  $scope.projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	$scope.projectPath = localhostPaht+$scope.projectName;
	$scope.dataObject = {};
	//$scope.dataSwitch = 0;
	var taskId = $("#taskId").val();
	var receivetime = $("#receivetime").val();
	var activeid = $("#activeid").val();
	var taskType = $("#taskType").val();
	var personId = $("#personId").val();
	var isRenderDetailPage = false;
	
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
		$("#dropBack").toggle();
	});
	
	//流程图数据
	$scope.flowItems = [];
	
	//bom结构列表
	$scope.bomStructuresDatas = [];
	
	//变更申请书和变更通知单 的 文档详情
	$scope.detailObject = [];
	//审批按钮显示  0：提交/打回          1：通过/不通过
	$scope.approveBtnStatus = 0;
	/*
	$scope.dataSwitch = 4;
	$("#ptDetail").modal('show');*/
	
	//$scope.flowItems=[{"time":"2015-11-25 15:13:11","detail":"审批文档 张三 完成","state":"1"},{"time":"2015-11-25 15:13:11","detail":"审批文档 张三1 完成","state":"2"},{"time":"2015-11-25 15:13:11","detail":"审批文档 张三2 完成","state":"4"},{"time":"2015-11-25 15:13:11","detail":"审批文档 张三3 完成","state":"1"}];
	
	$scope.ptShowDownload = false;
	//批语
	$scope.approveDescription = "";
	$scope.transDescription = "";
	$scope.notAlreadyApprove = true;

  /*when taste=true*/
  let tastetaskType
  curWwwPath.split('?')[1].split('&').forEach(function(item){
    if(item.indexOf('taskType')>-1){
      tastetaskType = item.split('=')[1]
    }
  })
  

	//获取弹出卡片的信息
	/*$http({
			method:'POST',
			url:$scope.projectPath+"/pubcontroller/getTaskDetail.do?date="+new Date(),
			params:{
				 'taskId':taskId,
	        	 'taskType':taskType,
	        	 'receivetime':receivetime,
	        	 'activeid':activeid
			}
		}).success(function(data,header,config,status){*/
      var data = {}
      switch(tastetaskType){
        case 'CHECK_DOC_TASK' : data = {
                  "docName":"凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件详细需求",
                  "belongTask":"Req01909 凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件设计",
                  "docType":"docx",
                  "sumbitPerson":"柏本雄",
                  "status":"就绪",
                  "taskid":"3363",
                  "taskType":"审签任务",
                  "docVer":"10",
                  "taskTypes":"CHECK_DOC_TASK",
                  "projectNum":"1120140074",
                  "docNum":"CRDoc-00000248",
                  "taskBelongPerson":"李川江",
                  "personid":"28",
                  "taskArriveTime":"2017-12-26 14:13:09",
                  "belongProcedure":"CAD需求文档审签流程",
                  "shenqianNoteName":"需求自评",
                  "docClassify":"项目文档\\研发项目\\PLM\\2018\\P2 计划阶段\\详细需求",
                  "belongProduct":"",
                  "sumbitTime":"2017-12-26 10:22:10",
                  "belongProject":"PLM-01-2018"
                };
                break;
        case 'PROJECT_TASK' : data = {
                  "realStartTime":"2017-10-11 16:26:39",
                  "warnTime":"2017-11-21 13:30:00",
                  "executePerson":"李川江【项目成员】",
                  "taskid":"5754",
                  "taskType":"执行",
                  "realEndTime":"",
                  "taskName":"PLMPortal-10-2017",
                  "taskTypes":"PROJECT_TASK",
                  "rolename":"项目成员",
                  "earliestStartTime":"2017-10-11 15:00:00",
                  "warnPercent":"80",
                  "personid":"28",
                  "planStartTime":"2017-10-11 15:00:00",
                  "createPerson":"李川江",
                  "belongProduct":"",
                  "latestEndTime":"2017-11-30 15:00:00",
                  "belongProject":"PLMPortal-10-2017",
                  "planEndTime":"2017-11-30 15:00:00"
                };
                break;
      }
      isRenderDetailPage = false;
      var tempData = [];	
      tempData.push(data);
      $scope.dataObject = tempData[0];  
      if(data.taskTypes == "NO_USE_MOBLIE"){
         $("#dropBack").toggle();
         alert("用户被管理员设置为 不允许使用移动服务，请与管理员联系!");    
         wx.closeWindow();
      }else if(data.taskTypes == "PROJECT_TASK"){
       		 $scope.dataSwitch = 0; 
       		 $("#dropBack").toggle();
       		 $("#ptDetail").modal('show');
      }else if(data.taskTypes == "PROJECT_RUTURN_DOC_TASK"){
       		 $scope.dataSwitch = 1; 
       		 $("#dropBack").toggle();
       		 $("#ptDetail").modal('show');
      }else if(data.taskTypes == "PROJECT_RUTURN_BOM_TASK"){
       		 $scope.dataSwitch = 2; 
       		 $("#dropBack").toggle();
       		 $("#ptDetail").modal('show');
      }else if(data.taskTypes == "PROJECT_RUTURN_TECHBOM_TASK"){
       		 $scope.dataSwitch = 3; 
       		 $("#dropBack").toggle();
       		 $("#ptDetail").modal('show');
      }else if(data.taskTypes == "CHECK_DOC_TASK"){
       		$scope.dataSwitch = 4;
       		$scope.ptShowDownload = true;
		
       		//如果是物料申请单 隐藏掉底部按钮
       		if($scope.dataObject.docName == '物料申请单'){
       			$scope.meterialApplyHiden = false;
       		}else{
       			$scope.meterialApplyHiden = true;
       		}
       		
       		//获取流程图数据
       		/*$http({
       			method:'POST',
       			url:$scope.projectPath+"/pubcontroller/getDocWorkFlow.do",
       			params:{
       				'workid':taskId,
       				'activeId':activeid,
       				'docNum':$scope.dataObject.docNum,
       				'docVer':$scope.dataObject.docVer
       			}
       		}).success(function(data,header,config,status){*/
       			var flowTempData = {
              "description":"",
              "list":[
                {"time":"","detail":"需求自评 李川江 就绪","state":"2"},
                {"time":"","detail":"CAD开发评估 包可 未启动","state":"1"},
                {"time":"","detail":"测试评估 唐军 未启动","state":"1"},
                {"time":"","detail":"部门经理评审 杨波 未启动","state":"1"}
              ],
              "isSuccess":"0",
              "code":"S"
            };	         			
            if(flowTempData.code == 'S'){
              $scope.flowItems = flowTempData.list;
            }
          /*}).error(function(data,header,config,status){

          });*/
       		
       		//下载验证
     		  /*$http({
       			method:'POST',
       			url:$scope.projectPath+"/pubcontroller/downloadValidate.do?date="+new Date(),
       			params:{
       				'docNum':$scope.dataObject.docNum,
    	           	'docVer':$scope.dataObject.docVer,
    	           	'docName':$scope.dataObject.docName,
    	           	'docType':$scope.dataObject.docType
       			}
       		}).success(function(data,header,config,status){*/
       			var validateTempData = {
              "message":"（0.0584MB）",
              "fileDownloadToken":"22b0d8eb-d389-4247-ae1f-dd5583d1df44",
              "requestTime":"1514358622196A28",
              "enterpriseName":"用友PLM研发中心",
              "documentName":"CRDoc-00000248-凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件详细需求-10.docx",
              "downloadUrl":"http://www.yonyou.ztg.cn:80/pdmwx/pubcontroller/olre1whVHbxI5q3H4yTqPxa8SQ-I/用友PLM研发中心/weixin/4FEFCE015CF38BE59E78BEB12AC3B2D4/28/(CRDoc-00000248$10)凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件详细需求.docx/downloadFile.do",
              "code":"S",
              "uuid":"28"
            };	     
       			//$("#waitModal").modal('hide');
       			
    	       	/*if(validateTempData.code == 'S'){ 	       		
    	       		$scope.ptDownloadInfo = validateTempData.message; */      		
    	       		/*$http({
    	       			method:'POST',
    	       			url:$scope.projectPath+"/pubcontroller/downloadTempJump.do?date="+new Date(),
    	       			params:{
    	       				'documentName': tempData.documentName,
    	    	           	'downloadUrl': tempData.downloadUrl,
    	    	           	'uuid':tempData.uuid
    	       			}
    	       		}).success(function(data,header,config,status){*/
    	       			/*$("#ptDownloadInfoId").attr("href",$scope.projectPath+"/yonyouSpaceIntegration/queryDownload.jsp"+"?date="+new Date()+"&documentName="+ tempData.documentName+
    		    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp+"&enterpriseName="+tempData.enterpriseName
    		    	   			+"&fileDownloadToken="+tempData.fileDownloadToken
    		    	   			)
    		    	   			;
    	       			$scope.ptCanDownload = false;*/
    	       		/*}).error(function(data,header,config,status){
    	    			
    	    		    });*/
    	       		//alert('文档详情底部提供下载按钮');
    	       	/*}else if(tempData.code == '1'){   
    	       		$scope.ptCanDownload = true;
    	       		//alert(tempData.message);
    	       		$scope.ptDownloadInfo = tempData.message;
    	       	}else if(tempData.code == '2'){   
    	       		$scope.ptCanDownload = true;
    	       		//alert(tempData.message);
    	       		$scope.ptDownloadInfo = tempData.message;
    	       	}else if(tempData.code == '3'){
    	       		$scope.ptCanDownload = true;
    	       		//alert(tempData.message);
    	       		$scope.ptDownloadInfo = tempData.message;
    	       	}else if(tempData.code == 'F'){      		
    	       		alert(tempData.message);
    	       	}*/
    	       	$("#dropBack").toggle();
    	       	$("#ptDetail").modal('show');
    		  /*}).error(function(data,header,config,status){
      			$("#dropBack").toggle();
      		});*/
      }else if(data.taskTypes == "CHECK_BOM_TASK"){
       		$scope.dataSwitch = 5; 
       		//获取流程图数据
       		$http({
       			method:'POST',
       			url:$scope.projectPath+"/pubcontroller/getBomDesignWorkFlow.do?date="+new Date(),
       			params:{
       				'workid':taskId,
       				'activeId':activeid,
       				'bomname':$scope.dataObject.bomName,
       				'bomver':$scope.dataObject.bomVer,
       				'partid':$scope.dataObject.materialNum,
       				'partver':$scope.dataObject.materialVer
       			}
       		}).success(function(data,header,config,status){	       			
       			var tempData = eval(data);	         			
    	       	if(tempData.code == 'S'){
    	       		$scope.flowItems = tempData.list;
    	       	}else{
    	       		alert(tempData.message);
    	       	}
       		}).error(function(data,header,config,status){
    			
    		  });
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
      }else if(data.taskTypes == "CHECK_TECH_TASK"){
       		$scope.dataSwitch = 6; 
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
      }else if(data.taskTypes == "CHECK_CHGAPP_TASK"){
       		$scope.dataSwitch = 7; 
       		
       		//获取流程图数据
       		$http({
       			method:'POST',
       			url:$scope.projectPath+"/pubcontroller/getChgApplyWorkFlow.do?date="+new Date(),
       			params:{
       				'workid':taskId,
       				'activeId':activeid
       			}
       		}).success(function(data,header,config,status){	       			
       			var tempData = eval(data);	         			
    	       	if(tempData.code == 'S'){
    	       		$scope.flowItems = tempData.list;
    	       	}else{
    	       		alert(tempData.message);
    	       	}
       		}).error(function(data,header,config,status){
    			
    		  });
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
      }else if(data.taskTypes == "CHECK_CHG_TASK"){
       		$scope.dataSwitch = 8;
       		
       		//获取流程图数据
       		$http({
       			method:'POST',
       			url:$scope.projectPath+"/pubcontroller/getChgWorkFlow.do?date="+new Date(),
       			params:{
       				'workid':taskId,
       				'activeId':activeid
       			}
       		}).success(function(data,header,config,status){	       			
       			var tempData = eval(data);	         			
    	       	if(tempData.code == 'S'){
    	       		$scope.flowItems = tempData.list;
    	       	}else{
    	       		alert(tempData.message);
    	       	}
       		}).error(function(data,header,config,status){
    			
    		  });
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
      }else if(data.taskTypes == 'FAFANG_NOTICE'){
       		$scope.dataSwitch = 9;
       		$scope.ptShowDownload = true;
       		
       		$scope.ptDownloadInfo = '(未发放下载权限！)';
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
       		if($scope.dataObject.authority&&$scope.dataObject.authority.indexOf('下载')!=-1){
       			$scope.canDownload = 'true';
       			//下载验证
       			$http({
       				method:'POST',
       				url:$scope.projectPath+"/pubcontroller/downloadValidate.do?date="+new Date(),
       				params:{
       					'docNum':$scope.dataObject.docid,
       					'docVer':$scope.dataObject.docver,
       					'docName':$scope.dataObject.docname,
       					'docType':$scope.dataObject.docformat
       				}
       			}).success(function(data,header,config,status){
       				var tempData = eval(data);	     
	    	      	if(tempData.code == 'S'){ 	       		
	    	       			$scope.ptDownloadInfo = tempData.message;       		
	    	       			$http({
	    	       			method:'POST',
	    	       			url:$scope.projectPath+"/pubcontroller/downloadTempJump.do?date="+new Date(),
	    	       			params:{
	    	       				'documentName': tempData.documentName,
	    	    	           	'downloadUrl': tempData.downloadUrl,
	    	    	           	'uuid':tempData.uuid
	    	       			}
	    	       		}).success(function(data,header,config,status){	       			
	    	       			$("#ptDownloadChgInfoid").attr("href",$scope.projectPath+"/yonyouSpaceIntegration/queryDownload.jsp"+"?date="+new Date()+"&documentName="+ tempData.documentName+
	    		    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp+"&enterpriseName="+tempData.enterpriseName
	    		    	   			+"&fileDownloadToken="+tempData.fileDownloadToken);
	    	       			$scope.ptCanDownload = false;
	    	       		}).error(function(data,header,config,status){
	    	    			
	    	    		  });
	    	       		//alert('文档详情底部提供下载按钮');
	    	       	}else if(tempData.code == '1'){   
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == '2'){   
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == '3'){
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == 'F'){      		
	    	       		alert(tempData.message);
	    	       	}
    		    }).error(function(data,header,config,status){
    			     alert("status"+status);
    		    });
       		}
      }else if(data.taskTypes == 'CHANGE_LISTENER'){
       		$scope.dataSwitch = 10;
       		$scope.ptShowDownload = true;
       		
       		$("#dropBack").toggle();
       		$("#ptDetail").modal('show');
       			$scope.canDownload = 'true';
       			//下载验证
       			$http({
       				method:'POST',
       				url:$scope.projectPath+"/pubcontroller/downloadValidate.do?date="+new Date(),
       				params:{
       					'docNum':$scope.dataObject.docid,
       					'docVer':$scope.dataObject.docver,
       					'docName':$scope.dataObject.docname,
       					'docType':$scope.dataObject.docformat
       				}
       			}).success(function(data,header,config,status){
       				var tempData = eval(data);	     
	    	      	if(tempData.code == 'S'){ 	       		
	    	       			$scope.ptDownloadInfo = tempData.message;       		
	    	       			$http({
	    	       			method:'POST',
	    	       			url:$scope.projectPath+"/pubcontroller/downloadTempJump.do?date="+new Date(),
	    	       			params:{
	    	       				'documentName': tempData.documentName,
	    	    	           	'downloadUrl': tempData.downloadUrl,
	    	    	           	'uuid':tempData.uuid
	    	       			}
	    	       		}).success(function(data,header,config,status){	       			
	    	       			$("#ptDownloadChgInfoid").attr("href",$scope.projectPath+"/yonyouSpaceIntegration/queryDownload.jsp"+"?date="+new Date+"&documentName="+ tempData.documentName+
	    		    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp+"&enterpriseName="+tempData.enterpriseName
	    		    	   			+"&fileDownloadToken="+tempData.fileDownloadToken);
	    	       			$scope.ptCanDownload = false;
	    	       		}).error(function(data,header,config,status){
	    	    		});
	    	       	}else if(tempData.code == '1'){   
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == '2'){   
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == '3'){
	    	       		$scope.ptCanDownload = true;
	    	       		//alert(tempData.message);
	    	       		$scope.ptDownloadInfo = tempData.message;
	    	       	}else if(tempData.code == 'F'){      		
	    	       		alert(tempData.message);
	    	       	}
    		    }).error(function(data,header,config,status){
    			     alert("status"+status);
    		    });
      }else{
       		 $("#dropBack").toggle();
       		 alert("任务已提交，该条数据已过期！");
			     location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
      }
   
	
	$scope.ptDetailPageClose = function(){
		 $("#ptDetail").modal('hide');
		 location.href="./taskList.html#?date="+new Date()+"&state=refreshTaskLisk";
		 //wx.closeWindow();
	};
	
	$scope.openApproveModal = function(){
		//判断是否为会签
	
		var billtypename = "";
		var workidTemp ;
		var activeidTemp ;
		if($scope.dataSwitch == 4){
			billtypename = "文档审签任务";
			workidTemp = taskId;
			activeidTemp = activeid;
		}else if($scope.dataSwitch == 5){
			billtypename = "BOM审签任务";
			workidTemp = taskId+"$$$"+$scope.dataObject.bomName+"$$$"
			+$scope.dataObject.bomVer+"$$$"
			+$scope.dataObject.materialNum+"$$$"+$scope.dataObject.materialVer;
			activeidTemp = activeid;
		}else if($scope.dataSwitch == 7){
			billtypename = "变更申请审签任务";
			workidTemp = taskId;
			activeidTemp = activeid;
		}else if($scope.dataSwitch == 8){
			billtypename = "变更审签任务";
			workidTemp = taskId;
			activeidTemp = activeid;
		}
   		/*$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/getApproveInfo.do?date="+new Date(),
   			params:{
   				'workid':workidTemp,
   				'activeId':activeidTemp,
   				'billtypename':billtypename,
   				'receivetime':receivetime,
   				'taskType':taskType
   			}
   		}).success(function(data,header,config,status){*/
   			var getApproveInfoTempData = {
          "approveYN":"N",
          "bill":{
            "headTitleList":[
              {"value":"文档属性","key":"1"},
              {"value":"关联零部件","key":"2"},
              {"value":"关联任务","key":"3"}
            ],
            "opertype":"0",
            "billobjectkey":"文档审签任务$$$CRDoc-00000248$$$10",
            "billinfo":[
              {"value":"CRDoc-00000248","key":"文档编码"},
              {"value":"凌久电子-OrCAD接口提交BOM节点数量不统计非焊接件详细需求","key":"文档名称"},
              {"value":"10","key":"文档版本"},
              {"value":"详细需求","key":"文档分类"},
              {"value":"研发","key":"文档密级"},
              {"value":"正在审签","key":"文档状态"},
              {"value":"","key":"生效时间"},
              {"value":"","key":"失效时间"},
              {"value":"柏本雄","key":"创建人"},
              {"value":"2017-12-25 23:53:55","key":"创建时间"},
              {"value":"柏本雄","key":"修改人"},
              {"value":"2017-12-26 10:22:10","key":"修改时间"},
              {"value":"","key":"文件内容"}
            ],
            "fileNum":"1"
          },
          "description":"req_bill_infomation查询结果已返回！",
          "code":"S",
          "isSuccess":"0"
        }
   			if(getApproveInfoTempData.bill.opertype == 1){			
   				if(getApproveInfoTempData.approveYN == 'N'){
   					$scope.approveBtnStatus = 1;
   					$scope.approveBtnYes = "通过";
   	   				$scope.approveBtnNo = "不通过";
   				}else{
   					$scope.approveBtnStatus = 0;
   	   				$scope.approveBtnYes = "提交";
   	   				$scope.approveBtnNo = "打回";
   				}
   			}else{
   				$scope.approveBtnStatus = 0;
   				$scope.approveBtnYes = "提交";
   				$scope.approveBtnNo = "打回";
   			}
   			$scope.approveBtnTran = '转发';
   			$("#ptDetail").modal('hide');
   			$("#approveModal").modal('show');
   		/*}).error(function(data,header,config,status){
		  });*/
	}
	
	$scope.tranpersons = function(){
		/*$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/single/getTranstaskPerson.do?date="+new Date(),
   			params:{'taskId':taskId,
   				'type':taskType,
   				'personid':personId,
   				'receivetime':receivetime,
   				'activeid':activeid
   			}
   		}).success(function(data,header,config,status){*/
        var getTranstaskPersonData = {
          "personlist":[{"personid":"27","personname":"柏本雄"}],
          "tranflag":{"tranflag":"0"}
        }
   			if(getTranstaskPersonData.tranflag.tranflag != 0){
   				alert("获取企业成员失败！");
   			}else{
   				var sort_box = $("#sort_box")
   				sort_box.empty();
   				for ( var int = 0; int < getTranstaskPersonData.personlist.length; int++) {
  					var person = getTranstaskPersonData.personlist[int];
  					sort_box.append("<div class='sort_list'><div class='num_name' onclick='xclick("+person.personid+",\""+person.personname+"\")'>"+person.personname+"</div></div>");
  				}
   				$scope.initials();
   				$("#approveModal").modal('hide');
   				$("#ptDetail").modal('hide');
   				$("#tranpersonsModal").modal('show');
   				$('#tranpersonsModal').css({'overflow-y':'scroll'});
   			}
   		/*}).error(function(getTranstaskPersonData,header,config,status){
   			alert("请求转发人员列表失败！");
		});*/
	}
	/**
	 * 	public @ResponseBody String trancheckstask(String id, String type, 
			String userWXH,String personid,String trpersonid,String tranReason, HttpServletRequest req,
			String receivetime, String activeid){
	 */
	$scope.trantasks = function(){
		var tranreson = $scope.transDescription;
		var tranpersonid = $("#tranpersonsID").val();
		/*$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/single/trancheckstask.do?date="+new Date(),
   			params:{'taskId':taskId,
   				'type':taskType,
   				'personid':personId,
   				'trpersonid':tranpersonid,
   				'tranReason':tranreson,
   				'receivetime':receivetime,
   				'activeid':activeid
   			}
   		}).success(function(data,header,config,status){*/
   			/*if(data[0].tranflag != 0){
   				alert("转发失败,"+data.description);
   				$("#ptDetail").modal('hide');
   				$("#trantasksModal").modal('hide');
   				$("#tranpersonsModal").modal('hide');
   				$("#approveModal").modal('show');
   				$('#approveModal').css({'overflow-y':'scroll'});
   			}else{*/
   				alert("转发成功");
   				$("#ptDetail").modal('hide');
   				$("#approveModal").modal('hide');
   				$("#trantasksModal").modal('hide');
   				$("#tranpersonsModal").modal('hide');
   				wx.closeWindow();
				location.href="./taskList.html?date="+new Date()+"&state=refreshTaskLisk";
   			/*}
   		}).error(function(data,header,config,status){
   			alert("请求失败！");
		});*/
	
	}
	
	$scope.approve = function(actionType){
		var action;
		if($scope.approveBtnStatus == 0){
			if(actionType == 0){
				action = "C";
			}else if(actionType == 1){
				action = "R";
			}
		}else if($scope.approveBtnStatus == 1){
			if(actionType == 0){
				action = "Y";
			}else if(actionType == 1){
				action = "N";
			}
		}
    alert("成功执行审批");
    location.href="./taskList.html?date="+new Date()+"&state=refreshTaskLisk";
    return ;
		
		
		//文档
		$("#dropBack").toggle();
		if($scope.dataSwitch == 4){
			//执行审批
	   		$http({
	   			method:'POST',
	   			url:$scope.projectPath+"/pubcontroller/approveDoc.do?date="+new Date(),
	   			params:{
	   				'workid':taskId,
	   				'activeId':activeid,
	   				'docNum':$scope.dataObject.docNum,
       				'docVer':$scope.dataObject.docVer,
       				'personId':personId,
       				'action':action,
       				'description':$scope.approveDescription
	   			}
	   		}).success(function(data,header,config,status){	
	   			
	   			var tempData = eval(data);	         			
	       			if(tempData[0].tranflag == 0){
	       				alert("成功执行审批");
		       			$("#approveModal").modal('hide');
			       		$scope.notAlreadyApprove = false;
			       		//获取流程图数据
			       		$http({
			       			method:'POST',
			       			url:$scope.projectPath+"/pubcontroller/getDocWorkFlow.do?date="+new Date(),
			       			params:{
			       				'workid':taskId,
			       				'activeId':activeid,
			       				'docNum':$scope.dataObject.docNum,
			       				'docVer':$scope.dataObject.docVer
			       			}
			       		}).success(function(data,header,config,status){	       			
			       			var tempData = eval(data);
			    	       	if(tempData.code == 'S'){
			    	       		$scope.flowItems = tempData.list;
			    	       	}else{
			    	       		alert(tempData.message);
			    	       	}
			    	       	$("#dropBack").toggle();
							//render agency task page
							location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
			       		}).error(function(data,header,config,status){
			    			
			    		});
			       		
		       		}else{
		       			$("#dropBack").toggle();
		       			alert(tempData.description);
						location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
		       		}
		       	
	   		}).error(function(data,header,config,status){
				
			});
	   	//设计BOM
		}else if($scope.dataSwitch == 5){
			//执行审批
	   		$http({
	   			method:'POST',
	   			url:$scope.projectPath+"/pubcontroller/approveBomDesign.do?date="+new Date(),
	   			params:{
	   				'workid':taskId,
	   				'activeId':activeid,
	   				'bomname':$scope.dataObject.bomName,
	   				'bomver':$scope.dataObject.bomVer,
	   				'partid':$scope.dataObject.materialNum,
	   				'partver':$scope.dataObject.materialVer,
       				'personId':personId,
       				'action':action,
       				'description':$scope.approveDescription
	   			}
	   		}).success(function(data,header,config,status){	
	   			
	   			var tempData = eval(data);
		       		if(tempData[0].tranflag == 0){
		       			alert("成功执行审批");
		       			$("#approveModal").modal('hide');
			       		$scope.notAlreadyApprove = false;
			       		//获取流程图数据
			       		$http({
			       			method:'POST',
			       			url:$scope.projectPath+"/pubcontroller/getBomDesignWorkFlow.do?date="+new Date(),
			       			params:{
			       				'workid':taskId,
			       				'activeId':activeid,
			       				'bomname':$scope.dataObject.bomName,
			       				'bomver':$scope.dataObject.bomVer,
			       				'partid':$scope.dataObject.materialNum,
			       				'partver':$scope.dataObject.materialVer
			       			}
			       		}).success(function(data,header,config,status){	       			
			       			var tempData = eval(data);	         			
			    	       	if(tempData.code == 'S'){
			    	       		$scope.flowItems = tempData.list;
			    	       	}else{
			    	       		alert(tempData.message);
			    	       	}
			    	       	$("#dropBack").toggle();
							location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
			       		}).error(function(data,header,config,status){
			    			
			    		});
			       		
		       		}else{
		       			$("#dropBack").toggle();
		       			alert(tempData.description);
						location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
		       		}	       		
		       	
	   		}).error(function(data,header,config,status){
				
			});
	   	//变更审签任务
		}else if($scope.dataSwitch == 8){
			//执行审批
	   		$http({
	   			method:'POST',
	   			url:$scope.projectPath+"/pubcontroller/approveChg.do?date="+new Date(),
	   			params:{
	   				'workid':taskId,
	   				'activeId':activeid,
       				'personId':personId,
       				'action':action,
       				'description':$scope.approveDescription
	   			}
	   		}).success(function(data,header,config,status){	
  				   
	   			var tempData = eval(data);	 
		       		if(tempData[0].tranflag == 0){
		       			alert("成功执行审批");
		       			$("#approveModal").modal('hide');
			       		$scope.notAlreadyApprove = false;
			       		//获取流程图数据
			       		$http({
			       			method:'POST',
			       			url:$scope.projectPath+"/pubcontroller/getChgWorkFlow.do?date="+new Date(),
			       			params:{
			       				'workid':taskId,
			       				'activeId':activeid
			       			}
			       		}).success(function(data,header,config,status){	       			
			       			var tempData = eval(data);	         			
			    	       	if(tempData.code == 'S'){
			    	       		$scope.flowItems = tempData.list;
			    	       	}else{
			    	       		alert(tempData.message);
			    	       	}
			    	       	$("#dropBack").toggle();
							location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
			       		}).error(function(data,header,config,status){
			    			
			    		});
			       		
		       		}else{
		       			$("#dropBack").toggle();
		       			alert(tempData.description);
						location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
		       		}	
	   		}).error(function(data,header,config,status){
				
			});
	   	//变更申请任务审批
		}else if($scope.dataSwitch == 7){
			//执行审批
	   		$http({
	   			method:'POST',
	   			url:$scope.projectPath+"/pubcontroller/approveChgApply.do?date="+new Date(),
	   			params:{
	   				'workid':taskId,
	   				'activeId':activeid,
       				'personId':personId,
       				'action':action,
       				'description':$scope.approveDescription
	   			}
	   		}).success(function(data,header,config,status){	
	   			
	   			var tempData = eval(data);	
		       		if(tempData[0].tranflag == 0){
		       			alert("成功执行审批");
		       			$("#approveModal").modal('hide');
			       		$scope.notAlreadyApprove = false;
			       		//获取流程图数据
			       		$http({
			       			method:'POST',
			       			url:$scope.projectPath+"/pubcontroller/getChgApplyWorkFlow.do?date="+new Date(),
			       			params:{
			       				'workid':taskId,
			       				'activeId':activeid
			       			}
			       		}).success(function(data,header,config,status){	       			
			       			var tempData = eval(data);	         			
			    	       	if(tempData.code == 'S'){
			    	       		$scope.flowItems = tempData.list;
			    	       	}else{
			    	       		alert(tempData.message);
			    	       	}
			    	       	$("#dropBack").toggle();
							location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
			       		}).error(function(data,header,config,status){
			    			
			    		});
			       		
		       		}else{
		       			$("#dropBack").toggle();
		       			alert(tempData.description);
						location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
		       		}	       		
		       	
	   		}).error(function(data,header,config,status){
				
			});
		}
		
	}
	
	$scope.approveModalClose = function(){
		$("#approveModal").modal('hide');
		$("#ptDetail").modal('show');
		$('#ptDetail').css({'overflow-y':'scroll'});
	}
	
	$scope.tranpersonsModalColse = function(){
		$("#tranpersonsModal").modal('hide');
		$("#approveModal").modal('show');
		$('#approveModal').css({'overflow-y':'scroll'});
	}
	
	$scope.trantasksModalClose = function(){
		$("#trantasksModal").modal('hide');
		$("#tranpersonsModal").modal('hide');
		$("#ptDetail").modal('hide');
		$("#approveModal").modal('show');
		$('#approveModal').css({'overflow-y':'scroll'});
	}

	
	//bom 结构按钮
	
	$scope.getStructrue = function(){
		//获取Bom结构列表
   		$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/getBomStructureTable.do?date="+new Date(),
   			params:{
	   				'bomname':$scope.dataObject.bomName,
	   				'bomver':$scope.dataObject.bomVer,
	   				'partid':$scope.dataObject.materialNum,
	   				'partver':$scope.dataObject.materialVer
   			}
   		}).success(function(data,header,config,status){	 
   			var tempData = eval(data);	         			
	       	if(tempData.code == 'S'){
	       		$scope.bomStructuresDatas = tempData.list;
       			$("#ptDetail").modal('hide');
       			$("#bomStructrueModal").modal('show');
	       	}else{
	       		alert(tempData.message);
	       	}
   			
   		}).error(function(data,header,config,status){
			
		});
	};
	
	$scope.bomStructrueModalClose = function(){
		$("#bomStructrueModal").modal('hide');
		location.href=$scope.projectPath+"/pubcontroller/toHandingTaskPage.do?date="+new Date()+"&state=refreshTaskLisk";
	};
	
	$('#ptDetail').on('show.bs.modal', function (e) {

		$('#bomStructrueModal').modal('hide');

	});
	
	$('#bomStructrueModal').on('hidden.bs.modal', function (e) {

		$('#ptDetail').modal('show');

	});
	
	$scope.chgApplyBook = function(){
		
   		$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/chgApplyBook.do?date="+new Date(),
   			params:{'id':taskId
   			}
   		}).success(function(data,header,config,status){
   			var tempData = eval(data);	         			
	       	if(tempData.status == 0){
	       		$('#ptDetail').modal('hide');
	    		$('#docDetailModal').modal('show');	
   				var tempArray = tempData.data;
   				if(tempArray.length > 0){
   		       		$scope.detailObject = tempArray[0];
   		       		$scope.docDetailValidateDownload();
   		       	}
   			}else if(tempData.status == 1){
   				alert(tempData.message);
   			}
	       	
   		}).error(function(data,header,config,status){
			
		});
	}
	
	$scope.chgNotifyList = function(){
		
			
   		$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/chgNotifyList.do?date="+new Date(),
   			params:{'id':taskId
   			}
   		}).success(function(data,header,config,status){
   			var tempData = eval(data);
   			if(tempData.status == 0){
   				$('#ptDetail').modal('hide');
   				$('#docDetailModal').modal('show');
   				var tempArray = tempData.data;
   				if(tempArray.length > 0){
   		       		$scope.detailObject = tempArray[0];
   		       		$scope.docDetailValidateDownload();
   		       	}
   			}else if(tempData.status == 1){
   				$scope.detailObject = tempData.data;
   				$('#ptDetail').modal('hide');
   				$('#chgApplyBookDetailModal').modal('show');
   				//alert("变更申请书作为变更通知");
   			}else if(tempData.status == 2){
   				alert(tempData.message);
   			}
	       	
   		}).error(function(data,header,config,status){
			
		});
	}
	
	$scope.docDetailValidateDownload = function(){
		//下载验证
 		$http({
   			method:'POST',
   			url:$scope.projectPath+"/pubcontroller/downloadValidate.do?date="+new Date(),
   			params:{
   				'docNum':$scope.detailObject.docNum,
	           	'docVer':$scope.detailObject.docVer,
	           	'docName':$scope.detailObject.docName,
	           	'docType':$scope.detailObject.docFormat
   			}
   		}).success(function(data,header,config,status){
   			var tempData = eval(data);	     
   			//$("#waitModal").modal('hide');
   			
	       	if(tempData.code == 'S'){ 	       		
	       		$scope.dDDownloadInfo = tempData.message;       		
	       		$http({
	       			method:'POST',
	       			url:$scope.projectPath+"/pubcontroller/downloadTempJump.do?date="+new Date(),
	       			params:{
	       				'documentName': tempData.documentName,
	    	           	'downloadUrl': tempData.downloadUrl,
	    	           	'uuid':tempData.uuid
	       			}
	       		}).success(function(data,header,config,status){	       			
	       			$("#dDDownloadInfoId").attr("href",$scope.projectPath+"/yonyouSpaceIntegration/queryDownload.jsp"+"?date="+new Date()+"&documentName="+ tempData.documentName+
		    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp
		    	   			+"&enterpriseName="+tempData.enterpriseName+"&date="+new Date()
	       			+"&fileDownloadToken="+tempData.fileDownloadToken);
	       			$scope.dDCanDownload = false;
	       		}).error(function(data,header,config,status){
	    			
	    		});
	       		//alert('文档详情底部提供下载按钮');
	       	}else if(tempData.code == '1'){   
	       		$scope.dDCanDownload = true;
	       		//alert(tempData.message);
	       		$scope.dDDownloadInfo = tempData.message;
	       	}else if(tempData.code == '2'){   
	       		$scope.dDCanDownload = true;
	       		//alert(tempData.message);
	       		$scope.dDDownloadInfo = tempData.message;
	       	}else if(tempData.code == '3'){
	       		$scope.dDCanDownload = true;
	       		//alert(tempData.message);
	       		$scope.dDDownloadInfo = tempData.message;
	       	}else if(tempData.code == 'F'){  
	       		$scope.dDCanDownload = true;
	       		alert(tempData.message);
	       	}
		}).error(function(data,header,config,status){
			
		});
	}
	
	$('#ptDetail').on('show.bs.modal', function (e) {

		$('#docDetailModal').modal('hide');

	});
	
	$('#docDetailModal').on('hidden.bs.modal', function (e) {

		$('#ptDetail').modal('show');

	});
	
	$scope.docDetailModalClose = function(){		
		$('#docDetailModal').modal('hide');
	};
	
	$('#chgApplyBookDetailModal').on('hidden.bs.modal', function (e) {

		$('#ptDetail').modal('show');

	});
	
	$scope.chgApplyBookDetailModalClose = function(){		
		$('#chgApplyBookDetailModal').modal('hide');
	};
	

	$scope.initials = function() {//公众号排序
	   var SortList=$(".sort_list");
	   var SortBox=$(".sort_box");
	   SortList.sort(asc_sort).appendTo('.sort_box');//按首字母排序
	   function asc_sort(a, b) {
	       return makePy($(b).find('.num_name').text().charAt(0))[0].toUpperCase() < makePy($(a).find('.num_name').text().charAt(0))[0].toUpperCase() ? 1 : -1;
	   }

	   var initials = [];
	   var num=0;
	   SortList.each(function(i) {
	       var initial = makePy($(this).find('.num_name').text().charAt(0))[0].toUpperCase();
	       if(initial>='A'&&initial<='Z'){
	           if (initials.indexOf(initial) === -1)
	               initials.push(initial);
	       }else{
	           num++;
	       }
	       
	   });

	   $.each(initials, function(index, value) {//添加首字母标签
	       SortBox.append('<div class="sort_letter button" id="'+ value +'">' + value + '</div>');
	   });
	   if(num!=0){SortBox.append('<div class="sort_letter" id="default">#</div>');}
	
	   for (var i =0;i<SortList.length;i++) {//插入到对应的首字母后面
	       var letter=makePy(SortList.eq(i).find('.num_name').text().charAt(0))[0].toUpperCase();
	       switch(letter){
	           case "A":
	               $('#A').after(SortList.eq(i));
	               break;
	           case "B":
	               $('#B').after(SortList.eq(i));
	               break;
	           case "C":
	               $('#C').after(SortList.eq(i));
	               break;
	           case "D":
	               $('#D').after(SortList.eq(i));
	               break;
	           case "E":
	               $('#E').after(SortList.eq(i));
	               break;
	           case "F":
	               $('#F').after(SortList.eq(i));
	               break;
	           case "G":
	               $('#G').after(SortList.eq(i));
	               break;
	           case "H":
	               $('#H').after(SortList.eq(i));
	               break;
	           case "I":
	               $('#I').after(SortList.eq(i));
	               break;
	           case "J":
	               $('#J').after(SortList.eq(i));
	               break;
	           case "K":
	               $('#K').after(SortList.eq(i));
	               break;
	           case "L":
	               $('#L').after(SortList.eq(i));
	               break;
	           case "M":
	               $('#M').after(SortList.eq(i));
	               break;
	           case "O":
	               $('#O').after(SortList.eq(i));
	               break;
	           case "P":
	               $('#P').after(SortList.eq(i));
	               break;
	           case "Q":
	               $('#Q').after(SortList.eq(i));
	               break;
	           case "R":
	               $('#R').after(SortList.eq(i));
	               break;
	           case "S":
	               $('#S').after(SortList.eq(i));
	               break;
	           case "T":
	               $('#T').after(SortList.eq(i));
	               break;
	           case "U":
	               $('#U').after(SortList.eq(i));
	               break;
	           case "V":
	               $('#V').after(SortList.eq(i));
	               break;
	           case "W":
	               $('#W').after(SortList.eq(i));
	               break;
	           case "X":
	               $('#X').after(SortList.eq(i));
	               break;
	           case "Y":
	               $('#Y').after(SortList.eq(i));
	               break;
	           case "Z":
	               $('#Z').after(SortList.eq(i));
	               break;
	           default:
	               $('#default').after(SortList.eq(i));
	               break;
	       }
	   };
	}  
	
}]);

function xclick(tranpersonid,tranpersonname) {//
	if(tranpersonid){
		$("#tranpersonsID").val(tranpersonid);
		$("#ptDetail").modal('hide');
		$("#approveModal").modal('hide');
		$("#tranpersonsModal").modal('hide');
		$("#trantasksModal").modal('show');
		$("#tranresonid").attr("placeholder","请输入任务转发给"+tranpersonname+"的理由");
		$('#trantasksModal').css({'overflow-y':'scroll'});
	}else{
		alert("请选择转发人员！");
	}
}
