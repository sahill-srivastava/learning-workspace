import sum from "../sum";

test("xyz", () => {


    const res = sum(2, 3);

    //This is known as Assertion
    expect(res).toBe(7);
})