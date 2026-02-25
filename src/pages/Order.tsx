import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import FoodOrder from "../components/FoodOrder";
import { FormattedMessage } from "react-intl";

export default function Order() {
    const { id } = useParams();
    const navigate = useNavigate();

    const food = useSelector((state: RootState) =>
        state.menu.find((item) => item.id === Number(id))
    );

    if (!food) {
        return (
            <p className="mt-6 text-center text-gray-600">
                <FormattedMessage id="app.productNotFound" />
            </p>
        );
    }

    return (
        <div className="px-4">
            <FoodOrder food={food} onReturnMenu={() => navigate("/")} />
        </div>
    );
}
