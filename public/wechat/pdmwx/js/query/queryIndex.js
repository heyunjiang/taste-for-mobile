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
});


var query = angular.module("queryApp", ['ngRoute','ngTable']);

query.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'queryPage.html'
        })
        .when('/queryResult', {
            templateUrl: 'queryResult.html',
            controller:'queryResultController'
        })
        .otherwise({
            redirectTo: '/main'
        });
}]);

query.controller("queryController",['$scope','ngTableParams','$routeParams','$location','$http',
function ($scope, ngTableParams,$routeParams,$location,$http) {
	var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    $scope.projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    $scope.projectPath = localhostPaht+ $scope.projectName;
    
    $scope.publicVar={};
    $scope.publicVar.isFirst = true;
    $scope.publicVar.dataGetOver = false;
   		
	$scope.tabIndex = 0;
	
	$scope.docSearch = {
		'docNum':"",
		'docName':"",
		'docCreatePerson':"",
		'docCreateTime':""
	};
	$scope.materailSearch = {
		'materailNum':"",
		'materailName':"",
		'materailCreatePerson':"",
		'materailCreateTime':""
	};
	$scope.chgApplySearch = {
		'chgApplyNum':"",
		'chgApplyName':"",
		'chgApplyCreatePerson':"",
		'chgApplyCreateTime':""
	};
	
	$scope.chgTaskSearch = {
		'chgTaskName':"",
		'chgTaskExecutePerson':"",
		'chgTaskCreatePerson':"",
		'chgTaskCreateTime':"",
		'chgTaskStatus':""
	};
	
	$scope.dataNum = [1,1,1,1];
	$scope.docs = [];
	$scope.materails = [];
	$scope.chgApply = [];
	$scope.chgTask = [];
	
    $scope.changeTab = function(tabIndex){
    	//window.scrollTo(0,0);  	

    	var divId = "#TabBtn"+$scope.tabIndex; 	
   		$scope.tabIndex = tabIndex;
   		var nowDivId = "#TabBtn"+$scope.tabIndex;
   		$(divId).removeClass("yonyouColor");
   		$(nowDivId).addClass("yonyouColor");  	
   	};
   	
   	$scope.searchBtn = function(){
   		/*wx.getNetworkType({
  	      success: function (res) {
  	        alert("网络："+res.networkType);
  	      },
  	      fail: function (res) {
  	        alert(JSON.stringify(res));
  	      }
  	    });
   		wx.getNetworkType();*/
   		var sendTempData = null;
   		if($scope.tabIndex == 0){
   			if($scope.docSearch.docNum == '' &&
   			$scope.docSearch.docName ==	'' &&
   			$scope.docSearch.docCreatePerson ==	''&&
   			$scope.docSearch.docCreateTime == ''){
   				alert("搜索条件为空");
   				return;
   			}else{
   				sendTempData = JSON.stringify($scope.docSearch);
   			}  			
		}else if($scope.tabIndex == 1){
			if($scope.materailSearch.materailNum == '' &&
   			$scope.materailSearch.materailName ==	'' &&
   			$scope.materailSearch.materailCreatePerson ==	''&&
   			$scope.materailSearch.materailCreateTime == ''){
   				alert("搜索条件为空");
   				return;
   			}else{
   				sendTempData = JSON.stringify($scope.materailSearch);
   			}
		}else if($scope.tabIndex == 2){
			if($scope.chgApplySearch.chgApplyNum == '' &&
   			$scope.chgApplySearch.chgApplyName ==	'' &&
   			$scope.chgApplySearch.chgApplyCreatePerson ==	''&&
   			$scope.chgApplySearch.chgApplyCreateTime == ''){
   				alert("搜索条件为空");
   				return;
   			}else{
   				sendTempData = JSON.stringify($scope.chgApplySearch);
   			}
		}else if($scope.tabIndex == 3){
			if($scope.chgTaskSearch.chgTaskName == '' &&
   			$scope.chgTaskSearch.chgTaskExecutePerson ==	'' &&
   			$scope.chgTaskSearch.chgTaskCreatePerson ==	''&&
   			$scope.chgTaskSearch.chgTaskCreateTime ==	''&&
   			$scope.chgTaskSearch.chgTaskStatus == ''){
   				alert("搜索条件为空");
   				return;
   			}else{
   				sendTempData = JSON.stringify($scope.chgTaskSearch);
   			}
		}
   		$scope.dataNum = [1,1,1,1];  		
   		$scope.docs = [
   			{'docNum': 'doc-0001', 'docName': '下发文档1', 'createPerson': '创建人1', 'createTime': '2017-12-27'},
   			{'docNum': 'doc-0002', 'docName': '下发文档2', 'createPerson': '创建人2', 'createTime': '2017-12-28'},
   		];
   		$scope.materails = [
   			{'materialNum': 'mat-0001', 'materialName': '下发物料1', 'createPerson': '创建人1', 'createTime': '2017-12-27'},
   			{'materialNum': 'mat-0002', 'materialName': '下发物料2', 'createPerson': '创建人2', 'createTime': '2017-12-28'},
   		];
   		$scope.chgApply = [
   			{'chgApplyNum': 'chg-0001', 'chgApplyName': '变更申请1', 'createPerson': '创建人1', 'createTime': '2017-12-27'},
   			{'chgApplyNum': 'chg-0002', 'chgApplyName': '变更申请2', 'createPerson': '创建人2', 'createTime': '2017-12-28'},
   		];
   		$scope.chgTask = [
   			{'executePerson': '执行人1', 'chgTaskName': '变更任务1', 'createPerson': '创建人1', 'createTime': '2017-12-27', 'status': '完成'},
   			{'executePerson': '执行人2', 'chgTaskName': '变更任务2', 'createPerson': '创建人2', 'createTime': '2017-12-28', 'status': '审签'},
   		];
   		// $("#dropBack").toggle();
   		$location.path("/queryResult");
   		return ;
   		//$("#waitModal").modal('show');
   		$http({
   			method:'GET',
   			url:"../../data/queryResult.json",
   		}).success(function(data,header,config,status){
   			var tempData = eval(data);       			
	       	for(var i = 0; i < tempData.length; i++){
	       		if($scope.tabIndex == 0){
	       			$scope.docs.push(tempData[i]);
	    		}else if($scope.tabIndex == 1){
	    			$scope.materails.push(tempData[i]);
	    		}else if($scope.tabIndex == 2){
	    			$scope.chgApply.push(tempData[i]);
	    		}else if($scope.tabIndex == 3){
	    			$scope.chgTask.push(tempData[i]);
	    		}
	       	}
	       	if(tempData.length == 0){
	       		$("#dropBack").toggle();
	       		alert("未检索到数据！");
	       		//$("#waitModal").modal('hide');
	       		return
	       	}else{
	       		$scope.dataNum[$scope.tabIndex] = $scope.dataNum[$scope.tabIndex]+1;	       		
	       		//$("#waitModal").modal('hide');
		       	$location.path("/queryResult");
		       	$("#dropBack").toggle();
	       	}       
		}).error(function(data,header,config,status){
			$("#dropBack").toggle();
			alert("未知异常！");
			//$("#waitModal").modal('hide');
		});
   		/*$.ajax({
         type: "POST",
         //url: $scope.projectPath+"/searchQuery.do?type="+$scope.tabIndex+"&searchStr="+$scope.searchText,
         url: $scope.projectPath+"/newSearchQuery.do",
         data:{
        	 'myObj': tempData,
        	 'index': $scope.dataNum[$scope.tabIndex],
        	 'tabIndex':$scope.tabIndex
         },
         cache:false,
         dataType: "text",
         success: function(data){
        	 var tempData = eval(data);       	 
        	 for(var i = 0; i < tempData.length; i++){
        		 $scope.docs.push(tempData[i]);
        	 }       	
         }        	         
       });
       	$location.path("/queryResult");
       */ 
   	} 
   	

//       $scope.$watch("dataArray", function () {
//         $scope.dataArrayTableParams.reload();
//       });
}]);

query.controller("queryResultController",['$scope','ngTableParams','$routeParams','$location','$http',
function ($scope, ngTableParams,$routeParams,$location,$http) {	
	var doRefreshTime = null;
	$scope.srcollNotRefresh = false;
	$scope.publicVar.dataGetOver = false;
	
	//解决ios微信的返回按钮问题
	window.onpopstate = function(e){	
		if($scope.srcollNotRefresh){
			$scope.srcollNotRefresh = false;	
		}
		$(".modal-backdrop").remove();
    }
	
	if($scope.publicVar.isFirst){
		$(window).scroll(function(){  
	    	//  window.screen.height
	    	 var $this =$(this),  
	         viewH =document.body.clientHeight ,//可见高度  
	         contentH =document.body.scrollHeight,//内容高度  
	         scrollTop =$(this).scrollTop();//滚动高度  
	        //if(contentH - viewH - scrollTop <= 100) { //到达底部100px时,加载新内容
	        if(scrollTop/(contentH -viewH)==1){
	        	if($scope.srcollNotRefresh){
	        		return;
	        	}
	        	
	        	if($scope.publicVar.dataGetOver){
	        		alert("数据已经全部加载!");
	        		return;
	        	}
	        	
	        	var myDate = new Date();
	        	if(doRefreshTime == null){	        		
	        		doRefreshTime = myDate.getTime();
	        	}else{
	        		var tempTime = myDate.getTime();
	        		if(tempTime-doRefreshTime<100){
	        			return;
	        		}else{
	        			doRefreshTime = tempTime;
	        		}
	        	}
	        	//$("#waitModal").modal('show');
	        	$("#dropBack").toggle();
	        	var sendTempData = null;
	       		if($scope.tabIndex == 0){
	       			sendTempData = JSON.stringify($scope.docSearch);
	    		}else if($scope.tabIndex == 1){
	    			sendTempData = JSON.stringify($scope.materailSearch);
	    		}else if($scope.tabIndex == 2){
	    			sendTempData = JSON.stringify($scope.chgApplySearch);
	    		}else if($scope.tabIndex == 3){
	    			sendTempData = JSON.stringify($scope.chgTaskSearch);
	    		}
	       		$http({
	       			method:'POST',
	       			url:$scope.projectPath+"/newSearchQuery.do",
	       			params:{
	       				'myObj': sendTempData,
	    	           	'index': $scope.dataNum[$scope.tabIndex],
	    	           	'tabIndex':$scope.tabIndex
	       			}
	       		}).success(function(data,header,config,status){
	       			var tempData = eval(data);	       			
	    	       	for(var i = 0; i < tempData.length; i++){
	    	       		if($scope.tabIndex == 0){
	    	       			$scope.docs.push(tempData[i]);
	    	    		}else if($scope.tabIndex == 1){
	    	    			$scope.materails.push(tempData[i]);
	    	    		}else if($scope.tabIndex == 2){
	    	    			$scope.chgApply.push(tempData[i]);
	    	    		}else if($scope.tabIndex == 3){
	    	    			$scope.chgTask.push(tempData[i]);
	    	    		}
	    	       	}
	    	       	$scope.dataNum[$scope.tabIndex] = $scope.dataNum[$scope.tabIndex]+1;
	    	       	//$("#waitModal").modal('hide');
	    	       	$("#dropBack").toggle();
	    	       	if(tempData.length<10){
	   	        		alert("数据已经全部加载!");
	   	        		$scope.srcollNotRefresh = true;
	   	        		$scope.publicVar.dataGetOver = true;
	   	        	}
	    	       
	    		}).error(function(data,header,config,status){
	    			$("#dropBack").toggle();
	    		});			
	    	}else{
	    		/*var a ="scrollTop:"+scrollTop +"*contentH:"+contentH+
	    		"*viewH:"+viewH;
	    		$("#myText").html(a+"****"+scrollTop/(contentH -viewH));*/
	    	}
	    });
		
		$scope.publicVar.isFirst = false;
	}
	
	
	$scope.showDetail = function(index){
		//不显示下载按钮
		$scope.showDownload = false;
   		$scope.downloadInfo = "";
		$scope.srcollNotRefresh = true;
		if($scope.tabIndex == 0){
			$scope.detailObject = $scope.docs[index];
		}else if($scope.tabIndex == 1){
			$scope.detailObject = $scope.materails[index];
		}else if($scope.tabIndex == 2){
			$scope.detailObject = $scope.chgApply[index];
		}else if($scope.tabIndex == 3){
			$scope.detailObject = $scope.chgTask[index];
		}
		$("#detailPage").modal('show');		
	}
	
	$scope.detailPageClose = function(){
		$("#detailPage").modal('hide');
		$scope.srcollNotRefresh = false;
	}
	
	$scope.downloadURL = "";
	
	$scope.downloadDocument = function(index){
		//初始化下载文档的信息
		//单击一次后按钮不可用
		$scope.downloadDocumentCanUse = true;
		if($scope.tabIndex == 0){
			$scope.showDownload = true;
			$scope.detailObject = $scope.docs[index];
		}
		//$("#waitModal").modal('show');
		$http({
   			method:'POST',
   			url:$scope.projectPath+"/downloadValidate.do",
   			params:{
   				'docNum': $scope.detailObject.docNum,
	           	'docVer': $scope.detailObject.docVer,
	           	'docName':$scope.detailObject.docName,
	           	'docType':$scope.detailObject.docFormat,
	           	'userWXH':$("#wxhHidden").val()
   			}
   		}).success(function(data,header,config,status){
   			var tempData = eval(data);	     
   			//$("#waitModal").modal('hide');
   			
	       	if(tempData.code == 'S'){
	       		$("#detailPage").modal('show');
	       		
	       		$scope.downloadInfo = tempData.message;       		
	       		$http({
	       			method:'POST',
	       			url:$scope.projectPath+"/downloadTempJump.do",
	       			params:{
	       				'documentName': tempData.documentName,
	    	           	'downloadUrl': tempData.downloadUrl,
	    	           	'uuid':tempData.uuid
	       			}
	       		}).success(function(data,header,config,status){	       			
	       			/*$("#downloadInfoId").attr("href",$scope.projectPath+"/wx/query/queryDownload.jsp"+"?documentName="+ tempData.documentName+
		    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp+
		    	   			"&requestTime="+tempData.requestTime);
	       			var timestamp = (new Date()).valueOf();*/
	       			$scope.downloadURL = $scope.projectPath+"/wx/query/queryDownload.jsp"+"?documentName="+ tempData.documentName+
    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&userWXH="+$("#wxhHidden").val()+"&plmUrlIp="+tempData.plmUrlIp+
    	   			"&requestTime="+tempData.requestTime;
	       			/*$scope.downloadURL = $scope.projectPath+"/WXdownload.do?documentName="+ tempData.documentName+
    	   			"&downloadUrl="+tempData.downloadUrl+"&uuid="+ tempData.uuid+"&plmUrlIp="+tempData.plmUrlIp+
    	   			"&requestTime="+tempData.requestTime+"&timestamp="+timestamp;*/
	       			$scope.canDownload = false;
	       		}).error(function(data,header,config,status){
	    			
	    		});       		
	       		//alert('文档详情底部提供下载按钮');
	       	}else if(tempData.code == '1'){   
	       		$("#detailPage").modal('show');
	       		$scope.canDownload = true;
	       		//alert(tempData.message);
	       		$scope.downloadInfo = tempData.message;
	       	}else if(tempData.code == '2'){   
	       		$("#detailPage").modal('show');
	       		$scope.canDownload = true;
	       		//alert(tempData.message);
	       		$scope.downloadInfo = tempData.message;
	       	}else if(tempData.code == '3'){
	       		$("#detailPage").modal('show');
	       		$scope.canDownload = true;
	       		//alert(tempData.message);
	       		$scope.downloadInfo = tempData.message;
	       	}else if(tempData.code == 'F'){      		
	       		alert(tempData.message);
	       		$("#detailPage").modal('hide');
	       	}
	       	//恢复按钮为可用
			$scope.downloadDocumentCanUse = false;
		}).error(function(data,header,config,status){
			//恢复按钮为可用
			$scope.downloadDocumentCanUse = false;
		});
		
	}
	
	$scope.directDownload = function(){
		$("#detailPage").modal('hide');
		$("#downloadModal").modal('show');
		//window.location.href = $scope.downloadURL;
		/*alert("http request");
		$http({
   			method:'POST',
   			url:$scope.downloadURL,
   			params:{}
   		}).success(function(data,header,config,status){	       			
	      //alert(data);
		}).error(function(data,header,config,status){
			
		});*/
		/*var urlParam=$scope.downloadURL.split("?")[1];
		var postParams = urlParam.split("&");
		var documentName = postParams[0].split("=")[1];
		var downloadUrl = postParams[1].split("=")[1];
		var uuid = postParams[2].split("=")[1];
		var plmUrlIp = postParams[3].split("=")[1];
		var requestTime = postParams[4].split("=")[1];
		var timestamp = postParams[5].split("=")[1];
		alert("documentName:"+documentName+"****downloadUrl:"+downloadUrl
				+"****uuid:"+uuid+"****plmUrlIp:"+plmUrlIp+"****requestTime:"
				+requestTime+"****timestamp:"+timestamp);	
		//alert("down3");
		var form = $("<form>");
        form.attr('style', 'display:none');
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', $scope.projectPath+"/WXdownload.do");
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'documentName');
        input1.attr('value', documentName);
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', 'downloadUrl');
        input2.attr('value', downloadUrl);
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', 'uuid');
        input3.attr('value', uuid);
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', 'plmUrlIp');
        input4.attr('value', plmUrlIp);
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', 'requestTime');
        input5.attr('value', requestTime);
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', 'timestamp');
        input6.attr('value', timestamp);
        $('body').append(form);
        form.append(input1);
        form.append(input2);
        form.append(input3);
        form.append(input4);
        form.append(input5);
        form.append(input6);
        
        form.submit();
        form.remove();*/
	}
	
	$scope.closeDownloadModal = function(){
		$("#downloadModal").modal('hide');
		//$("#detailPage").modal('toggle');	
	}
	
	$scope.downloadJumpUrl = function(){
		window.location.href = $scope.downloadURL;
	}
	
}]);