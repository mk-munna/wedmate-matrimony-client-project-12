import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContextProvider";
import { LuUserX2 } from "react-icons/lu";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyContactRequest = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user.email;
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { data: contacts = [], refetch, isError, error, isLoading } = useQuery({
        queryKey: ['my-contact-requests', userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requested-contacts?email=${userEmail}`);
            return res.data;
        }
    });

    const handleDeleteContact = async (contactId) => {
        Swal.fire({
            title: "Want to delete this?",
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
                    setLoading(true);
                    const res = await axiosSecure.delete(`/delete-contacts/${contactId}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("Contact request deleted successfully");
                    }
                } catch (error) {
                    toast.error("Error deleting contact request");
                } finally {
                    setLoading(false);
                }
            }
        })
    };

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
console.log(contacts)
    return (
        <div className="lg:pl-12 lg:pt-16">
            <div className="flex flex-col gap-2 md:flex-row justify-between md:px-6 lg:px-16 mb-8">
                <h2 className="text-3xl lg:text-3xl dark:text-heading2">My Contact Requests</h2>
                <h2 className="text-lg mt-2 dark:text-heading2">Total Requests: {isLoading ? <Skeleton width={50} /> : contacts.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                        <tr>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Image</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Biodata ID</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Phone</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#fcfcfc] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                        {isLoading ? (
                            Array(10).fill(0).map((_, index) => (
                                <tr key={index}>
                                    <th className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><Skeleton /></th>
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
                                    <th className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{index + 1}</th>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <img src={contact.image} alt={contact.name} className="w-10 h-10 object-cover rounded-full" />
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.name}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap"><span className="bg-secondary dark:bg-[#2d5a47] px-2 rounded-lg">{contact.bioData_id}</span></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.status === 'approve' ? contact.contact_email : <span className="italic text-gray-600 dark:text-Description2">Hidden</span>}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">{contact.status === 'approve' ? contact.contact_phone : <span className="italic text-gray-600  dark:text-Description2">Hidden</span>}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs  whitespace-nowrap">
                                        <span className={contact.status === 'approve' ? 'text-green-500' : 'text-[#ff922b] dark:bg-[#235353] dark:text-[#dabb94] px-3 py-1 rounded-lg bg-[#FDF1F8]'}>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap">
                                        <button
                                            data-tooltip-id="my-tooltip" data-tooltip-content={`❌ Delete ${contact.name}`}
                                            onClick={() => handleDeleteContact(contact._id)}
                                            aria-label={`Delete ${contact.name}`}
                                            className="h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button px-6  py-3"
                                        >
                                            <span className="absolute z-10 top-[2px] left-[12px] text-[12px]">
                                                <RiDeleteBin6Line className="text-xl  hover:text-red-500 " />
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {loading && <div className="loading">Loading...</div>}
        </div>
    );
};

export default MyContactRequest;
