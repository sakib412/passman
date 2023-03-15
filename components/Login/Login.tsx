"use client"
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

import React from 'react'

const Login = () => {
    return (
        <div className='container'>
            <h2 className='text-center'>Login</h2>
            <div className='d-flex justify-content-center align-items-center'>
                <Form
                    layout='vertical'
                    name="login"
                    labelCol={{ span: 8 }}
                    style={{ maxWidth: 600, minWidth: '30rem' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please input a valid email' }]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password size='large' />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" size='large'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login