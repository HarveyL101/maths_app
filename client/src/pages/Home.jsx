import { TitleBar, Footer } from '../utils/index';

const Home = () => {
  return (
    <div className='page-wrapper'>
      <TitleBar />

      <div className='pt-4 pl-3 pr-3'>
        <p className='text-center'><i>Randomly picked motivational quote?</i></p>
        <h2 className='font-bold text-3xl text-gray-700'>Browse...</h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Continue...</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>

          <div className='card'>
            <a href="">
              <img src="/placeholders/placeholder.png" alt="Placeholder Image" />
              <h3 className='card-header'>Card Header</h3>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home;