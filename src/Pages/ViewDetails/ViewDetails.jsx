import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FcBriefcase, FcButtingIn, FcDepartment, FcManager, FcNext, FcOk, FcPieChart, FcTodoList } from 'react-icons/fc';
import { CiMobile3 } from 'react-icons/ci';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';
import SkeletonLoader from '../../Loader/SkeletonForViewDetails';
import SkeletonLoaderForViewDetails from '../../Loader/SkeletonForViewDetails';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthContextProvider';
import toast from 'react-hot-toast';

const NextArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow custom-next cursor-pointer  " onClick={onClick}>
            <i className="fas bg-primary p-2 absolute z-[1] text-white right-0 lg:-right-10 bottom-[30%] rounded-md fa-chevron-right"></i>
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow custom-prev  cursor-pointer  " onClick={onClick}>
            <i className="fas bg-primary p-2 z-[1] text-white absolute lg:-left-10 bottom-[30%] rounded-md fa-chevron-left"></i>
        </div>
    );
};



const ViewDetails = () => {


    const { user } = useContext(AuthContext);
    console.log(user);
    const { id } = useParams();
    const [imgError, setImgError] = useState(false);

    const axiosSecure = useAxiosSecure();

    const fetchBiodataDetails = async ({ queryKey }) => {
        const [_key, id] = queryKey;
        const response = await axiosSecure.get(`/biodata/${id}`);
        return response.data;
    };

    const fetchUserDataByEmail = async () => {
        const response = await axiosSecure.get(`/single-user/${user.email}`);
        return response.data;
    };

    const { data: userInfo, isLoading: isLoadingUser, error: userError } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: fetchUserDataByEmail,
        enabled: !!user.email,
    });
    console.log(userInfo);
    const fetchRelatedBiodata = async ({ queryKey }) => {
        const [_key, gender, excludeId] = queryKey;
        const response = await axiosSecure.get(`/related-biodatas?limit=6&gender=${gender}&excludeid=${excludeId}`);
        return response.data;
    };
    const addToFavorites = async (bioDataId) => {
        const response = await axiosSecure.post('/favorites', {
            email: user.email,
            bioDataId
        });
        if (response.data.modifiedCount === 1) {
            toast.success("Added to Favorites");
        }
        if (response.data.modifiedCount === 0) {
            toast.error("Already Added to Favorites");
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['biodata', id],
        queryFn: fetchBiodataDetails,
        enabled: !!id,
    });

    const gender = data?.bioData_type || '';
    const excludeId = data?.bioData_id || '';
    console.log(excludeId)
    const { data: relatedProfiles, isLoading: isLoadingRelated, error: relatedError } = useQuery({
        queryKey: ['relatedBiodatas', gender, excludeId],
        queryFn: fetchRelatedBiodata,
        enabled: !!gender, excludeId,
    });

    if (isLoading) return (
        <SkeletonLoaderForViewDetails></SkeletonLoaderForViewDetails>
    );
    if (error) return <div className='h-[40vh] relative'><p className='absolute top-1/2 left-[20%]  md:left-[35%] lg:top-[40%] lg:left-[40%]'>Error Loading Biodata Details</p></div>;
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
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

    console.log(isLoadingUser);
    const handleAddToFavorites = (bioDataId) => {
        console.log("clicked")
        addToFavorites(bioDataId);
    };
    return (
        <div className="md:mt-[80px] mt-6 px-6 md:px-16">
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className=' mx-auto md:w-[580px] flex-grow'>
                    <div className="image-container">
                        <img
                            className={imgError ? 'error md:w-[580px] md:h-[580px] object-cover' : 'md:w-[580px] md:h-[580px] w-[100vw] h-[100vw] object-cover'}
                            src={data.profile_image}
                            onError={() => setImgError(true)}
                            alt={``}
                        />
                        {imgError && <span className="fallback-text">Profile Image of {data.name} </span>}
                    </div>
                    <div className='flex'>
                        <button className='h-[40px] md:h-[70px] w-full !text-[14px]  md:!text-[20px] dynamic-button bg-primary  text-white hover:text-primary px-4 duration-700 md:py-3'><span className='absolute top-[10px] md:top-[20px] left-[35px] md:left-[80px] font-secondary'>Send Request</span></button>
                        <button onClick={() => handleAddToFavorites(data.bioData_id)} className='h-[40px] md:h-[70px] w-full !text-[14px]  md:!text-[20px] dynamic-button bg-secondary  text-black hover:text-primary px-4 duration-700 py-3'><span className='absolute top-[10px] md:top-[20px] left-[35px] md:left-[80px] font-secondary' >Add Favourite</span></button>
                    </div>
                </div>
                <div className="p-6  lg:mt-0 lg:w-1/2">
                    <h2 className="text-4xl mb-4 font-bold font-secondary text-heading dark:text-heading2">{data.name}</h2>
                    <div className='flex gap-6'>
                        <h3 className=" font-semibold px-6 text-yellow-700 bg-secondary rounded-sm">{data.bioData_type}</h3>
                        <p className='dark:text-heading2'>Biodata Id : <span className='bg-secondary px-1 rounded-md text-black'>{data.bioData_id}</span></p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-heading dark:text-heading2'>
                        <div className='flex flex-col  py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <FcDepartment className='text-4xl' />
                            <span className='font-light mt-2'>City: </span>
                            <span className='text-lg font-semibold font-secondary'>{data.permanent_division}</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcPieChart className='text-4xl' />
                            <span className='font-light mt-2'>Age: </span>
                            <span className='text-lg font-semibold font-secondary'>{data.age}</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcButtingIn className='text-4xl' />
                            <span className='font-light mt-2'>Height: </span>
                            <span className='text-lg font-semibold font-secondary'>{(parseInt(data.height) / 30.48).toFixed(2)} ft</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcBriefcase className='text-4xl' />
                            <span className='font-light mt-2'>Job: </span>
                            <span className='text-lg font-semibold font-secondary'>{data.occupation}</span>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl dark:text-heading2 mt-6'>About</p>
                        <p className='mt-4 text-[16px] font-secondary !leading-[26px] text-Description dark:text-Description2 '>{data.about}</p>
                    </div>
                    {
                        isLoadingUser ? "" : (
                            <div className='mt-12 flex gap-8 dark:text-heading2'>
                                <div>
                                    <h2 className='text-2xl font-semibold'>Contact Info</h2>

                                    <div>
                                        <div className='flex items-center gap-3  mt-6'>
                                            <p className='p-2 border rounded-md'><CiMobile3 /></p>
                                            <p>Phone :
                                                {
                                                    userInfo.tire ? userInfo?.tire === "premium" && (
                                                        <span className='font-light dark:text-Description2'> {data.mobile_number}</span>
                                                    ) : (
                                                        <span className='font-light dark:text-Description2'> *********</span>
                                                    ) 
                                                }
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-3'>
                                            <p className='p-2 border opacity-70 rounded-md'><MdOutlineMarkEmailRead /></p>
                                            <p>Email :
                                                {
                                                    userInfo.tire ? userInfo.tire === "premium" && (
                                                        <span className='font-light dark:text-Description2'> {data.contact_email}</span>
                                                    ) : (
                                                        <span className='font-light dark:text-Description2'> *********</span>
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    {
                                        userInfo.tire ? userInfo.tire === "premium" && "" : (
                                            <div className="">
                                                <div className=" h-20 md:h-14 dark:text-gray-600 text-sm p-3 rounded-lg max-w-xs chat-bubble">
                                                    Want to view Contact Info?
                                                </div>
                                                <div className='flex justify-end mt-6'>
                                                    <Link to={`/dashboard/checkout/:${data.bioData_id}`} className='h-[36px] w-[100px] -mr-2 md:-mr-12 !text-[12px] dynamic-button bg-secondary  text-yellow-600 px-4 duration-700 py-3'><span className='absolute z-10 top-[9px] left-[14px] font-secondary'>Request Info</span></Link>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='mt-12 flex flex-col lg:flex-row gap-14 lg:gap-32 dark:text-heading2'>
                <div>
                    <h2 className='text-2xl font-semibold flex items-center gap-4'><FcManager className='text-4xl' />Personal Information</h2>
                    <div className='flex flex-col md:flex-row  md:gap-32 mt-6'>
                        <div>
                            <div className='flex items-center gap-3  mt-3'>
                                <p className='text-primary'><IoIosArrowForward /></p>
                                <p>Name : <span className='font-light dark:text-Description2'>{data.name}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Fathers Name : <span className='font-light dark:text-Description2'>{data.fathers_name}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Mothers Name : <span className='font-light dark:text-Description2'>{data.mothers_name}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Age : <span className='font-light dark:text-Description2'>{data.age}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Gender : <span className='font-light dark:text-Description2'>{data.bioData_type}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Date Of Birth : <span className='font-light dark:text-Description2'>{data.date_of_birth}</span></p>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Height : <span className='font-light dark:text-Description2'>{data.height}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Weight : <span className='font-light dark:text-Description2'>{data.weight}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Race : <span className='font-light dark:text-Description2'>{data.race}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Occupation : <span className='font-light dark:text-Description2'>{data.occupation}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Present Division : <span className='font-light dark:text-Description2'>{data.present_division}</span></p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className=' opacity-70 text-primary '><IoIosArrowForward /></p>
                                <p>Permanent Division : <span className='font-light dark:text-Description2'>{data.permanent_division}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold flex items-center gap-4 lg:mt-4 '><FcTodoList className='text-4xl' />Expecting</h2>
                    <div className='mt-8'>
                        <div>
                            <div className='flex items-center gap-3 border p-3 rounded-md mt-3'>
                                <p className='text-primary'><FcOk /></p>
                                <p>Expected Partner Age : <span className='font-light dark:text-Description2'> {data.expected_partner_age}</span></p>
                            </div>
                            <div className='flex items-center gap-3 border p-3 rounded-md mt-3'>
                                <p className='text-primary'><FcOk /></p>
                                <p>Expected Partner Height : <span className='font-light dark:text-Description2'> {data.expected_partner_height}</span></p>
                            </div>
                            <div className='flex items-center gap-3 border p-3 rounded-md mt-3'>
                                <p className='text-primary'><FcOk /></p>
                                <p>Expected Partner Weight : <span className='font-light dark:text-Description2'> {data.expected_partner_weight}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-24'>
                <h2 className='text-3xl font-semibold capitalize text-heading dark:text-heading2'>Related Profiles</h2>
                <div className='mt-12'>
                    <Slider {...settings}>
                        {
                            relatedProfiles?.map(profile => {
                                return (
                                    <div key={profile.bioData_id} className='relative '>
                                        <Link to={`/details/${profile._id}`}>
                                            <div className='h-[290px]'>
                                                <span className='absolute text-white text-[12px] left-[15px] top-3'><span>{profile.age}</span> Years Old </span>
                                                <img className='h-[250px] w-[150px] md:w-[180px] object-cover' src={profile.profile_image} alt={`Profile Photo of ${profile.name}`} />
                                            </div>
                                            <div className='bg-secondary text-[12px] md:text-[14px] shadow-xl z-10 left-[10px] rounded-t-md bottom-0 absolute p-3 md:w-[160px] w-[130px]'>
                                                <p className=''>{profile.name}</p>
                                                <p className=''>City : <span className=''>{profile.permanent_division}</span></p>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
