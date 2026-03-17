import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const [ok, setOk] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {

        api.get("/tasks")
            .then(() => setOk(true))
            .catch(() => {
                navigate('/');
            });

    }, []);

    return ok ? children : <p>Loading...</p>;
  
}

export default ProtectedRoute
