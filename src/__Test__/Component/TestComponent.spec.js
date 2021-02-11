import React from "react";
import { create } from "react-test-renderer";

import BoshokaComponent from "../../Components/BoshokaComponent";

describe("Boshoka component", () => {
  test("Matches the snapshot", () => {
    const boshoka = create(
      <BoshokaComponent props={{ msg: "Hello World!", repeat: 5 }} />
    );
    expect(boshoka.toJSON()).toMatchSnapshot();
  });
});
