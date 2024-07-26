"use server";

export async function verifyCaptcha(token: string | null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verificationUrl, { method: "POST" });

  const data = await response.json();

  if (data.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}

export async function handleCaptchaSubmission(token: string | null) {
  let verified = await verifyCaptcha(token);

  if (verified) {
    console.log("Recaptcha verified!");
  } else {
    throw new Error("Recaptcha not verified!");
  }
}
