import {
  Button,
  ButtonVariant,
  Checkbox,
  Group,
  Modal,
  rem,
  Select,
  Text,
  Textarea,
  TextInput,
  Anchor
} from "@mantine/core";
import ReCAPTCHA from "react-google-recaptcha";
import { handleCaptchaSubmission } from "@/app/lib/recaptcha/verifyRecaptcha";
import React, { useRef, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { addDays, format, startOfToday } from "date-fns";
import { formatDateRange, getDateDifference } from "@/app/util/Helpers";
import { InquiryEmailTemplateProps } from "@/app/components/Email/inquiry-email-template";
import { sendInquiry } from "@/app/lib/resend/send-inquiry";
import { notifications } from "@mantine/notifications";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { TravelPackageDto } from "@/app/shared/models/travelPackageDto";

interface InquiryModalProps {
  travelPackage: TravelPackageDto;
  isOpen: boolean;
  closeFxn: () => void;
}

const InquiryModal = ({
  travelPackage,
  isOpen,
  closeFxn
}: InquiryModalProps) => {
  const [checked, setChecked] = useState(false);
  // value of DatePickerInput
  const [customDate, setCustomDate] = useState<string | undefined>();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const travelDatesOptions = Array.from(
    new Set(travelPackage.travelDates.map((td) => formatDateRange(td)))
  );
  const noOfPeopleOptions = new Array(15).fill(null).map((_, i) => `${i + 1}`);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      contactNo: "",
      travelDates: travelDatesOptions[0],
      customDates: customDate,
      noOfPax: "",
      message: "",
      travelPackage: travelPackage.name
    },

    onValuesChange: (values) => {
      // update custom date format after user has selected a custom date
      if (checked && values.customDates) {
        setCustomDate(
          `${format(values.customDates, "dd MMM yyyy")} - ${format(addDays(values.customDates, getDateDifference(travelDatesOptions[0])), "dd MMM yyyy")}`
        );
      } else {
        setCustomDate("");
        form.setFieldValue("customDates", undefined);
      }
    },
    validate: {
      email: isEmail("Invalid email"),
      contactNo: matches(
        /^[+]?[(]?[0-9]{2,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number format"
      ),
      noOfPax: isNotEmpty(),
      message: isNotEmpty(),
      travelDates: !customDate ? isNotEmpty() : undefined,
      customDates: checked ? isNotEmpty() : undefined
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        let emailTemplateProps = {
          ...values,
          travelPackage,
          inquiryDate: format(new Date(), "dd MMM yyyy HH:mm:ss"),
          travelDates: customDate ? customDate : form.getValues().travelDates
        } as InquiryEmailTemplateProps;
        await sendInquiry(emailTemplateProps)
          .then((_) =>
            notifications.show({
              id: "inquiry-notif",
              withCloseButton: true,
              title: `Inquiry Sent: ${travelPackage.name}`,
              message: `Hey there, we received your inquiry for ${travelPackage.name} on ${customDate ? customDate : form.getValues().travelDates} and we will respond to you shortly! Thank you for your patience!`,
              color: "green",
              autoClose: 10000
            })
          )
          .catch((_) =>
            notifications.show({
              id: "inquiry-notif-error",
              withCloseButton: true,
              title: `Inquiry Sent: ${travelPackage.name}`,
              message: `Hey there, we attempted to send your inquiry but an unexpected error occurred. Please try again shortly`,
              color: "red",
              autoClose: 10000
            })
          );
        // save values here
        form.reset();
        closeFxn();
        // Reset captcha token after form submission
        recaptchaRef.current?.reset();
      } else {
        notifications.show({
          id: "captcha-error",
          withCloseButton: true,
          title: "CAPTCHA Error",
          message: "Failed to complete CAPTCHA. Please try again.",
          color: "red",
          autoClose: 3000
        });
      }
    }
  };

  const inquireUsForm = (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Travel Package"
        key={form.key("travelPackage")}
        {...form.getInputProps("travelPackage")}
        readOnly
      />

      <TextInput
        mt="sm"
        withAsterisk
        label="Name"
        placeholder="How do you want us to address you?"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        mt="sm"
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <TextInput
        mt="sm"
        withAsterisk
        label="Contact Number"
        placeholder="(+XXX) (XXX)-(XXXXXX)"
        key={form.key("contactNo")}
        {...form.getInputProps("contactNo")}
      />

      <Select
        mt="sm"
        withAsterisk
        label="Travel Dates"
        placeholder="Pick travel dates"
        data={travelDatesOptions}
        key={form.key("travelDates")}
        {...form.getInputProps("travelDates")}
        required
        disabled={checked}
        data-testid="selectDates"
      />
      {travelPackage.isFlexible && (
        <>
          <Checkbox
            mt="xs"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
            label="I want to choose my own travel dates"
            display="block"
            data-testid="checkBoxFlexible"
          />

          <Group display={checked ? "block" : "none"}>
            <DatePickerInput
              mt="xs"
              placeholder="Pick start date"
              leftSection={
                <IconCalendar
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              clearable
              minDate={startOfToday()}
              required
              {...form.getInputProps("customDates")}
              key={form.key("customDates")}
            />
            {customDate && (
              <Text mt="xs" size="sm" c="var(--mantine-color-indigo-7)">
                <b>[{getDateDifference(travelDatesOptions[0])}-day package]:</b>{" "}
                {customDate}
              </Text>
            )}
          </Group>
        </>
      )}
      <Select
        mt="sm"
        withAsterisk
        label="Number of people"
        placeholder="How many people are going?"
        data={[...noOfPeopleOptions, `${noOfPeopleOptions.length + 1} +`]}
        key={form.key("noOfPax")}
        {...form.getInputProps("noOfPax")}
        required
      />

      <Textarea
        mt="sm"
        withAsterisk
        label="Travel details"
        description="Tell us more about your trip. How many people? When? We can customize based on your needs"
        key={form.key("message")}
        {...form.getInputProps("message")}
        radius={"sm"}
      />
      <Text size="10px" c="dimmed" mt="xs">
        This site is protected by reCAPTCHA and the Google{" "}
        <Anchor
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          c="blue"
        >
          Privacy Policy
        </Anchor>{" "}
        and{" "}
        <Anchor
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          c="blue"
        >
          Terms of Service
        </Anchor>{" "}
        apply.
      </Text>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Send</Button>
      </Group>
    </form>
  );
  return (
    <Modal
      opened={isOpen}
      onClose={closeFxn}
      title="Book your trip with us!"
      radius={10}
      transitionProps={{ transition: "fade", duration: 200 }}
      centered
      data-testid="inquiryModal"
    >
      {inquireUsForm}
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        size="invisible"
        onChange={handleCaptchaSubmission}
      />
    </Modal>
  );
};

export default InquiryModal;
