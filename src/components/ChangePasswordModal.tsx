import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Form } from "@douyinfe/semi-ui";

export interface ChangePasswordModalRef {
    open: () => void;
}

interface ChangePasswordModalProps {
    onSuccess?: () => void;
}

const ChangePasswordModal = forwardRef<ChangePasswordModalRef, ChangePasswordModalProps>(
    ({onSuccess}, ref) => {
        const [visible, setVisible] = useState(false);
        const [okLoading, setOkLoading] = useState(false);

        useImperativeHandle(ref, () => ({
            open: () => {
                setVisible(true);
            },
        }));

        const handleSubmit = async () => {
            setOkLoading(true);
            try {
                // 模拟异步操作
                await new Promise(resolve => setTimeout(resolve, 1000));
                setVisible(false);
                onSuccess?.(); // 回调成功逻辑
            } finally {
                setOkLoading(false);
            }
        };

        return (
            <Modal
                title="修改密码"
                size="large"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={handleSubmit}
                okButtonProps={{loading: okLoading}}
            >
                <Form
                    labelPosition="left"
                    labelAlign="left"
                    labelWidth={100}
                >
                    <Form.Input
                        field="password"
                        label="新密码"
                        rules={[{required: true, message: "请输入密码"}]}
                    />
                </Form>
            </Modal>
        );
    }
);

export default ChangePasswordModal;
