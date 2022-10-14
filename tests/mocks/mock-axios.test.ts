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

test('mock replace method', async () => {
  const axiosPost = jest.spyOn(axios, "post")
  await axios.post('/666', { id: 777 })
  // 断言调用 axios post 方法的参数
  expect(axiosPost).toBeCalledWith('/666', { id: 777 })
})
