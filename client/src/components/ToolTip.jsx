import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ToolTip = ({ title, body }) => (
  <Popup trigger={<button className='text-3xl cursor-pointer'>ⓘ</button>} position="bottom center" modal={true}>
    {close => (
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
        <button className='close cursor-pointer ' onClick={close}>
          Close
        </button>
      </div>
    )}
  </Popup>
);

export default ToolTip;