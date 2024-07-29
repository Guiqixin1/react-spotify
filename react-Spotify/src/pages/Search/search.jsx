import './index.scss';
import { Button, Tooltip, Input } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import Categories from '@/components/categories.jsx';
import { useEffect, useState } from 'react';
import { useApiClient } from '../../utils/api.jsx';
// 无限滚动组件
import useInfiScroll from '../../components/useInfiScroll.jsx';
const Search = () => {
  const { getBrowseCategories } = useApiClient();
  const [categoriesList, setCategoriesList] = useState([]);
  const [setNext, lastRef] = useInfiScroll(setCategoriesList, 'categories');
  function handleSearch(value) {
    console.log(value);
  }
  // 一进页面就获取数据
  async function getData() {
    const res = await getBrowseCategories();
    // console.log(res.data);
    setCategoriesList(res.data.categories.items);
    setNext(res.data.categories.next);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="search">
      <div className="header">
        <div className="nav">
          <div className="nav__left">
            <Tooltip title="后退">
              <Button shape="circle" icon={<LeftOutlined />} />
            </Tooltip>
          </div>
          <div className="nav__right">
            <Tooltip title="前进">
              <Button shape="circle" icon={<RightOutlined />} />
            </Tooltip>
          </div>
        </div>
        <div className="search__input">
          <Input
            allowClear="true"
            prefix={<SearchOutlined />}
            placeholder="想播放什么"
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <h1 className="h1">浏览全部</h1>
      <div className="main">
        <Categories categoriesList={categoriesList} lastRef={lastRef} />
      </div>
    </div>
  );
};

export default Search; //export default é usado para exportar o componente para ser usado em outro arquivo
