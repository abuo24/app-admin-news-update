import React from 'react';
import {Breadcrumb, Button, Dropdown, Menu} from "antd";
import Sider from "antd/lib/layout/Sider";
import {Layout, Modal} from "antd";
import {useState} from "react";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    ProfileFilled, UserSwitchOutlined, LogoutOutlined, FileAddFilled
} from "@ant-design/icons"
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined";
import {NavLink} from "react-router-dom";
import {Statistic} from "./../pages";
import BookTwoTone from "@ant-design/icons/lib/icons/BookTwoTone";
import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import {connect} from "react-redux";
import userActions from "../redux/action/userActions";
import {
    AiOutlineVideoCameraAdd,
    BiMessageSquareDetail,
    BsFileEarmarkArrowUp,
    BsFilePost,
    ImFilesEmpty
} from "react-icons/all";

const LayoutPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const config = {
        title: 'Profildan chiqishni xoxlaysizmi?',
        onOk : () => {
            localStorage.setItem("token",null);
            localStorage.removeItem("token");
            window.location.reload()
        }
    };
   const [modal, contextHolder] = Modal.useModal();

    const {SubMenu} = Menu;
    const {Header, Content, Footer, Sider} = Layout;

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>

                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key={"u1"} icon={<UserOutlined/>}>
                            <NavLink to={"/profile"}> Profil</NavLink>
                        </Menu.Item>

                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            <NavLink to={"/"}>Statistika</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<BsFilePost/>}>
                            <NavLink to={"/posts"}>Postlar</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub2" icon={<BookOutlined/>}>
                            <NavLink to={"/shortnews"}>Qisqa Xabarlar</NavLink>
                        </Menu.Item>

                        <Menu.Item key="sub7" icon={<AiOutlineVideoCameraAdd/>}>
                            <NavLink to={"/video"}>Video qo'shish</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub3" icon={<BsFileEarmarkArrowUp/>}>
                            <NavLink to={"/newpost"}>Yangi post qo'shish</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub4454" icon={<FileAddFilled/>}>
                            <NavLink to={"/newcategori"}>Yangi Kategoriya +</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub4454de" icon={<ImFilesEmpty/>}>
                            <NavLink to={"/files"}>Fayllar</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub6" icon={<BiMessageSquareDetail/>}>
                            <NavLink to={"/message"}>Message</NavLink>
                        </Menu.Item>
                        <Menu.Item key={"u2"} icon={<LogoutOutlined/>} onClick={() => {modal.confirm(config);}}>
                            Chiqish
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{margin: '16px 16px'}}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
            {contextHolder}
        </>
    );
};

const mstp = state => (state);
const mdtp = dispatch => ({
})

export default connect(mstp, mdtp)(LayoutPage);