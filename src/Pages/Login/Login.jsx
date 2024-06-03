import { useContext, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiBook2Line } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthContextProvider";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { login, popUpLogin, setLoading, user, setReload } = useContext(AuthContext)
    // console.log(window.location)
    console.log(user);
    const location = useLocation()
    // console.log(location);
    // useEffect(() => {
    //     if (!user) {
    //             toast.success('logged out successfully')
    //     }
    // },[user,location.state]);
    // console.log(location)
    const navigate = useNavigate()
    // console.log(location)
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password)
            .then(result => {
                setLoading(false)
                console.log(result.user);
                navigate(location?.state || '/')
                toast.success('Successfully logged in!')

            }).catch(err => {
                console.log(err.message);
                setLoading(false);
                console.log(err.message);
                const firebaseError = err.message
                if (firebaseError.includes('invalid')) {
                    toast.error('Invalid email or password! Please make sure your email and password are correct');
                }
                if (firebaseError.includes('network')) {
                    toast.error('Network failed! please check you network connection');
                }
            })
    }
    // useEffect(() => {
    //     if (user) {
    //         navigate(location?.state || '/')
    //     }
    // },[user,navigate,location.state])
    const googleProvider = new GoogleAuthProvider()
    const handleGoogleLogin = () => {
        console.log('google login')
        popUpLogin(googleProvider)
            .then(result => {
                setLoading(false)
                setReload(true)
                toast.success('Successfully logged in!')
                setTimeout(() => {
                    navigate(location?.state || '/')
                }, 2000);
                console.log(result.user);
            }).catch(err => {
                setLoading(false)
                console.log(err.message);
            })
    }
    const gitHUbProvider = new GithubAuthProvider();
    const handleGitHubLogin = () => {
        console.log('Github login')
        popUpLogin(gitHUbProvider)
            .then(result => {
                setLoading(false)
                setReload(true)
                toast.success('Successfully logged in!')
                setTimeout(() => {
                    navigate(location?.state || '/')
                }, 1000);
                console.log(result.user);
            }).catch(err => {
                setLoading(false)
                console.log(err.message);
            })
    }

    return (
        <div className="lg:max-w-6xl lg:py-40 px-6 lg:px-0 max-w-[350px] md:max-w-screen-sm mx-auto flex flex-col lg:flex-row gap-12 justify-evenly">
            <Helmet>
                <title>Asian Escape Hub  | Login</title>
            </Helmet>
            <div className="text-gray-700 lg:border  lg:ml-[118px] lg:p-10 rounded-xl">
                <h4 className="block text-center font-OpenSans text-4xl leading-snug text-blue-gray-900">
                    Login Account
                </h4>
                <p className="block mt-1 font-sans text-center text-base leading-relaxed text-gray-700">
                    Always keep updated.
                </p>
                <form onSubmit={handleSubmit} className=" lg:w-[500px]">
                    <div className="mt-6">
                        <p htmlFor="email" className="text-[12px] text-black font-OpenSans">Your Email <span className="text-red-500">*</span></p>
                        <input type="email" id="email" name="email" className="bg-gray-50 focus:outline-none border rounded-lg w-full px-4 py-2 mt-2 font-Outfit border-gray-300" placeholder="Your Email" required />
                    </div>
                    <div className="mt-6">
                        <p htmlFor="password" className="text-[12px] text-black font-OpenSans">Your Password <span className="text-red-500">*</span></p>
                        <label className="relative">
                            <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="grow bg-gray-50 focus:outline-none border rounded-lg w-full px-4 py-2 mt-2 font-Outfit border-gray-300 " placeholder="Your Password" required />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-6 cursor-pointer">
                                {
                                    showPassword ? <IoMdEye /> : <IoMdEyeOff />

                                }
                            </span>
                        </label>
                    </div>

                    <button className="mt-6 block w-full text-base font-Outfit select-none rounded-lg bg-primary py-2 text-white">
                        Login
                    </button>

                </form>



                <br />
                <div className="divider">or</div>

                <button onClick={handleGoogleLogin} className="mt-8 border rounded-lg w-full py-2 flex font-Outfit items-center justify-center gap-4">
                    <FcGoogle className="text-2xl" />Login with Google
                </button>

                <button onClick={handleGitHubLogin} className="mt-6 border rounded-lg w-full py-2 flex font-Outfit items-center justify-center gap-4">
                    <IoLogoGithub className="text-2xl" />Login with GitHub
                </button>

                <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                    Do not have an account? &nbsp;
                    <Link to="/sign-up" className="cursor-pointer font-Outfit font-semibold">Sign Up</Link>
                </p>
            </div>

            <div className="lg:w-[300px] mt-6 border border-gray-200 rounded-xl p-6">
                <p className="flex items-center gap-2 text-base uppercase font-semibold">
                    <BiUser className="text-primary font-Outfit" />Account Setting
                </p>
                <div className="mt-4 pl-8 flex flex-col mb-6 gap-4">
                    <Link to="/login" className="cursor-pointer font-Outfit text-sm">Login</Link>
                    <Link to="/sign-up" className="cursor-pointer font-Outfit text-sm">Register</Link>
                    <Link to="#" className="cursor-pointer font-Outfit text-sm">Forgotten Password</Link>
                    <Link to="#" className="cursor-pointer font-Outfit text-sm">My account</Link>
                    <Link to="#" className="cursor-pointer font-Outfit text-sm">Address Book</Link>
                </div>
                <hr />
                <p className="flex items-center gap-2 mt-6 text-base uppercase font-semibold">
                    <TfiWrite className="text-primary font-Outfit" />My Orders
                </p>
                <div className="mt-4 pl-8 flex flex-col gap-4">
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Order History</p></Link>
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Download</p></Link>
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Return</p></Link>
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Transaction</p></Link>
                </div>
                <hr className="mt-6" />
                <p className="flex items-center gap-2 mt-6 text-base uppercase font-semibold">
                    <RiBook2Line className="text-primary font-Outfit" />My Stuff
                </p>
                <div className="mt-4 pl-8 flex flex-col gap-4">
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Wishlist</p></Link>
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Reward Points</p></Link>
                    <Link to="#"><p className="cursor-pointer font-Outfit text-sm">Coupon</p></Link>
                </div>
            </div>
            <div><Toaster /></div>
        </div>
    );
}

export default Login;
