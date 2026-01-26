# Todo Next
- [x] Install PSQL
- [x] Handle login/ registry
- [ ] Build Homepage
  - [ ] Build Nav bar
  - [ ] Build Overview on homepage
- [ ] Structure lessons table in schema
  - [ ] Operations
    - [ ] Addition
    - [ ] Subtraction
    - [ ] Multiplication
    - [ ] Division
  
## Lesson Structure

### Year Three
- [ ] Number
  - [ ] Number and place value
    * count from 0 in multiples of 4, 8, 50 and 100; find 10 or 100 more or less than a given number
    * recognise the place value of each digit in a three-digit number (hundreds, tens, ones)
    * compare and order numbers up to 1000
    * identify, represent and estimate numbers using different representations
    * read and write numbers up to 1000 in numerals and in words
    * solve number problems and practical problems involving these ideas

  - [ ] Addition and subtraction
    * add and subtract numbers mentally, including:
    * a three-digit number and ones
    * a three-digit number and tens
    * a three-digit number and hundreds
    * add and subtract numbers with up to three digits, using formal written methods of columnar addition and subtraction
    * estimate the answer to a calculation and use inverse operations to check answers
    * solve problems, including missing number problems, using number facts, place value, and more complex addition and subtraction.

  - [ ] Multiplication and division
    * recall and use multiplication and division facts for the 3, 4 and 8 multiplication tables
    * write and calculate mathematical statements for multiplication and division using the multiplication tables that they know, including for two-digit numbers times one-digit numbers, using mental and progressing to formal written methods
    * solve problems, including missing number problems, involving multiplication and division, including positive integer scaling problems and correspondence problems in which n objects are connected to m objects.

  - [ ] Fractions
    count up and down in tenths; recognise that tenths arise from dividing an object into 10 equal parts and in dividing one-digit numbers or quantities by 10
    * recognise, find and write fractions of a discrete set of objects: unit fractions and non-unit fractions with small denominators
    * recognise and use fractions as numbers: unit fractions and non-unit fractions with small denominators
    * recognise and show, using diagrams, equivalent fractions with small denominators
    * add and subtract fractions with the same denominator within one whole [For example, $`\frac{5}{7} + \frac{1}{7} = \frac{6}{7}`$ ]
    * compare and order unit fractions, and fractions with the same denominators
    * solve problems that involve all of the above

- [ ] Measurement
  * measure, compare, add and subtract: lengths (m/cm/mm); mass (kg/g); volume/capacity (l/ml)
  * measure the perimeter of simple 2-D shapes
  * add and subtract amounts of money to give change, using both £ and p in practical contexts
  * tell and write the time from an analogue clock, including using Roman numerals from I to XII, and 12-hour and 24-hour clocks
  * estimate and read time with increasing accuracy to the nearest minute; record and compare time in terms of seconds, minutes and hours; use vocabulary such aso’clock, a.m./p.m., morning, afternoon, noon and midnight
  * know the number of seconds in a minute and the number of days in each month, year and leap year
  * compare durations of events [for example to calculate the time taken by particular events or tasks]. 

- [ ] Geometry
  - [ ] Properties of shapes
    * draw 2-D shapes and make 3-D shapes using modelling materials; recognise 3-D shapes in different orientations and describe them
    * recognise angles as a property of shape or a description of a turn
    * identify right angles, recognise that two right angles make a half-turn, three make three quarters of a turn and four a complete turn; identify whether angles are greater than or less than a right angle
    * identify horizontal and vertical lines and pairs of perpendicular and parallel lines

- [ ] Statistics
  * interpret and present data using bar charts, pictograms and tables
  * solve one-step and two-step questions [for example, ‘How many more?’ and ‘How many fewer?’] using information presented in scaled bar charts and pictograms and tables.
---

- [ ] Year Four
- [ ] Year Five
- [ ] Year Six
# Introduction

This is my dissertation project for the final year of my Software Engineering (BSc) degree at the [University of Portsmouth](https://www.port.ac.uk/). This is currently a WIP, *much like the documentation*, and will be updated over time to hopefully become more comprehensive when `version 1.0.0` is released.

# Aim

The aim of this project is to increase the maths skills of children in [Key Stage 2](https://en.wikipedia.org/wiki/Key_Stage_2) (Years 3, 4, 5 & 6). By doing this we may be able to raise the rate of attainment for KS2 students closer in line with the governments plan of [reaching 90% attainment by 2030](https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-2-attainment/2022-23#dataBlock-1f7b731e-71a5-47b9-a7db-a346f44cb51e-charts).

# Technologies used

### Frontend (Client)
 * [`React`](https://react.dev) - For its modularity and ability to re-use components when the app inevitably grows in size
 * [`Tailwind`](https://developer.mozilla.org/en-US/docs/Web/CSS#:~:text=Cascading%20Style%20Sheets%20(CSS)%20is,speech%2C%20or%20on%20other%20media.) - Experimental, may be used in future
 * [`Vite`](https://vite.dev/) - Frontend build tool that complements the [*express.js*](#backend-server-api) backend framework

### Backend (Server/ API)
 * [`Express.js`](https://expressjs.com/) - For its simplicity and flexibility while also being lightweight
 
### Database

This will store client (student/ ~teacher) data as well as the educational content used in the maths lessons.

 * [`PostgreSQL`](https://www.postgresql.org/docs/) - High performance and robust, as well as scalable
___

# Installation and Operation

1. Clone this repo on your local machine
2. Run the command `npm i` to install the necessary functionality
3. Run the pre-made command `npm run installAll` to setup both the front and backend
4. Run the command `npm run dev` to initialise both the front and backend servers
5. Open your browser at `http://localhost:5173` and enjoy! (A hyperlink can be found in the terminal upon launch)
