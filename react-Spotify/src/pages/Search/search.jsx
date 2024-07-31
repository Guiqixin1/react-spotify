import './index.scss';
import { Button, Tooltip, Input } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import Categories from '@/components/categories.jsx';
import { useEffect, useState } from 'react';
import { useApiClient } from '../../utils/api.jsx';
// 无限滚动组件
import useInfiScroll from '../../components/useInfiScroll.jsx';

import { useNavigate, Outlet, useParams } from 'react-router-dom';
// 引入loadsh内的防抖函数
import { debounce } from 'lodash';
const Search = () => {
  const { searchQuery } = useParams();
  const navigate = useNavigate();
  const { getBrowseCategories } = useApiClient();
  const [categoriesList, setCategoriesList] = useState([]);
  const [setNext, lastRef] = useInfiScroll(setCategoriesList, 'categories');
  const [ifInput, setIfInput] = useState();
  const [InputValue, setInputValue] = useState('');
  // 输入框内容发生变化就触发
  const handleSearch = debounce(value => {
    if (value.length > 0) {
      setIfInput(true);
    } else {
      setIfInput(false);
    }
    navigate(`/search/${value}`);
  });
  // 一进页面就获取数据
  async function getData() {
    const res = await getBrowseCategories();
    setCategoriesList(res.data.categories.items);
    setNext(res.data.categories.next);
  }
  useEffect(() => {
    getData();
    if (!searchQuery) {
      setIfInput(false);
    } else {
      setIfInput(true);
    }
  }, []);

  return (
    <div className="search">
      <div className="header">
        <div className="nav">
          <div className="nav__left">
            <Tooltip title="后退">
              <Button
                shape="circle"
                icon={<LeftOutlined />}
                onClick={() => navigate('/')}
              />
            </Tooltip>
          </div>
          <div className="nav__right">
            <Tooltip title="前进">
              <Button
                shape="circle"
                icon={<RightOutlined />}
                onClick={() => navigate(1)}
              />
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

      <div className="main">
        {!ifInput ? (
          <Categories categoriesList={categoriesList} lastRef={lastRef} />
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </div>
  );
};

export default Search; //export default é usado para exportar o componente para ser usado em outro arquivo
