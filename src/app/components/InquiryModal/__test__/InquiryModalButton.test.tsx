import getTravelPackages from "@/app/lib/travelPackagesLoader";
import {fireEvent, screen} from "@testing-library/dom";
import {render} from "@test-utils/render";
import InquiryModalButton from "@/app/components/InquiryModal/InquiryModalButton";
// used module aliases: https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

// Todo Andrei: Remove .env.test file
describe("Test InquiryModal Button", () => {
    it("Should render sendBtn", async () => {
        // Arrange
        // Service Under Test
        const testTravelPackage = getTravelPackages();
        let tp = testTravelPackage[0].packages[0];
        const sut = <InquiryModalButton travelPackage={tp}/>;

        // Act
        render(sut);

        // Assert
        const sendBtn = await screen.findByTestId("sendBtn");
        expect(sendBtn).toBeInTheDocument();
    });
    it("Should render InquiryModal if SendBtn is clicked", async () => {
        // Arrange
        // Service Under Test
        const testTravelPackage = getTravelPackages();
        let tp = testTravelPackage[0].packages[0];
        tp.isFlexible = true;
        const sut = <InquiryModalButton travelPackage={tp}/>;

        // Act
        render(sut);
        const sendBtn = screen.getByTestId("sendBtn");
        fireEvent.click(sendBtn);

        // Assert
        const inquiryModal = await screen.findByTestId("inquiryModal");
        expect(inquiryModal).toBeInTheDocument();
    });
});
