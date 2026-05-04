import TitleBar from '../components/TitleBar.jsx';
import {
    // Algebra
    Algebra,
    // Geometry
    PositionDirection,
    PropertiesOfShapes,
    // Measurement
    Measurement,
    // Number
    Addition,
    Subtraction,
    Multiplication,
    Division,
    // Number/Fractions
    FracAddition,
    FracSubtraction,
    FracMultiplication,
    FracDivision,
    FracCountUp,
    FractionsDec,
    FractionsDecPerc,
    // Number/NumberPlaceValue
    CountUp,
    NumberPlaceValue,
    // Statistics
    Statistics
} from '../components/Questions/Presets/index.js';

import { curriculum } from '../components/Questions/curriculumConfig.js';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const QuestionPortal = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSubTopic, setSelectedSubTopic] = useState('');
    const [formData, setFormData] = useState(null);

    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        alert("You must be logged in to create a question.");
        return;
    }

    const handleFormSubmit = async (submittedData) => {
        
        const formattedTitle = submittedData.previewTitle.trim();

        const payload = {
            creator: storedUser.id,
            year: selectedYear,
            topic: selectedTopic,
            subtopic: selectedSubTopic,
            title: formattedTitle,
            questionType: submittedData.questionType,
            input: submittedData.params
        };

        // Checks QuestionPortal values
        if (!payload.year || !payload.topic || !payload.subtopic) {
            alert("Missing necessary tags (Year Group, Topic, Subtopic).");
            return;
        }

        // Checks that each field has a non-empty value
        const hasAllValues = payload.input 
        && Object.values(payload.input).every(field => field.value !== undefined && field.value !== "");

        if (!payload.title || !hasAllValues) {
            alert("Missing necessary question parameters (Title, Input Fields)");
            return;
        }

        try {
            const res = await fetch(`/api/questions`, {
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify(payload)
            });

            const json = await res.json();

            if (res.ok) {
                alert("Question successfully created!");
                setFormData(null); // Resets form
            } else {
                alert(json?.error || "Server error occurred, please check your connection and try again");
                return;
            }
        } catch(error) {
            console.log("Error: ", error);
            alert("Network error occurred, please try again");
        }
    }

    const PRESET_COMPONENTS = {
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
        'Fraction Multiplication': FracMultiplication,
        'Fraction Division': FracDivision,
        'Fraction Counting Up': FracCountUp,
        'Fractions (Inc. Decimals)': FractionsDec,
        'Fractions (Inc. Decimals & Percentages)': FractionsDecPerc,
        // Number/NumberPlaceValue
        'Counting Up': CountUp,
        'Number & Place Value': NumberPlaceValue,
        // Statistics
        'Statistics': Statistics
    }

    const SelectedPreset = selectedSubTopic && PRESET_COMPONENTS[selectedSubTopic?.trim()];

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
        <div className='page-wrapper'>
            <TitleBar />
            
            <div className="portal-container">

                <div className='vq-header-container'>
                    <div>
                    <h1 className='vq-header'>Create Questions</h1>
                    <p className='vq-subheader'>Use the tags below to display a question preset</p>
                    </div>
                    <button className='vq-back-button' onClick={() => navigate('/teacher-portal')}>
                    {"<- Back to Portal"}
                    </button>
                </div>

                <div className="portal-header">

                    <label className='header-label'> {/** Displays the appropriate subgroup options based on the selected grouping (Hierarchy = YearGroup -> Topic -> SubTopic) */}
                        Target Year Group:
                        <select className='header-select' value={selectedYear} onChange={handleYearChange}>
                            <option value="">Select year</option>
                            {[3, 4, 5, 6].map((year) => (
                                <option className='header-option' key={year} value={year}>
                                    Year {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className='header-label'>
                        Topic:
                        <select
                            className='header-select'
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            disabled={!selectedYear}
                        >
                            <option className='header-option' value="">Select Topic</option>

                            {selectedYear && 
                                Object.keys(curriculum[selectedYear]).sort().map((topic) => (
                                    <option className='header-option' key={topic} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                        </select>
                    </label>

                    <label className='header-label'>
                        Sub-Topic:
                        <select
                            className='header-select'
                            value={selectedSubTopic}
                            onChange={(e) => setSelectedSubTopic(e.target.value)}
                            disabled={!selectedTopic}
                        >
                            <option className="header-option" value="">Select Sub-Topic</option>

                            {selectedYear && 
                                selectedTopic &&
                                curriculum[selectedYear][selectedTopic].sort().map((subTopic) => (
                                    <option className='header-option' key={subTopic} value={subTopic}>
                                        {subTopic}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>

                <div className="portal-body"> {/* Selected preset component must pass form values back to the parent layer for submission */}
                    <div> 
                        {SelectedPreset && <SelectedPreset onSubmit={handleFormSubmit}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPortal;