import {
    FaBook,
    FaHome,
    FaList,
    FaUsers,
    FaUtensils,
} from "react-icons/fa";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContextProvider";
import "./Dashboard.css";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../Provider/firebase.config";
import { BiPen } from "react-icons/bi";
import { CiEdit, CiLogout } from "react-icons/ci";
import { SlCallOut } from "react-icons/sl";
import { LuHeartHandshake } from "react-icons/lu";
import { MdMarkEmailRead, MdOutlineViewInAr } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoClose, IoShieldCheckmarkOutline } from "react-icons/io5";
import { GiTentacleHeart } from "react-icons/gi";

const Dashboard = () => {
    const { user} = useContext(AuthContext);
    const [isAdmin] = useAdmin();

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success("Successfully logged out!");
                navigate("/login");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };


    return (
        <div className="">
            <section className="flex flex-col lg:flex-row">
                <div className={` hidden lg:block lg:w-[300px] pt-24 pb-12 ${isAdmin?"pl-16" : "pl-20"} dark:text-heading2 bg-secondary2 dark:bg-[#183235]`}>
                    <ul
                        className={`lg:static top-0  z-[11] lg:block bg-white dark:bg-[#1B3C44] p-5 h-full ${isAdmin ? "lg:w-[280px]" : "lg:w-[250px]"} w-[75%] max-w-[300px] space-y-3 rounded-xl transform transition-transform duration-300 `}
                    >
                        <div className="flex justify-between items-center">
                            <div className="px-6 pt-">
                                <img
                                    src={user?.photoURL}
                                    className="w-[150px] h-[120px] object-cover rounded-xl border-4 border-[#ECF0F2] dark:border-[#183235]"
                                    alt=""
                                />
                            </div>
                        </div>
                        {isAdmin ? (
                            <div className="px-2 space-y-2 pt-6 pb-4 font-light">
                                <NavLink
                                    to="/dashboard/admin-home"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaHome></FaHome>
                                    </div>
                                    Admin Home
                                </NavLink>
                                <NavLink
                                    to="/dashboard/manage-users"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaUsers />
                                    </div>
                                    Manage Users
                                </NavLink>
                                <NavLink
                                    to={`/dashboard/approved-premium`}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <IoShieldCheckmarkOutline />
                                    </div>
                                    Approve Premium
                                </NavLink>
                                <NavLink 
                                    to="/dashboard/approved-contact-request"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <MdMarkEmailRead />
                                    </div>
                                    Approve Contact Req..
                                </NavLink>
                                <NavLink 
                                    to="/dashboard/success-story"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <GiTentacleHeart />
                                    </div>
                                    Success Story
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiLogout />
                                    </div>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2 pt-8 pb-4">
                                <NavLink
                                    to="/dashboard/user-home"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaHome></FaHome>
                                    </div>
                                    User Home
                                </NavLink>
                                <NavLink
                                    to="/dashboard/edit-biodata"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiEdit />
                                    </div>
                                    Edit Biodata
                                </NavLink>
                                <NavLink
                                    to={`/dashboard/view-biodata`}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <MdOutlineViewInAr />
                                    </div>
                                    View Biodata
                                </NavLink>
                                <NavLink
                                    to="/dashboard/contact-request"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <SlCallOut />
                                    </div>
                                    Contact Request
                                </NavLink>
                                <NavLink
                                    to="/dashboard/favourites"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <LuHeartHandshake />
                                    </div>
                                    Favourites Biodata
                                    </NavLink>
                                    <NavLink 
                                        to="/dashboard/got-married"
                                        className="flex p-2 gap-2 items-center"
                                    >
                                        <div>
                                            <GiTentacleHeart />
                                        </div>
                                        Got Married
                                    </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiLogout />
                                    </div>
                                    Logout
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
