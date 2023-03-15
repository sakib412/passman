"use client"
import React from 'react'
import { MenuProps, Menu, Layout, theme, Space, Tag, Table, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownOutlined, LaptopOutlined, MenuOutlined, MoreOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const sideMenu: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);


const items: MenuProps['items'] = [
    {
        label: "1st menu item",
        key: '0',
    },
    {
        label: "Hi",
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Dropdown menu={{ items, onClick: (item) => { console.log(item, record) } }} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    <MoreOutlined style={{ fontSize: '23px' }} />
                </Space>
            </Dropdown>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const Home = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='d-flex'>
            <Sider width={200} style={{ background: colorBgContainer }} breakpoint="lg" collapsedWidth="0">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={sideMenu}
                />
            </Sider>
            <div className='px-3'>
                Hello
                <Table columns={columns} dataSource={data} />

            </div>
        </div>
    )
}

export default Home