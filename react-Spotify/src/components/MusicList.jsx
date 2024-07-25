import './MusicList.scss';
import {
  ClockCircleOutlined,
  PlusCircleOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayIndex } from '../store/modules/audioList';
const ListHead = ({ DataList }) => {
  const [HoveredIndex, setHoveredIndex] = useState(-1);
  const dispatch = useDispatch();
  const handleMouseEnter = index => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  // 音乐播放
  const onAudioPlay = index => {
    dispatch(setPlayIndex(index));
    // console.log(index);
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
            <div className="order" onClick={() => onAudioPlay(index)}>
              {HoveredIndex === index ? <CaretRightOutlined /> : `${index + 1}`}
            </div>
            <div className="list-image">
              <img src={item.image} alt="" />
            </div>
            <div className="title">
              <div className="song-name">
                <Link to={`/album/${item.AlbumId}`}>{item.AlbumName}</Link>
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
                icon={<PlusCircleOutlined></PlusCircleOutlined>}
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
