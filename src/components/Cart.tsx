import type { MenuItem } from "../entities/entities";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/slices/cartSlice";
import { FormattedMessage, FormattedNumber } from "react-intl";

interface CartProps {
    cartItems: { item: MenuItem; quantity: number }[];
    onRemoveItem(id: number): void;
    onSendOrder(): void;
}

function Cart(props: CartProps) {
    const dispatch = useDispatch();

    const total = props.cartItems.reduce(
        (sum, entry) => sum + entry.item.price * entry.quantity, 0
    );

    return (
        <div className="max-w-xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-2">
                <FormattedMessage id="app.cart" />
            </h3>

            {props.cartItems.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                    <FormattedMessage id="app.emptyCart" />
                </p>
            )}

            <ul className="space-y-3">
                {props.cartItems.map((entry) => (
                    <li
                        key={entry.item.id}
                        className="flex items-center justify-between border-b pb-2 last:border-b-0"
                    >
                        <p className="text-sm font-medium">
                            {entry.item.name} x {entry.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                            <FormattedNumber
                                value={entry.item.price * entry.quantity}
                                style="currency"
                                currency="EUR"
                            />
                        </p>
                        <button
                            className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                            onClick={() => dispatch(removeFromCart(entry.item.id))}
                        >
                            <FormattedMessage id="app.delete" />
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between pt-2 border-t mt-2">
                <h4 className="font-semibold">
                    Total:{" "}
                    <span className="text-gray-800">
                        <FormattedNumber value={total} style="currency" currency="EUR" />
                    </span>
                </h4>
                <button
                    className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm"
                    onClick={props.onSendOrder}
                >
                    <FormattedMessage id="app.sendOrder" />
                </button>
            </div>
        </div>
    );
}

export default Cart;
