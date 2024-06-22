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
import { AuthContext } from '../../Provider/AuthContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const fetchBiodataDetails = async ({ queryKey }) => {
    const [_key, query] = queryKey;
    const axiosPublic = useAxiosPublic()
    const response = await axiosPublic.get(`/user/biodata?email=${query}`);
    return response.data;
};

const fetchRelatedBiodata = async ({ queryKey }) => {
    const [_key, gender, excludeId] = queryKey;
    const response = await axiosPublic.get(`/related-biodatas?limit=6&gender=${gender}&excludeid=${excludeId}`);
    return response.data;
};

const ViewBioData = () => {
    const { user } = useContext(AuthContext);
    const [imgError, setImgError] = useState(false);
    const axiosSecure = useAxiosSecure();
    const query = user?.email
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['biodata', query],
        queryFn: fetchBiodataDetails,
        enabled: !!query,
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
    console.log(data)
    
    const handleRequestPremium = async (user) => {
        Swal.fire({
            title: "Want to request premium?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#1CA774",
            showCancelButton: true,
            confirmButtonColor: "#1CA774",
            cancelButtonColor: "#FECACA",
            confirmButtonText: "Yes! Send Request",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.post('/premium-request', { email: user?.email });
                    console.log(res.data)
                    
                    if (res.data.success) {
                        toast.success("Premium request sent successfully");
                    } else {
                        toast(res.data.message || "Failed to send premium request");
                    }
                } catch (error) {
                    console.log(error)
                    toast.error("An error occurred while sending the request");
                }
            }
        });
    };

    return (
        <div className="lg:mt-[80px] mt-6 md:px-6 ">
            <div className="flex flex-col gap-8 lg:flex-row">
                <div className=' mx-auto  md:w-[650px]  lg:w-[400px] flex-grow'>
                    <div className="image-container">
                        <img
                            className={imgError ? 'error lg:size-[400px] md:size-[650px] object-cover' : 'lg:w-[400px] md:h-[400px] size-full object-cover'}
                            src={data?.profile_image}
                            onError={() => setImgError(true)}
                            alt={``}
                        />
                        {imgError && <span className="fallback-text">Profile Image of {data.name} </span>}
                    </div>
                    <div className='flex ml-[2px]'>
                        <button onClick={() => { handleRequestPremium(user) }} className='h-[40px] md:h-[50px] w-full !text-[18px]  dynamic-button bg-primary  text-white hover:text-primary px-4 duration-700 md:py-3'><span className='absolute top-[10px] md:top-[12px] left-[25px] md:left-[40px] font-secondary'>Make Premium</span></button>
                        <Link to={'/dashboard/edit-biodata'} className='h-[40px] md:h-[50px] w-full !text-[18px] dynamic-button bg-secondary  text-black hover:text-primary px-4 duration-700 py-3'><span className='absolute top-[10px] md:top-[12px] left-[25px] md:left-[50px] font-secondary'>Edit Biodata</span></Link>
                    </div>
                </div>
                <div className="lg:p-6  lg:mt-0 lg:w-1/2">
                    <h2 className="text-4xl mb-4 font-bold font-secondary text-heading dark:text-heading2">{data.name}</h2>
                    <div className='flex gap-6'>
                        <h3 className=" font-semibold px-6 text-yellow-700 bg-secondary rounded-sm">{data.bioData_type}</h3>
                        <p className='dark:text-heading2'>Biodata Id : <span className='bg-secondary px-1 rounded-md text-black'>{data.bioData_id}</span></p>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-heading dark:text-heading2'>
                        <div className='flex flex-col  py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <FcDepartment className='text-2xl' />
                            <span className='font-light text-xs mt-2'>City: </span>
                            <span className=' font-semibold text-sm  font-secondary'>{data.permanent_division}</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcPieChart className='text-2xl' />
                            <span className='font-light text-xs  mt-2'>Age: </span>
                            <span className='font-semibold text-sm  font-secondary'>{data.age}</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcButtingIn className='text-2xl' />
                            <span className='font-light text-xs  mt-2'>Height: </span>
                            <span className=' font-semibold text-sm font-secondary'>{(parseInt(data.height) / 30.48).toFixed(2)} ft</span>
                        </div>
                        <div className='flex flex-col items-center py-2 px-10 border border-gray-300 rounded-md'>
                            <FcBriefcase className='text-2xl' />
                            <span className='font-light  text-xs lg:text-xs  mt-2'>Job: </span>
                            <span className=' font-semibold text-sm font-secondary'>{data.occupation}</span>
                        </div>
                    </div>
                    <div>
                        <p className='text-2xl dark:text-heading2 mt-6'>About</p>
                        <p className='mt-4 text-[16px] font-secondary !leading-[26px] text-Description dark:text-Description2 '>{data.about}</p>
                    </div>
                    <div className='mt-8 flex gap-8 dark:text-heading2'>
                        <div>
                            <h2 className='text-2xl font-semibold'>Contact Info</h2>
                            <div className='flex items-center gap-3  mt-6'>
                                <p className='p-2 border rounded-md'><CiMobile3 /></p>
                                <p>Phone :

                                    <span className='font-light dark:text-Description2'> {data.mobile_number}</span>

                                </p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <p className='p-2 border opacity-70 rounded-md'><MdOutlineMarkEmailRead /></p>
                                <p>Email :

                                    <span className='font-light dark:text-Description2'> {data.contact_email}</span>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6 flex flex-col gap-14  dark:text-heading2'>
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
        </div>
    );
};

export default ViewBioData;
