## Introduction

This is my dissertation project for the final year of my Software Engineering (BSc) degree at the [University of Portsmouth](https://www.port.ac.uk/).

## Project Overview

### KS2 Maths Learning Platform
The aim of this project is to increase the maths skills of children in [Key Stage 2](https://en.wikipedia.org/wiki/Key_Stage_2) (UK Years 3-6). By doing this we may be able to raise the rate of attainment for KS2 students closer in line with the governments plan of [reaching 90% attainment by 2030](https://explore-education-statistics.service.gov.uk/find-statistics/key-stage-2-attainment/2022-23#dataBlock-1f7b731e-71a5-47b9-a7db-a346f44cb51e-charts).

Because I intend to work on this outside of my studies, the version handed in is found in the 'Dissertation' branch. See it using `git checkout Dissertation` in the terminal.

## Technologies used

### Frontend (Client):
 - **React**
 - **Tailwind CSS**
 - **Vite**

### Backend (Server/ API):
 - **Node.JS**
 - **Express.JS**
 
### Database:
 - **PostgreSQL**
 - **Supabase:** Solely for external schema hosting, all API endpoints are self-made

### Authentication:
 - JWT-based authentication
___

## Installation and Operation
(This assumes you hold valid environment variables)
1. Clone this repo on your local machine
2. Install dependencies using the pre-made script: `npm run setup`
3. Run the program using `npm run dev`
4. Open your browser at `http://localhost:5173`. (A hyperlink can be found in the terminal upon launch)

## Features
 - National Curriculum aligned learning material
 - Dynamic question generation
 - Per user progress tracking
 - JWT authentication
 - numerous question types (number, fraction, algebra)
 - Equation formatting in line with national standards (Column addition, subtraction etc.)

## Author

Developed as part of the authors Engineering Dissertation Project for UoP.
