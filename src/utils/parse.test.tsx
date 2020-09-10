import React from "react";
import { render } from "@testing-library/react";
import { parse } from "./parse";

describe("parse/1", () => {
  test("should parse markdown string into html string", () => {
    const markdown = "# Slide 1\n---\n## Slide 2\n* Bullet 1\n* Bullet 2";
    const htmlArray = parse(markdown);

    const { asFragment } = render(
      <div dangerouslySetInnerHTML={{ __html: htmlArray[0] }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should inject line number as 'data-line' attribute", () => {
    const markdown = "# Slide 1\n---\n## Slide 2";
    const htmlArray = parse(markdown);
    expect(htmlArray[0].match(/data-line/g)).toHaveLength(2);
    expect(htmlArray[1].match(/data-line/g)).toHaveLength(2);
  });

  test("should highlight syntax", () => {
    const markdown =
      "```js\nvar foo = function (bar) {\n  return bar++;\n};\n\nconsole.log(foo(5));\n```";
    const htmlArray = parse(markdown);

    const { asFragment } = render(
      <div dangerouslySetInnerHTML={{ __html: htmlArray[0] }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
