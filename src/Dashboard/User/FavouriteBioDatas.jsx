import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import loadingLottie from '../../../public/loadingLottie.json';

const FavouriteBioDatas = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchFavorites = async () => {
        const response = await axiosSecure.get(`/favorites/${user.email}`);
        return response.data;
    };

    const { data: favoriteProfiles, isLoading: isLoadingFavorites, error: favoritesError, refetch } = useQuery({
        queryKey: ['favorites', user.email],
        queryFn: fetchFavorites,
        enabled: !!user.email,
    });

    const removeFromFavorites = async (bioDataId) => {
        try {
            const response = await axiosSecure.delete('/favorites', {
                data: {
                    email: user.email,
                    bioDataId
                }
            });
            console.log(response.data)
            if (response.data.modifiedCount === 1) {
                toast(" ✅ Successfully removed from Favorites")
                refetch();
            } else {
                toast.error("Failed to remove from Favorites");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error('Error removing from favorites:', error);
        }
    };

    if (isLoadingFavorites) {
        return (
            <div>
                <Lottie style={{ width: 550, marginLeft: 'auto', marginRight: 'auto' }} animationData={loadingLottie}></Lottie>
            </div>
        );
    }

    if (favoritesError) {
        return <div>{favoritesError.message}</div>;
    }

    const handleRemove = (bioDataId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#1CA774",
            showCancelButton: true,
            confirmButtonColor: "#1CA774",
            cancelButtonColor: "#FECACA",
            confirmButtonText: "Remove",
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromFavorites(bioDataId);
            }
        });
    }

    return (
        <div className='lg:p-12 overflow-auto'>
            <h2 className="text-3xl dark:text-heading2">Your Favorites</h2>
                <div className="flex flex-col mt-6">
                    <div className="overflow-auto">
                        <div className=" py-2 ">
                        <div className="overflow-auto border dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Image
                                            </th>
                                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Name</span>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-2 sm:px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Biodata Id
                                            </th>
                                            <th scope="col" className="px-2 sm:px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Permanent Address
                                            </th>
                                            <th scope="col" className="px-2 sm:px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Occupation
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-2 sm:px-4">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-[#f8f8f8] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                                        {favoriteProfiles?.map((profile) => (
                                            <tr key={profile.bioData_id}>
                                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                                    <img
                                                        src={profile.profile_image} // Replace profile.imageUrl with the actual image URL property from your profile object
                                                        alt={profile.name}
                                                        className="w-10 h-10 object-cover rounded-full"
                                                    />
                                                </td>
                                                <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                                    <Link to={`/details/${profile._id}`} className="text-primary dark:text-primary2 hover:underline">
                                                        {profile.name}
                                                    </Link>
                                                </td>
                                                <td className="px-2 sm:px-12 py-4 text-xs font-medium whitespace-nowrap">
                                                    {profile.bioData_id}
                                                </td>
                                                <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap">
                                                    {profile.permanent_division}
                                                </td>
                                                <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap">
                                                    {profile.occupation}
                                                </td>
                                                <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap">
                                                    <button onClick={() => handleRemove(profile.bioData_id)} className='h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button bg-red-100 text-red-700 px-6 hover:text-primary hover:dark:text-primary2 py-3'>
                                                        <span className='absolute z-10 top-[6px] left-[14px] text-[12px]'>
                                                            <MdOutlineDeleteSweep />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default FavouriteBioDatas;
