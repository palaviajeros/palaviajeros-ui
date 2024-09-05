"use client";

import { Button, Flex, Group, TextInput, Title, Anchor, Text } from "@mantine/core";
import classes from "./Subscribe.module.scss";
import React, { useRef } from "react";
import { isEmail, useForm } from "@mantine/form";
import { subscribe } from "@/app/actions/resend/subscribe";
import { notifications } from "@mantine/notifications";
import ReCAPTCHA from "react-google-recaptcha";
import { handleCaptchaSubmission } from "@/app/actions/recaptcha/verifyRecaptcha";

const Subscribe = () => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      recipientEmail: "",
    },
    validate: {
      recipientEmail: isEmail(),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (recaptchaRef.current) {
      const token = await recaptchaRef.current.executeAsync();
      if (token) {
        subscribe(values.recipientEmail)
          .then(_ =>
            notifications.show({
              id: "inquiry-notif",
              withCloseButton: true,
              title: "You are now Subscribed!",
              message: "Stay tuned for updates from your fellow Palaviajeros!",
              color: "green",
              autoClose: 10000,
            })
          )
          .catch(_ =>
            notifications.show({
              id: "inquiry-notif-error",
              withCloseButton: true,
              title: `Error`,
              message: `Unexpected error. Please try again shortly`,
              color: "red",
              autoClose: 10000,
            })
          );
        form.reset();
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
  return (
    <>
      <Flex direction="column" justify="center" className={classes.container} gap="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title ta="center" className={classes.title}>
            Subscribe to get updates from your fellow Palaviajeros!
          </Title>
          <Flex direction="column" justify="center" mt="md" gap="md">
            <Flex align="center" justify="center" gap="md" direction={{ base: "column", sm: "row" }}>
              <TextInput
                withAsterisk
                size="xl"
                radius="md"
                inputSize="35"
                visibleFrom={"xl"}
                placeholder="Your email address"
                suppressHydrationWarning
                key={form.key("recipientEmail")}
                {...form.getInputProps("recipientEmail")}
              />
              <TextInput
                withAsterisk
                size="md"
                radius="md"
                inputSize="35"
                hiddenFrom={"xl"}
                placeholder="Your email address"
                suppressHydrationWarning
                key={`${form.key("recipientEmail")}-mobile`}
                {...form.getInputProps("recipientEmail")}
              />
              <Button size="xl" radius="md" visibleFrom="xl" type="submit" suppressHydrationWarning>
                Subscribe
              </Button>
              <Button size="md" radius="md" hiddenFrom="xl" type="submit" suppressHydrationWarning>
                Subscribe
              </Button>
            </Flex>
            <Text size="10px" c="dimmed" ta="center">
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
          </Flex>
        </form>
      </Flex>

      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        size="invisible"
        onChange={handleCaptchaSubmission}
      />
    </>
  );
};

export default Subscribe;
