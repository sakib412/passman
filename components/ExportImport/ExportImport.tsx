"use client";

import React, { useState } from 'react'

import { Parser } from 'json2csv';
import { Button, Form, message, Upload } from 'antd';
import { parse } from 'papaparse';
import { UploadOutlined } from '@ant-design/icons';
import { getExportFileName } from '@/utils';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';


type Props = {
    items: any[]
}

const ExportImport = ({ items }: Props) => {

    const fields = ['name', 'username', 'password', 'url', 'note', 'owner', 'folder'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(items.map((item) => ({
        ...item,
        url: item.url ? item.url.join(',') : '',
    })
    ))
    const download = () => {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', getExportFileName('passman', 'csv'));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    const [jsonData, setJsonData] = useState<any[]>([]);

    const router = useRouter();

    const handleFileUpload = (file: File) => {
        parse(file, {
            header: true,
            complete: (result) => {
                setJsonData(result.data.map((item: any) => ({ ...item, url: item.url.split(',') })));
            },
            error: (err) => {
                message.error('Error parsing CSV file');
            },
        });
    };

    const onFinish = async () => {
        await axiosInstance.post('/item/insert-many/', { items: jsonData.map(item => ({ ...item, folder: item.folder || null })) })
        message.success('Imported successfully')

        setTimeout(() => {
            router.push('/')
        }, 3000)



        // You can now send jsonData to your server or save it to local storage
    };

    const uploadProps = {
        beforeUpload: (file: File) => {
            handleFileUpload(file);
            return false;
        },
    };


    return (
        <div>
            <div>
                <h3>Export data</h3>
                <hr />
                <p>Export your data to a csv file</p>
                <Button type='primary' onClick={download}>Export</Button>
            </div>
            <div>
                <h3>Import data</h3>
                <hr />
                <p>Import your data from a csv file</p>

                <Form onFinish={onFinish}>
                    <Form.Item>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Select CSV</Button>
                        </Upload>
                    </Form.Item>
                    {/* <Form.Item>
                        <Input.TextArea value={jsonData ?? ''} disabled />
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Import
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    )
}

export default ExportImport