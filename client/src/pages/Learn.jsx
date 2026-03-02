import TitleBar from '../components/TitleBar.jsx';
import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from 'react';

const Learn = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubTopic, setSelectedSubTopic] = useState('');
  const [formData, setFormData] = useState(null);
  const [tags, setTags] = useState({
    Year: "",
    Topic: "",
    SubTopic: ""
  });

  const handleFormSubmit = (submittedData) => {
    console.log("Data received in parent:", submittedData);
    setFormData(submittedData);
  }

  // The Values within this need to be the names of their respective DB tables (WIP)
  const PRESET_OPTIONS = {
    // Algebra
    'Algebra': 'Algebra',
    // Geometry
    'Properties of Shapes': 'PropertiesOfShapes',
    'Position & Direction': 'PositionDirection',
    // Measurement
    'Measurement': 'Measurement',
    // Number
    'Addition': 'Addition',
    'Subtraction': 'Subtraction',
    'Multiplication': 'Multiplication',
    'Division': 'Division',
    // Number/Fraction
    'Fraction Addition': 'FracAddition',
    'Fraction Subtraction': 'FracSubtraction',
    'Fraction Counting Up': 'FracCountUp',
    'Fractions': 'Fractions',
    'Fractions (Inc. Decimals)': 'FractionsDec',
    'Fractions (Inc. Decimals & Percentages)': 'FractionsDecPerc',
    // Number/NumberPlaceValue
    'Counting up': 'CountUp',
    'Number & Place Value': 'NumberPlaceValue',
    // Statistics
    'Statistics': 'Statistics'
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
        <label>
          Target Year Group:
          <select 
            value={selectedYear} 
            onChange={handleYearChange}
          >
            <option value="">Select Year</option>
            {[3, 4, 5, 6].map((year) => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          Topic:
          <select 
            value={selectedTopic} 
            onChange={handleTopicChange}
            disabled={!selectedYear}
          >
            <option value="">Select Topic</option>
            {selectedYear &&
              Object.keys(curriculum[selectedYear]).map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
          </select>
        </label>

        <label>
          Sub-Topic:
          <select 
            value={selectedSubTopic} 
            onChange={(e) => setSelectedSubTopic(e.target.value)}
            disabled={!selectedTopic}
          >
            <option value="">Select Sub-Topic</option>
            {selectedYear &&
              selectedTopic &&
              curriculum[selectedYear][selectedTopic].map((subTopic) => (
                <option key={subTopic} value={subTopic}>
                  {subTopic}
                </option>
              ))}
          </select>
        </label>
      </div>

      <div className='portal-body'>
        {/** Here will be the search results portion of the page */}
      </div>
    </div>
  );
};

export default Learn;