$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;
		this.dataMap = {};//用于保存选中对象的id和name键值对，因为后台不愿意给，所以就自己保存一个对象
		this.links = el[0].querySelectorAll('.link');
		this.bindEvent();
	}
	/*add by heyunjiang on 2017.7.25*/
	Accordion.prototype.bindEvent = function(){
		let ad = this;
		//4个任务头部事件
		this.links.forEach(function(item){
			if(item.querySelector('#checkTaskHead')){
				new window.longTouch(item,ad.dropdown.bind(ad),ad.multipleCheck.bind(ad));
			}else {
				new window.longTouch(item,ad.dropdown.bind(ad));
			}
		});
		// 退出长按事件
		document.querySelector('#cancelAll').addEventListener('click',function(e){
			ad.hideTop(e);
			ad.reverseLiEvent();
			ad.opreateCheckbox('del');
			ad.dropdown(e);
		});
		//全选反选
		document.querySelector('#selectAll').firstChild.addEventListener('click',function(e){
			if(this.checked){
				ad.opreateCheckbox('selelt');
			}else {
				ad.opreateCheckbox('noselect');
			}
		});
		//审批
		document.querySelector('#checkAll').addEventListener('click',function(e){
			console.log(ad.opreateCheckbox('get'));
			if(ad.opreateCheckbox('get').length>0){
				ad.showExcuteModal();
			}else {
				weui.topTips('请选择审批项', 1000);
			}
		});
		ad.bindModalEvent();
	}
	/*绑定3个modal事件*/
	Accordion.prototype.bindModalEvent = function(){
		let ad = this;
		/*审批转发*/
		document.querySelector('#checkTrans').addEventListener('click',function(e){
			ad.getMember();
		});
		/*审批提交*/
		document.querySelector('#checkSubmit').addEventListener('click',function(e){
			let xml = ad.xmlCheckPost("C");
			try {
				$.post("/pdmwx/pubcontroller/doMutiProceedTask.do",{data:xml},function(data){
					data = JSON.parse(data);
					if(data.length > 0){
						let des = "";
						let flag = 0;
						data.forEach(function(item){
							if(item.tranflag != 0){
								if(typeof(ad.dataMap[item.workid])!='undefined'){
									des = flag==0?ad.dataMap[item.workid]:des+'、'+ad.dataMap[item.workid];
									flag = 1;
								}
							}
						});
						des = flag==0?"审签全部处理成功":des+"处理失败";
						weui.toast(des, {
						    duration: 2000,
						    className: 'custom-classname',
						    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random()+"&state=refreshTaskLisk"; }
						});
					}
				})
			}catch(e){
				console.log(e);
				weui.toast('网络或服务器出现错误');
			}
			/*weui.toast('提交成功', {
			    duration: 2000,
			    className: 'custom-classname',
			    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random(); }
			});*/
		});
		/*审批打回*/
		document.querySelector('#checkReback').addEventListener('click',function(e){
			let xml = ad.xmlCheckPost("R");
			try {
				$.post("/pdmwx/pubcontroller/doMutiProceedTask.do",{data:xml},function(data){
					data = JSON.parse(data);
					if(data.length > 0){
						let des = "";
						let flag = 0;
						data.forEach(function(item){
							if(item.tranflag != 0){
								if(typeof(ad.dataMap[item.workid])!='undefined'){
									des = flag==0?ad.dataMap[item.workid]:des+'、'+ad.dataMap[item.workid];
									flag = 1;
								}
							}
						});
						des = flag==0?"全部成功打回":des+"打回失败";
						weui.toast(des, {
						    duration: 2000,
						    className: 'custom-classname',
						    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random()+"&state=refreshTaskLisk"; }
						});
					}
				})
			}catch(e){
				console.log(e);
				weui.toast('网络或服务器出现错误');
			}
			// $.post(url,{},function(data){});
			/*weui.toast('打回成功', {
			    duration: 2000,
			    className: 'custom-classname',
			    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random(); }
			});*/
		});
		/*选择转发人*/
		document.querySelector('#sort_box').addEventListener('click',function(e){
			document.querySelector('#tranresonid').setAttribute('placeholder',"请输入任务转发给"+e.target.innerHTML+"的理由");
			document.querySelector('#tranresonid').setAttribute('userId',e.target.getAttribute('pid'));
			ad.hideExcuteModal();
			$("#tranpersonsModal").modal('hide');
			$("#trantasksModal").modal('show');
		});
		/*提交转发*/
		document.querySelector('#submitTrans').addEventListener('click',function(e){
			let xml = ad.xmlTransPost();
			try {
				$.post("/pdmwx/pubcontroller/trancheckstask.do",{data:xml},function(data){
					data = JSON.parse(data);
					if(data.length > 0){
						let des = "";
						let flag = 0;
						data.forEach(function(item){
							if(item.tranflag != 0){
								if(typeof(ad.dataMap[item.id])!='undefined'){
									des = flag==0?ad.dataMap[item.id]:des+'、'+ad.dataMap[item.id];
									flag = 1;
								}
							}
						});
						des = flag==0?"全部转发成功":des+"转发失败";
						weui.toast(des, {
						    duration: 2000,
						    className: 'custom-classname',
						    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random()+"&state=refreshTaskLisk"; }
						});
					}
				})
			}catch(e){
				console.log(e);
				weui.toast('网络或服务器出现错误');
			}
			/*weui.toast('转发成功', {
			    duration: 2000,
			    className: 'custom-classname',
			    callback: function(){ window.location.href=window.location.href.split('?')[0]+"?id="+10000*Math.random(); }
			});*/
		});
		/*取消转发*/
		document.querySelector('#cancelTrans').addEventListener('click',function(e){
			$("#trantasksModal").modal('hide');
			ad.showExcuteModal();
		});
	}
	/*单击收缩*/
	Accordion.prototype.dropdown = function(e) {
		e.preventDefault();
		var $el = $(this.el);
			$this = $(e.target),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');
		$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
	}	
	/*长按操作函数*/
	Accordion.prototype.multipleCheck = function(e){
		let link = e.target;
		let li = link.parentNode;
		if(li.className == 'open'){}else{
			this.dropdown(e);
		}
		this.opreateCheckbox('add');
		this.cancelLiEvent();
		this.showTop();
	}
	/*显示顶部*/
	Accordion.prototype.showTop = function(e){
		let checkTop = document.querySelector('.multiplecheck');
		if(checkTop.className == "multiplecheck"){
			checkTop.className = "multiplecheck multiplecheck-show";
		}
		document.querySelector('#selectAll').style.display = "inline-block";
		document.querySelector('#checkAll').style.display = "inline-block";
		document.querySelector('#selectAll').firstChild.checked = false;
	}
	/*隐藏顶部*/
	Accordion.prototype.hideTop = function(e){
		document.querySelector('.multiplecheck').className = "multiplecheck";
		document.querySelector('#selectAll').style.display = "none";
		document.querySelector('#checkAll').style.display = "none";
	}
	/*操作所有的checkbox,opt: add/del/selelt/noselect/get */
	Accordion.prototype.opreateCheckbox = function(opt){
		if(typeof(opt) == "undefined"){
			return ;
		}
		let checkUI = document.querySelector('#checkUITask');
		let li_poor = checkUI.getElementsByTagName('li');
		switch(opt){
			case "add" :checkUI.style.display = "none";
						for(let i=0;i<li_poor.length;i++){
							let checkbox = document.createElement('input');
							checkbox.setAttribute('type','checkbox');
							if(li_poor[i].childNodes.length == 1){
								li_poor[i].insertBefore(checkbox,li_poor[i].firstChild);
							}
						};
						checkUI.style.display = "inherit";
						break;
			case "del" :checkUI.style.display = "none";
						for(let i=0;i<li_poor.length;i++){
							if(li_poor[i].childNodes.length > 1){
								li_poor[i].removeChild(li_poor[i].firstChild);
							}
						};
						checkUI.style.display = "inherit";
						break;
			case "selelt" : checkUI.style.display = "none";
							for(let i=0;i<li_poor.length;i++){
								if(li_poor[i].childNodes.length>1&&li_poor[i].firstChild.getAttribute('type')=="checkbox"){
									li_poor[i].firstChild.checked = true;
								}
							};
							checkUI.style.display = "inherit";
							break;
			case "noselect" :checkUI.style.display = "none";
							for(let i=0;i<li_poor.length;i++){
								if(li_poor[i].childNodes.length>1&&li_poor[i].firstChild.getAttribute('type')=="checkbox"){
									li_poor[i].firstChild.checked = false;
								}
							};
							checkUI.style.display = "inherit";
							break;
			case "get" :let tasklink = [];
						for(let i=0;i<li_poor.length;i++){
							let fc = li_poor[i].firstChild;
							if(li_poor[i].childNodes.length>1&&fc.getAttribute('type')=="checkbox"&&fc.checked){
								if(li_poor[i].lastChild.hasAttribute('id')){
									tasklink.push(li_poor[i].lastChild);
								}
							}
						};
						return tasklink;break;
			default : return ;
		}
	}
	/*取消默认的点击跳转事件*/
	Accordion.prototype.cancelLiEvent = function(){
		$("a.taskbasic").off('click');
		$("a.taskbasic").on('click',function(e){
			e.preventDefault();
			let parent = this.parentNode;
			if(parent.childNodes.length>1&&parent.firstChild.getAttribute('type')=="checkbox"){
				if(parent.firstChild.checked){
					parent.firstChild.checked = false;
					document.querySelector('#selectAll').firstChild.checked = false;
				}else {
					parent.firstChild.checked = true;
				}
			}
		});
	}
	/*恢复默认的点击跳转事件*/
	Accordion.prototype.reverseLiEvent = function(){
		$("a.taskbasic").off('click');
		$("a.taskbasic").on('click',function(e){
			e.preventDefault();
			location.href=$(this).attr("id")+"&date="+new Date();
		});
	}
	/*执行审批modal show*/
	Accordion.prototype.showExcuteModal = function(){
		$("#approveModal").modal('show');
	}
	/*执行审批modal hide*/
	Accordion.prototype.hideExcuteModal = function(){
		$("#approveModal").modal('hide');
	}
	/*生成企业成员*/
	Accordion.prototype.getMember = function(){
		let url = "/pdmwx/pubcontroller/getTranstaskPerson.do?date="+new Date();
		let ad = this;
		let originalData = this.opreateCheckbox('get');
		let tansable = true;
		//验证-如果选择了不同的任务，则不允许选择转发
		if(originalData.length>1){
			for(let i=1;i<originalData.length;i++){
				if(originalData[i].getAttribute('tasktype')!=originalData[i-1].getAttribute('tasktype')){
					weui.topTips('不同类型的任务不能转发', 1000);
					tansable = false;
					return false;
				}
			}
		}
		if(!tansable){return ;}

		//验证通过后取第一个
		let od = originalData[0];
		let dataxml = "<id>"+od.getAttribute('workid')+"</id><type>"+od.getAttribute('tasktype')+"</type><personid>"+od.getAttribute('userid')+"</personid>";
		dataxml += "<receivetime>"+od.getAttribute('receivetime')+"</receivetime><activeid>"+od.getAttribute('activeid')+"</activeid>";
		
		try {
			$.get(url,{data:dataxml},function(data){
				$('#sort_box').empty();
				data = JSON.parse(data);
				if(data.tranflag.tranflag == 0){
					let list = ad.dataSort(data.personlist);
					if(list.length < 1){
						weui.topTips('没有可以转发的成员', 1000);
						return false;
					}
					let arr = [];
					list.forEach(function(item){
						let obj = {};
						obj.label = item.personname;
						obj.value = item.personid;
						arr.push(obj);
					});
					weui.picker(arr, {
						   className: 'custom-classname',
						   container: 'body',
						   defaultValue: [arr[0].value],
						   onConfirm: function (result) {
						       	document.querySelector('#tranresonid').setAttribute('placeholder',"请输入任务转发给"+result[0].label+"的理由");
								document.querySelector('#tranresonid').setAttribute('userId',result[0].value);
								ad.hideExcuteModal();
								$("#trantasksModal").modal('show');
						   },
						   id: 'singleLinePicker'
					});
				}else {
					weui.topTips('获取转发人员信息失败', 1000);
				}
			});
		}catch(e){
			console.log(e);
			weui.topTips('获取转发人员信息失败', 1000);
		}
	}
	/*数据排序*/
	Accordion.prototype.dataSort = function(data){
		var result = data.sort(function(a,b){
			return a.personname.toLowerCase().localeCompare(b.personname.toLowerCase());
		});
		return result;
	}
	/*执行审批提交、打回信息封装*/
	Accordion.prototype.xmlCheckPost = function(type){
		let data = this.opreateCheckbox('get');
		let result = "";
		let des = document.querySelector('#approveModal').getElementsByTagName("textarea")[0].value;
		des = des.replace(/select|from|update|delete|insert|trancate|char|into|substr|ascii|declare|exec|count\(|master|into|drop|execute|ctxsys|chr|concat|utl_inaddr|utl_http|utl_raw/ig,'');
		for(let link in data){
			let workid = data[link].getAttribute('workid');
			if(data[link].getAttribute('tasktype')=='CHECK_BOM_TASK'){
				//针对bom审签，特殊处理workid
				workid += '$$$'+decodeURI(data[link].getAttribute('billobjectkey').replace(/\\"/g,"\'"));
			}
			result += "<work><workid>"+workid+"</workid>";
			result += "<billtypename>"+data[link].getAttribute('billtypename')+"</billtypename>";
			result += "<activeid>"+data[link].getAttribute('activeid')+"</activeid>";
			// result += "<billobjectkey>"+data[link].getAttribute('billobjectkey').replace(/\\"/g,"\\'")+"</billobjectkey>";
			result += "<billobjectkey>"+decodeURI(data[link].getAttribute('billobjectkey').replace(/\\"/g,"\'"))+"</billobjectkey>";
			result += "<userid>"+data[link].getAttribute('userid')+"</userid>";
			result += "<action>"+type+"</action>";
			result += "<description>"+des+"</description></work>";
			this.dataMap[data[link].getAttribute('workid')] = data[link].getAttribute('billtypename');
		}
		return result;
	}
	/*执行审批转发信息封装*/
	Accordion.prototype.xmlTransPost = function(){
		let data = this.opreateCheckbox('get');
		let result = "";
		let trpersonid = document.querySelector('#tranresonid').getAttribute('userId');
		let tranReason = document.querySelector('#tranresonid').value;
		tranReason = tranReason.replace(/select|from|update|delete|insert|trancate|char|into|substr|ascii|declare|exec|count\(|master|into|drop|execute|ctxsys|chr|concat|utl_inaddr|utl_http|utl_raw/ig,'');
		let time = new Date();
		let receivetime = time.getFullYear()+'-'+time.getMonth()+'-'+time.getDay()+' '+time.getHours()+'-'+time.getMinutes()+'-'+time.getSeconds();
		for(let link in data){
			let workid = data[link].getAttribute('workid');
			/*if(data[link].getAttribute('tasktype')=='CHECK_BOM_TASK'){
				//针对bom审签，特殊处理workid
				workid += '$$$'+decodeURI(data[link].getAttribute('billobjectkey').replace(/\\"/g,"\'"));
			}*/
			result += "<work><id>"+workid+"</id>";
			result += "<type>"+data[link].getAttribute('tasktype')+"</type>";
			result += "<personid>"+data[link].getAttribute('userid')+"</personid>";
			result += "<trpersonid>"+trpersonid+"</trpersonid>";
			result += "<tranReason>"+tranReason+"</tranReason>";
			result += "<receivetime>"+receivetime+"</receivetime>";
			result += "<activeid>"+data[link].getAttribute('activeid')+"</activeid></work>";
			this.dataMap[data[link].getAttribute('workid')] = data[link].getAttribute('billtypename');
		}
		return result;
	}

	var accordion = new Accordion($('#accordion'), false);
});
