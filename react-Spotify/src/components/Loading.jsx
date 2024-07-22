import { Flex, Spin } from 'antd';
const Loading = () => {
  return (
    <Flex align="center">
      <Spin size="large" fullscreen="true" />
    </Flex>
  );
};

export default Loading;
