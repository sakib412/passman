"use client"
import React from 'react'
import { Button, Form, Input, message } from 'antd';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { error, success } from '@/utils/notificaion';




const Login = () => {
    const router = useRouter()

    const onFinish = async (values: any) => {
        try {

            const res = await axiosInstance.post('/auth/login', values)
            if (res.data.is_success) {
                router.refresh()
                router.push('/')
                success('Login success')
            }
        } catch (e: any) {
            console.log(e)
            error(e.response.data.data.message || 'Login failed')
        }
    };

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
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { min: 3, message: 'Email must be at least 3 characters' },
                            { max: 60, message: 'Email must be less than 60 characters' },
                        ]}
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