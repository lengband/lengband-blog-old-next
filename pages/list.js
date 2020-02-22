import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Row, Col, List, Icon, Breadcrumb,
} from 'antd'
import _ from 'lodash'
import marked from 'marked'
import hljs from 'highlight.js';
import { api } from '../config/api'
import { useRequest } from '../utils/request'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import 'highlight.js/styles/monokai-sublime.css';

export default function ArticleList(props) {
  const typeId = _.get(props, 'url.query.id')

  const { response: postList, request: fetchPost } = useRequest({
    url: api.getPostList().url,
    params: {
      type: typeId,
    },
  });

  useEffect(() => {
    fetchPost()
  }, [typeId])

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
  return (
    <>
      <Head>
        <title>冷板凳博客</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={_.get(postList, 'data.data') || []}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.name}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" />
                    {item.createdAt}
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
                    {' 人'}
                  </span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce || '-') }} />
              </List.Item>
            )}
          />
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
