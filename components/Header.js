import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          setNavArray(res.data.data)
          return res.data.data
        }
      )
      setNavArray(result)
    }
    fetchData()
  }, [])
  //跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">冷板凳博客</span>
          <span className="header-txt">总结前端开发常用的知识点</span>
        </Col>
        <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key="0">
              <Icon type="home" />
              博客首页
            </Menu.Item>
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header