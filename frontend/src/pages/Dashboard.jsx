import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { userRoles } = useAuth();

    return <div>{userRoles.includes("admin") ? <p>Veri nais, uzeikit</p> : <p>Ate</p>}</div>;
};

export default Dashboard;
