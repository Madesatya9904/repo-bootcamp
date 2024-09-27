// __testing__/index.spec.js

import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { useRouter } from "next/navigation"
import Testing from "../app/test/testing"

// mockup router
const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn()
}
// melakukan mocking untuk next navigation
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}))

describe("Testing Home Page", () => {
  it("renders testing page correctly", () => {
    // render komponent HomePage
    render(<Testing />)
    // assertions atau expetasi
    expect(screen.getByText("Welcome to about")).toBeInTheDocument()
    expect(screen.getByText("about")).toBeInTheDocument()

  })
  it("Navigate to about page on button click", () => {
    render(<Testing />)
    // simulasi klik tombol "go to about"
    fireEvent.click(screen.getByText("Go to About"))
    // assertions atau expetasi
    expect(mockRouter.push).toHaveBeenCalledWith("/about")
  })
})
