import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email, password: credentials.password
      })
    });
    const json = await response.json()
    // console.log(json)

    if (!json.success) {
      alert("Enter valid credentials...")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (
    <>
      <section className="vh-100" style={{ "background-color": "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "border-radius": "1rem" }}>
                <div className="card-body p-5 text-center">

                  <h3 className="mb-5">Sign in</h3>
                  <form onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                      <input type="email" id="typeEmailX-2" className="form-control form-control-lg" placeholder='example@gmail.com'
                        name='email' value={credentials.email} onChange={onChange} />

                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                      <input type="password" id="typePasswordX-2" className="form-control form-control-lg" placeholder='example@190'
                        name='password' value={credentials.password} onChange={onChange} />

                    </div>

                    <button className="btn btn-success btn-lg btn-block" style={{ "margin": "5px", "padding": "5px" }} type="submit">Login</button>
                    <Link to="/signup" className="btn btn-danger btn-lg btn-block" style={{ "margin": "5px", "padding": "5px" }}>Register</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
