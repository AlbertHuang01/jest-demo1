import React from "react";
import { render } from "@testing-library/react";
import Title from "components/Title";

describe("Title", () => {
  it("可以正常渲染大字", () => {
    const { baseElement } = render(<Title type={"large"} title={"大字"} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("可以正常渲染小字", () => {
    const { baseElement } = render(<Title type={"small"} title={"小字"} />);
    expect(baseElement).toMatchSnapshot();
  });
});
