import { Avatar, Divider } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://s2.ax1x.com/2019/10/23/Kt2SO0.jpg" /></div>
      <div className="author-introduction">
        佛系程序员，专注前端领域。今日立下flag保持更新博客，内容包括不限于前端、node、Linux、git以及未来可能涉及的其他方面，尽情期待。
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq" className="account" />
        <Avatar size={28} icon="wechat" className="account" />
      </div>
    </div>
  )
}

export default Author
