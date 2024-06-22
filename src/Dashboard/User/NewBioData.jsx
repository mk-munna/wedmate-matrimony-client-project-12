import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import { Helmet } from 'react-helmet-async';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const NewBioData = () => {
    const { user, userInfo, setUserInfo, bioDataInfo, setBioDataInfo } = useContext(AuthContext);
    const [bioData_type, setBioData_type] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { name, fathersName, mothersName, weight, height, ages, race, job } = data;
        const age = parseInt(ages);
        const date_of_birth = dateOfBirth.toLocaleDateString();
        setBioDataInfo({ bioData_type, name, date_of_birth, height, weight, age, occupation: job, race, fathers_name: fathersName, mothers_name: mothersName });
        navigate('/new-biodata-next-step');
        // console.log(bioDataInfo)
    };

    return (
        <div className='p-20 dark:bg-dark'>
            <Helmet>
                <title>WedMate | Get Started</title>
            </Helmet>
            <h1 className='text-4xl text-primary font-semibold dark:text-primary2'>Get Started</h1>
            <h1 className='mt-12 text-heading dark:text-heading2'>Add Your Biodata informations</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="name" className="mb-2 text-[12px] dark:text-Description2">Your Name </label>
                        </div>
                        <input {...register("name")} type="name" defaultValue={userInfo?.displayName} id="name" name="name" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Name" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="Fathers " className="mb-2 text-[12px] dark:text-Description2">Your Father's Name <span className="text-red-500">*</span></label>
                        </div>
                        <input {...register("fathersName")} type="name" id="fathersName" name="fathersName" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 dark:text-heading2 placeholder:text-sm bg-transparent border border-primary" placeholder="Father's name" required />
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="mothersName" className="mb-2 text-[12px] dark:text-Description2">Your Mother's Name <span className="text-red-500">*</span></label>
                        </div>
                        <input {...register("mothersName")} type="name" id="mothersName" name="mothersName" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Mother's Name" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2">Gender <span className="text-red-500">*</span></label>
                        </div>
                        <select onChange={(e) => setBioData_type(e.target.value)} id="" name="gender" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 dark:text-heading2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="height" className="mb-2 text-[12px] dark:text-Description2">Height<span className="text-red-500">*</span> </label>
                        </div>
                        <select {...register("height")} id="height" name="height" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            {Array.from({ length: 100 }, (_, i) => 150 + i).map(height => (
                                <option key={height} value={`${height} cm`}>{height} cm</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="weight" className="mb-2 text-[12px] dark:text-Description2">Weight <span className="text-red-500">*</span></label>
                        </div>
                        <select {...register("weight")} id="weight" name="weight" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            {Array.from({ length: 150 }, (_, i) => 40 + i).map(weight => (
                                <option key={weight} value={`${weight} kg`}>{weight} kg</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="ages" className="mb-2 text-[12px] dark:text-Description2">Age<span className="text-red-500">*</span> </label>
                        </div>
                        <input {...register("ages")} type="number" id="ages" name="ages" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="18" required />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="race" className="mb-2 text-[12px] dark:text-Description2">Race <span className="text-red-500">*</span></label>
                        </div>
                        <select {...register("race")} id="race" name="race" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Asian">Asian</option>
                            <option value="African">African</option>
                            <option value="Caucasian">Caucasian</option>
                            <option value="Hispanic">Hispanic</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-12'>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="dateOfBirth" className="mb-2 text-[12px] dark:text-Description2">Date Of Birth <span className="text-red-500">*</span></label>
                        </div>
                        <DatePicker className='focus:outline-none rounded-lg lg:w-[250%] px-4 py-2 mt-2 dark:text-heading2 placeholder:text-sm bg-transparent border border-primary' selected={dateOfBirth} onChange={(date) => setDateOfBirth(date)} />
                    </div>
                    <div className="mt-4 w-full">
                        <div className="w-full">
                            <label htmlFor="job" className="mb-2 text-[12px] dark:text-Description2">Occupation<span className="text-red-500">*</span> </label>
                        </div>
                        <select {...register("job")} id="job" name="job" className="focus:outline-none dark:text-heading2 rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" required>
                            <option value="">Select</option>
                            <option value="Engineer">Engineer</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Artist">Artist</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className='mt-12 text-right'>
                    <button className='bg-primary px-4 py-2 text-white'>Next</button>
                </div>
            </form>
        </div>
    );
};

export default NewBioData;
