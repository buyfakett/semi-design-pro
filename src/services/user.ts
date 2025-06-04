import { UserAPI } from '@/src/api/user';
import { Toast } from '@douyinfe/semi-ui';
import { setToken } from "@/src/utils/auth";
import { LoginParams } from "@/src/api/user/types";

/** 用户 */
export const UserService = {
    /** 登录 */
    login: async (params: LoginParams) => {
        try {
            const res = await UserAPI.Login(params);
            if (res.code === 200) {
                if (res.data?.token) {
                    setToken(res.data.token);
                    Toast.success('登录成功');

                } else {
                    Toast.error('登录凭证缺失');
                }
            } else {
                Toast.error(res.msg || `登录失败，错误码：${res.code}`);
            }
        } catch (error) {
            Toast.error('登录失败，请重试');
            console.error('Login error:', error);
        }
    },
};
