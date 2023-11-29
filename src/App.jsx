import { useState, useEffect } from 'react'
import '@picocss/pico'
import './App.css'

function App() {
  const [data, setData] = useState({
    jobs: [],
    departments: [],
    locations: []
  })

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredJobs = data.jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedDepartment === "" || job.departments[0].name === selectedDepartment) &&
      (selectedLocation === "" || job.location.name === selectedLocation)
    )
  })

  useEffect(() => {
    fetch("https://boards-api.greenhouse.io/v1/boards/celigo/jobs?content=true")
      .then((response) => response.json())
      .then((data) => {
        const departmentNames = [...new Set(data.jobs.map((job) => job.departments[0].name))];
        const locationNames = [...new Set(data.jobs.map((job) => job.location.name))];

        setData({
          jobs: data.jobs,
          departments: departmentNames,
          locations: locationNames
        })
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
            <Filters departments={data.departments} locations={data.locations}/>
          </form>
        </section>
        <JobListings jobs={data.jobs}/>
      </div>
    </>
  )
}

function JobListings({ jobs }) {
  return (
    <div className="jobs-container grid">
      {
        jobs.map((job) => 
        <a key={job.id} className="job-listing" target="_blank" rel="noreferrer" href={'/listing?id=' + job.id}>
          <article>
            <h2>{job.title}</h2>
            <h4>{job.departments[0].name}</h4>
            <h6>{job.location.name}</h6>
          </article>
        </a>
        )
      }
    </div>
  )
}

function Filters({departments, locations}) {
  return (
    <fieldset className="filters grid" style={{"gridTemplateColumns": "2fr 1fr 1fr"}}>
      <div className="search-filter">
        <label htmlFor="search">Search</label>
        <input type="search" id="search" name="search" placeholder="Search" />
      </div>

      <div className="department-filter">
        <label htmlFor="departments">Select</label>
        <select id="departments" name="departments" defaultValue="0">
          <option value="0">Select…</option>
          {
            departments.map((department) =>
              <option key={department} value={department}>{department}</option>
            )
          }
        </select>
      </div>

      <div className="location-filter">
        <label htmlFor="locations">Select</label>
        <select id="locations" name="locations" defaultValue="0">
          <option value="0">Select…</option>
          {
            locations.map((location) =>
              <option key={location} value={location}>{location}</option>
            )
          }
        </select>
      </div>
    </fieldset>
  )
}

export default App
