import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name, location: credentials.geolocation,
                email: credentials.email, password: credentials.password
            })
        });
        const json = await response.json()
        console.log(json)
        navigate("/login")

        if (!json.success) {
            alert("Enter valid credentials...")
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

                                    <h3 className="mb-5" >Register</h3>
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="typeEmailX-2">Name</label>
                                            <input type="text" id="typeEmailX-2" className="form-control form-control-lg" placeholder='John wick'
                                                name='name' value={credentials.name} onChange={onChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="typeEmailX-2">Address</label>
                                            <input type="text" id="typeEmailX-2" className="form-control form-control-lg" placeholder='Kathmandu'
                                                name='geolocation' value={credentials.geolocation} onChange={onChange} />
                                        </div>


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

                                        <button className="btn btn-success btn-lg btn-block" style={{ "margin": "5px", "padding": "5px" }} type="submit">Sign up</button>
                                        <Link to="/login" className="btn btn-danger btn-lg btn-block" style={{ "margin": "5px", "padding": "5px" }}>Already a user</Link>
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
