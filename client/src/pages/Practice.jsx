import { Footer, TitleBar } from "../utils/index";

const Practice = () => {
  return (
    <div className="page-wrapper">
      <TitleBar/>
      
      <h1>This is the current page for /practice</h1>

      <ul>
        <li>This will be a page for the more free-form practice of mathematical topics</li>
        <li>Topics and subtopics will be listed for the user to pick and begin revising</li>
      </ul>
      
      <Footer />
    </div>
  );
};

export default Practice;