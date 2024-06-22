
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ScrollToTop from "react-scroll-to-top";

const Root = () => {
    return (
        <div className='font-primary bg-[#f6f8f6] dark:bg-dark'>
            <div className='lg:max-w-full'>
                <Header></Header>
                <Outlet></Outlet>
            </div>
            <ScrollToTop
                className='!bg-primary !bottom-[25%] flex items-center justify-center md:!p-[14px] !p-2  !size-[30px] md:!size-[45px] !rounded-full'
                smooth 
                top={500}
                color={"white"}
            />
            <Footer></Footer>
        </div>
    );
};

export default Root;