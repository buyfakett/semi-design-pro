import { UserAPI } from '@/src/api/user';
import { Toast } from '@douyinfe/semi-ui';
import { setToken } from "@/src/utils/auth";
import { ChangePasswdParams, LoginParams } from "@/src/api/user/types";

/** 用户 */
export const UserService = {
    /** 登录 */
    login: async (params: LoginParams) => {
        try {
            const resp = await UserAPI.Login(params);
            if (resp.code === 200) {
                if (resp.data?.token) {
                    setToken(resp.data.token);
                    Toast.success('登录成功');
                } else {
                    Toast.error('登录凭证缺失');
                }
            }
        } catch (error) {
            Toast.error('登录失败，请重试');
            console.error('Login error:', error);
        }
    },

    updatePassword: async (userId: string, params: ChangePasswdParams) => {
        try {
            const resp = await UserAPI.ChangePasswd(userId, params);
            if (resp.code === 200) {
                Toast.success('修改成功');
                return true;
            }
            Toast.error(resp.msg || '修改失败');
            return false;
        } catch (err) {
            Toast.error('网络请求异常');
            return false;
        }
    },
};
