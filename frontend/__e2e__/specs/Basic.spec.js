import { ok } from "assert";

describe("Delegation Assistance page", () => {
  it("should have the right title", () => {
    browser.url("");
    const title = browser.getTitle();
    ok(title.endsWith("Delegation Assistant"));
  });
});
