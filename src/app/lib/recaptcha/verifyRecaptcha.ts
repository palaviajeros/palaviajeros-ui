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
  try {
    await verifyCaptcha(token);
    console.log("Recaptcha verified!");
  } catch (error) {
    console.log("Recaptcha not verified!");
  }
}
