import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdAdminPanelSettings, MdOutlineDeleteSweep, MdOutlineVerifiedUser } from "react-icons/md";
import { useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from "react-hot-toast";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { LuUserCog2, LuUserX2 } from "react-icons/lu";
import { Tooltip } from 'react-tooltip'
const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { data: users = [], refetch, isError, error, isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users');
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Want to make Admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#1CA774",
            showCancelButton: true,
            confirmButtonColor: "#1CA774",
            cancelButtonColor: "#FECACA",
            confirmButtonText: "Yes! Make Admin",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        toast.success(`${user.displayName} is admin now`);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                } finally {
                    setLoading(false);
                }
            }
        });

    };
    const handleMakePremium = async (user) => {
        Swal.fire({
            title: "Want to make Premium?",
            text: "You won't be able to revert this!",
            icon: "warning",
            iconColor: "#1CA774",
            showCancelButton: true,
            confirmButtonColor: "#1CA774",
            cancelButtonColor: "#FECACA",
            confirmButtonText: "Yes! Make Premium",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await axiosSecure.patch(`/users/premium`, { id: user._id, email: user.email });
                    console.log(res.data)
                    if (res.data.message === "User and Biodata updated successfully.") {
                        refetch();
                        toast(`💲${user.displayName} is a Premium User now`);
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                } finally {
                    setLoading(false);
                }
            }
        });

    };

    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: "Want to delete this user?",
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
                    const res = await axiosSecure.delete(`/users/${user._id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success("User has been deleted successfully")
                    }
                } catch (error) {
                    toast.error("Error removing user")
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="lg:pl-12 lg:pt-16">
            <div className="flex flex-col gap-2 md:flex-row justify-between md:px-6 lg:px-16 mb-8">
                <h2 className="text-3xl  lg:text-3xl  dark:text-heading2">All Users</h2>
                <h2 className="text-lg  mt-2 dark:text-heading2">Total Users: {isLoading ? <Skeleton width={50} /> : users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#f8f8f8] dark:bg-[#142d30]">
                        <tr>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"></th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Name</span>
                                </button>
                            </th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Email</span>
                                </button>
                            </th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Role</span>
                                </button>
                            </th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Tire</span>
                                </button>
                            </th>
                            <th scope="col" className="py-3.5 px-2 sm:px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Action</span>
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#f8f8f8] divide-y divide-gray-200 dark:divide-gray-700 dark:text-Description2 dark:bg-[#142e31]">
                        {isLoading ? (
                            Array(10).fill(0).map((_, index) => (
                                <tr key={index}>
                                    <th className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></th>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap"><Skeleton /></td>
                                    <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap"><Skeleton /></td>
                                </tr>
                            ))
                        ) : (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{index + 1}</th>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{user.displayName}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">{user.email}</td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                        {user.role === 'admin' ? (
                                            <div className="-ml-4"><span className="text-[#769b1f] rounded-lg bg-[#EFFFD9] dark:bg-[#434b31] dark:text-heading2 px-3 py-1">Admin</span></div>
                                        ) : (
                                            <button
                                                data-tooltip-id="my-tooltip" data-tooltip-content={`👮‍♂️ Make ${user.displayName} admin`}
                                                onClick={() => handleMakeAdmin(user)}
                                                className="text-gray-600 dark:text-heading2"
                                            >
                                                <LuUserCog2 className="text-xl" />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs font-medium whitespace-nowrap">
                                        {user.tire === 'premium' ? (
                                            <div data-tooltip-id="my-tooltip" data-tooltip-content={`🏆 Premium User`}><MdOutlineVerifiedUser style={{ boxShadow: "0 0 50px 0px gold" }} className="text-xl bg-yellow-100 dark:bg-[#323b12] text-[#D0A129] "/></div>
                                        ) : (
                                            <button
                                                    data-tooltip-id="my-tooltip" data-tooltip-content={`💲Make ${user.displayName} premium`}
                                                onClick={() => handleMakePremium(user)}
                                                className=""
                                            >
                                                    <AiOutlineUser className="text-xl text-gray-600 dark:text-heading2" />
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-2 sm:px-4 py-4 text-xs whitespace-nowrap">
                                        <button
                                            data-tooltip-id="my-tooltip" data-tooltip-content={`❌ Delete ${user.displayName}`}
                                            onClick={() => handleDeleteUser(user)}
                                            aria-label={`Delete ${user.name}`}
                                            className="h-[25px] mt-2 !w-[0px] rounded-md text-sm dynamic-button  px-6 hover:text-primary hover:dark:text-primary2 py-3"
                                        >
                                            <span className="absolute z-10 top-[2px] left-[12px] text-[12px]">
                                                <LuUserX2 className="text-xl text-red-500 dark:text-red-400" />
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

export default AllUsers;
