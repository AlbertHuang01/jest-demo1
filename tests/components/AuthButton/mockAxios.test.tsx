import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import AuthButton from "components/AuthButton";

describe("AuthButton Mock Axios", () => {
  it("可以正确展示普通用户按钮内容", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { userType: "user" },
    });

    render(<AuthButton>你好</AuthButton>);
    expect(await screen.findByText("普通用户你好")).toBeInTheDocument();
  });

  it("可以正确展示管理员按钮内容", async () => {
    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { userType: "admin" },
    });

    render(<AuthButton>你好</AuthButton>);
    expect(await screen.findByText("管理员你好")).toBeInTheDocument();
  });
});
