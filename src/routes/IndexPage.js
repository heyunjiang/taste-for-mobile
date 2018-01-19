import React from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Menu, Icon } from 'antd';
import styles from './IndexPage.css';
import iosBar from '../assets/ios-statusbar.png'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class IndexPage extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
        	currentUrl: "./wechat/pdmwx/wx/messageSend.html",
        	isPhone: document.body.clientWidth<769,
        }
    }
    render() {
    	const handleClick = (obj)=>{
    	  	let url
		  	switch(obj.key){
		  		case "1": url="./wechat/pdmwx/wx/bindUser.html";break;
		  		case "2": url="./wechat/pdmwx/wx/messageSend.html";break;
		  		case "3": url="./wechat/pdmwx/wx/taskDetail.html?taskId=3363&taskType=CHECK_DOC_TASK&receivetime=2017-12-26%2014:13:09&activeid=Active:116&date=Wed%20Dec%2027%202017%2017:20:45%20GMT+0800%20(中国标准时间)";break;
		  		case "4": url="./wechat/pdmwx/wx/index.html";break;
		  		case "5": url="./wechat/pdmwx/wx/taskList.html";break;
		  		case "6": url="./project/index.html";break;
		  		case "7": url="./dist/index.html#/docList";break;
		  		case "8": url="./dist/index.html#/project";break;
		  		case "9": url="./dist/index.html#/project";break;
		  		case "10": url="./dist/index.html#/matter";break;
		  		default: url="./dist/index.html#/docList";break;
		  	}
		  	this.setState({
		  		currentUrl: url,
		  	})
		}
		return (
		    <div className={styles.normal}>
		      <header className={styles.header}>推荐使用chrome浏览器体验</header>
		      <div className={styles.contentBox}>
				<Row>
			      <Col xs={{ span: 24}} md={{ span: 8}}>
			      	<Menu onClick={handleClick} style={{ width: 256 }} defaultOpenKeys={[]} defaultSelectedKeys={[]} mode={this.state.isPhone?"horizontal":"inline"}>
						<SubMenu key="sub1" title={<span><Icon type="wechat" /><span>PLM-微信</span></span>}>
				            <Menu.Item key="1">账户绑定</Menu.Item>
				            <Menu.Item key="2">消息推送</Menu.Item>
				            <Menu.Item key="3">移动审批</Menu.Item>
				            <Menu.Item key="4">查询</Menu.Item>
				            <Menu.Item key="5">待办任务</Menu.Item>
				            <Menu.Item key="6">项目报表</Menu.Item>
				        </SubMenu>
				        <SubMenu key="sub2" title={<span><Icon type="chrome" /><span>友云设</span></span>}>
				          <Menu.Item key="7">下发文档</Menu.Item>
				          <Menu.Item key="8">任务管理</Menu.Item>
				          <Menu.Item key="9">任务执行</Menu.Item>
				          <Menu.Item key="10">下发物料</Menu.Item>
				        </SubMenu>
				    </Menu>
			      </Col>
			      <Col xs={{ span: 24}} md={{ span: 16}}>
			      	<div className={styles.platform}>
						<img className={styles.platformImg} src={iosBar} />
						<iframe className={styles.platformIframe} frameBorder="0" src={this.state.currentUrl}>
						</iframe>
			      	</div>
			      </Col>
			  	</Row>
		      </div>
		    </div>
		);
    }
  
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
