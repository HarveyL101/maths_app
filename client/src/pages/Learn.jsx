import TitleBar from '../components/TitleBar.jsx';
import SearchBar from '../components/SearchBar.jsx';

const Learn = () => {
  const handleFormSubmit = (submittedData) => {
    console.log("Data received in parent:", submittedData);
    setFormData(submittedData);
  }

  // The Values within this need to be the names of their respective DB subtopics (WIP)
  const PRESET_OPTIONS = {
    // Algebra
    'Algebra': Algebra,
    // Geometry
    'Properties of Shapes': PropertiesOfShapes,
    'Position & Direction': PositionDirection,
    // Measurement
    'Measurement': Measurement,
    // Number
    'Addition': Addition,
    'Subtraction': Subtraction,
    'Multiplication': Multiplication,
    'Division': Division,
    // Number/Fraction
    'Fraction Addition': FracAddition,
    'Fraction Subtraction': FracSubtraction,
    'Fraction Counting Up': FracCountUp,
    'Fractions': Fractions,
    'Fractions (Inc. Decimals)': FractionsDec,
    'Fractions (Inc. Decimals & Percentages)': FractionsDecPerc,
    // Number/NumberPlaceValue
    'Counting up': CountUp,
    'Number & Place Value': NumberPlaceValue,
    // Statistics
    'Statistics': Statistics
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedTopic('');
    setSelectedSubTopic('');
  }

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
    setSelectedSubTopic('');
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