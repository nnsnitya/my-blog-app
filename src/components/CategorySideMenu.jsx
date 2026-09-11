import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { toast } from "react-toastify";

const CategorySideMenu = () => {

    return (
        <div>
            <ListGroup>
                <ListGroupItem action={true} className="border-0">
                    All Blogs
                </ListGroupItem>
                <ListGroupItem action={true} className="border-0">
                    Programming
                </ListGroupItem>
            </ListGroup>
        </div>
    );
};

export default CategorySideMenu;