import sleep from "utils/sleep";

describe("sleep", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("可以睡眠 1000ms", async () => {
    const mockCallback = jest.fn();

    const act = async (callback: () => void) => {
      await sleep(1000);
      callback();
    };

    const promise = act(mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.runAllTimers();
    await promise;
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
