import { render, screen } from "@testing-library/react";
import UserList from "../UserList";




it("fetch example", async () => {

    const data = [
        {
            id: 1,
            name: "Sahil",
        },
    ];

    global.fetch = jest.fn(() => 
         Promise.resolve({
            json: () =>  Promise.resolve(data)
        })
   )

    render(<UserList />);

    const user = await screen.findByText("Sahil");

    expect(user).toBeInTheDocument();
})