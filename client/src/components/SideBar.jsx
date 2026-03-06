
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

const SideBar = () => {
  return (
    <Accordion className='accordion-container'>
      <Accordion.Item className={"accordion-item"} eventKey="0">
        <Accordion.Header className={"accordion-header"}>Year 3</Accordion.Header>
        <Accordion.Body>
          {/* Year 3 Topics */}
          <Accordion>
            <Accordion.Item className={"accordion-item"} eventKey="0">
              <Accordion.Header className={"accordion-header"}>Number</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="1">
              <Accordion.Header className={"accordion-header"}>Fractions</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="2">
              <Accordion.Header className={"accordion-header"}>Number & Place Value</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="3">
              <Accordion.Header className={"accordion-header"}>Measurement</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="4">
              <Accordion.Header className={"accordion-header"}>Geometry</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="5">
              <Accordion.Header className={"accordion-header"}>Statistics</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
        
      </Accordion.Item>

      <Accordion.Item className={"accordion-item"} eventKey="1">
        <Accordion.Header className={"accordion-header"}>Year 4</Accordion.Header>
        
        {/* Year 4 Topics */}
        <Accordion.Body>
          <Accordion>
            <Accordion.Item className={"accordion-item"} eventKey="0">
              <Accordion.Header className={"accordion-header"}>Number</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="1">
              <Accordion.Header className={"accordion-header"}>Fractions</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="2">
              <Accordion.Header className={"accordion-header"}>Number & Place Value</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="3">
              <Accordion.Header className={"accordion-header"}>Measurement</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="4">
              <Accordion.Header className={"accordion-header"}>Geometry</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="5">
              <Accordion.Header className={"accordion-header"}>Statistics</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item className={"accordion-item"} eventKey="2">
        <Accordion.Header className={"accordion-header"}>Year 5</Accordion.Header>

        {/* Year 5 Topics */}
        <Accordion.Body>
          <Accordion>
            <Accordion.Item className={"accordion-item"} eventKey="0">
              <Accordion.Header className={"accordion-header"}>Number</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="1">
              <Accordion.Header className={"accordion-header"}>Fractions</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="2">
              <Accordion.Header className={"accordion-header"}>Number & Place Value</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="3">
              <Accordion.Header className={"accordion-header"}>Measurement</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="4">
              <Accordion.Header className={"accordion-header"}>Geometry</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="5">
              <Accordion.Header className={"accordion-header"}>Statistics</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item className={"accordion-item"} eventKey="3">
        <Accordion.Header className={"accordion-header"}>Year 6</Accordion.Header>

        <Accordion.Body>
          {/* Year 6 Topics */}
          <Accordion>
            <Accordion.Item className={"accordion-item"} eventKey="0">
              <Accordion.Header className={"accordion-header"}>Number</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="1">
              <Accordion.Header className={"accordion-header"}>Fractions</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="2">
              <Accordion.Header className={"accordion-header"}>Number & Place Value</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="3">
              <Accordion.Header className={"accordion-header"}>Ratio & Proportion</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="4">
              <Accordion.Header className={"accordion-header"}>Algebra</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="5">
              <Accordion.Header className={"accordion-header"}>Measurement</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="6">
              <Accordion.Header className={"accordion-header"}>Geometry</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>

            <Accordion.Item className={"accordion-item"} eventKey="7">
              <Accordion.Header className={"accordion-header"}>Statistics</Accordion.Header>
              <Accordion.Body className={"accordion-body"}>Poobum</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SideBar;