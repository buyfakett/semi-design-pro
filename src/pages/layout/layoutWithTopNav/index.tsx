import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo } from '@douyinfe/semi-icons';
import { Outlet } from 'react-router-dom';
import { FaRegCopyright } from 'react-icons/fa';

const {Header, Footer, Content} = Layout;
const LayoutWithTopNav = () => {
    const year = new Date().getFullYear();

    return (
        <Layout className='bg-(--semi-color-tertiary-light-default) h-screen'>
            <Header>
                <Nav
                    mode='horizontal'
                    header={{
                        logo: <IconSemiLogo style={{height: "36px", fontSize: 36}}/>,
                        text: "Semi 后台",
                    }}
                />
            </Header>
            <Content className='flex items-center justify-center w-screen mt-24'>
                <Outlet/>
            </Content>
            <Footer className='flex items-center justify-center w-full gap-2 mt-12'>
                <p className="mb-2 flex items-center justify-center">
                    <FaRegCopyright className="mr-1 text-sm"/>
                    2024 - {year}
                    <a
                        href="https://github.com/buyfakett"
                        target="_blank"
                        className="text-blue-400 hover:underline ml-1">
                        buyfakett
                    </a>
                    . All rights reserved.
                </p>
            </Footer>
        </Layout>
    );
};
export default LayoutWithTopNav;
