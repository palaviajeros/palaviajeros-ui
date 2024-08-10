"use server";

import { Resend } from "resend";

// Ask andrei to provide keys and how to set this up
// Todo: Find a way to share the values for these to everyone
const resend = new Resend(process.env.RESEND_API_KEY);
const palaviajerosAudienceId = process.env.SUBSCRIBE_AUDIENCE_ID;

export async function subscribe(email: string) {
  const { data, error } = await resend.contacts.create({
    email: email,
    unsubscribed: false,
    audienceId: palaviajerosAudienceId!,
  });

  if (error) {
    console.error(error);
    throw Error(error.message);
  }
  return data;
}
