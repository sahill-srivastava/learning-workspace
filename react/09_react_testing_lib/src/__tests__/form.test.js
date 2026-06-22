
import { render, screen } from "@testing-library/react"


import Form from "../Form"

test("test form", () => {

    render(<Form />);


    const button = screen.getByText("Submit");

    expect(button).toBeInTheDocument();

})