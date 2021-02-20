import React from 'react';
import {Breadcrumb, Dropdown, Menu} from "antd";
import Sider from "antd/lib/layout/Sider";
import {Layout} from "antd";
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

const LayoutPage = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const {SubMenu} = Menu;
    const {Header, Content, Footer, Sider} = Layout;

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>

                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu key="sub3" icon={<UserSwitchOutlined/>} title="">
                            <Menu.Item key={"u1"} icon={<UserOutlined/>}>
                              <NavLink to={"/profile"}> Profil</NavLink>
                            </Menu.Item>
                            <Menu.Item key={"u2"} icon={<LogoutOutlined/>}>
                                Chiqish
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="1" icon={<PieChartOutlined></PieChartOutlined>}>
                            <NavLink to={"/dashboard"}>Statistika</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<BookOutlined/>}>
                           <NavLink to={"/posts"}>Postlar</NavLink>
                        </Menu.Item>
                        <Menu.Item key="sub2" icon={<FileAddFilled></FileAddFilled>}>
                            <NavLink to={"/newpost"}>Yangi post qo'shish</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{margin: '16px 16px'}}>
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default LayoutPage;