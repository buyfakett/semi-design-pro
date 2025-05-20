/**
 * @description 路由组件包裹页，用于重定向和鉴权等
 */
import React, { FC, Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../utils/auth';

interface IProps {
  component: JSX.Element;
  auth?: boolean;
}
const Wrapper = (props: IProps): JSX.Element => {
  const { component, auth = false } = props;
  const { pathname } = useLocation();
  const token = getToken();

  // 登录校验
  if (auth && !token) {
    return <Navigate to='/userCenter/login' />
  }
  // 重定向
  if (pathname === '/' || pathname === 'dashboard') {
    return <Navigate to='/table/basic' />
  } else {
    return component;
  }
};
export default Wrapper;