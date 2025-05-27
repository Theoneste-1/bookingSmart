import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UseAuth:React.FC< {
    children: React.ReactNode
}> = ({children}) => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // No token found, redirect to login page
      router.push("/login");
    } else {
      // Token found, you might want to verify it or fetch user details here
      // For now, let's assume a valid token means the user is authenticated

      // TODO: Implement logic to determine user role and redirect accordingly
      // Example basic redirection:
      // if (userRole === 'admin') {
      //   navigate('/admin/dashboard');
      // } else {
      //   navigate('/user/dashboard');
      // }

      // Placeholder for redirection if role-based logic is not yet implemented
      router.push("/dashboard"); // Redirect to a default dashboard
    }
  }, [router]); // Depend on navigate to avoid lint warnings

 return <div>{children}</div>
};

export default UseAuth;
