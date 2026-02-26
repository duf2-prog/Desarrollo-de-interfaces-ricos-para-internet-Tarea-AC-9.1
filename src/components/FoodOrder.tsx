import { useState, type MouseEventHandler } from "react";
import type { MenuItem } from "../entities/entities";
import logger from "../services/logging";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

interface FoodOrderProps {
    food: MenuItem;
    onReturnMenu: MouseEventHandler<HTMLButtonElement> | undefined;
}

function FoodOrder(props: FoodOrderProps) {
    const [totalAmount, setTotalAmount] = useState(props.food.price);
    const [quantity, setQuantity] = useState<number>(1);
    const [isOrdered, setIsOrdered] = useState(false);

    const dispatch = useDispatch();
    const intl = useIntl();

    const handleClick = () => {
        logger.info(`Añadido al carrito: ${props.food.name} x ${quantity}`);
        setIsOrdered(true);
        dispatch(addToCart({ item: props.food, quantity }));
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b">
                <h3 className="text-2xl font-semibold">
                    <FormattedMessage id={props.food.name} />
                </h3>
            </div>

            <img
                className="w-full h-64 object-cover"
                src={`${import.meta.env.BASE_URL}images/${props.food.image}`}
                alt={props.food.name}
            />

            <div className="p-6 space-y-4">
                <p className="text-gray-700">
                    <FormattedMessage id={props.food.desc} />
                </p>

                <div className="grid gap-4 md:grid-cols-3 items-end">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                            <FormattedMessage id="app.amount" />
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={props.food.quantity}
                            value={quantity}
                            onChange={e => {
                                const value = Number(e.target.value);
                                setQuantity(value);
                                setTotalAmount(props.food.price * value);
                            }}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder={intl.formatMessage({ id: "app.name" })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                        type="text"
                        placeholder={intl.formatMessage({ id: "app.phone" })}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <p className="text-lg font-semibold text-emerald-700">
                    <FormattedNumber value={totalAmount} style="currency" currency="EUR" />
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 p-6 border-t">
                <button
                    className="flex-1 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-medium"
                    onClick={handleClick}
                >
                    <FormattedMessage id="app.sendOrder" />
                </button>

                <button
                    className="flex-1 px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
                    onClick={props.onReturnMenu}
                >
                    <FormattedMessage id="app.returnMenu" />
                </button>
            </div>

            {isOrdered && (
                <p className="px-6 pb-4 text-sm text-emerald-700 font-medium">
                    <FormattedMessage id="app.foodAddMessage" />
                </p>
            )}
        </div>
    );
}

export default FoodOrder;
