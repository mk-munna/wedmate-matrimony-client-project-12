// BioDatas.js
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaRegHeart } from 'react-icons/fa';
import CustomSelect from '../../Components/CustomSelect';
import { Link } from 'react-router-dom';

const BioDatas = () => {
    const [ageRange, setAgeRange] = useState([18, 60]);
    const [bioData_type, setbioData_type] = useState('');
    const [division, setDivision] = useState('');

    const fetchBiodatas = async () => {
        const { data } = await axios.get('../../../public/biodatas.json'); // Replace with your data source
        return data;
    };

    const { data: biodatas, isLoading, error } = useQuery({
        queryKey: ['biodatas'],
        queryFn: fetchBiodatas,
    });

    const handleFilter = (biodata) => {
        return (
            (bioData_type ? biodata.bioData_type === bioData_type : true) &&
            (division ? biodata.permanent_division === division : true) &&
            (biodata.age >= ageRange[0] && biodata.age <= ageRange[1])
        );
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading biodatas</div>;

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

    return (
        <div className="flex mt-24 px-16">
            <div className="w-1/4 p-4">
                <h2 className="text-2xl text-heading dark:text-heading2 font-bold mb-4">Filter Options</h2>
                {/* Age Range Filter */}
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
                    <div>{`${ageRange[0]} - ${ageRange[1]}`}</div>
                </div>

                {/* Biodata Type Filter */}
                <div className="mb-4">
                    <label className="block text-heading dark:text-heading2 font-semibold mb-2">Biodata Type</label>
                    <CustomSelect
                        options={bioDataTypeOptions}
                        value={bioData_type}
                        onChange={(selectedOption) => setbioData_type(selectedOption ? selectedOption.value : '')}
                    />
                </div>

                {/* Division Filter */}
                <div className="mb-4">
                    <label className="block font-semibold mb-2">Division</label>
                    <CustomSelect
                        options={divisionOptions}
                        value={division}
                        onChange={(selectedOption) => setDivision(selectedOption ? selectedOption.value : '')}
                    />
                </div>
            </div>

            <div className="w-3/4 p-4">
                <h2 className="text-2xl dark:text-heading2 text-heading font-bold mb-4">All Biodatas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {biodatas.filter(handleFilter).slice(0, 20).map((biodata) => (
                        <div key={biodata.bioData_id} className="p-4 dark:border-primary border rounded-lg">
                            <img  src={biodata.profile_image} alt="Profile" className="w-full h-32 object-cover rounded-lg mb-4 hover:scale-90 duration-500" />
                            <div className='flex justify-between'>
                                <h3 className="text-lg font-semibold text-primary dark:text-primary2">{biodata.bioData_type}</h3>
                                <p className='dark:text-heading2'>Age: <span className='bg-secondary px-1 rounded-md text-black'>{biodata.age}</span></p>
                            </div>
                            <div className='space-y-1  dark:text-Description2'>
                                <p className='dark:text-Description2 text-sm'>Biodata Id: <span className='font-semibold text-primary dark:text-primary2'>{biodata.bioData_id}</span></p>
                                <p className='text-sm'>Job: <span className=''>{biodata.occupation}</span></p>
                                <p className='text-sm'>Division: {biodata.permanent_division}</p>
                            </div>
                            <div className='flex gap-4'>
                                <Link to={`/details/${biodata.bioData_id}`} className='h-[25px] mt-2 w-[110px] rounded-md text-sm dynamic-button-premium text-white bg-primary px-6 hover:text-primary hover:dark:text-primary2 py-3'>
                                    <span className='absolute z-10 top-[3px] left-[18px] text-[12px]'>View Details</span>
                                </Link>
                                <button className='h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button bg-red-100 text-red-600 px-6 hover:text-primary hover:dark:text-primary2 py-3'>
                                    <span className='absolute z-10 top-[6px] left-[14px] text-[12px]'><FaRegHeart /></span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BioDatas;
