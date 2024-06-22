import React, { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import CustomSelect from '../../Components/CustomSelect';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../Loader/SkeletonLoader';
import { AuthContext } from '../../Provider/AuthContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';


const Biodatas = () => {

    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [ageRange, setAgeRange] = useState([18, 60]);
    const [bioDataType, setBioDataType] = useState('');
    const [division, setDivision] = useState('');
    // console.log(user?.email)
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const fetchBiodatas = async ({ pageParam = 0, filters }) => {
        const { ageRange, bioDataType, division } = filters;
        const { data } = await axiosPublic.get(`/biodatas`, {
            params: {
                limit: 9,
                offset: pageParam,
                ageMin: ageRange[0],
                ageMax: ageRange[1],
                bioDataType,
                division,
            }
        });
        return { ...data, prevOffset: pageParam };
    };
    const addToFavorites = async (bioDataId) => {
        const response = await axiosSecure.post('/favorites', {
            email: user?.email,
            bioDataId
        });
        if (response.data.modifiedCount === 1) {
            toast.success("Added to Favorites");
        }
        if (response.data.modifiedCount === 0) {
            toast.error("Already Added to Favorites");
        }
    };
    const handleAddToFavorites = (bioDataId) => {
        console.log("clicked")
        addToFavorites(bioDataId);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['biodatas', { ageRange, bioDataType, division }],
        queryFn: ({ pageParam }) => fetchBiodatas({ pageParam, filters: { ageRange, bioDataType, division } }),
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 9 >= lastPage.totalCount) {
                return undefined;
            }
            return lastPage.prevOffset + 9;
        }
    });

    const observer = useRef();
    const lastBiodataRef = useCallback(node => {
        if (isLoading || isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                setLoading(true)
                fetchNextPage();
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, loading, isFetchingNextPage, fetchNextPage, hasNextPage]);

    const bioDataTypeOptions = [
        { value: '', label: 'All' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    const divisionOptions = [
        { value: '', label: 'All' },
        { value: 'Dhaka', label: 'Dhaka' },
        { value: 'Chattagram', label: 'Chattagram' },
        { value: 'Rangpur', label: 'Rangpur' },
        { value: 'Barisal', label: 'Barisal' },
        { value: 'Khulna', label: 'Khulna' },
        { value: 'Maymansign', label: 'Maymansign' },
        { value: 'Sylhet', label: 'Sylhet' },
    ];

    useEffect(() => {
        if (isFetchingNextPage) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [isFetchingNextPage])

    if (isLoading) return (
        <div className="flex flex-col lg:flex-row mt-24 px-16">
            <div className="lg:w-1/4 p-4">
                <h2 className="text-2xl text-heading dark:text-heading2 font-bold mb-4">Filter Options</h2>
                <div className="mb-4">
                    <label className="block text-heading dark:text-heading2 font-semibold">Age Range</label>
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={ageRange[0]}
                        onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                        className="range-input"
                    />
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={ageRange[1]}
                        onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                        className="range-input"
                    />
                    <div className='text-heading dark:text-heading2'>{`${ageRange[0]} - ${ageRange[1]}`}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-heading dark:text-heading2 font-semibold mb-2">Biodata Type</label>
                    <CustomSelect
                        options={bioDataTypeOptions}
                        value={bioDataType}
                        onChange={(selectedOption) => setBioDataType(selectedOption ? selectedOption.value : '')}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold dark:text-heading2 mb-2">Division</label>
                    <CustomSelect
                        options={divisionOptions}
                        value={division}
                        onChange={(selectedOption) => setDivision(selectedOption ? selectedOption.value : '')}
                    />
                </div>
            </div>

            <div className="lg:w-3/4 p-4">
                <h2 className="text-2xl dark:text-heading2 text-heading font-bold mb-4">All Biodatas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {
                        Array.from({ length: 9 }).map((_, index) => <SkeletonLoader key={index} />)
                    }
                </div>
            </div>
        </div>
    );

    const biodatas = data.pages?.reduce((acc, page) => [...acc, ...page.biodatas], []);
    return (
        <div className="flex flex-col lg:flex-row lg:mt-24 mt-12 px-6 lg:px-16">
            <div className="lg:w-1/4 md:p-4">
                <h2 className="text-xl lg:text-2xl text-heading dark:text-heading2 font-bold mb-4">Filter Options</h2>
                <div className="mb-4">
                    <label className="block text-heading dark:text-heading2 font-semibold">Age Range</label>
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={ageRange[0]}
                        onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                        className="range-input"
                    />
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={ageRange[1]}
                        onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                        className="range-input"
                    />
                    <div className='text-heading dark:text-heading2'>{`${ageRange[0]} - ${ageRange[1]}`}</div>
                </div>

                <div className="mb-4">
                    <label className="block text-heading dark:text-heading2 font-semibold mb-2">Biodata Type</label>
                    <CustomSelect
                        options={bioDataTypeOptions}
                        value={bioDataType}
                        onChange={(selectedOption) => setBioDataType(selectedOption ? selectedOption.value : '')}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-semibold dark:text-heading2 mb-2">Division</label>
                    <CustomSelect
                        options={divisionOptions}
                        value={division}
                        onChange={(selectedOption) => setDivision(selectedOption ? selectedOption.value : '')}
                    />
                </div>
            </div>

            <div className="lg:w-3/4 p-4">
                <h2 className="text-xl lg:text-2xl dark:text-heading2 text-heading font-bold mb-4">All Biodatas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {biodatas.map((biodata, index) => {
                        const isLastElement = biodatas.length === index + 1;
                        return (
                            <div
                                key={biodata.bioData_id}
                                ref={isLastElement ? lastBiodataRef : null}
                                className="p-4 dark:border-primary border rounded-lg"
                            >
                                <img src={biodata.profile_image} alt="Profile" className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-90 duration-500" />
                                <div className='flex justify-between'>
                                    <h3 className="text-lg font-semibold text-primary dark:text-primary2">{biodata.bioData_type}</h3>
                                    <p className='dark:text-heading2'>Age: <span className='bg-secondary px-1 rounded-md text-black'>{biodata.age}</span></p>
                                </div>
                                <div className='space-y-1 dark:text-Description2'>
                                    <p className='dark:text-Description2 text-sm'>Biodata Id: <span className='font-semibold text-primary dark:text-primary2'>{biodata.bioData_id}</span></p>
                                    <p className='text-sm'>Job: <span className=''>{biodata.occupation}</span></p>
                                    <p className='text-sm'>Division: {biodata.permanent_division}</p>
                                </div>
                                <div className='flex gap-4'>
                                    <Link to={`/details/${biodata._id}`} className='h-[25px] mt-2 w-[110px] rounded-md text-sm dynamic-button-premium text-white bg-primary px-6 hover:text-primary hover:dark:text-primary2 py-3'>
                                        <span className='absolute z-10 top-[3px] left-[18px] text-[12px]'>View Details</span>
                                    </Link>
                                    <button onClick={() => handleAddToFavorites(biodata.bioData_id)} className='h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button bg-red-100 text-red-600 px-6 hover:text-primary hover:dark:text-primary2 py-3'>
                                        <span className='absolute z-10 top-[6px] left-[14px] text-[12px]'><FaRegHeart /></span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="">
                    {loading ? (
                        <div className="grid grid-cols-1 mt-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} />)
                            }
                        </div>

                    ) : (
                        !hasNextPage && <div className="text-center mt-12 text-heading dark:text-heading2">No more biodata❗</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
