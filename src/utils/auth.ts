import { authStore } from "@/src/stores/useAuthStore";

// 设置 token
export function setToken( token: string ): void {
    authStore.setState( {token} );
}

// 获取 token 
export function getToken(): string | null {
    return authStore.getState().token;
}

// 获取 username
export function getUsername(): string | null {
    return parseJwt()?.username ?? '';
}

// 获取 getUserid
export function getUserid(): string | null {
    return parseJwt()?.userid ?? '';
}

// 删除 token
export function removeToken(): void {
    authStore.setState( {token: null} );
}

interface JwtPayload {
    userid: string;
    username: string;
    exp?: number;
    expired?: boolean;
}

// 解jwt
export function parseJwt(): JwtPayload | null {
    try {
        const token = <string>getToken()
        const base64Url = token.split( '.' )[1];
        const base64 = base64Url.replace( /-/g, '+' ).replace( /_/g, '/' );
        const decodedPayload = JSON.parse( atob( base64 ) );

        const currentTime = Math.floor( Date.now() / 1000 ); // 当前时间（单位是秒）
        const exp = decodedPayload.exp;
        console.log( currentTime );

        return {
            userid: decodedPayload.userid,
            username: decodedPayload.username,
            exp,
            expired: typeof exp === 'number' ? exp < currentTime : false,
        };
    } catch (error) {
        console.error( 'Failed to parse JWT:', error );
        return null;
    }
}
