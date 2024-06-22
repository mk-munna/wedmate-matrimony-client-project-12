import React, { useState } from 'react';
import { Modal, Button, Typography, Rating, Stack } from '@mui/material';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { RiDeleteBinLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';

const AdminSuccessStories = () => {
    const axiosSecure = useAxiosSecure();

    const fetchSuccessStories = async () => {
        const { data } = await axiosSecure.get('/success-stories');
        return data;
    };

    const { data: successStories, error, isLoading, refetch } = useQuery({
        queryKey: ['successStories'],
        queryFn: fetchSuccessStories,
    });

    const [selectedStory, setSelectedStory] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewStory = (story) => {
        setSelectedStory(story);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedStory(null);
    };

    const handleDeleteStory = async (storyId) => {
        Swal.fire({
            title: "Want to delete this story?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#1CA774",
            showCancelButton: true,
            confirmButtonColor: "#1CA774",
            cancelButtonColor: "#FECACA",
            confirmButtonText: "Yes! Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/success-stories/${storyId}`);
                    if (res.data.deletedCount > 0) {
                        toast.success("Success story deleted");
                    }
                    refetch();
                } catch (error) {
                    console.error('Error deleting story:', error);
                }
            }
        })
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading success stories</div>;

    return (
        <div className="lg:pt-16 lg:pl-12">
            <div className="flex flex-col gap-2 md:flex-row justify-between md:px-6  mb-8">
                <h2 className="text-3xl  lg:text-3xl  dark:text-heading2">Success Stories</h2>
                <h2 className="text-lg  mt-2 dark:text-heading2">Total Success Stories: {isLoading ? <Skeleton width={50} /> : successStories.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                        <tr>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Male Biodata ID</th>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Female Biodata ID</th>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Marriage Date</th>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Rating</th>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Details</th>
                            <th className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#f8f8f8] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                        {successStories.map((story) => (
                            <tr key={story._id}>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{story.self_bioData_id}</td>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{story.partner_bioData_id}</td>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{new Date(story.marriageDate).toLocaleDateString()}</td>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                    <Rating name="read-only" value={story.reviewStar} readOnly size="small" />
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                    <button className="h-[24px] mt-2 w-[90px] rounded-md text-sm dynamic-button-premium text-white bg-primary px-6 hover:text-primary hover:dark:text-primary2 !py-2" onClick={() => handleViewStory(story)}>
                                        <span className='absolute z-10 text-[10px] top-[2px] left-[15px] '>View Details</span>
                                    </button>
                                </td>
                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                    <button
                                        data-tooltip-id="my-tooltip" data-tooltip-content={`❌ Delete Story`}
                                        onClick={() => handleDeleteStory(story._id)}
                                        className="h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button  px-6 hover:text-primary hover:dark:text-primary2 py-3"
                                    >
                                        <span className="absolute z-10 top-[2px] left-[12px] text-[12px]">
                                            <RiDeleteBinLine className="text-xl text-red-500 dark:text-red-400" />
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal open={showModal} onClose={handleCloseModal}>
                <div className="modal" style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', maxWidth: '600px', margin: 'auto', marginTop: '10%' }}>
                    <p className='text-2xl pb-10 md:pb-6'>Success Story</p>
                    {selectedStory && (
                        <>
                            <div style={{ position: 'relative', }}>
                                {selectedStory.coupleImage && (
                                    <img
                                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 51%)', width: '200px', height: '200px' }}
                                        src={selectedStory.coupleImage}
                                        alt="Couple"
                                        className='absolute left-1/2 transform -translate-x-1/2 -top-16 object-cover'
                                    />
                                )}
                                <div className='border pt-[150px]  md:pt-[100px] px-6 rounded-xl border-primary '>
                                    <div className='flex justify-between'>
                                        <p className='text-sm text-heading dark:text-heading2'>Marriage Date: <span className='font-light'>{new Date(selectedStory.marriageDate).toLocaleDateString()}</span></p>
                                        <Stack spacing={1}>
                                            <Rating name="size-small" value={selectedStory.reviewStar} size="small" readOnly />
                                        </Stack>
                                    </div>
                                    <h1 className='mt-6 font-semibold'>Story Text</h1>
                                    <p className=' mt-2 text-Description dark:text-Description2'>{selectedStory.successStoryText}</p>
                                    <div className='flex justify-end gap-6 pt-6 pb-4'>
                                        <p className='text-xs md:text-sm'><span>Male Biodata ID:</span> {selectedStory.self_bioData_id}</p>
                                        <p className= 'text-xs md:text-sm'><span>Female Biodata ID:</span> {selectedStory.partner_bioData_id}</p>
                                    </div>
                                </div>
                            </div>
                        </>

                    )}
                    <div className='flex justify-center'>
                        <button onClick={handleCloseModal} className='mt-6  h-[40px] w-[100px] dynamic-button bg-primary  text-white px-6 hover:text-primary duration-700 py-3'><span className='absolute z-10 top-[8px] left-[30px] font-secondary'>Close</span></button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSuccessStories;
