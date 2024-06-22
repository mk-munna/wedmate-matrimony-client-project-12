import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ApprovedPremium = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch, isError, error, isLoading } = useQuery({
        queryKey: ['premium-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/premium-requests');
            return res.data;
        }
    });

    const handleMakePremium = async (email) => {
        try {
            const res = await axiosSecure.patch(`/users/make-premium/${email}`);
            if (res.data.success) {
                refetch();
                toast.success("User has been made premium");
            } else {
                toast.error(res.data.message || "Failed to make user premium");
            }
        } catch (error) {
            toast.error("Failed to make user premium");
        }
    };

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    console.log(users)
    return (
        <div className="lg:pl-12 lg:pt-16">
            <div className="flex flex-col gap-2 md:flex-row justify-between md:px-6 lg:px-16 mb-8">
                <h2 className="text-3xl  lg:text-3xl  dark:text-heading2">Premium Requests</h2>
                <h2 className="text-lg  mt-2 dark:text-heading2">Total Requests: {isLoading ? <Skeleton width={50} /> : users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                        <tr>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Biodata ID</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requested At</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Make Premium</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#f8f8f8] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                        {isLoading ? (
                            Array(10).fill(0).map((_, index) => (
                                <tr key={index}>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                </tr>
                            ))
                        ) : (
                            users.map((user,index) => (
                                <tr key={user._id}>
                                    <th className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{index + 1}</th>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{user.name}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{user.contact_email}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <span className="bg-[#f3eded] dark:bg-[#2a535e] dark:text-gray text-gray-600 px-2 py-1 rounded-lg">{user.bioData_id}</span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <span className="bg-[#e7e7e7] dark:text-Description2 dark:bg-[#175048] px-4 py-1 rounded-lg text-gray-600">{new Date(user.requestedAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <button
                                            onClick={() => handleMakePremium(user.contact_email)}
                                            className="bg-primary2 hover:bg-primary text-white px-3 py-1 rounded-lg shadow-md"
                                        >
                                            Make Premium
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {
                    users.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <h2 className="text-3xl dark:text-Description2 text-Description2 mt-[150px]">No  Requests </h2>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ApprovedPremium;
