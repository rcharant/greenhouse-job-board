import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import '@picocss/pico'
import './App.css'

function JobListing() {
  const [jobListing, setJobListing] = useState(0)

  useEffect(() => {
    const queryParams = new URLSearchParams(document.location.search);
    const jobId = queryParams.get('id');
    fetch("https://boards-api.greenhouse.io/v1/boards/celigo/jobs/" + jobId)
      .then((response) => response.json())
      .then((data) => {
        setJobListing(data);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("Job Listing fetched successfully"))
  }, []);

  return (
    <>
      <div>
        <h1>Job Listings for Celigo</h1>
        
        <div className="jobs-container">
          {
              <article>
                <h2>{jobListing.title}</h2>
                {/* <h4>{jobListing.departments[0].name}</h4> */}
                {/* <h6>{ jobListing.location.name }</h6> */}
                
                <div dangerouslySetInnerHTML={{__html: htmlDecode(jobListing.content)}}></div>
              </article>
          }
        </div>
      </div>
    </>
  )
}

function htmlDecode(rawHTML){
    var e = document.createElement('div');
    e.innerHTML = rawHTML;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

ReactDOM.createRoot(document.getElementById('job-listing')).render(
    <React.StrictMode>
      <JobListing />
    </React.StrictMode>,
  )

export default JobListing
