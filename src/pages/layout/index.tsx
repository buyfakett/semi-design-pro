import React, { Suspense, useEffect, useRef, useState } from "react";
import { Dropdown, Layout as MainLayout, Nav, Spin } from "@douyinfe/semi-ui";
import { IconSemiLogo } from "@douyinfe/semi-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuRoutes } from "@/src/router/routes";
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { getUserid, getUsername, removeToken } from "@/src/utils/auth";
import { APP_NAME } from "@/src/config";
import Footer from "@/src/pages/layout/Footer";
import ChangePasswordModal from "@/src/components/ChangePasswordModal";
import SwitchThemeButton from "@/src/components/SwitchThemeButton";

const {Header, Sider, Content} = MainLayout;

export default function Layout() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [pathKey, setPathKey] = useState<string[]>([]);
    const changePasswordRef = useRef<{ open: (userId: string) => void }>(null);

    // 显示弹窗
    const changePasswd = () => {
        const userId = getUserid()
        changePasswordRef.current?.open(userId);
    };

    const logout = () => {
        removeToken();
        navigate("/user/login");
    };

    const onSelect = (data: OnSelectedData) => {
        // 设置浏览器title
        document.title = `${data.selectedItems[0].text}-Semi UI Pro`;
        setPathKey(data.selectedKeys.map(String));
        navigate(data.itemKey as string);
    };

    useEffect(() => {
        setPathKey([pathname]);
    }, [pathname]);

    return (
        <>
            <MainLayout
                className="bg-(--semi-color-tertiary-light-default)"
                style={{height: '100vh', display: 'flex', flexDirection: 'column'}}
            >
                <Header>
                    <Nav
                        className="min-w-screen"
                        mode="horizontal"
                        header={{
                            logo: <IconSemiLogo style={{height: "36px", fontSize: 36}}/>,
                            text: `${APP_NAME} 管理后台`,
                        }}
                        footer={<>
                            <SwitchThemeButton/>
                            <Dropdown
                                position="bottomRight"
                                render={<Dropdown.Menu>
                                    <Dropdown.Item onClick={changePasswd}>修改密码</Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>退出</Dropdown.Item>
                                </Dropdown.Menu>}
                            >
                                <p className="cursor-pointer">{getUsername()}</p>
                            </Dropdown>
                        </>}/>
                </Header>
                <MainLayout style={{flex: 1, overflow: 'hidden'}}>
                    <div className="flex flex-1" style={{minHeight: '0'}}>
                        <Sider
                            style={{
                                height: '100%',
                                overflow: 'auto',
                                position: 'sticky',
                                top: 60,
                                zIndex: 10
                            }}
                        >
                            <Nav
                                defaultIsCollapsed={false}
                                mode="vertical"
                                style={{height: '100%', minHeight: 'calc(100vh - 120px)'}}
                                selectedKeys={pathKey}
                                items={MenuRoutes}
                                onSelect={(data) => onSelect(data)}
                                footer={{
                                    collapseButton: true,
                                }}/>
                        </Sider>
                        <Content className="overflow-auto">
                            <Suspense
                                fallback={<div className="flex items-center justify-center w-screen h-screen">
                                    <Spin/>
                                </div>}
                            >
                                <Outlet/>
                            </Suspense>
                        </Content>
                    </div>
                </MainLayout>
                <Footer/>
            </MainLayout>
            <ChangePasswordModal ref={changePasswordRef}/>
        </>
    );
}
