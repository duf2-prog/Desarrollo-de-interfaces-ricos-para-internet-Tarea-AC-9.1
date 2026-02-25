import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../App.tsx';

afterEach(() => {
    cleanup();
});

describe("Carta inicial", () => {
    it("muestra cuatro productos con nombre, stock e imagen", async () => {
        render(<App />)
        
        const names = screen.getAllByText(/Hamburguesa de pollo|Hamburguesa vegetariana|Patatas fritas|Helado/i);
        expect(names.length).toBe(4);

        const stocks = screen.getAllByText(/Disponible:/i);
        expect(stocks.length).toBe(4);

        // La carta principal no tiene imágenes
        // const images = screen.getAllByRole("img");
        // expect(images.length).toBe(4);        
    });
})

afterEach(() => {
    cleanup();
});

describe("Pantalla Pedir Comida", () => {
    it("muestra cuatro productos, imagen y algún precio", async () => {
        render(<App />)
        
        const button = screen.getByText("Pedir Comida");
        fireEvent.click(button);

        const images = await screen.findAllByRole("img");
        expect(images.length).toBe(4);

        const price = screen.getAllByText(/€/i);
        expect(price.length).toBeTruthy();        
    })
})

afterEach(() => {
    cleanup();
});

describe("Actualización del precio en FoolOrder", () => {
    it("actualiza el precio al cambiar la cantidad", async () => {
        render(<App />)

            const button = screen.getByText("Pedir Comida");
            fireEvent.click(button);

            const images = await screen.findAllByRole("img");
            fireEvent.click(images[0]);
            
            const initialPrice = screen.getByText((c) => c.includes("€")).textContent;
            const input = screen.getByRole("spinbutton");
            
            fireEvent.change(input, { target: { value: '3' } });
            const updatePrice = screen.getByText((c) => c.includes("€")).textContent;
            expect(updatePrice).not.toBe(initialPrice);
    });
})