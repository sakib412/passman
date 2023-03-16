"use client"
import React, { useState } from 'react'
import { MenuProps, Menu, Layout, theme, Space, Tag, Table, Dropdown, Button, Form, Input, Modal, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CopyOutlined, DeleteOutlined, EditOutlined, FolderFilled, FolderOutlined, MoreOutlined, PlusOutlined, RightCircleOutlined } from '@ant-design/icons';
import ItemCreateForm from './AddModal';
import axiosInstance from '@/utils/axios';

const { Sider } = Layout;

export interface Folder {
    _id: number;
    name: string;
}



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
    name: string;
    username: string;
    password: string;
    url?: string[];
    notes?: string;
    owner: number;
}

const data: ItemType[] = [
    {
        id: '1',
        name: 'John Brown',
        username: 'masd@sdgsd.sdfsf',
        password: '12312321',
        owner: 1,
        notes: 'New York No. 1 Lake Park',
        url: ['https://www.google.com'],
    },
    {
        id: '2',
        name: 'Jim Green',
        username: 'new',
        password: '12312321',
        owner: 1,
        notes: 'London No. 1 Lake Park',
        url: ['https://www.google.com'],
    }
];


type HomeProps = {
    folders: {
        currentPage: number,
        totalData: number,
        totalPage: number,
        prevPage: number | null,
        nextPage: number | null,
        data: Folder[]
    }
}
const Home = ({ folders: foldersData }: HomeProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [folders, setFolders] = useState<Folder[]>(() => foldersData.data)
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
        Modal.info({
            icon: null,
            title: 'Add new folder',
            content: (
                <Form
                    onFinish={(values) => {
                        axiosInstance.post('/folder/', { name: values.name }).then(res => {
                            setFolders(f => [...f, res.data.data])
                        })
                        Modal.destroyAll()
                    }}
                    name="add_folder"
                >
                    <Form.Item
                        label="Folder name"
                        name="name"
                        rules={[{ required: true, message: 'Please input folder name!' }]}
                    >
                        <Input autoFocus />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add</Button>
                    </Form.Item>
                </Form>
            ),
            okButtonProps: { style: { display: 'none' } },

        });
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

                children: folders.map(({ _id, name }) => {
                    return {
                        key: _id,
                        label: <div className='d-flex'>
                            <span>{name}</span>
                            <span className='text-secondary ms-auto text-white' onClick={(e) => {
                                e.stopPropagation();

                                Modal.info({
                                    icon: null,
                                    title: 'Edit folder',
                                    content: (
                                        <Form
                                            onFinish={(values) => {
                                                axiosInstance.put(`/folder/${_id}`, { name: values.name }).then(res => {
                                                    setFolders(f => f.map(folder => folder._id == _id ? res.data.data : folder))
                                                })
                                                Modal.destroyAll()
                                            }}
                                            name="edit_folder"
                                            initialValues={{ name }}
                                        >
                                            <Form.Item

                                                label="Folder name"
                                                name="name"
                                                rules={[{ required: true, message: 'Please input folder name!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <div className='d-flex'>
                                                <Button className='me-2' danger onClick={() => {
                                                    axiosInstance.delete(`/folder/${_id}`).then(_res => {
                                                        setFolders(f => f.filter(folder => folder._id != _id))
                                                        Modal.destroyAll()
                                                    })
                                                }}>Delete</Button>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Edit</Button>
                                                </Form.Item>
                                            </div>

                                        </Form>
                                    ),
                                    okButtonProps: { style: { display: 'none' } },



                                })
                            }}><EditOutlined /></span>
                        </div>,
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

                <Table
                    size='large'
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data.map(item => ({ ...item, key: item.id }))} />
            </div>

            <ItemCreateForm
                folders={folders}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onCreate={addItem} />
        </div>
    )
}

export default Home