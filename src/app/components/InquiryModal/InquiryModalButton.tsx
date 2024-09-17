import { useDisclosure } from "@mantine/hooks";
import { Button, ButtonVariant } from "@mantine/core";
import "@mantine/dates/styles.css";
import React from "react";
import InquiryModal from "@/app/components/InquiryModal/InquiryModal";
import { Tour } from "@/app/shared/domain/tour";

interface InquiryModalButtonProps {
  tour: Tour;
  children?: any;
  variant?: string | ButtonVariant;
}

const InquiryModalButton = ({ tour, children, variant }: InquiryModalButtonProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  // check if checkbox is clicked

  const sendBtn =
    typeof children == typeof (<Button />) ? (
      React.cloneElement(children, { onClick: open })
    ) : (
      <Button variant={variant ?? "primary"} onClick={open} data-testid="sendBtn">
        {children}
      </Button>
    );
  return (
    <>
      <InquiryModal tour={tour} isOpen={opened} closeFxn={close} />
      {sendBtn}
    </>
  );
};

export default InquiryModalButton;
