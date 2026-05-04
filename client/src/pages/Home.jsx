import { TitleBar, Footer } from '../utils/index';

const Home = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='page-wrapper'>
      <TitleBar />

      <div className='home-welcome'>
        {user?.name && <p className='welcome-message'>Welcome back, {user?.name}!</p>
}
      </div>

      <div className='home-highlights'>
        <h4 className='highlight-header'>Learning Path</h4>
        <p className='highlight-subheader'>Browseable quizzes based on the national curriculum.</p>
      </div>

      <div className='home-highlights'>
        <h4 className='highlight-header'>Tips & Help</h4>
        <p className='highlight-subheader'>Frequently Asked Questions and general guidance.</p>
      </div>

      <div className='home-highlights'>
        <h4 className='highlight-header'>Account Management</h4>
        <p className='highlight-subheader'>Press the profile icon to make changes to your account details</p>
      </div>

      {user?.roles?.includes('educator') && (
        <div className='home-highlights'>
          <h4 className='highlight-header'>Teacher Portal</h4>
          <p className='highlight-subheader'>Manage your created questions and quizzes in the teacher portal.</p>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Home;