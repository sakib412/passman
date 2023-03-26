"use client"

import React from 'react'
import { Button, Form, Input } from 'antd';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { error, success } from '@/utils/notificaion';



const Signup = () => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {

            const res = await axiosInstance.post('/auth/signup', values)
            if (res.data.is_success) {
                success('Signup success')
                router.refresh()
                window.location.href = '/';

                router.push('/')
            }
        } catch (e: any) {
            error(e.response.data.data.message || 'Signup failed')
        }

    }
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
                        name="username"
                        label="Username"
                        rules={[

                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            {
                                min: 3,
                                message: 'Username must be at least 3 characters long'
                            },
                            {
                                max: 20,
                                message: 'Username must be less than 60 characters long'
                            }
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