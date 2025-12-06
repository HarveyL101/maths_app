import { SideBar, TitleBar } from '../utils/index';

const Home = () => {
  return (
    <div>
      <TitleBar />

      <div className='pt-4 pl-3 pr-3'>
        <h2 className='font-bold text-3xl text-gray-700'>Browse...</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='card'>
            <h3 className='card-header'>Card Header</h3>
            <p className='card-content'>Card Content</p>
            <footer>
              <p className='card-footer'>Card footer</p>
            </footer>
          </div>

          <div className='card'>
            <h3 className='card-header'>Card Header</h3>
            <p className='card-content'>Card Content</p>
            <footer>
              <p className='card-footer'>Card footer</p>
            </footer>
          </div>

          <div className='card'>
            <h3 className='card-header'>Card Header</h3>
            <p className='card-content'>Card Content</p>
            <footer>
              <p className='card-footer'>Card footer</p>
            </footer>
          </div>

          <div className='card'>
            <h3 className='card-header'>Card Header</h3>
            <p className='card-content'>Card Content</p>
            <footer>
              <p className='card-footer'>Card footer</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;