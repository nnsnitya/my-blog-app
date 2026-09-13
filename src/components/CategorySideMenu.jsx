import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategorySideMenu = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAllCategories().then(resp => {
            console.log("Category response: ", resp);
            setCategories([...resp.data]);
        }).catch(error => {
            console.log(error);
            toast.error("error in loading categories");
        })
    }, []);

    return (
        <div>
            <ListGroup>
                <ListGroupItem tag={Link} to="/" action={true} className="border-0">
                    All Blogs
                </ListGroupItem>
                {categories && categories.map((cat) => {
                    return (
                        <ListGroupItem tag={Link} to={'/categories/' + cat.categoryId} className="border-0 shadow mt-1" key={cat.categoryId} action={true}>
                            {cat.categoryTitle}
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </div>
    );
};

export default CategorySideMenu;