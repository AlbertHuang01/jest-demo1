import reducer, { updateUserName } from "store/user/reducer";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import server from "../../mockServer/server";
import { rest } from "msw";
import { fetchUserThunk } from "store/user/thunks";

const setupHttp = (name?: string, age?: number) => {
  server.use(
    rest.get("https://mysite.com/api/users", async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          id: "1",
          name: name || "Jack",
          age: age || 18,
        })
      );
    })
  );
};

describe("reducer", () => {
  describe("测试 reducer", () => {
    describe("updateUserName", () => {
      it("可以更新用户姓名", () => {
        const currentState = reducer(
          {
            id: "",
            name: "",
            age: 0,
            status: "",
          },
          updateUserName({ name: "hello" })
        );

        expect(currentState.name).toEqual("hello");
      });
    });

    describe("fetchUserThunk", () => {
      it("可以获取用户", async () => {
        setupHttp("Mary", 10);

        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({
          id: "",
          name: "",
          age: 0,
          status: "",
        });

        // 开始 dispatch
        // @ts-ignore
        const data = await store.dispatch(fetchUserThunk());

        expect(data.payload).toEqual({
          id: "1",
          name: "Mary",
          age: 10,
        });
      });
    });
  });
});
