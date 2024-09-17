"use client";
import { Anchor, Button, Checkbox, Group, Modal, rem, Select, Text, Textarea, TextInput } from "@mantine/core";
import ReCAPTCHA from "react-google-recaptcha";
import { handleCaptchaSubmission } from "@/app/actions/recaptcha/verifyRecaptcha";
import React, { useRef, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { addDays, format, startOfToday } from "date-fns";
import { formatDateRange, generateDateRanges } from "@/app/util/Helpers";
import { InquiryEmailTemplateProps } from "@/app/components/Email/inquiry-email-template";
import { sendInquiry } from "@/app/actions/resend/send-inquiry";
import { notifications } from "@mantine/notifications";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { Tour } from "@/app/shared/domain/tour";
import { TravelPackage } from "@/app/shared/domain/travelPackage";
import { PackageType } from "@/app/shared/domain/packageType";

interface InquiryModalProps {
  tour: Tour;
  isOpen: boolean;
  closeFxn: () => void;
}

const InquiryModal = ({ tour, isOpen, closeFxn }: InquiryModalProps) => {
  const isTravelPackage = "travelDates" in tour;
  const [isCustomDatesChecked, setIsCustomDatesChecked] = useState(!isTravelPackage);
  // value of DatePickerInput
  const [customDate, setCustomDate] = useState<string | undefined>();

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const travelDatesOptions = isTravelPackage
    ? Array.from(new Set(generateDateRanges((tour as TravelPackage).travelDates, tour.days).map(dr => formatDateRange(dr))))
    : [];
  const noOfPeopleOptions = new Array(9).fill(null).map((_, i) => `${i + 1}`);

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
      travelPackage: tour.name,
    },

    onValuesChange: values => {
      // update custom date format after user has selected a custom date
      if (isCustomDatesChecked && values.customDates) {
        setCustomDate(`${format(values.customDates, "dd MMM yyyy")} - ${format(addDays(values.customDates, tour.days), "dd MMM yyyy")}`);
      } else {
        setCustomDate("");
        form.setFieldValue("customDates", undefined);
      }
    },
    validate: {
      email: isEmail("Invalid email"),
      contactNo: matches(/^[+]?[(]?[0-9]{2,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format"),
      noOfPax: isNotEmpty(),
      message: isNotEmpty(),
      travelDates: !customDate ? isNotEmpty() : undefined,
      customDates: isCustomDatesChecked ? isNotEmpty() : undefined,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        let emailTemplateProps = {
          ...values,
          tour,
          inquiryDate: format(new Date(), "dd MMM yyyy HH:mm:ss"),
          travelDates: customDate ? customDate : form.getValues().travelDates,
          travelPackageType: isTravelPackage ? PackageType.FullItinerary : PackageType.Tours,
        } as InquiryEmailTemplateProps;
        await sendInquiry(emailTemplateProps)
          .then(_ =>
            notifications.show({
              id: "inquiry-notif",
              withCloseButton: true,
              title: `Inquiry Sent: ${tour.name}`,
              message: `Hey there, we received your inquiry for ${tour.name} on ${customDate ? customDate : form.getValues().travelDates} and we will respond to you shortly! Thank you for your patience!`,
              color: "green",
              autoClose: 10000,
            })
          )
          .catch(_ =>
            notifications.show({
              id: "inquiry-notif-error",
              withCloseButton: true,
              title: `Inquiry Sent: ${tour.name}`,
              message: `Hey there, we attempted to send your inquiry but an unexpected error occurred. Please try again shortly`,
              color: "red",
              autoClose: 10000,
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
          autoClose: 3000,
        });
      }
    }
  };

  const inquireUsForm = (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Travel Package" key={form.key("travelPackage")} {...form.getInputProps("travelPackage")} readOnly />

      <TextInput
        mt="sm"
        withAsterisk
        label="Name"
        placeholder="How do you want us to address you?"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput mt="sm" withAsterisk label="Email" placeholder="your@email.com" key={form.key("email")} {...form.getInputProps("email")} />

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
        disabled={isCustomDatesChecked}
        data-testid="selectDates"
        display={!isTravelPackage ? "none" : "block"}
      />
      {(isTravelPackage ? (tour as TravelPackage).isFlexible : true) && (
        <>
          <Checkbox
            mt="xs"
            checked={isCustomDatesChecked}
            onChange={event => setIsCustomDatesChecked(event.currentTarget.checked)}
            display={!isTravelPackage ? "none" : "block"}
            label="I want to choose my own travel dates"
            data-testid="checkBoxFlexible"
          />

          <Group display={!isTravelPackage || isCustomDatesChecked ? "block" : "none"}>
            <DatePickerInput
              mt="xs"
              placeholder="Pick start date"
              leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
              clearable
              minDate={startOfToday()}
              required
              {...form.getInputProps("customDates")}
              key={form.key("customDates")}
              label="My Travel Dates"
            />
            {customDate && (
              <Text mt="xs" size="sm" c="var(--mantine-color-indigo-7)">
                <b>[{tour.days}-day package]:</b> {customDate}
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
        <Anchor href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" c="blue">
          Privacy Policy
        </Anchor>{" "}
        and{" "}
        <Anchor href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" c="blue">
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
