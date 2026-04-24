const Footer = () => {
  return(
    <footer className="footer-container">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="footer-header">Know your data rights</h1>

        <div className="link-container">
          <a className="link-item" href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/children-and-the-uk-gdpr/what-rights-do-children-have/">What Rights Do Children Have?</a>
          <a className="link-item" href="https://gdpr-info.eu/chapter-3/">UK GDPR Chapter III</a>
          <a className="link-item" href="https://gdpr-info.eu/chapter-8/">UK GDPR Chapter VIII</a>
        </div>
        
        <p className="footer-date">Created @2026</p>
      </div>
    </footer>
  );
};

export default Footer;