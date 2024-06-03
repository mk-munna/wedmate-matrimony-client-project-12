
import { Link } from 'react-router-dom';
import lottie from '../../public/404Lottie.json'
import Lottie from 'lottie-react';
const ErrorPage = () => {
    return (
        <div className='h-screen relative flex flex-col items-center  justify-center text-center'>
            <Lottie className='lg:w-[550px] md:w-[350px] ' style={{ marginLeft: 'auto', marginRight: 'auto' }} animationData={lottie}></Lottie>
            <p className='border border-primary px-4 py-1 -mt-[50px]  md:-mt-[50px] lg:-mt-[90px] text-sm lg:text-base  rounded-sm shadow-xl  absolute uppercase '>The page you are looking for is unavailable!</p>
            <Link to={'/'} className='border bottom-4 border-primary px-4 py-1 rounded-sm shadow-xl hover:bg-primary absolute hover:text-white '>Go back to home</Link>
        </div>
    );
};

export default ErrorPage;
