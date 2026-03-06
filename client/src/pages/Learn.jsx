import TitleBar from '../components/TitleBar.jsx';
import SearchBar from '../components/SearchBar.jsx';
import SideBar from '../components/SideBar.jsx';
import Accordion from '../components/Accordion.jsx';

const curriculum = [
  {
    title: "Year 3",
    children: [
      { title: "Number", content: "" },
      { title: "Fractions", content: "" },
      { title: "Number & Place Value", content: "" },
      { title: "Measurement", content: "" },
      { title: "Geometry", content: "" },
      { title: "Statistics", content: "" }
    ],
  },
  {
    title: "Year 4",
    children: [
      { title: "Number", content: "" },
      { title: "Fractions", content: "" },
      { title: "Number & Place Value", content: "" },
      { title: "Measurement", content: "" },
      { title: "Geometry", content: "" },
      { title: "Statistics", content: "" }
    ],
  },
  {
    title: "Year 5",
    children: [
      { title: "Number", content: "" },
      { title: "Fractions", content: "" },
      { title: "Number & Place Value", content: "" },
      { title: "Measurement", content: "" },
      { title: "Geometry", content: "" },
      { title: "Statistics", content: "" }
    ],
  },
  {
    title: "Year 6",
    children: [
      { title: "Number", content: "" },
      { title: "Fractions", content: "" },
      { title: "Number & Place Value", content: "" },
      { title: "Ratio & Proportion", content: "" },
      { title: "Algebra", content: "" },
      { title: "Measurement", content: "" },
      { title: "Geometry", content: "" },
      { title: "Statistics", content: "" }
    ],
  }
];

const Learn = () => {
  const handleFormSubmit = (submittedData) => {
    console.log("Data received in parent:", submittedData);
    setFormData(submittedData);
  }


  return (
    <div className='flex flex-col min-h-screen'>
      <TitleBar />
      
      <div className='flex flex-1 pt-16'>
        <div className='flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto p-4'>
          <h2 className='text-2xl font-bold mb-4'><u>Topic Catalogue</u></h2>
          <Accordion data={curriculum} />
        </div>

        <div className='flex-1 p-4'>
          <h1 className='text-2xl font-bold mb-4'>This is the current page for /Learn</h1>

          <div> {/** This will hold the search bar portion */}
            <SearchBar />
          </div>

          <div className='portal-body'>
            {/** Here will be the search results portion of the page */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;