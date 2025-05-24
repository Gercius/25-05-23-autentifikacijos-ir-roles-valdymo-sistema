import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { userRoles } = useAuth();
    const isAdmin = userRoles.includes("admin");

    return <div>{isAdmin ? <p>Sveiki admin</p> : <p>Sveiki {userRoles[0]}</p>}</div>;
};

export default Dashboard;
