import { SideBar, TitleBar } from '../utils/index';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <TitleBar />

      <div className='pt-4 pl-3 pr-3'>
        <p className='text-center'><i>Randomly picked motivational quote?</i></p>
        <h2 className='font-bold text-3xl text-gray-700'>Browse...</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Continue...</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;