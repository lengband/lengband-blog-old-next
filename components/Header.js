import React, { useEffect } from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'
import {
  Row, Col, Menu, Icon,
} from 'antd'
import _ from 'lodash'
import { api } from '../config/api'
import { useRequest } from '../utils/request'

const { SubMenu } = Menu

const toggleView = () => {
  if (process.env.NODE_ENV === 'development') { // 开发环境
  } else { // 生产环境
  }
}

const Header = () => {
  const { response: typeList, request: fetchType } = useRequest({
    url: api.getTypeList().url,
  });

  useEffect(() => {
    fetchType()
  }, [])
  // 跳转到列表页
  const handleClick = (e) => {
    if (e.key === 'admin') {
      toggleView('admin')
    } else if (e === 'index' || e.key === 'index') {
      Router.push('/index')
    } else {
      Router.push(`/list?id=${e.key}`)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={10}>
          <span className="header-logo" onClick={() => handleClick('index')}>冷板凳博客</span>
          <span className="header-txt">一名前端拷贝机</span>
        </Col>
        <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={9}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key="index">
              <Icon type="home" />
              博客首页
            </Menu.Item>
            {
              (_.get(typeList, 'data.data') || []).map((item) => (
                <Menu.Item key={item._id}>
                  <Icon type={item.icon} />
                  {item.name}
                </Menu.Item>
              ))
            }
            <SubMenu
              title={(
                <span className="submenu-title-wrapper">
                  <Icon type="user" />
                  个人中心
                </span>
              )}
            >
              <Menu.Item key="admin">管理后台</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header
