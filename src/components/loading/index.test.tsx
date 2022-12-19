import { render } from "@testing-library/react";
import { Loading } from ".";

test("should render as expected", () => {
  const { asFragment } = render(<Loading />);

  expect(asFragment()).toMatchInlineSnapshot(`
<DocumentFragment>
  <div
    class="loadingContainer"
    data-testid="loading-element"
  >
    <img
      class="loading"
      height="15px"
      src="./public/bud.svg"
      width="37px"
    />
  </div>
</DocumentFragment>
`);
});
