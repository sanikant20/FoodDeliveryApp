import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            if (response.ok) {
                const responseData = await response.json();
                setFoodItems(responseData[0] || []);
                setFoodCategory(responseData[1] || []);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain", important: "true" }}>

                    <div className="carousel-inner">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" alt='Burge'></img>
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100" alt='Pastry'></img>
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700?barbeque" className="d-block w-100" alt='Barbeque'></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {foodCategory.length !== [] ? (
                    foodCategory.map((data) => (
                        <div key={data._id} className='row mb-3'>
                            <div className='fs-3 m-3'>{data.CategoryName}</div>
                            <hr />
                            {foodItems.filter((item) => item.CategoryName === data.CategoryName).length !== [] ? (
                                foodItems
                                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                                    .map(filterItems => (
                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                            <Card
                                                // foodName={filterItems.name}
                                                //     imgSrc={filterItems.img}
                                                //     desc={filterItems.description}
                                                foodItem={filterItems}

                                                options={filterItems.options[0]}

                                            >
                                            </Card>
                                        </div>
                                    ))
                            ) : (
                                <div>No items available.</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No categories available.</div>
                )}
            </div>

            <Footer />
        </div>
    );
}

{/* <div className='container'>
                {foodCategory !== []
                    ?
                    foodCategory.map((data) => {
                        return (<div>
                            <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodItems !== []
                                ?
                                foodItems.filter((item) => item.CategoryName === data.CategoryName)
                                    .map(filterItems => {
                                        return (
                                            <div key={filterItems._id}>
                                                <card></card>
                                            </div>
                                        )
                                    })
                                : <div>No items available.</div>
                            }
                        </div>
                        )
                    })
                    : <div>No categories available.</div>}
            </div> */}