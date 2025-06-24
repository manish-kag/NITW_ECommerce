import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';  
import { ShopContext } from '../src/context/ShopContext';
import { toast } from 'react-toastify';


const Verify = () => {
    const {navigate,token,setCartItems,backendUrl} = useContext(ShopContext);
    const [serchParam, setSearchParam] = useSearchParams();
    const success = serchParam.get('success');
    const orderId = serchParam.get('orderId');

    const verifypayment = async () => {
        try {   
            if(!token) return;
            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { success, orderId },
                { headers: { Authorization: `Bearer ${token}` } }
              );
            if(response.data.success){
                setCartItems({});
                navigate('/order');
            }
            else{
                navigate('/cart');
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error); 
            toast.error(error.message );
        }
    }

    useEffect(() => {
        verifypayment();
    }, [token, success, orderId]);

    return (
        <div className="p-10 flex justify-center items-center min-h-[40vh]">
            <div className="loader"></div>
        </div>
    )
}

export default Verify;

// Add the loader CSS as in Profile.jsx