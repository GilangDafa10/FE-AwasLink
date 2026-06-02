import { Outlet } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
};

export default LoginPage;
