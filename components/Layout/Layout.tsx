"use client"
import React from 'react';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { LockFilled } from '@ant-design/icons';
import { Layout, Menu, theme, type MenuProps } from 'antd';

const { Header, Content } = Layout;

const mainMenu: MenuProps['items'] = [
    { key: '/', label: "Home" },
    { key: '/login', label: 'Login' },
    { key: '/signup', label: 'Signup' }
].map(({ key, label }) => ({
    key,
    label: <Link href={key}>{label}</Link>
}));




export default function MainLayout({ children }: { children: React.ReactNode }) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const pathname = usePathname();

    return (
        <Layout >
            <Header className="header" style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <Link href='/' className="logo"><LockFilled /></Link>
                <Menu selectedKeys={[pathname]} theme="dark" mode="horizontal" items={mainMenu} />


            </Header>
            <Layout>
                <Layout style={{ padding: '24px' }} className="container">

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "100vh",
                            background: colorBgContainer,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    )
}