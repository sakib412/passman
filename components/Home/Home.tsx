"use client"
import React, { useEffect, useState } from 'react'
import { MenuProps, Menu, Layout, theme, Space, Tag, Table, Dropdown, Button, Form, Input, Modal, Select, message, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CopyOutlined, DeleteOutlined, EditOutlined, FolderFilled, FolderOutlined, MinusCircleOutlined, MoreOutlined, PlusOutlined, RightCircleOutlined } from '@ant-design/icons';
import ItemCreateForm from './AddModal';
import axiosInstance from '@/utils/axios';
import { copyToClipboard } from '@/utils';
import { success } from '@/utils/notificaion';

const { Sider } = Layout;

export interface Folder {
    _id: string;
    name: string;
}

const itemMenu: MenuProps['items'] = [
    {
        key: 'copy_username',
        label: "Copy username",
        icon: <CopyOutlined />

    },
    {
        key: 'copy_password',
        label: "Copy password",
        icon: <CopyOutlined />
    },
    {
        key: "move",
        label: "Move to another folder",
        icon: <RightCircleOutlined />

    },
    {
        key: 'delete',
        label: "Delete",
        icon: <DeleteOutlined />,
        danger: true,
    },
];


export interface ItemType {
    _id: string;
    name: string;
    username: string;
    password: string;
    url?: string[];
    notes?: string;
    owner: number;
    folder?: string;
}

type ItemActionType = 'copy_username' | 'copy_password' | 'move' | 'delete';
type BulkActionType = 'bulkMove' | 'bulkDelete';

type HomeProps = {
    folders: {
        currentPage: number,
        totalData: number,
        totalPage: number,
        prevPage: number | null,
        nextPage: number | null,
        data: Folder[]
    }

    items: {
        currentPage: number,
        totalData: number,
        totalPage: number,
        prevPage: number | null,
        nextPage: number | null,
        data: ItemType[]
    }
}
const Home = ({ folders: foldersData, items: itemsData }: HomeProps) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [folders, setFolders] = useState<Folder[]>(() => foldersData.data);
    const [items, setItems] = useState<ItemType[]>(itemsData.data);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshItem, setRefreshItem] = useState(false);

    useEffect(() => {
        setLoading(true)

        axiosInstance.get(`/item?size=1000&folder=${selectedFolder}`).then(({ data }) => {
            setItems(data.data.data)
        }).finally(() => setLoading(false))

    }, [selectedFolder, refreshItem])

    const hasSelected = selectedRowKeys.length > 0;

    const selectedItemMenu: MenuProps['items'] = [
        {
            key: 'bulkMove',
            label: "Move selected items to another folder",
            icon: <FolderOutlined />,
            disabled: !hasSelected

        },
        {
            key: 'bulkDelete',
            label: "Delete selected items",
            icon: <DeleteOutlined />,
            danger: true,
            disabled: !hasSelected
        },
    ];

    const onBulkAction = (key: BulkActionType) => {
        switch (key) {
            case 'bulkMove':
                Modal.info({
                    icon: null,
                    title: 'Move selected items to another folder',
                    content: (
                        <Form
                            onFinish={async (values) => {
                                axiosInstance.put('/item/update-many/', { ids: selectedRowKeys, folder: values.folder || null }).then(({ data }) => {
                                    const { is_success } = data
                                    if (is_success) {
                                        setSelectedRowKeys([])
                                        setRefreshItem(refreshItem => !refreshItem)
                                        message.success('Items moved successfully')
                                    }
                                })
                                Modal.destroyAll()
                            }}
                            name="bulk_move_item"
                        >
                            <Form.Item
                                name="folder"
                                label="Folder"
                                rules={[{ required: true, message: 'Please select a folder' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a folder"
                                >
                                    {folders.map(folder => (
                                        <Select.Option key={folder._id} value={folder._id}>{folder.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Move</Button>
                            </Form.Item>
                        </Form>
                    ),
                    okButtonProps: { style: { display: 'none' } },

                }
                );
                break;
            case 'bulkDelete':
                Modal.confirm({
                    title: 'Are you sure you want to delete selected items?',
                    icon: <DeleteOutlined />,
                    onOk: () => {
                        axiosInstance.post('/item/delete-many/', { ids: selectedRowKeys }).then(({ data }) => {
                            const { is_success, } = data
                            if (is_success) {
                                setItems(items => items.filter((item: ItemType) => !selectedRowKeys.includes(item._id)))
                                message.success('Items deleted successfully')
                            }

                        })
                    }
                })
                break;
        }
    }

    const onItemAction = (key: ItemActionType, item: ItemType) => {
        switch (key) {
            case 'copy_username':
                copyToClipboard(item.username)
                break;
            case 'copy_password':
                copyToClipboard(item.password)
                break;
            case 'move':
                Modal.info({
                    icon: null,
                    title: 'Move to another folder',
                    content: (
                        <Form
                            onFinish={(values) => {
                                axiosInstance.put(`/item/${item._id}/`, { folder: values.folder || null }).then(({ data }) => {
                                    const { is_success } = data
                                    if (is_success) {
                                        // const updateItemIndex = items.findIndex(i => i._id === item._id)
                                        // const newItems = [...items]
                                        // newItems[updateItemIndex] = item
                                        // setItems(newItems)
                                        setRefreshItem((prev) => !prev)
                                        message.success('Item moved successfully')
                                    }
                                })
                                Modal.destroyAll()
                            }}
                            initialValues={{ folder: item.folder }}
                            name="move_item"
                        >
                            <Form.Item

                                label="Folder"
                                name="folder"
                                rules={[{ required: true, message: 'Please select a folder' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a folder"
                                    optionFilterProp="children"

                                >
                                    {folders.map(folder => (
                                        <Select.Option key={folder._id} value={folder._id}>{folder.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Move</Button>
                            </Form.Item>
                        </Form>
                    ),
                    okButtonProps: { style: { display: 'none' } },

                });
                break;
            case 'delete':
                Modal.confirm({
                    title: 'Are you sure to delete this item?',
                    icon: <DeleteOutlined />,
                    content: 'This action cannot be undone',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                        axiosInstance.delete(`/item/${item._id}`).then(({ data }) => {
                            setItems(i => i.filter(item => item._id !== data.data._id))
                            message.success('Item deleted successfully')
                        })
                    }
                });

                break;
            default:
                break;
        }

    }

    const addFolder = () => {
        Modal.info({
            icon: null,
            closable: true,
            title: 'Add new folder',
            content: (
                <Form
                    onFinish={(values) => {
                        axiosInstance.post('/folder/', { name: values.name }).then(res => {
                            setFolders(f => [...f, res.data.data])
                            success('Folder added successfully')
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

    const editItem = (item: ItemType) => {
        Modal.info(
            {
                closable: true,
                width: 800,
                icon: null,
                title: 'Edit item',
                content: (
                    <Form
                        style={{ width: '100%' }}
                        size='large'
                        onFinish={(values) => {
                            axiosInstance.put(`/item/${item._id}/`, { ...values, folder: values.folder || null }).then(({ data }) => {
                                const { is_success,
                                    //  data: item
                                } = data
                                if (is_success) {
                                    // const updateItemIndex = items.findIndex(i => i._id === item._id)
                                    // const newItems = [...items]
                                    // newItems[updateItemIndex] = item
                                    // setItems(newItems)
                                    setRefreshItem((prev) => !prev)
                                    Modal.destroyAll()
                                    message.success('Item updated successfully')
                                }
                            })
                        }}
                        layout="vertical"
                        name="edit_item"
                        initialValues={{ ...item, folder: item.folder || "" }}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please input the name' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="folder" label="Folder">
                                    <Select>
                                        <Select.Option value={""}>No folder</Select.Option>
                                        {folders.map(folder =>
                                            <Select.Option key={folder._id} value={folder._id}>
                                                {folder.name}
                                            </Select.Option>
                                        )
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item name="username"
                                    label="Username">
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="password" label={<div className='d-flex justify-content-between w-100'>
                                    <div>Password</div>

                                </div>}>
                                    <Input.Password />
                                </Form.Item>
                            </div>
                        </div>

                        <Form.List name="url">
                            {(fields, { add, remove }) => (
                                <div className='row'>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key} className="col-md-6 mb-3 d-flex align-items-center">
                                            <Form.Item
                                                className='mb-0 w-75'
                                                {...restField}
                                                name={[name]}
                                                rules={[{ required: true, message: 'Please input URL' }, {
                                                    type: 'url',
                                                    message: 'Please input a valid URL'
                                                }]}
                                            >
                                                <Input placeholder="Example: https://google.com" />
                                            </Form.Item>

                                            <MinusCircleOutlined style={{ fontSize: "22px", marginLeft: '0.5rem' }} onClick={() => remove(name)} />
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add field
                                        </Button>
                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>

                        <Form.Item name="note" label="Note">
                            <Input.TextArea />
                        </Form.Item>
                        <div className='d-flex'>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Save</Button>
                            </Form.Item>
                            <Button className='ms-3' onClick={() => Modal.destroyAll()}>Cancel</Button>
                        </div>

                    </Form>
                ),
                okButtonProps: {
                    style: { display: 'none' }
                }
            }
        )

    }


    const sideMenu: MenuProps['items'] = [FolderFilled].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `folder${key}`,
                type: 'group',
                icon: React.createElement(icon),
                label: (<div className='d-flex justify-content-between text-white fs-5'>
                    <span style={{ cursor: 'pointer' }} onClick={() => {
                        setSelectedFolder(null)
                    }}>Folder</span>
                    <span style={{ cursor: 'pointer' }}
                        onClick={addFolder}>+</span>
                </div>),

                children: folders.map(({ _id, name }) => {
                    return {
                        key: _id,
                        label: <div className='d-flex'
                            onClick={() => setSelectedFolder(_id)}
                        >
                            <span>{name}</span>
                            <span className='text-secondary ms-auto text-white'
                                onClick={(e) => {
                                    e.stopPropagation();

                                    Modal.info({
                                        closable: true,
                                        icon: null,
                                        title: 'Edit folder',
                                        content: (
                                            <Form
                                                onFinish={(values) => {
                                                    axiosInstance.put(`/folder/${_id}`, { name: values.name }).then(res => {
                                                        setFolders(f => f.map(folder => folder._id == _id ? res.data.data : folder))
                                                        success('Folder updated successfully')

                                                        Modal.destroyAll()
                                                    })
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
                                                            success('Folder deleted successfully')
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
            render: (_, item) =>
                <div
                    onClick={() => editItem(item)}
                    className="item-name"
                    style={{ cursor: 'pointer' }}>
                    <span
                        title='Click to edit item'
                        className='text-primary'>{item.name}</span><br />
                    <span className='text-secondary'>{item.username}</span>
                </div>,
        },
        {
            title: 'Owner',
            dataIndex: 'owner',
            responsive: ['sm'],
            key: 'owner',
            render: (owner: number) => <Tag color={owner == 1 ? "green" : "green"}>{"Me"}</Tag>
        },
        {
            title: <Dropdown
                menu={{ items: selectedItemMenu, onClick: (item) => { onBulkAction(item.key as BulkActionType) } }} trigger={['click']}>
                <Space style={{ cursor: 'pointer' }}>
                    <MoreOutlined style={{ fontSize: '23px' }} />
                </Space>
            </Dropdown>,
            key: 'action',
            align: 'right',
            render: (_, record) => (
                <Dropdown
                    menu={{ items: itemMenu, onClick: (item) => { onItemAction(item.key as ItemActionType, record) } }}
                    trigger={['click']}>
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

    const addItem = async (values: any) => {
        const { data } = await axiosInstance.post('/item/', values);
        // add item in front
        setItems(i => [data.data, ...i])
        message.success('Item added successfully')
    }

    return (
        <div className='d-flex'>
            <Sider width={200} style={{ background: colorBgContainer }} breakpoint="lg" collapsedWidth="0">
                <Menu
                    selectedKeys={[selectedFolder as string]}
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
                        {folders.filter(f => f._id === selectedFolder)?.[0]?.name || "All items"}
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
                    loading={loading}
                    size='large'
                    style={{ maxWidth: '100%' }}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={items.map(item => ({ ...item, key: item._id }))} />
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