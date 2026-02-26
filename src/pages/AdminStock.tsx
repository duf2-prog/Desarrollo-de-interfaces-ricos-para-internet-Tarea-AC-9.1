import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { FormattedMessage } from "react-intl";

export default function AdminStock() {
    const menu = useSelector((state: RootState) => state.menu);

    return (
        <div className="max-w-3xl mx-auto mt-8 px-4">
            <h2 className="text-xl font-semibold mb-4">
                <FormattedMessage id="app.productsStock" />
            </h2>
            <ul className="space-y-2">
                {menu.map(item => (
                    <li
                        key={item.id}
                        className="flex items-center justify-between bg-white shadow-sm rounded px-4 py-2"
                    >
                        <p className="font-medium text-gray-800"><FormattedMessage>{item.name}</FormattedMessage></p>
                        <p className="text-sm text-gray-600">
                            <FormattedMessage id="app.available" />: {item.quantity}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
