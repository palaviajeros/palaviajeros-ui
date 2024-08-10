"use server";

import { Resend } from "resend";
import * as React from "react";
import {
  InquiryEmailTemplate,
  InquiryEmailTemplateProps,
} from "@/app/components/Email/inquiry-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const emailSender = process.env.RESEND_EMAIL_SENDER;
const emailRecipient = process.env.RESEND_INQUIRY_EMAIL_RECIPIENT;

export async function sendInquiry(templateProps: InquiryEmailTemplateProps) {
  const { data, error } = await resend.emails.send({
    from: `Palaviajeros Inquiries <${emailSender}>`,
    to: [`${emailRecipient}`],
    subject: `Inquiry about ${templateProps.travelPackage.name} from ${templateProps.name} (${templateProps.email})`,
    react: InquiryEmailTemplate(templateProps) as React.ReactElement,
  });
  if (error) {
    console.error(error);
    throw Error(error.message);
  }
  return data;
}
