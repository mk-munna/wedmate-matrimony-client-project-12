import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContextProvider";


const useAdmin = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('checking is admin', user)
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.admin;
        }
    })
    // console.log('isAdmin', isAdmin)
    return [isAdmin, isAdminLoading]
};

export default useAdmin;