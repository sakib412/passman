"use client"
import React, { useState } from 'react'
import { MenuProps, Menu, Layout, theme, Space, Tag, Table, Dropdown, Button, Form, Input, Modal, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CopyOutlined, DeleteOutlined, FolderFilled, FolderOutlined, MoreOutlined, PlusOutlined, RightCircleOutlined } from '@ant-design/icons';
import ItemCreateForm from './AddModal';

const { Sider } = Layout;

interface Folder {
    id: number;
    name: string;
}


const foldersData: Folder[] = [
    { id: 1, name: 'Folder 1' },
    { id: 2, name: 'Folder 2' },
    { id: 3, name: 'Folder 3' },
]


const itemMenu: MenuProps['items'] = [
    {
        label: "Copy username",
        key: '0',
        icon: <CopyOutlined />

    },
    {
        label: "Copy password",
        key: '1',
        icon: <CopyOutlined />
    },
    {
        label: "Move to another folder",
        key: '2',
        icon: <RightCircleOutlined />

    },
    {
        label: "Delete",
        key: '3',
        icon: <DeleteOutlined />,
        danger: true
    },
];


interface ItemType {
    id: string;
    key: string;
    name: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    owner: number;
}

const data: ItemType[] = [
    {
        id: '1',
        key: '1',
        name: 'John Brown',
        username: 'masd@sdgsd.sdfsf',
        password: '12312321',
        owner: 2,
        notes: 'New York No. 1 Lake Park',
        url: 'https://www.google.com',
    },
    {
        id: '2',
        key: '2',
        name: 'Jim Green',
        username: 'new',
        password: '12312321',
        owner: 1,
        notes: 'London No. 1 Lake Park',
        url: 'https://www.google.com',
    },
    {
        id: '3',
        key: '3',
        name: 'Joe Black',
        username: 'nameW@amsdi.cas',
        password: '12312321',
        owner: 1,
        notes: 'Sidney No. 1 Lake Park',
        url: 'https://www.google.com',
    }

];

const Home = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [folders, setFolders] = useState<Folder[]>(() => foldersData)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const hasSelected = selectedRowKeys.length > 0;
    const selectedItemMenu: MenuProps['items'] = [
        {
            label: "Move selected items to another folder",
            key: '0',
            icon: <FolderOutlined />,
            disabled: !hasSelected

        },
        {
            label: "Delete selected items",
            key: '1',
            icon: <DeleteOutlined />,
            danger: true,
            disabled: !hasSelected
        },
    ];

    const addFolder = () => {
        setFolders(f => [...f, { id: f.length + 1, name: `Folder ${f.length + 1}` }])
    }

    const editItem = (id: ItemType['id']) => {
        console.log(id)
    }

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const sideMenu: MenuProps['items'] = [FolderFilled].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `folder${key}`,
                type: 'group',
                icon: React.createElement(icon),
                label: (<div className='d-flex justify-content-between text-white fs-5'>
                    <span>Folder</span>
                    <span style={{ cursor: 'pointer' }}
                        onClick={addFolder}>+</span>
                </div>),

                children: folders.map(({ id, name }, j) => {
                    return {
                        key: id,
                        label: name,
                    };
                }),
            };
        },
    );


    const columns: ColumnsType<ItemType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, { username, name, id }) =>
                <div
                    onClick={() => editItem(id)}
                    style={{ cursor: 'pointer' }}
                ><span
                    title='Edit item'
                    className='text-primary'>{name}</span><br /><span className='text-secondary'>{username}</span>
                </div>,
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            key: 'owner',
            render: (owner: number) => <Tag color={owner == 1 ? "green" : "red"}>{owner == 1 ? "Me" : "Other"}</Tag>
        },
        {
            title: <Dropdown
                menu={{ items: selectedItemMenu, onClick: (item) => { console.log(item) } }} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    <MoreOutlined style={{ fontSize: '23px' }} />
                </Space>
            </Dropdown>,
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Dropdown menu={{ items: itemMenu, onClick: (item) => { console.log(item, record) } }} trigger={['click']}>
                    <Space style={{ cursor: 'pointer' }}>
                        <MoreOutlined style={{ fontSize: '23px' }} />
                    </Space>
                </Dropdown>
            ),
        },
    ];


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const addItem = (values: any) => {
        console.log(values)

    }

    return (
        <div className='d-flex'>

            <Sider width={200} style={{ background: colorBgContainer }} breakpoint="lg" collapsedWidth="0">
                <Menu
                    mode="inline"
                    defaultOpenKeys={['folder1']}
                    theme="dark"
                    style={{ height: '100%', borderRight: 0 }}
                    items={sideMenu}
                />
            </Sider>
            <div className='px-3 w-100'>
                <div className="d-flex justify-content-between mb-3">
                    <h4>
                        All vaults
                    </h4>
                    <div>
                        {/* <Button onClick={start} disabled={!hasSelected} loading={loading}>
                            Move to folder <RightCircleOutlined />
                        </Button>
                        <Button className='mx-2' type="primary" onClick={start} danger disabled={!hasSelected} loading={loading}>
                            Delete <DeleteOutlined />
                        </Button> */}
                        <Button type="primary" size='large' onClick={() => setIsModalVisible(true)}><PlusOutlined /> New item</Button>
                    </div>
                </div>

                <Table size='large' rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>

            <ItemCreateForm
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onCreate={addItem} />
        </div>
    )
}

export default Home