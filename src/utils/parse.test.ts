import { parse } from "./parse";

describe("parse/1", () => {
  test("should parse markdown string into html string", () => {
    const markdown = "# Slide 1\n---\n## Slide 2";

    const expectedHtmlSlide1 = `<svg data-marpit-svg="" viewBox="0 0 1280 720" className="code-line" data-line="0"><foreignObject width="1280" height="720"><section id="1">
<h1 className="code-line" data-line="0">Slide 1</h1>
</section>
</foreignObject></svg>`;
    const expectedHtmlSlide2 = `<svg data-marpit-svg="" viewBox="0 0 1280 720" className="code-line" data-line="1"><foreignObject width="1280" height="720"><section id="2">
<h2 className="code-line" data-line="2">Slide 2</h2>
</section>
</foreignObject></svg>`;

    const htmlArray = parse(markdown);

    expect(htmlArray[0]).toBe(expectedHtmlSlide1);
    expect(htmlArray[1]).toBe(expectedHtmlSlide2);
  });

  test("should inject line number as 'data-line' attribute", () => {
    const markdown = "# Slide 1\n---\n## Slide 2";
    const htmlArray = parse(markdown);
    expect(htmlArray[0].match(/data-line/g)).toHaveLength(2);
    expect(htmlArray[1].match(/data-line/g)).toHaveLength(2);
  });
});
