import { useContext } from "react";
import type { MenuItem } from "../entities/entities";
import { AuthContext } from "../contexts/AuthContext";
import { FormattedMessage, FormattedNumber } from "react-intl";

interface FoodsProps {
    foodItems: MenuItem[];
    onFoodClick(food: MenuItem): void;
}

function Foods(props: FoodsProps) {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h4 className="text-2xl font-semibold mb-1">
                <FormattedMessage id="app.menu" />
            </h4>

            {!user && (
                <p className="text-sm text-gray-500 mb-4">
                    <FormattedMessage id="app.foodSubtitleNotLoged" />
                </p>
            )}
            {user && (
                <p className="text-sm text-gray-500 mb-4">
                    <FormattedMessage id="app.foodSubtitleLoged" />
                </p>
            )}

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {props.foodItems.map((item) => (
                    <li
                        key={item.id}
                        className={`bg-white shadow rounded-lg overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg ${
                            !user ? "cursor-not-allowed opacity-80" : ""
                        }`}
                        onClick={user ? () => props.onFoodClick(item) : undefined}
                    >
                        <img
                            className="w-full h-40 object-cover"
                            src={`${import.meta.env.BASE_URL}images/${item.image}`}
                            alt={item.name}
                        />
                        <div className="p-4 space-y-1">
                            <p className="font-semibold text-gray-800">
                                <FormattedMessage id={item.name} />
                            </p>
                            <p className="text-sm text-gray-600">
                                <FormattedMessage id={item.desc} />
                            </p>
                            <p className="text-sm font-semibold text-emerald-700 mt-1">
                                <FormattedNumber value={item.price} style="currency" currency="EUR" />
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Foods;
