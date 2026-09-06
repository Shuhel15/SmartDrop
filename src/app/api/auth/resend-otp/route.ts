import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import { generateOTP } from "@/lib/otp";
import { sendOTPEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = email.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cooldown = `otp-resend:${normalizedEmail}`;

    //Check if the user is in cooldown period
    const isCooldown = await redis.get(cooldown);
    if (isCooldown) {
      const remainingTime = await redis.ttl(cooldown);
      return NextResponse.json(
        { error: `Please wait ${remainingTime} before requesting a new OTP` },
        { status: 429 },
      );
    }

    const otp = generateOTP();
    await redis.set(`otp:${normalizedEmail}`, otp, "EX", 300);

    await redis.set(cooldown, "true", "EX", 60); // Set cooldown for 60 seconds

    await sendOTPEmail(normalizedEmail, otp);

    return NextResponse.json(
      {
        message:
          "A new OTP has been resent to your email. Please check inbox or spam folder",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error resending OTP:", error);
    return NextResponse.json(
      { error: "An error occurred while resending OTP" },
      { status: 500 },
    );
  }
}
