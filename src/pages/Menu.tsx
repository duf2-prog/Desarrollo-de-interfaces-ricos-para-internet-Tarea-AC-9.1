import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Foods from "../components/Foods";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const menuItems = useSelector((state: RootState) => state.menu);
    const navigate = useNavigate();

    return (
        <Foods
            foodItems={menuItems}
            onFoodClick={(food) => navigate(`/order/${food.id}`)}
        />
    );
}
