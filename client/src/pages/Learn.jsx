import TitleBar from '../components/TitleBar.jsx';
import SearchBar from '../components/SearchBar.jsx';

const Learn = () => {
  const handleFormSubmit = (submittedData) => {
    console.log("Data received in parent:", submittedData);
    setFormData(submittedData);
  }

  return (
    <div>
      <TitleBar />
      <h1>This is the current page for /learn</h1>

      <div> {/** This will hold the search bar portion */}
        <SearchBar />
      </div>

      <div className='portal-body'>
        {/** Here will be the search results portion of the page */}
      </div>
    </div>
  );
};

export default Learn;