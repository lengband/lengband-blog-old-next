export const baseURL = 'http://127.0.0.1:7001/api/';

export const api = {
  login: () => '/login', // 检查用户名密码
  register: () => ({
    url: '/user/create',
    method: 'POST',
  }),
  // 类别
  getTypeList: () => ({
    url: '/type',
    method: 'GET',
  }),
  // 文章
  getPostList: () => ({
    url: '/post',
    method: 'GET',
  }),
  getPostById: id => ({
    url: `/post/${id}`,
    method: 'GET',
  }),
  // 用户
  getUserList: () => ({
    url: '/user',
    method: 'GET',
  }),
  getUserInfo: id => ({
    url: `/user/${id}`,
    method: 'GET',
  }),
  // 标签
  getTagList: () => ({
    url: '/tag',
    method: 'GET',
  }),
  // 评论
  getCommentList: () => ({
    url: '/comment',
    method: 'GET',
  }),
  addComment: () => ({
    url: '/comment/create',
    method: 'POST',
  }),
};
