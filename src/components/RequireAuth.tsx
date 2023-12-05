import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = () => {
    if (!auth?.user) {
      router.push("/guest");
      setRedirecting(true);
    }
  };

  return (
    <>
      {!auth?.user && redirecting && router.pathname !== "/guest" && router.pathname !== "/login" && (
        <div>
          You need to be logged in to access this page. Please log in <a href="/guest">here</a>.
        </div>
      )}

      <div onClick={handleRedirect}>{children}</div>
    </>
  );
};

export default RequireAuth;
