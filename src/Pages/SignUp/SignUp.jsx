import { useContext, useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { RiBook2Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthContextProvider";

import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {

    const { signUp, setLoading, updateUserProfile, setUser, user, userInfo, setUserInfo } = useContext(AuthContext)

    // password state
    const [livePassword, setLivePassword] = useState('');
    const [liveConfirmPassword, setLiveConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);

    // error state
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [fulfillBar, setFulfillBar] = useState(0);
    const [fulfilState, setFulfillState] = useState('');

    const navigate = useNavigate()
    // password validation before firebase authentication
    useEffect(() => {
        if (livePassword.length > 0) {
            let newError = '';

            if (!/[A-Z]/.test(livePassword)) {
                newError = 'Password must have an uppercase letter';
            } else if (!/[a-z]/.test(livePassword)) {
                newError = 'Password must have a lowercase letter';
            } else if (!/\d/.test(livePassword)) {
                newError = 'Password must have a digit';
            } else if (!/[^a-zA-Z0-9]/.test(livePassword)) {
                newError = 'Password must have at least one special character';
            } else if (livePassword.length < 6) {
                newError = 'Password must have at least 6 characters';
            } else {
                newError = '';
            }

            setPasswordError(newError);
        } else {
            setPasswordError('');
        }
    }, [livePassword,]);
    useEffect(() => {

        if (livePassword.length > 0) {
            let fulfilledConditions = 0;

            if (/[A-Z]/.test(livePassword)) {
                fulfilledConditions++;
            }
            if (/[a-z]/.test(livePassword)) {
                fulfilledConditions++;
            }
            if (/\d/.test(livePassword)) {
                fulfilledConditions++;
            }
            if (/[^a-zA-Z0-9]/.test(livePassword)) {
                fulfilledConditions++;
            }
            if (livePassword.length >= 6) {
                fulfilledConditions++;
            }
            if (livePassword.length === 0) {
                fulfilledConditions = 0;
            }
            setFulfillBar(fulfilledConditions);
        }
    }, [livePassword]);


    useEffect(() => {
        if (livePassword.length === 0) {
            setFulfillBar(0)
            setFulfillState('')
        }
        if (fulfillBar === 1) {
            setFulfillState('very week');
        }
        if (fulfillBar === 2) {
            setFulfillState(' week');
        }
        if (fulfillBar === 3) {
            setFulfillState(' medium');
        }
        if (fulfillBar === 4) {
            setFulfillState(' strong');
        }

        if (fulfillBar > 4 && livePassword.length >= 6) {
            setFulfillState(' hard');
        }
    }, [livePassword, fulfillBar])

    // Confirm password validation
    useEffect(() => {
        if (liveConfirmPassword.length > 0) {
            if (livePassword !== liveConfirmPassword) {
                setConfirmPasswordError(2);
            } else {
                setConfirmPasswordError(3);
            }
        } else {
            setConfirmPasswordError(1);
        }

    }, [livePassword, fulfillBar, liveConfirmPassword]);
    // console.log(passwordError);
    // console.log(fulfillBar);
    // console.log(confirmPasswordError);
    // console.log(livePassword);



    //----- validation done before initialization of firebase----
    // auth start
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic();
    const onSubmit = (data) => {
        const { name, email, url, password, confirmPassword } = data;
        if (password === confirmPassword) {
            // signUp(email, password)
            //     .then(result => {
            //         // console.log(result.user);
            //         updateUserProfile(result.user, name, url)
            //             .then(() => {
            //                 const userInfo = {
            //                     email: result.user?.email,
            //                     name: result.user?.displayName
            //                 }
            //                 setUser({ ...user, displayName: name, photoURL: url })
            //                 toast('Good Job! Add your biodata', {
            //                     icon: '👏',
            //                 });
            //                 axiosPublic.get('/users-new', userInfo)
            //                     .then(res => {
            //                         console.log(res.data);
            //                         if (!res.data.insertedId) {
            //                             navigate('/new-biodata' || '/')
            //                         }

            //                     })
            //             })
            //     }).catch(err => {
            //         setLoading(false);
            //         console.log(err.message);
            //         const firebaseError = err.message
            //         if (firebaseError.includes('already')) {
            //             toast.error('Email is already in use. Please try with another email address');
            //         }
            //         if (firebaseError.includes('network')) {
            //             toast.error('Network failed! please check you network connection');
            //         }
            //     })
            setUserInfo({displayName: name, photoURL: url, email: email, password: confirmPassword });
            console.log(userInfo)
            console.log(email)
            axiosPublic.get(`/users-new?email=${email}`)
                .then(res => {
                    console.log(res.data);
                    if (!res.data.insertedId) {
                        // console.log(res.data.insertedId);
                        toast.error(res.data.message)
                        return;
                    };
                    navigate('/new-biodata' || '/')

                });

        } else {
            toast.error('Passwords do not match')
        }
    }
    return (
        <div className="">
            <Helmet>
                <title>WedMate | Sign Up</title>
            </Helmet>
            <div className="lg:h-[250px] py-8 lg:pt-[140px] bg-[#ECF0F2] dark:bg-[#16343b]">
                <p className="text-center text-4xl font-semibold text-primary dark:text-primary2">Register</p>
                <p className="text-center mt-2 dark:text-Description2">Home/Register</p>
            </div>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-xl text-gray-700 dark:text-Description2 bg-[#ECF0F2] dark:bg-[#16343b] mx-auto mt-12 lg:w-[700px]">
                    <h4 className="block font-secondary text-center text-3xl md:text-5xl leading-snug text-blue-gray-900 dark:text-heading2">
                        Register Account
                    </h4>
                    <p className="block mt-1 dark:text-Description2   text-center font-sans text-sm md:text-base leading-relaxed ">
                        Welcome to WedMate. Enter your details to register.
                    </p>
                    <div className="mt-6 ">
                        <div className="">
                            <label htmlFor="name" className="mb-2 text-[12px] dark:text-Description2 ">Full Name </label>
                        </div>
                        <input {...register("name",)} type="text" id="name" name="name" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary " placeholder="Your Name" />
                    </div>
                    <div className="mt-4">
                        <div className="">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2 ">Your Email <span className="text-red-500">*</span></label>
                        </div>
                        <input  {...register("email")} type="email" id="email" name="email" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Email" required />
                    </div>
                    <div className="mt-4">
                        <div className="">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2 ">Your Photo Url <span className="text-red-500">*</span></label>
                        </div>
                        <input {...register("url")} type="text" id="url" name="url" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Photo Url" />
                    </div>

                    <div className=" items-center">
                        <p>
                            {
                                fulfilState && (

                                    <small>
                                        Password strength :  <span className="inline-flex duration-700 items-center px-3 mt-4 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">  {fulfilState}</span>
                                    </small>
                                )
                            }
                        </p>
                    </div>
                    <div className="mt-4  duration-700 ">
                        <div className="">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2 ">Your Password <span className="text-red-500">*</span></label>
                        </div>
                        <input  {...register("password")} onChange={e => { setLivePassword(e.target.value) }} type="text" id="password" name="password" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Your Password" required />

                    </div>
                    {/* error */}
                    <div className="ml-[150px]">
                        {
                            passwordError && (
                                <p className="text-red-500 mt-2 text-xs mt">
                                    {passwordError}
                                </p>
                            )
                        }
                    </div>
                    <div className="mt-4">
                        <div className="">
                            <label htmlFor="email" className="mb-2 text-[12px] dark:text-Description2 ">Confirm Password <span className="text-red-500">*</span></label>
                        </div>
                        <input {...register("confirmPassword")} onChange={e => setLiveConfirmPassword(e.target.value)} type="text" id="confirm-password" name="confirmPassword" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary" placeholder="Confirm Password" required />
                    </div>
                    {/* error */}
                    <div className="ml-[150px]">
                        {confirmPasswordError === 1 && (
                            <p className="text-red-500 mt-2 text-xs mt">
                            </p>
                        )}
                        {confirmPasswordError === 2 && (
                            <p className="text-red-500 mt-2 text-xs mt">
                                Password do not match
                            </p>
                        )}
                        {confirmPasswordError === 3 && (
                            <p className="text-primary dark:text-primary2 mt-2 text-xs mt">
                                Password Match
                            </p>
                        )}
                    </div>

                    {/* Checkbox for Terms and Conditions */}
                    <div className="flex gap-6 items-center mt-12">
                        <input onChange={e => setAgree(e.target.checked)} type="checkbox" id="agree" name="agree" className="checkbox checkbox-sm" />
                        <label className="mt-px font-light text-gray-700 dark:text-Description2 cursor-pointer select-none" htmlFor="agree">
                            I agree the
                            <Link to="#" className="font-medium transition-colors hover:text-gray-900 dark:hover:text-heading2">
                                &nbsp;Terms and Conditions
                            </Link>
                        </label>
                    </div>
                    <button
                        disabled={!agree || passwordError}
                        className="mt-6 block bg-primary disabled:bg-[#6c9e89] w-full select-none rounded-lg py-2 text-white"
                    >
                        Sign up
                    </button>
                    <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700 dark:text-Description2 ">
                        Already have an account? &nbsp;
                        <Link to="/login" className="cursor-pointer font-Outfit font-semibold hover:underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;