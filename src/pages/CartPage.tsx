import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import Cart from "../components/Cart";
import { removeFromCart, clearCart, sendOrder } from "../store/slices/cartSlice";
import { reduceStock } from "../store/slices/menuSlice";
import { FormattedMessage } from "react-intl";

export default function CartPage() {
    const cart = useSelector((state: RootState) => state.cart.items);
    const loading = useSelector((state: RootState) => state.cart.loading);
    const dispatch = useDispatch<AppDispatch>();

    const handleSendOrder = async () => {
        cart.forEach(entry => {
            dispatch(reduceStock({ id: entry.item.id, quantity: entry.quantity }));
        });

        await dispatch(sendOrder(cart));
        dispatch(clearCart());
    };

    return (
        <div className="max-w-5xl mx-auto mt-6 px-4 space-y-4">
            <Cart
                cartItems={cart}
                onRemoveItem={(id) => dispatch(removeFromCart(id))}
                onSendOrder={handleSendOrder}
            />

            {loading && (
                <p className="text-sm text-gray-600">
                    <FormattedMessage id="app.sendingOrder" />
                </p>
            )}
        </div>
    );
}
