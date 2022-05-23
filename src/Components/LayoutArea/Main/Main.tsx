import { Outlet } from "react-router-dom";
import Routing from "../../Pages/Routing/Routing";
import Menu from "../Menu/Menu";
import "./Main.css";

function Main(): JSX.Element {
    return (
        <div className="Main">
            <Routing/>
            <Outlet/>
        </div>
    );
}

export default Main;
