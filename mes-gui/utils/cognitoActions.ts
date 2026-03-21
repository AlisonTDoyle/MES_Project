import { redirect } from "next/navigation";
import {
  signIn,
  signOut,
  updateUserAttribute,
  type UpdateUserAttributeOutput,
  confirmUserAttribute,
  updatePassword,
} from "aws-amplify/auth";
import { getErrorMessage } from "./get-error-message";
import "@/utils/configureAmplify"

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  console.log(process.env.NEXT_PUBLIC_USER_POOL_ID);
  let redirectLink = "/dashboard";
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    console.log(`isSignedIn: ${isSignedIn}`)

    // if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
    //   await resendSignUpCode({
    //     username: String(formData.get("email")),
    //   });
    //   redirectLink = "/auth/confirm-signup";
    // }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect("/auth/login");
}

export async function handleUpdateUserAttribute(
  prevState: string,
  formData: FormData
) {
  let attributeKey = "name";
  let attributeValue;
  let currentAttributeValue;

  if (formData.get("email")) {
    attributeKey = "email";
    attributeValue = formData.get("email");
    currentAttributeValue = formData.get("current_email");
  } else {
    attributeValue = formData.get("name");
    currentAttributeValue = formData.get("current_name");
  }

  if (attributeValue === currentAttributeValue) {
    return "";
  }

  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey: String(attributeKey),
        value: String(attributeValue),
      },
    });
    return handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
    return "error";
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case "CONFIRM_ATTRIBUTE_WITH_CODE":
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      return `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`;
    case "DONE":
      return "success";
  }
}

export async function handleUpdatePassword(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const currentPassword = formData.get("current_password");
  const newPassword = formData.get("new_password");

  if (currentPassword === newPassword) {
    return;
  }

  try {
    await updatePassword({
      oldPassword: String(currentPassword),
      newPassword: String(newPassword),
    });
  } catch (error) {
    console.log(error);
    return "error";
  }

  return "success";
}

export async function handleConfirmUserAttribute(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const code = formData.get("code");

  if (!code) {
    return;
  }

  try {
    await confirmUserAttribute({
      userAttributeKey: "email",
      confirmationCode: String(code),
    });
  } catch (error) {
    console.log(error);
    return "error";
  }

  return "success";
}

export async function handleResetPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    if (!formData.get("email")) {
      throw new Error("Error sending code");
    }
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/reset-password/confirm");
}

export async function handleConfirmResetPassword(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    if (!formData.get("email")) {
      throw new Error("Error sending code");
    }
  } catch (error) {
    return getErrorMessage(error);
  }
  redirect("/auth/login");
}