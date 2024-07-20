import right from '@/assets/right_arrow.png';
import left from '@/assets/left_arrow.png';
import bell from '@/assets/bell.png';
import { useNavigate } from 'react-router-dom';

import Button from './Button.jsx';

export default function HeaderNav({ handleData, show }) {
  const navigate = useNavigate();

  function handleClick(value) {
    handleData(value);
  }

  return (
    <div style={headerStyle}>
      <div style={leftStyle}>
        <Button onClick={() => navigate(-1)} style={BtnStyle}>
          <img src={left} style={imgStyle} title="last page" />
        </Button>
        <Button onClick={() => navigate(1)} style={BtnStyle}>
          <img src={right} style={imgStyle} title="next page" />
        </Button>
      </div>
      <div style={rightStyle}>
        <Button onClick={() => console.log(11)} style={bellStyle}>
          <img src={bell} style={imgStyle} title="新增内容" />
        </Button>
        <Button onClick={() => console.log(11)} style={bellStyle}>
          <img src={bell} style={imgStyle} title="新增内容" />
        </Button>
      </div>
      <div style={footStyle}>
        <Button
          onClick={() => handleClick('all')}
          style={show === 'all' ? footBtnActiveStyle : footBtnStyle}
        >
          全部
        </Button>
        <Button
          onClick={() => handleClick('music')}
          style={show === 'music' ? footBtnActiveStyle : footBtnStyle}
        >
          音乐
        </Button>
        <Button
          onClick={() => handleClick('podcast')}
          style={show === 'podcast' ? footBtnActiveStyle : footBtnStyle}
        >
          播客
        </Button>
      </div>
    </div>
  );
}

const headerStyle = {
  width: '57.4vw',
  height: '13vh',
  background: 'linear-gradient(to right, #666, #333)',
  display: 'flex',
  boxSizing: 'border-box',
  paddingTop: '10px',
  // 换行
  flexWrap: 'wrap',
  zIndex: '100',
  position: 'absolute',
  top: '0',
  left: '21vw'
};

const imgStyle = {
  width: '12px',
  boxSizing: 'border-box'
};

const leftStyle = {
  height: '50%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flex: '1',
  boxSizing: 'border-box'
};

const rightStyle = {
  width: '82%',
  height: '50%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flex: '1',
  boxSizing: 'border-box'
};

const BtnStyle = {
  borderRadius: '50%',
  height: '2vw',
  width: '2vw',
  margin: '0.3vw',
  boxSizing: 'border-box'
};

const bellStyle = {
  width: '2vw',
  height: '2vw',
  padding: '5px',
  margin: '0.3vw',
  borderRadius: '50%',
  boxSizing: 'border-box'
};

const footStyle = {
  display: 'flex',
  flex: '100%',
  flexWrap: 'wrap',
  height: '40%'
};

const footBtnStyle = {
  borderRadius: '2vw',
  fontSize: '14px',
  width: '3vw',
  marginRight: '15px',
  marginLeft: '0.5vw'
};

const footBtnActiveStyle = {
  borderRadius: '2vw',
  fontSize: '14px',
  width: '3vw',
  marginRight: '15px',
  marginLeft: '0.5vw',
  backgroundColor: '#fff',
  color: '#000000',
  opacity: '1'
};
