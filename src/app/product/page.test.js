import "@testing-library/jest-dom";
import { db } from "../../lib/db";
import ProductPage from './page';
import { render, screen } from "@testing-library/react";

jest.mock("next/navigation");

jest.mock("@/lib/db", () => ({
  db: {
    tumbler: {
      findMany: jest.fn()
    }
  }
}));

describe("Product Page", () => {
  it("Render correctly with list product", async () => {
    const data = [
      {
        id: 1,
        category_id: "asdf",
        name: "Product 1",
        brand: "test",
        stock: 12,
        price: 100,
        desc: "Description Product 1",
        color: ["#000000"],
        type: "Sedang",
        images: "121212.png",
        created_at: "12 December", 
        updated_at: "12 December",
        shipping: false,
        featured: false,
      }
    ];
    
    db.tumbler.findMany.mockResolvedValue(data);

    render(await (async () => await ProductPage())())

    const category1 = await screen.findByText("Product 1")

    expect(category1).toBeInTheDocument()

  });
});
