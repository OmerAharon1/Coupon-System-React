import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./AdminDashboard.css";

function AdminDashboard(): JSX.Element {
    return (
        <div className="AdminDashboard">
			            <button><CustomLink to="addCompany">Add Company</CustomLink></button>
                        <button><CustomLink to="companiesList">Get all companies</CustomLink></button>
                        <button><CustomLink to="customersList">Get all customers</CustomLink></button>




                        {/* <button><CustomLink to="deleteCompany">Delete Company</CustomLink>
</button> */}
        </div>
    );
}

export default AdminDashboard;
