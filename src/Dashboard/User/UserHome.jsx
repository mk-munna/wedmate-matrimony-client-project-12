import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContextProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Lottie from 'lottie-react';
import loadingLottie from '../../../public/loadingLottie.json';

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const [gender, setGender] = useState('Male')
    const axiosSecure = useAxiosSecure();
    const query = user?.email;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const fetchBiodata = async () => {
        const response = await axiosSecure.get(`/user-home/biodata?email=${query}`);
        return response.data;
    };

    const { data: biodata, isLoading: isLoadingBiodata, error: biodataError } = useQuery({
        queryKey: ['biodata', query],
        queryFn: fetchBiodata,
        enabled: !!query,
    });

    const fetchRelatedBiodata = async ({ queryKey }) => {
        const [_key, gender, excludeId] = queryKey;
        const response = await axiosSecure.get(`/related-biodatas?limit=6&gender=${gender}&excludeid=${excludeId}`);
        return response.data;
    };
    console.log(biodata)
    useEffect(() => {
        if (biodata) {
            if (biodata.bioData_type === "Male") {
                setGender('Female');
            } else {
                setGender('Male');
            }
        }
    }, [biodata])
    const excludeId = biodata?.bioData_id || '';

    const { data: relatedProfiles, isLoading: isLoadingRelated, error: relatedError } = useQuery({
        queryKey: ['relatedBiodatas', gender, excludeId],
        queryFn: fetchRelatedBiodata,
        enabled: !!biodata,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoadingBiodata || isLoadingRelated) {
        return (
            <div>
                <Lottie style={{ width: 550, marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie}></Lottie>
            </div>
        );
    }
    if (biodataError) {
        return <div>{biodataError.message}</div>;
    }

    if (relatedError) {
        return <div>{relatedError.message}</div>;
    }

    return (
        <div className="lg:pt-16 pt-12 px-0 md:px-6 lg:pl-12">
            <h2 className="text-3xl dark:text-heading2">
                <span>Hi, Welcome </span>
                {user?.displayName ? user.displayName + " !" : 'Back !'}
            </h2>
            <p className="text-xl mt-8 dark:text-Description2 mb-4">New Profiles Matches</p>
            <div className="grid w-full grid-cols-1">
                <Slider {...settings}>
                    {relatedProfiles?.map(profile => (
                        <div key={profile.bioData_id} className='relative rounded-xl'>
                            <Link to={`/details/${profile._id}`} className="block">
                                <div className='relative'>
                                    <img className='h-[250px] rounded-2xl w-[150px] md:w-[180px] object-cover' src={profile.profile_image} alt={`Profile Photo of ${profile.name}`} />
                                    <div className='absolute inset-0 h-[250px] rounded-2xl w-[150px] md:w-[180px]  bg-gradient-to-b from-transparent to-black opacity-70 '></div> {/* This div creates the black shadow */}
                                    <span className='absolute text-white text-[12px] left-[15px] top-3 z-10'><span>{profile.age}</span> Years Old </span>
                                </div>
                                <div className='absolute top-[200px] left-10 text-white z-10'>
                                    <p className="text-center text-sm">{profile.name}</p>
                                    <p className="text-xs text-gray-200 text-center">City : <span>{profile.permanent_division}</span></p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default UserHome;
