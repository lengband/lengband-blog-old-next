/* eslint-disable */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Head from 'next/head'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js';
import {
  Row, Col, List, Icon,
} from 'antd'
import moment from 'moment'
import { api } from '../config/api'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/index.css'
import 'highlight.js/styles/monokai-sublime.css';
import { useRequest } from '../utils/request'

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

const Home = (resData) => {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight(code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const { response: postList, request: fetchPost } = useRequest({
    url: api.getPostList().url,
  });

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      <Head>
        <title>冷板凳博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={_.get(postList, 'data.data') || []}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item._id } }}>
                      <a>{item.name}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" />
                      {' '}
                      {moment(item.createdAt).format('YYYY-MM-DD')}
                    </span>
                    <span>
                      <Icon type="folder" />
                      {' '}
                      {item.type.name}
                    </span>
                    <span>
                      <Icon type="fire" />
                      {' '}
                      {item.view_count}
                      {' '}
人
                    </span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce || '-') }} />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Home
