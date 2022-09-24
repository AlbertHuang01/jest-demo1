import { config } from "utils/env";

// 方案1
describe("doMock config", () => {
  beforeEach(() => {
    // 必须重置模块，否则无法再次应用 doMock 的内容
    jest.resetModules();
  });

  it("开发环境", () => {
    jest.doMock("utils/env", () => ({
      __esModule: true,
      config: {
        getEnv: () => "dev",
      },
    }));

    const { config } = require("utils/env");
    expect(config.getEnv()).toEqual("dev");
  });

  it("正式环境", () => {
    jest.doMock("utils/env", () => ({
      __esModule: true,
      config: {
        getEnv: () => "prod",
      },
    }));

    const { config } = require("utils/env");
    expect(config.getEnv()).toEqual("prod");
  });
});

// 方案2:更简便
describe("doMock config with spyOn", () => {
  // 不是使用 doMock，可以去掉
  // beforeEach(() => {
  //   // 必须重置模块，否则无法再次应用 doMock 的内容
  //   jest.resetModules();
  // });

  it("开发环境", () => {
    jest.spyOn(config, "getEnv").mockReturnValue("dev");

    expect(config.getEnv()).toEqual("dev");
  });

  it("正式环境", () => {
    jest.spyOn(config, "getEnv").mockReturnValue("prod");
    expect(config.getEnv()).toEqual("prod");
  });
});
