import { TravelPackageDto } from "@/app/shared/models/travelPackageDto";
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  ButtonVariant,
  TextInput,
  Select,
  Textarea,
  Checkbox,
  Text,
  rem,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconCalendar } from "@tabler/icons-react";
import React, { useState } from "react";
import { isEmail, isNotEmpty, matches, useForm } from "@mantine/form";
import { formatDateRange, getDateDifference } from "@/app/util/Helpers";
import { notifications } from "@mantine/notifications";
import { sendInquiry } from "@/app/lib/resend/send-inquiry";
import { InquiryEmailTemplateProps } from "@/app/components/Email/inquiry-email-template";
import { format, startOfToday, addDays } from "date-fns";

interface InquiryModalProps {
  travelPackage: TravelPackageDto;
  children?: any;
  variant?: string | ButtonVariant;
}

const InquiryModalButton = ({
  travelPackage,
  children,
  variant,
}: InquiryModalProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  // check if checkbox is clicked
  const [checked, setChecked] = useState(false);
  // value of DatePickerInput
  const [value, setValue] = useState<Date | null>(null);

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
      noOfPax: "",
      message: "",
      travelPackage: travelPackage.name,
    },

    validate: {
      email: isEmail("Invalid email"),
      contactNo: matches(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Invalid phone number format"
      ),
      noOfPax: isNotEmpty(),
      message: isNotEmpty(),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await sendInquiry({
      ...values,
      travelPackage,
      inquiryDate: Date.now().toString(),
    } as InquiryEmailTemplateProps)
      .then((_) =>
        notifications.show({
          id: "inquiry-notif",
          withCloseButton: true,
          title: `Inquiry Sent: ${travelPackage.name}`,
          message: `Hey there, we received your inquiry for ${travelPackage.name} on ${form.values.travelDates} and we will respond to you shortly! Thank you for your patience!`,
          color: "green",
          autoClose: 10000,
        })
      )
      .catch((_) =>
        notifications.show({
          id: "inquiry-notif-error",
          withCloseButton: true,
          title: `Inquiry Sent: ${travelPackage.name}`,
          message: `Hey there, we attempted to send your inquiry but an unexpected error occurred. Please try again shortly`,
          color: "red",
          autoClose: 10000,
        })
      );
    // save values here
    form.reset();
    close();
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
        disabled={checked ? true : false}
      />
      <Checkbox
        mt="sm"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        label="Select custom start date"
        display={travelPackage.isFlexible ? "block" : "none"}
      />
      <Group display={checked ? "block" : "none"}>
        <DatePickerInput
          mt="sm"
          placeholder="Pick start date"
          value={value}
          onChange={setValue}
          leftSection={
            <IconCalendar
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          }
          clearable
          minDate={startOfToday()}
        />

        {value && (
          <Text mt="md" size="sm" c="var(--mantine-color-indigo-7)">
            Travel schedule: {format(value, "dd MMM yyyy")} -
            {format(
              addDays(value, getDateDifference(form.values.travelDates)),
              "dd MMM yyyy"
            )}
          </Text>
        )}
      </Group>
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

      <Group justify="flex-end" mt="md">
        <Button type="submit">Send</Button>
      </Group>
    </form>
  );

  const sendBtn =
    typeof children == typeof (<Button />) ? (
      React.cloneElement(children, { onClick: open })
    ) : (
      <Button variant={variant ?? "primary"} onClick={open}>
        {children}
      </Button>
    );
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Book your trip with us!"
        radius={10}
        transitionProps={{ transition: "fade", duration: 200 }}
        centered
      >
        {inquireUsForm}
      </Modal>
      {sendBtn}
    </>
  );
};

export default InquiryModalButton;
