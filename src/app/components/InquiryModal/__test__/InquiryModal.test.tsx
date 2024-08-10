import {getCountryTravelPackages} from "@/app/actions/travelPackagesLoader";
import {screen} from "@testing-library/dom";
import {render} from "@test-utils/render";
import InquiryModal from "@/app/components/InquiryModal/InquiryModal";
// used module aliases: https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases

// Todo Andrei: Remove .env.test file
describe("Test contents of Inquiry Modal", () => {
    it("Should render checkBox if package is flexible", async () => {
        // Arrange
        // Service Under Test
        const testTravelPackage = await getCountryTravelPackages();
        let tp = testTravelPackage[0].packages[0];
        tp.isFlexible = true;
        const sut = (
            <InquiryModal travelPackage={tp} isOpen={true} closeFxn={() => {
            }}/>
        );

        // Act
        render(sut);

        // Assert
        const inquiryModal = await screen.findByTestId("checkBoxFlexible");
        expect(inquiryModal).toBeInTheDocument();
    });

    it("Should not render checkBox if package is not flexible", async () => {
        // Arrange
        // Service Under Test
        const testTravelPackage = await getCountryTravelPackages();
        let tp = testTravelPackage[0].packages[0];
        tp.isFlexible = false;
        const sut = (
            <InquiryModal travelPackage={tp} isOpen={true} closeFxn={() => {
            }}/>
        );

        // Act
        render(sut);

        // Assert
        const inquiryModal = screen.queryByTestId("checkBoxFlexible");
        // query does not fail if element is not in the screen
        // get and find fails if element is not in screen
        expect(inquiryModal).not.toBeInTheDocument();
    });
    //Todo Lea and Sam: Write tests to check if datepicker is displayed when checkbox is ticked
});
