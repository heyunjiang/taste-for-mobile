import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Menu, Icon, message, Modal, Spin } from 'antd';
import styles from './IndexPage.css';
import iosBar from '../assets/ios-statusbar.png'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class IndexPage extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
        	currentUrl: "./wechat/pdmwx/wx/bindUser.html",
        	isPhone: window.orientation?true:false||document.body.clientWidth < 950,
        	isPC: window.orientation||document.body.clientWidth < 950?false:true, //是否展示PC图
        	step: 1,
        	currentPC: 'docList',
        	openKeys: document.body.clientWidth < 950?[]:['sub3'],
        	selectedKeys: document.body.clientWidth < 950?[]:['11'],
        	loading: false,
        	cacheIframe: false, //是否已经缓存了友云设模块
        }
        this.detect = ()=>{
        	if(this.state.isPC&&this.state.isPhone&&(window.orientation==0||window.orientation==180)){
	    		Modal.info({
	    			content : '在体验PC版友云设时, 请将手机置于横屏以获取更佳体验',
	    		})
	    	}
        }
        this.preiframe = ''
    }
    componentDidMount(){
    	this.detect()
    	if(this.state.isPhone){
    		/*预加载，增加体验*/
    		//1. img
    		const imgs = ['./PC/docList/1.png',
	    		'./PC/docList/2.png',
	    		'./PC/docList/3.png',
	    		'./PC/docList/4.png',
	    		'./PC/docList/5.png',
	    		'./PC/docList/6.png',
	    		'./PC/docList/7.png',
	    		'./PC/project/1.PNG',
	    		'./PC/project/2.PNG',
	    		'./PC/project/3.PNG',
	    		'./PC/project/4.PNG',
	    		'./PC/project/5.PNG',
	    		'./PC/project/6.PNG',
	    		'./PC/project/7.PNG',
	    		'./PC/matter/1.PNG',
	    		'./PC/matter/2.PNG',
	    		'./PC/matter/3.PNG',
	    		'./PC/matter/4.PNG',
	    		'./PC/matter/5.PNG',
	    		'./PC/matter/6.PNG',]
    		let currentImg = 0
    		let img = new Image()
    		img.src = imgs[currentImg]
    		img.onload = ()=>{
    			if(currentImg<imgs.length){
    				img.src = imgs[++currentImg]
    			}
    		}
    		//2. iframe
    		const pages = ["./wechat/pdmwx/wx/taskDetail.html?taskId=3363&taskType=CHECK_DOC_TASK&receivetime=2017-12-26%2014:13:09&activeid=Active:116&date=Wed%20Dec%2027%202017%2017:20:45%20GMT+0800%20(中国标准时间)",
    			"./dist/index.html#/docList",
    			"./dist/index.html#/project",
    			"./dist/index.html#/matter",]
    		this.preiframe.src = pages[0]
    	}
    }
    componentWillUpdate(){
    	
    }
    componentDidUpdate(){
    	if(this.state.openKeys.length==0){
			this.detect()
    	}
    }
    render() {
		const {currentUrl, isPhone, isPC, step, currentPC, openKeys, selectedKeys, loading, cacheIframe} = this.state
    	const PCSRC = {
    		docList: {
    			1: './PC/docList/1.png',
    			2: './PC/docList/2.png',
    			3: './PC/docList/3.png',
    			4: './PC/docList/4.png',
    			5: './PC/docList/5.png',
    			6: './PC/docList/6.png',
    			7: './PC/docList/7.png',
    		},
    		project: {
    			1: './PC/project/1.PNG',
    			2: './PC/project/2.PNG',
    			3: './PC/project/3.PNG',
    			4: './PC/project/4.PNG',
    			5: './PC/project/5.PNG',
    			6: './PC/project/6.PNG',
    			7: './PC/project/7.PNG',
    		},
    		matter: {
    			1: './PC/matter/1.PNG',
    			2: './PC/matter/2.PNG',
    			3: './PC/matter/3.PNG',
    			4: './PC/matter/4.PNG',
    			5: './PC/matter/5.PNG',
    			6: './PC/matter/6.PNG',
    		},
    	}
    	const iframeOnload = ()=>{
	    	this.setState({
	    		loading: false,
	    		cacheIframe: (this.state.currentUrl.indexOf('html#/')>0||this.state.cacheIframe===true)?true:false,
	    	})
	    }
    	const handleClick = (obj)=>{
    	  	let url = './dist/index.html#/docList', isPC, currentPC = 'docList'
		  	switch(obj.key){
		  		case "1": url="./wechat/pdmwx/wx/bindUser.html"+"?time="+Math.random();isPC = false;break;
		  		case "2": url="./wechat/pdmwx/wx/messageSend.html"+"?time="+Math.random();isPC = false;break;
		  		case "3": url="./wechat/pdmwx/wx/taskDetail.html?taskId=3363&taskType=CHECK_DOC_TASK&receivetime=2017-12-26%2014:13:09&activeid=Active:116&date=Wed%20Dec%2027%202017%2017:20:45%20GMT+0800%20(中国标准时间)"+"&time="+Math.random();isPC = false;break;
		  		case "4": url="./wechat/pdmwx/wx/index.html"+"?time="+Math.random();isPC = false;break;
		  		case "5": url="./wechat/pdmwx/wx/taskList.html"+"?time="+Math.random();isPC = false;break;
		  		case "6": url="./project/index.html"+"?time="+Math.random();isPC = false;break;
		  		case "7": url="./dist/index.html#/docList";isPC = false;break;
		  		case "8": url="./dist/index.html#/project";isPC = false;break;
		  		case "9": url="./dist/index.html#/project";isPC = false;break;
		  		case "10": url="./dist/index.html#/matter";isPC = false;break;
		  		case "11": currentPC = 'docList';isPC = true;break;
		  		case "12": currentPC = 'project';isPC = true;break;
		  		case "13": currentPC = 'projectDo';isPC = true;break;
		  		case "14": currentPC = 'matter';isPC = true;break;
		  		default: url="./dist/index.html#/docList";currentPC = 'docList';isPC = false;break;
		  	}
		  	this.setState({
		  		openKeys: isPhone?[]:openKeys,
		  		selectedKeys: [obj.key],
		  		currentUrl: url,
		  		isPC,
		  		step: 1,
		  		currentPC,
		  		loading: (url.indexOf('html#/')>0&&cacheIframe===true)||obj.key>10?false:true,
		  	})
		}
		const titleClick = obj=>{
			if(openKeys[0] == obj.key){
				this.setState({
					openKeys: [],
				})
			}else{
				this.setState({
					openKeys: [obj.key],
				})
			}
			// console.log(obj)
		}
		const itemClick = key=>{
			handleClick({
				key,
			})
		}
		//图片切换
		const imgClick = obj=>{
			this.setState({
		  		step: step<Object.keys(PCSRC[currentPC]).length?(step+1):1,
		  	})
		}
		const menuProps = {
			// defaultOpenKeys: isPhone?[]:['sub3'],
			// defaultSelectedKeys: isPhone?[]:['11']
			openKeys,
			selectedKeys,
		}
		!isPhone?menuProps.onClick=handleClick:''
		const subMenuProps = {}
		!isPhone?subMenuProps.onTitleClick=titleClick:''
		return (
		    <div className='normalRotate'>
		      <header className={styles.header}>
		      	<a href="http://plmcloud.yonyou.com/plmPortal/index.html" target="_blank">进入友云设</a>
		      	<span>推荐使用chrome浏览器体验</span>
		      </header>
		      <div className={styles.contentBox}>
			      <div className={styles.contentBoxLeft}>
			      	<Menu {...menuProps} style={{ width: 256 }} mode={this.state.isPhone?"horizontal":"inline"}>
						<SubMenu {...subMenuProps} key="sub1" title={<span className={styles.menuSpan} onTouchStart={()=>titleClick({key:'sub1'})}><Icon type="wechat" />PLM-微信</span>}>
							<Menu.Item key="1"><span className={styles.menuSpan} onTouchStart={()=>itemClick('1')}>账户绑定</span></Menu.Item>
				            <Menu.Item key="2"><span className={styles.menuSpan} onTouchStart={()=>itemClick('2')}>消息推送</span></Menu.Item>
				            <Menu.Item key="3"><span className={styles.menuSpan} onTouchStart={()=>itemClick('3')}>移动审批</span></Menu.Item>
				            <Menu.Item key="4"><span className={styles.menuSpan} onTouchStart={()=>itemClick('4')}>查询</span></Menu.Item>
				            <Menu.Item key="5"><span className={styles.menuSpan} onTouchStart={()=>itemClick('5')}>待办任务</span></Menu.Item>
				            <Menu.Item key="6"><span className={styles.menuSpan} onTouchStart={()=>itemClick('6')}>项目报表</span></Menu.Item>
				        </SubMenu>
				        <SubMenu {...subMenuProps} key="sub2" title={<span className={styles.menuSpan} onTouchStart={()=>titleClick({key:'sub2'})}><Icon type="apple" />友云设-移动端</span>}>
				          <Menu.Item key="7"><span className={styles.menuSpan} onTouchStart={()=>itemClick('7')}>下发文档</span></Menu.Item>
				          <Menu.Item key="8"><span className={styles.menuSpan} onTouchStart={()=>itemClick('8')}>任务管理</span></Menu.Item>
				          <Menu.Item key="9"><span className={styles.menuSpan} onTouchStart={()=>itemClick('9')}>任务执行</span></Menu.Item>
				          <Menu.Item key="10"><span className={styles.menuSpan} onTouchStart={()=>itemClick('10')}>下发物料</span></Menu.Item>
				        </SubMenu>
				        <SubMenu {...subMenuProps} key="sub3" title={<span className={styles.menuSpan} onTouchStart={()=>titleClick({key:'sub3'})}><Icon type="chrome" />友云设-PC</span>}>
				          <Menu.Item key="11"><span className={styles.menuSpan} onTouchStart={()=>itemClick('11')}>下发文档</span></Menu.Item>
				          <Menu.Item key="12"><span className={styles.menuSpan} onTouchStart={()=>itemClick('12')}>任务管理</span></Menu.Item>
				          <Menu.Item key="14"><span className={styles.menuSpan} onTouchStart={()=>itemClick('14')}>下发物料</span></Menu.Item>
				        </SubMenu>
				    </Menu>
			      </div>
			      <div className={styles.contentBoxRight}>
				      {this.state.isPC?<div onClick={imgClick} className={styles.PC}>
				      		<div className={styles.screen}>
				      			<div className={styles.content}>
				      				<div className={styles.pg}>
				      					<ul className={styles.btns}>
				      						<li></li>
				      						<li></li>
				      						<li></li>
				      					</ul>
				      					<img src={PCSRC[currentPC][step]} />
				      				</div>
				      			</div>
				      			<div className={styles.screenBase}>
				      				<div className={styles.screenBaseTop}></div>
				      				<div className={styles.screenBaseBottom}></div>
				      				<div className={styles.screenBaseShadow}></div>
				      			</div>
				      		</div>
				      		<div className={styles.PCImg}><img src={PCSRC[currentPC][step]} /></div>
				      	</div>:<div className={styles.platform}>
							<img className={styles.platformImg} src={iosBar} />
							<Spin spinning={loading}><iframe onLoad={iframeOnload} className={styles.platformIframe} frameBorder="0" src={this.state.currentUrl}>
							</iframe></Spin>
				      	  </div>}
			      </div>
			      <span className={styles.contentBoxAfter}></span>
		      </div>
		      <iframe style={{display:'none'}} ref={(iframe) => { this.preiframe = iframe; }} src={this.state.currentUrl}/>
		    </div>
		);
    }
  
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);

/*<img src={PCSRC[currentPC][step]} />*/