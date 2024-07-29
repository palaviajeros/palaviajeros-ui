import InquiryModal from "@/app/components/InquiryModal/InquiryModal";
import getTravelPackages from "@/app/lib/travelPackages";
import { screen } from "@testing-library/dom";
import { render } from "@test-utils/render";
import { setup } from "bs-logger";
// used module aliases: https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

// Todo Andrei: Remove .env.test file
describe("Test contents of Inquiry Modal", () => {
  it("Should not render checkbox flexible if package not flexible", async () => {
    // Arrange
    // Service Under Test
    const testTravelPackage = getTravelPackages();
    let tp = testTravelPackage[0].packages[0];
    tp.isFlexible = false;
    const sut = <InquiryModal travelPackage={tp} />;

    // Act
    render(sut);

    // Assert
    const checkBoxFlexible = screen.queryByTestId("checkBoxFlexible");
    expect(checkBoxFlexible).not.toBeInTheDocument();
  });
});
