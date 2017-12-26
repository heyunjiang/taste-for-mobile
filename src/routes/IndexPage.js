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
        	currentUrl: "http://10.115.0.168:8000/#/project",
        }
    }
    render() {
    	  const handleClick = (obj)=>{
    	  	let url
		  	switch(obj.key){
		  		case "7": url="docList";break;
		  		case "8": url="project";break;
		  		case "9": url="project";break;
		  		case "10": url="matter";break;
		  		default: url="docList";break;
		  	}
		  	this.setState({
		  		currentUrl: "http://10.115.0.168:8000/#/"+url,
		  	})
		  }
		  return (
		    <div className={styles.normal}>
		      <header className={styles.header}></header>
		      <div className={styles.contentBox}>
				<Row>
			      <Col span={8}>
			      	<Menu onClick={handleClick} style={{ width: 256 }} defaultOpenKeys={['sub2']} defaultSelectedKeys={['8']} mode="inline">
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
			      <Col span={16}>
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
