import React, { FC, lazy, ReactElement, Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { Spin } from '@douyinfe/semi-ui';
import { IconConfig } from '@douyinfe/semi-icons-lab';
import Wrapper from './wrapper';
import { IconAlertTriangle, IconFile, IconHome } from '@douyinfe/semi-icons';

// 使用懒加载导入页面组件
const Layout = lazy(() => import('@/src/pages/layout'));
const LayoutWithTopNav = lazy(() => import('@/src/pages/layout/layoutWithTopNav'));

const Setting = lazy(() => import('@/src/pages/setting'));

const Login = lazy(() => import('@/src/pages/login'));

const Table = lazy(() => import('@/src/pages/table'));
const Home = lazy(() => import('@/src/pages/home'));

const NotFond = lazy(() => import('@/src/pages/exception/404'));
const NoAuth = lazy(() => import('@/src/pages/exception/403'));

export interface IRouters {
  text: string;
  icon?: ReactElement;
  items?: IRouters[];
  itemKey: string;
}
// 左侧导航路由
export const MenuRoutes: IRouters[] = [
  {
    itemKey: '/home',
    icon: <IconHome />,
    text: '首页',
  },
  {
    itemKey: '/table/basic',
    icon: <IconFile />,
    text: '图书管理',
  },
  {
    itemKey: '/exception',
    icon: <IconAlertTriangle />,
    text: '异常页',
    items: [
      {
        itemKey: '/exception/404',
        text: '404'
      },
      {
        itemKey: '/exception/403',
        text: '403'
      }
    ]
  },
  {
    itemKey: '/setting',
    icon: <IconConfig />,
    text: '设置'
  }
];

// 浏览器路由
const routers: RouteObject[] = [
  {
    path: '/',
    element: <Wrapper component={<Layout />} auth />,
    // 导航内的路由写在这里，同时要添加到Menu中
    children: [
      {
        path: 'home',
        element: <Wrapper component={<Home />} />
      },
      {
        path: 'setting',
        element: <Wrapper component={<Setting />} />
      },
      {
        path: 'table/basic',
        element: <Wrapper component={<Table />} />
      },
    ]
  },
  // 有顶部导航，没有侧边导航写这里
  {
    path: '/user',
    element: <LayoutWithTopNav />,
    children: [
      {
        path: 'login',
        element: <Wrapper component={<Login />} />
      },
    ]
  },
  // 异常页路由
  {
    path: '/exception',
    element: <LayoutWithTopNav />,
    children: [
      {
        path: '404',
        element: <Wrapper component={<NotFond />} />
      },
      {
        path: '403',
        element: <Wrapper component={<NoAuth />} />
      },
    ]
  },
  // 兜底页面，需要放在最下方
  {
    path: '*',
    element: (
      <div className='flex flex-col items-center justify-center w-screen h-screen'>
        <NotFond />
      </div>
    )
  }
]

const RenderRouter: FC = () => {
  // 使用 useRoutes 钩子生成路由元素
  const element = useRoutes(routers);
  return (
    <Suspense fallback={
      <div className='flex items-center justify-center w-screen h-screen'>
        <Spin />
      </div>
    }>
      {element}
    </Suspense>
  );
};

export default RenderRouter;