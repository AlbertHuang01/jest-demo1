import useCounter from "hooks/useCounter";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { current } from "@reduxjs/toolkit";

// 测试组件
const UseCounterTest = () => {
  const [counter, { inc, set, dec, reset }] = useCounter(0);
  return (
    <section>
      <div>Counter:{counter}</div>
      <button onClick={() => inc(1)}>inc(1)</button>
      <button onClick={() => dec(1)}>dec(1)</button>
      <button onClick={() => set(10)}>set(10)</button>
      <button onClick={reset}>reset()</button>
    </section>
  );
};

// 方案1 ,手动构造并实例化测试 hook 用组件
// describe("useCounter", () => {
//   it("可以做加法", async () => {
//     render(<UseCounterTest />);
//
//     const incBtn = screen.getByText("inc(1)");
//     await userEvent.click(incBtn);
//     expect(screen.getByText("Counter:1")).toBeInTheDocument();
//   });
//
//   it("可以做减法", async () => {
//     render(<UseCounterTest />);
//
//     const decBtn = screen.getByText("dec(1)");
//     await userEvent.click(decBtn);
//     expect(screen.getByText("Counter:-1")).toBeInTheDocument();
//   });
//
//   it("可以设置值", async () => {
//     render(<UseCounterTest />);
//
//     const setBtn = screen.getByText("set(10)");
//     await userEvent.click(setBtn);
//     expect(screen.getByText("Counter:10")).toBeInTheDocument();
//   });
//
//   it("可以重置值", async () => {
//     render(<UseCounterTest />);
//
//     const incBtn = screen.getByText("inc(1)");
//     const resetBtn = screen.getByText("reset()");
//
//     await userEvent.click(incBtn);
//     await userEvent.click(resetBtn);
//
//     expect(screen.getByText("Counter:0")).toBeInTheDocument();
//   });
// });

const setup = (initialNumber: number) => {
  const returnVal = {};

  const UseCounterTest = () => {
    const [counter, utils] = useCounter(initialNumber);

    Object.assign(returnVal, {
      counter,
      utils,
    });

    return null;
  };

  render(<UseCounterTest />);

  return returnVal;
};

// 方案2，把测试组件实例化封装
// describe("useCounter", () => {
//   it("可以做加法", async () => {
//     const useCounterData: any = setup(0);
//     act(() => {
//       useCounterData.utils.inc(1);
//     });
//     expect(useCounterData.counter).toEqual(1);
//   });
//
//   it("可以做减法", async () => {
//     const useCounterData: any = setup(0);
//     act(() => {
//       useCounterData.utils.dec(1);
//     });
//     expect(useCounterData.counter).toEqual(-1);
//   });
//
//   it("可以设置值", async () => {
//     const useCounterData: any = setup(0);
//     act(() => {
//       useCounterData.utils.set(10);
//     });
//     expect(useCounterData.counter).toEqual(10);
//   });
//
//   it("可以重置值", async () => {
//     const useCounterData: any = setup(0);
//     act(() => {
//       useCounterData.utils.inc(1);
//       useCounterData.utils.reset();
//     });
//     expect(useCounterData.counter).toEqual(0);
//   });
// });

// 方案3 使用 @testing-library/react-hooks 提供 renderHook
describe("useCounter", () => {
  it("可以做加法", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(1);
    });

    expect(result.current[0]).toEqual(1);
  });

  it("可以做减法", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].dec(1);
    });

    expect(result.current[0]).toEqual(-1);
  });

  it("可以设置值", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(10);
    });

    expect(result.current[0]).toEqual(10);
  });

  it("可以重置值", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current[1].inc(1);
      result.current[1].reset();
    });

    expect(result.current[0]).toEqual(0);
  });

  it("可以使用最大值", () => {
    const { result } = renderHook(() => useCounter(100, { max: 10 }));

    expect(result.current[0]).toEqual(10);
  });

  it("可以使用最小值", () => {
    const { result } = renderHook(() => useCounter(0, { min: 10 }));

    expect(result.current[0]).toEqual(10);
  });
});
