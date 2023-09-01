import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
       await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            // console.log('responsee',response)
           setOrderData(response?.order_data?.order_data)
        })
    }


    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.length > 0 ? (
                        orderData.map((data, dataIndex) => (
                            <div key={dataIndex} className='col-12 col-md-6 col-lg-3'>
                                {/* {
                                    console.log("dataaa",data)
                                }
                                 */}
                                {data ? (
                                    data.map((item, itemIndex) => {
                                        // {
                                        //     console.log("dataaa2",item)
                                        // }
                                        return(
                                        <div key={itemIndex} className='card mt-3' style={{ width: "16rem", maxHeight: "360px" }}>
                                            {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <span className='m-1'>{item.Order_date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )})
                                ) : (
                                    <p>No order data available.</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No order data available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
