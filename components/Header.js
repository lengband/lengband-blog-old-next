import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'
import {
  Row, Col, Menu, Icon,
} from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { SubMenu } = Menu

const toggleView = () => {
  if (process.env.NODE_ENV === 'development') { // 开发环境
  } else { // 生产环境
  }
}

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          setNavArray(res.data.data)
          return res.data.data
        },
      )
      setNavArray(result)
    }
    fetchData()
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
          <span className="header-txt">总结前端开发常用的知识点</span>
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
              navArray.map((item) => (
                <Menu.Item key={item.id}>
                  <Icon type={item.icon} />
                  {item.typeName}
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
