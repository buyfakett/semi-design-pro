import { request } from '@/src/utils/request';
import {
    LoginParams,
    LoginResp,
    UserListParams,
    UserListResp,
    DeleteUserParams,
    DeleteUserResp,
    ChangePasswdResp,
    ChangePasswdParams
} from './types';


/** 用户登录 */
export async function Login(params: LoginParams) {
    return request.Post<LoginResp>('/api/user/login', params);
}

/** 用户列表 */
export async function List(params: UserListParams) {
    return request.Get<UserListResp>('/api/user/list', {
        params: params
    });
}

/** 用户列表 */
export async function Delete(params: DeleteUserParams) {
    return request.Delete<DeleteUserResp>(`/api/user/delete/${params.user_id}`);
}

/** 改密码 */
export async function ChangePasswd(user_id: string, params: ChangePasswdParams) {
    return request.Post<ChangePasswdResp>(`/api/user/change_passwd/${user_id}`, params);
}
