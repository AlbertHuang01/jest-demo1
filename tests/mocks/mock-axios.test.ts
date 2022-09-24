import axios from "axios";

jest.mock("axios");

// 方案1：ts 不友好
// test("should fetch data", async () => {
//   const resp = { data: 666 };
//   //@ts-ignore
//   axios.get.mockResolvedValue(resp);
//
//   const response = await axios.get("sss");
//   expect(response).toEqual(resp);
// });

// 方案2
test("should fetch data", async () => {
  const resp = { data: 666 };
  jest.spyOn(axios, "get").mockResolvedValue(resp);

  const response = await axios.get("sss");
  expect(response).toEqual(resp);
});
