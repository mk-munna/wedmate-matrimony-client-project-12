import { useContext, useEffect, useState } from "react";
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
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { login, popUpLogin, setLoading, user, setUserInfo,userInfo, setReload } = useContext(AuthContext)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // console.log(window.location)
    console.log({ user });
    const location = useLocation()
    // console.log(location.state)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic();
    // console.log(location)
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password)
            .then(result => {
                setLoading(false)
                toast.success('Successfully logged in!')
                navigate(location?.state || '/')

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
    const googleProvider = new GoogleAuthProvider()
    const handleGoogleLogin = () => {
        console.log('google login')
        popUpLogin(googleProvider)
            .then(result => {
                setLoading(false)
                setReload(true)
                setUserInfo({ displayName: result.user?.displayName, photoURL: result.user?.photoURL, email: result.user?.email, loginWith: "google" });
                console.log(userInfo)
                axiosPublic.get(`/users-new?email=${result.user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (!res.data.insertedId) {
                            // console.log(res.data.insertedId);
                            navigate('/')
                            return;
                        };
                        navigate('/new-biodata' || '/')

                    });
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
                setUserInfo({ displayName: result.user?.displayName, photoURL: result.user?.photoURL, email: result.user?.email, loginWith: "github" });
                console.log(userInfo)
                axiosPublic.get(`/users-new?email=${result.user?.email}`)
                    .then(res => {
                        console.log(res.data);
                        if (!res.data.insertedId) {
                            // console.log(res.data.insertedId);
                            navigate('/')
                            return;
                        };
                        navigate('/new-biodata' || '/')

                    });
            }).catch(err => {
                setLoading(false)
                console.log(err.message);
            })
    }
    return (
        <div className="">
            <Helmet>
                <title>WedMate | Login</title>
            </Helmet>
            <div className="lg:h-[250px] py-8 lg:pt-[140px] bg-[#ECF0F2] dark:bg-[#16343b]">
                <p className="text-center text-4xl font-semibold text-primary dark:text-primary2">Login</p>
                <p className="text-center mt-2 dark:text-Description2">Home/Login</p>
            </div>
            <div className="lg:px-20 px-6">
                {/* login form */}
                <div className="text-gray-700 bg-secondary2 dark:bg-[#16343B] mx-auto mt-12 dark:text-Description2 md:w-[550px] p-6  rounded-xl">
                    <h4 className="block text-center font-OpenSans text-4xl leading-snug text-blue-gray-900">
                        Login Account
                    </h4>
                    <p className="block mt-1 font-sans text-center text-base leading-relaxed text-Description dark:text-Description2">
                        Always keep updated.
                    </p>
                    <form onSubmit={handleSubmit} className=" lg:w-[500px]">
                        <div className="mt-6">
                            <p htmlFor="email" className="text-[12px]">Your Email <span className="text-red-500">*</span></p>
                            <input type="email" id="email" name="email" className="focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary " placeholder="Your Email" required />
                        </div>
                        <div className="mt-6">
                            <p htmlFor="password" className="text-[12px]  font-OpenSans">Your Password <span className="text-red-500">*</span></p>
                            <label className="relative">
                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="grow  focus:outline-none rounded-lg w-full px-4 py-2 mt-2 placeholder:text-sm bg-transparent border border-primary " placeholder="Your Password" required />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-[5%] right-6 cursor-pointer">
                                    {
                                        showPassword ? <IoMdEye className="text-xl" /> : <IoMdEyeOff className="text-xl" />

                                    }
                                </span>
                            </label>
                        </div>

                        <button className="mt-6 block w-full text-base font-Outfit select-none rounded-lg bg-primary py-2 text-white">
                            Login
                        </button>

                    </form>

                    <br />
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-500" />
                        <span className="mx-4 text-gray-500 dark:text-Description2">Or</span>
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-500" />
                    </div>

                    <button onClick={handleGoogleLogin} className="mt-8 border border-primary  rounded-lg w-full py-2 flex font-Outfit items-center justify-center gap-4">
                        <FcGoogle className="text-2xl" />Login with Google
                    </button>

                    <button onClick={handleGitHubLogin} className="mt-6 border border-primary  rounded-lg w-full py-2 flex font-Outfit items-center justify-center gap-4">
                        <IoLogoGithub className="text-2xl" />Login with GitHub
                    </button>

                    <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-Description dark:text-Description2">
                        Do not have an account? &nbsp;
                        <Link to="/sign-up" className="cursor-pointer  font-semibold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
