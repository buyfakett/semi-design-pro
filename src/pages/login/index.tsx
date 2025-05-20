import React from 'react';
import { Form, Button, Toast, Typography } from '@douyinfe/semi-ui';
import { IconUser, IconKey } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from '@/src/api/user';
import { setToken } from '@/src/utils/auth';

const { Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const username: string = process.env.NODE_ENV !== 'production' ? 'admin' : '';
  const password: string =
    process.env.NODE_ENV !== 'production' ? 'admin123456' : '';
  const remember_me: boolean =
    process.env.NODE_ENV !== 'production';

  // 使用Form组件管理表单状态
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await UserAPI.Login(values);
      
      if (res.code === 200) {
        if (res.data?.token) {
          setToken(res.data.token);
          Toast.success('登录成功');
          navigate('/home');
        } else {
          Toast.error('登录凭证缺失');
        }
      } else {
        Toast.error(res.msg || `登录失败，错误码：${res.code}`);
      }
    } catch (error) {
      Toast.error('登录失败，请重试');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--semi-color-fill-0)]">
      <div className="flex flex-col gap-6 p-8 bg-[var(--semi-color-white)] w-[480px] rounded-lg shadow-lg"
           style={{ border: '1px solid var(--semi-color-border)' }}>
        <Text className="text-2xl font-bold">欢迎登录</Text>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Form.Input
            field="username"
            label="账号"
            prefix={<IconUser />}
            showClear
            placeholder="请输入用户名"
            initValue={username}
            rules={[
              { required: true, message: '账号不能为空' },
              { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$|^[a-zA-Z0-9_]{4,20}$/, 
                message: '请输入有效用户名' }
            ]}
          />

          <Form.Input
            field="password"
            label="密码"
            mode="password"
            prefix={<IconKey />}
            showClear
            placeholder="请输入密码"
            initValue={password}
            rules={[
              { required: true, message: '密码不能为空' },
              { min: 6, message: '密码至少6位字符' }
            ]}
          />

          <div className="flex items-center justify-between">
            <Form.Checkbox initValue={remember_me} field="remember_me">记住我</Form.Checkbox>
          </div>

          <Button
            htmlType="submit"
            type="primary"
            theme="solid"
            loading={loading}
            className="w-full h-10"
          >
            登录
          </Button>
        </Form>

      </div>
    </div>
  );
};

export default Login;