import { getUsername } from "@/src/utils/auth";
import { Typography } from '@douyinfe/semi-ui';

const Home = () => {
  const { Title } = Typography;
  const username = getUsername();

  return (
    <>
      <Title className="m-10">hello, {username}</Title>
    </>
  );
};

export default Home;