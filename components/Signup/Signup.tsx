"use client"

import React from 'react'
import { Button, Form, Input } from 'antd';

const onFinish = (values: any) => {
}

const Signup = () => {
    return (
        <div className='container'>
            <h2 className='text-center'>Sign up</h2>
            <div className='d-flex justify-content-center align-items-center'>
                <Form
                    layout='vertical'
                    name="signup"
                    onFinish={onFinish}
                    style={{ maxWidth: 600, minWidth: '30rem' }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    <Form.Item

                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters long'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password size='large' />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit" size='large'>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Signup