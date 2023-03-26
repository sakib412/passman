"use client"
import React from 'react';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { LockFilled } from '@ant-design/icons';
import { Layout, Menu, theme, type MenuProps } from 'antd';
import { User } from '@/types/user';
import axiosInstance from '@/utils/axios';

const { Header, Content } = Layout;

type Props = {
    children: React.ReactNode;
    user: User | null;
};


export default function MainLayout({ children, user }: Props) {
    const router = useRouter()
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onLogout = async () => {
        await axiosInstance.get('/auth/logout')
        router.push('/login')
        router.refresh()
    }
    const pathname = usePathname();
    let menuItems: { key: string; label: string; onClick?: () => void }[] = []
    if (user) {
        menuItems = [...menuItems,
        { key: '/', label: "Home" },
        { key: '/generate-password', label: 'Generate Password' },
        { key: '/export-import', label: 'Export Import' },
        { key: '/logout', label: 'Logout', onClick: onLogout, }
        ]
    } else {
        menuItems = [...menuItems,
        { key: '/login', label: 'Login' },
        { key: '/signup', label: 'Signup' }
        ]
    }
    const mainMenu: MenuProps['items'] = menuItems.map(({ key, label, onClick }) => ({
        key,
        label: !onClick ? <Link href={key}>{label}</Link> : <span onClick={onClick}>{label}</span>
    }));

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