import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from "react";
import { toast } from "react-hot-toast";

const ApproveContactRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { data: contacts = [], refetch, isError, error, isLoading } = useQuery({
        queryKey: ['pending-contact-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contact-requests-pending');
            return res.data;
        }
    });

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const handleApproveContact = async (contactId) => {
        try {
            setLoading(true);
            const res = await axiosSecure.patch(`/contact-requests-approve/${contactId}`, { status: 'approved' });
            if (res.data.modifiedCount > 0) {
                refetch();
                toast.success("Contact request approved successfully");
            }
        } catch (error) {
            toast.error("Error approving contact request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lg:pl-12 lg:pt-16">
            <div className="flex flex-col gap-2 md:flex-row justify-between md:px-6 lg:px-16 mb-8">
                <h2 className="text-3xl lg:text-3xl dark:text-heading2">Pending Contact Requests</h2>
                <h2 className="text-lg mt-2 dark:text-heading2">Total Pending: {isLoading ? <Skeleton width={50} /> : contacts.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                        <tr>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Invoice</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Biodata ID</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Biodata Email</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requested Email</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Requested At</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#f8f8f8] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                        {isLoading ? (
                            Array(10).fill(0).map((_, index) => (
                                <tr key={index}>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></td>
                                </tr>
                            ))
                        ) : (
                            contacts.map((contact, index) => (
                                <tr key={contact._id}>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">#{index + 3001}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.name}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <span className="bg-[#f3eded] dark:bg-[#2a535e] dark:text-gray text-gray-600 px-2 py-1 rounded-lg">{contact.bioData_id}</span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.contact_email}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.checkoutEmail}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{new Date(contact.checkoutCreatedAt).toLocaleDateString()}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <button
                                            onClick={() => handleApproveContact(contact._id)}
                                            className="bg-primary2 hover:bg-primary text-white px-3 py-1 rounded-md shadow-md"
                                            disabled={loading}
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {
                    contacts.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <h2 className="text-3xl dark:text-Description2 text-Description2 mt-[150px]">No  Requests </h2>
                        </div>
                    )
                }
            </div>
            {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default ApproveContactRequest;
