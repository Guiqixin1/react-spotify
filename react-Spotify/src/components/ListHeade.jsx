import './ListHead.scss';
import { ClockCircleOutlined } from '@ant-design/icons';
const ListHead = () => {
  return (
    <div className="list-head">
      <div className="one">#</div>
      <div className="two">标题</div>
      <div className="three">专辑</div>
      <div className="four">
        <i className="clock-icon">
          <ClockCircleOutlined />
        </i>
      </div>
    </div>
  );
};

{
}
export default ListHead;
