import './MusicList.scss';
import {
  ClockCircleOutlined,
  PlusCircleOutlined,
  CaretRightOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApiClient } from '@/utils/api';
const ListHead = ({ DataList, onClick }) => {
  const { CheckTrack, RemoveTrack, SaveTrack } = useApiClient();
  const [HoveredIndex, setHoveredIndex] = useState(-1);
  // 是否点赞的标识
  const [checkedTrack, setCheckedTrack] = useState([]);
  const ids = DataList.map(item => item.id).join(',');
  const checkSavedTrack = async id => {
    const res = await CheckTrack(id);
    setCheckedTrack(res.data);
  };
  useEffect(() => {
    checkSavedTrack(ids);
  }, [DataList]);
  // checkSavedTrack(ids);
  // 点击喜欢/取消喜欢按钮
  async function handleSavedTrack(id, index) {
    // 如果该曲目已经被点赞
    if (checkedTrack[index]) {
      await RemoveTrack(id);
      setCheckedTrack(prevTrack => {
        const newTrack = [...prevTrack];
        newTrack[index] = false;
        return newTrack;
      });
      message.info('已从已点赞的歌曲中删除');
    }
    // 如果该曲目未被点赞
    else {
      await SaveTrack(id);
      setCheckedTrack(prevTrack => {
        const newTrack = [...prevTrack];
        newTrack[index] = true;
        return newTrack;
      });
      message.info('已添加到已点赞的歌曲');
    }
  }

  const handleMouseEnter = index => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <ul className="List-box">
      <li className="list-head">
        <div className="one">#</div>
        <div className="tow">标题</div>
        <div className="three">专辑</div>
        <div className="four">
          <ClockCircleOutlined></ClockCircleOutlined>
        </div>
      </li>
      {DataList?.map((item, index) => {
        return (
          <li
            className="list-item"
            key={item.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="order" onClick={() => onClick(index)}>
              {HoveredIndex === index ? <CaretRightOutlined /> : `${index + 1}`}
            </div>
            <div className="list-image">
              <img src={item.image} alt="" />
            </div>
            <div className="title">
              <div className="song-name">
                <Link to={`/tracks/${item.id}`}>{item.TrackName}</Link>
              </div>
              <div className="singer-name">
                <Link to={`/artist/${item.ArtistId}`}> {item.ArtistName}</Link>
              </div>
            </div>
            <div className="name">
              <Link to={`/album/${item.AlbumId}`}>{item.AlbumName}</Link>
            </div>
            <div className="plus">
              <Button
                type="text"
                icon={
                  checkedTrack[index] ? (
                    <CheckOutlined />
                  ) : (
                    <PlusCircleOutlined />
                  )
                }
                onClick={() => handleSavedTrack(item.id, index)}
              ></Button>
            </div>
            <div className="time">{item.time}</div>
          </li>
        );
      })}
    </ul>
  );
};

{
}
export default ListHead;
