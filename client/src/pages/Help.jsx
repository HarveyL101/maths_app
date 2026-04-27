import { Footer, TitleBar } from "../utils/index";

const Help = () => {
  return (
    <div className="page-wrapper">
      <TitleBar/>
      
      <h1>This is the current page for /help</h1>

      <ul>
        <li>This page will contain both technical FAQ's (how to use the app) as well as maths focused tips readable by subject area</li>
      </ul>
      
      <Footer />
    </div>
  );
};

export default Help;