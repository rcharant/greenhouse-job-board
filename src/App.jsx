import { useState, useEffect } from 'react'
import '@picocss/pico'
import './App.css'

function App() {
  const [jobs, setJobs] = useState([])
  const [departments, setDepartments] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetch("https://boards-api.greenhouse.io/v1/boards/celigo/jobs?content=true")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs);
        const departmentNames = [...new Set(data.jobs.map((job) => job.departments[0].name))];
        setDepartments(departmentNames);
        const locationNames = [...new Set(data.jobs.map((job) => job.location.name))];
        setLocations(locationNames);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("Jobs fetched successfully"))
  }, []);

  return (
    <>
      <div>
        <h1>Job Listings for Celigo</h1>
        <section id="form">
          <form>

            <fieldset className="filters grid" style={{"grid-template-columns": "2fr 1fr 1fr"}}>
              <div className="search-filter">
                <label for="search">Search</label>
                <input type="search" id="search" name="search" placeholder="Search" />
              </div>

              <div className="department-filter">
                <label for="departments">Select</label>
                <select id="departments" name="departments">
                  <option value="0" selected>Select…</option>
                  {
                    departments.map((department) =>
                      <option value={department}>{department}</option>
                    )
                  }
                </select>
              </div>

              <div className="location-filter">
                <label for="locations">Select</label>
                <select id="locations" name="locations">
                  <option value="0" selected>Select…</option>
                  {
                    locations.map((location) =>
                      <option value={location}>{location}</option>
                    )
                  }
                </select>
              </div>
            </fieldset>
          </form>
        </section>
        <div className="jobs-container grid">
          {
            jobs.map((job) => 
              <article>
                <h2>{job.title}</h2>
                <h4>{job.departments[0].name}</h4>
                <h6>{job.location.name}</h6>
              </article>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
