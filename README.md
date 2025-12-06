### Todo Next
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
3. Run the pre-made command `npm installAll` to setup both the front and backend
4. Run the command `npm run dev` to initialise both the front and backend servers
5. Open your browser at `http://localhost:5173` and enjoy!
