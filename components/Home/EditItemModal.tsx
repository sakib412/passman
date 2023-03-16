"use client"
import React from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { CopyOutlined, MinusCircleOutlined, PlusOutlined, RetweetOutlined } from '@ant-design/icons';
import { Folder } from './Home';

export interface InitialItemType {
    name: string;
    username: string;
    password: string;
    folder: string;
    note: string;
    url: string[]
}

interface ItemEditFormProps {
    open: boolean;
    onUpdate: (values: InitialItemType) => void;
    onCancel: () => void;
    folders: Folder[];
    initialValues: InitialItemType;
}

const ItemEditForm: React.FC<ItemEditFormProps> = ({
    open,
    onUpdate,
    onCancel,
    folders
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Add new item"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            width="978px"
            centered
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onUpdate(values);
                        onCancel()
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                size='large'
                form={form}
                layout="vertical"
                name="edit_item"
                initialValues={{ folder: null, url: [''] }}
                autoComplete="off"
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
                                <Select.Option value={null}>No folder</Select.Option>
                                {folders.map(folder =>
                                    <Select.Option key={folder._id} value={String(folder._id)}>
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
                            <div className='ms-3'><CopyOutlined /> <RetweetOutlined /></div>
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
                                        rules={[{ required: true, message: 'Please input URL' }]}
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

            </Form>
        </Modal>
    );
};

export default ItemEditForm