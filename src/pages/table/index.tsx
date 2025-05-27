import React, { useRef, useState } from "react";
import { Table, Avatar, Button, Modal, Form } from "@douyinfe/semi-ui";
import useService from "@/src/hooks/useService";
import { ColumnProps } from "@douyinfe/semi-ui/lib/es/table";
import { FormApi } from "@douyinfe/semi-ui/lib/es/form";
import { BookService } from "@/src/services/book";

const {Input, Select} = Form

const TablePage = () => {
    const [pageNum, setPage] = useState(1);
    const [{data, loading}] = useService(() => BookService.list({page: pageNum, page_size: 10}), [pageNum]);
    const [{data: userList, loading: userLoading}] = useService(() => BookService.list({page: 1, page_size: 10}), []);
    const [visible, setVisible] = useState(false);
    const [modalRecord, setModalRecord] = useState<any>();
    const [okLoading, setOkLoading] = useState(false)
    const formApi = useRef<FormApi>();

    const columns: ColumnProps[] = [
        {
            title: "id",
            dataIndex: "book_id",
            render: (id: string, record: { cover: string }) => (
                <div className="flex items-center">
                    <span className="font-medium">{id}</span>
                </div>
            ),
        },
        {
            title: "书名",
            dataIndex: "title",
            render: (text: string, record: { cover: string }) => (
                <div className="flex items-center">
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: "作者",
            dataIndex: "author",
            render: (text: string, record: { cover: string }) => (
                <div className="flex items-center">
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: "概述",
            dataIndex: "summary",
            render: (text: string, record: { cover: string }) => (
                <div className="flex items-center">
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: "出版年份",
            dataIndex: "year",
            render: (text: number, record: { cover: string }) => (
                <div className="flex items-center">
                    <span className="font-medium">{text}</span>
                </div>
            ),
        },
        {
            title: "操作",
            dataIndex: "actions",
            align: 'center',
            render: (_text: string, record: any, _index: any) => {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button type="primary" theme='solid' onClick={() => editInfo(record)}>编辑</Button>
                        <Button type="danger" theme='solid'>删除</Button>
                    </div>
                );
            },
        },
    ];

    const editInfo = (record: any) => {
        setModalRecord(record)
        setVisible(true)
    }

    const handleOk = () => {
        if (!formApi.current) return;
        formApi.current.validate().then((values: any) => {
            setOkLoading(true)
            setTimeout(() => {
                //TODO: save data
                setVisible(false)
                setOkLoading(false)
            }, 1000)
        })
    }

    return (
        <div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                    <Input field='username'></Input>
                    <Button type="primary" theme="solid">新增</Button>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={data?.data}
                        pagination={{
                            total: data?.total,
                            currentPage: pageNum,
                            className: 'px-4 mt-4',
                            onChange: (page: number) => {
                                setPage(page)
                            },
                        }}
                    />
                </div>
            </div>
            <Modal
                title='编辑信息'
                size="large"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={handleOk}
                okButtonProps={{loading: okLoading}}
            >
                <Form
                    labelPosition='left'
                    labelAlign='left'
                    labelWidth={100}
                    initValues={modalRecord}
                    getFormApi={api => formApi.current = api}
                >
                    <Input
                        field='name'
                        label='标题'
                        className='min-w-[100px]'
                        rules={[{required: true, message: '请输入标题'}]}
                    />
                    <Select field='platform' label='平台' className='min-w-[100px]'>
                        <Select.Option value='DOUYIN'>抖音</Select.Option>
                        <Select.Option value='XIAOHONGSHU'>小红书</Select.Option>
                        <Select.Option value='WEIBO'>微博</Select.Option>
                    </Select>
                    <Select field='status' label='交付状态' className='min-w-[100px]'>
                        <Select.Option value='success'>已交付</Select.Option>
                        <Select.Option value='wait'>待评审</Select.Option>
                        <Select.Option value='pending'>已延期</Select.Option>
                    </Select>
                    <Select field='owner' label='负责人' className='min-w-[100px]'
                            renderSelectedItem={renderSelectedItem}>
                        {userList?.data?.map(item => (
                            <Select.Option {...item} key={item.id} value={item.id} className="flex items-center pr-8">
                                <Avatar size="extra-small" src={item.avatar}/>
                                <div className="ml-4">{item.name}</div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form>
            </Modal>
        </div>
    );
};

const renderSelectedItem = (option: any) => {
    console.log(option)
    return (
        <div className="flex items-center gap-2">
            <Avatar size="extra-small" src={option.avatar}/>
            {option.name}
        </div>
    )
}
export default TablePage;
