import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Rating } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from '../../Provider/AuthContextProvider';

const SuccessStoryForm = () => {

    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const [selfBiodataId, setSelfBiodataId] = useState('');
    const [partnerBiodataId, setPartnerBiodataId] = useState('');
    const [coupleImage, setCoupleImage] = useState('');
    const [marriageDate, setMarriageDate] = useState(null);
    const [reviewStar, setReviewStar] = useState(0);
    const [successStoryText, setSuccessStoryText] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        const successStory = {
            self_bioData_id: selfBiodataId,
            partner_bioData_id: partnerBiodataId,
            email: user?.email,
            coupleImage,
            marriageDate: marriageDate.toISOString().split('T')[0],
            reviewStar,
            successStoryText
        }
        if (!selfBiodataId || !partnerBiodataId || !successStoryText || !marriageDate) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const res = await axiosSecure.post('/got-married', successStory);

            if (res.data.insertedId) {
                toast.success("Success story submitted successfully.");
                setSelfBiodataId('');
                setPartnerBiodataId('');
                setCoupleImage('');
                setMarriageDate(null);
                setReviewStar(0);
                setSuccessStoryText('');
            } else {
                toast.error(res.data.message || "Failed to submit success story.");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the success story.");
        }
    };

    return (
        <div className="lg:pt-16 lg:pl-12">
            <h2 className="text-3xl font-bold mb-6 text-primary dark:text-primary2">Share Your Success Story</h2>
            <form onSubmit={handleSubmit} className='dark:text-Description2'>
                <div className='flex md:gap-12 flex-col md:flex-row'>
                    <div className="mb-6 w-full">
                        <label htmlFor="selfBiodataId" className="block text-gray-700 dark:text-Description2">Self Biodata ID 💚</label>
                        <input
                            type="text"
                            id="selfBiodataId"
                            value={selfBiodataId}
                            onChange={(e) => setSelfBiodataId(e.target.value)}
                            className="mt-1 block w-full border border-primary bg-transparent rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div className="mb-6 w-full">
                        <label htmlFor="partnerBiodataId" className="block dark:text-Description2 text-gray-700">Partner Biodata ID ❤️</label>
                        <input
                            type="text"
                            id="partnerBiodataId"
                            value={partnerBiodataId}
                            onChange={(e) => setPartnerBiodataId(e.target.value)}
                            className="mt-1 block w-full border border-primary bg-transparent rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row md:gap-12'>
                    <div className="mb-6 w-full">
                        <label htmlFor="coupleImage" className="dark:text-Description2 block text-gray-700">Couple Image Link 🖼️</label>
                        <input
                            type="text"
                            id="coupleImage"
                            value={coupleImage}
                            onChange={(e) => setCoupleImage(e.target.value)}
                            className="mt-1 block w-full border border-primary bg-transparent rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-6 w-full">
                        <label htmlFor="marriageDate" className="dark:text-Description2 block text-gray-700">Marriage Date 📅</label>
                        <DatePicker
                            selected={marriageDate}
                            onChange={(date) => setMarriageDate(date)}
                            className="mt-1 block lg:w-[400px] md:w-[330px] w-[300px] border border-primary bg-transparent rounded-md shadow-sm p-2"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="reviewStar" className="dark:text-Description2 block text-gray-700">Review Star ⭐</label>
                    <Rating
                        name="reviewStar"
                        value={reviewStar}
                        onChange={(e, newValue) => setReviewStar(newValue)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="successStoryText" className="dark:text-Description2 block text-gray-700">Success Story Review 🧑‍🤝‍🧑</label>
                    <textarea
                        id="successStoryText"
                        value={successStoryText}
                        onChange={(e) => setSuccessStoryText(e.target.value)}
                        className="mt-1 block w-full border border-primary bg-transparent rounded-md shadow-sm p-2"
                        required
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-primary2 hover:bg-primary text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SuccessStoryForm;
