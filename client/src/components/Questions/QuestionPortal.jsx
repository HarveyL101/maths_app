const QuestionPortal = () => {
    return (
        <div className="portal-container">
            <div className="portal-card">
                <div className="portal-header">
                    <h1>This is the header portion</h1>

                    <label> {/** Needs to display based on prev select element (Year Group -> Topic -> SubTopic) */}
                        Target Year Group:
                        <select name="selectedYear">
                            <option value="3">Year 3</option>
                            <option value="4">Year 4</option>
                            <option value="5">Year 5</option>
                            <option value="6">Year 6</option>
                        </select>
                    </label>

                    <label>
                        Topic:
                        <select name="selectedTopic"> {/** Somehow needs to render based on previous option value */}
                            <option value="">Number</option>
                            <option value="">Ratio & Proportion</option> {/* Year 6 only */}
                            <option value="">Algebra</option> {/* Year 6 only */}
                            <option value="">Measurement</option>
                            <option value="">Geometry</option>
                            <option value="">Statistics</option>
                        </select>
                    </label>

                    <label>
                        Sub-Topic:
                        <select name="selectedSubTopic">
                            {/* Years 3+ */}
                            {/** Number */}
                            <option value="">Number & Place Value</option>
                            <option value="">Addition & Subtraction</option>
                            <option value="">Multiplication & Division</option>
                            <option value="">Fractions</option>

                            {/** Geometry */}
                            <option value="">Properties of Shapes</option>

                            {/* Years 4+ */}
                            {/** Number */}
                            <option value="">Number & Place Value</option>
                            <option value="">Addition & Subtraction</option>
                            <option value="">Multiplication & Division</option>
                            <option value="">Fractions (Inc. Decimals)</option>

                            {/** Geometry */}
                            <option value="">Properties of Shapes</option>
                            <option value="">Position & Direction</option>

                            {/* Years 5+ */}
                            {/** Number */}
                            <option value="">Number & Place Value</option>
                            <option value="">Addition & Subtraction</option>
                            <option value="">Multiplication & Division</option>
                            <option value="">Fractions (Inc. Decimals & Percentages)</option>

                            {/** Geometry */}
                            <option value="">Properties of Shapes</option>
                            <option value="">Position & Direction</option>

                            {/* Year 6 only */}
                            {/** Number */}
                            <option value="">Number & Place Value</option>
                            <option value="">Addition, Subtraction, Multiplication & Division</option>
                            <option value="">Fractions (Inc. Decimals & Percentages)</option>
                        </select>
                    </label>
                </div>

                <div className="portal-body"> {/** Will hopefully be able to conditionally render a question preset based on the selected tags */}

                </div>
                <div className="portal-footer"></div>
            </div>
        </div>
    );
};

export default QuestionPortal;