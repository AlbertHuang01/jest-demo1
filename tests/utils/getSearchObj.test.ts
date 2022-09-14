import getSearchObj from "utils/getSearchObj";

describe("getSearchObj", function () {
  it("should 获取当前网址的参数对象", function () {
    // 错误的形式
    // window.location.href = "https://www.baidu.com?a=1&b=2";

    // 1.通过 npm 包把 jsdom 添加到全部的形式
    // global.jsdom.reconfigure({
    //   url: "https://www.baidu.com?a=1&b=2",
    // });

    // 2.更方便的 npm 包  jest-location-mock
    window.location.assign("https://www.baidu.com?a=1&b=2");

    expect(window.location.search).toEqual("?a=1&b=2");
    expect(getSearchObj()).toEqual({
      a: "1",
      b: "2",
    });
  });

  it("空参数返回空", () => {
    // 错误的形式
    // window.location.href = "https://www.baidu.com";

    // 1.通过 npm 包把 jsdom 添加到全部的形式
    // global.jsdom.reconfigure({
    //   url: "https://www.baidu.com",
    // });

    // 2.更方便的 npm 包  jest-location-mock
    window.location.assign("https://www.baidu.com");

    expect(window.location.search).toEqual("");
    expect(getSearchObj()).toEqual({});
  });
});
