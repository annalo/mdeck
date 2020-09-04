import { parse } from "./parse";

describe("parse/1", () => {
test("should parse markdown string into html string", () => {
    const markdown = "# Slide 1\n---\n## Slide 2";
    const expectedHtmlString = `<div class="marpit"><svg data-marpit-svg="" viewBox="0 0 1280 720" data-line="0"><foreignObject width="1280" height="720"><section id="1">
<h1 data-line="0">Slide 1</h1>
</section>
</foreignObject></svg><svg data-marpit-svg="" viewBox="0 0 1280 720" data-line="1"><foreignObject width="1280" height="720"><section id="2">
<h2 data-line="2">Slide 2</h2>
</section>
</foreignObject></svg></div>`;

    expect(parse(markdown)).toBe(expectedHtmlString);
  });

test("should inject line number as 'data-line' attribute", () => {
    const markdown = "# Slide 1\n---\n## Slide 2";
    const htmlString = parse(markdown)
    expect(htmlString.match(/data-line/g)).toHaveLength(4)
  });
});
