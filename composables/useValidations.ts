import { object, string, ref as yref, array, date, mixed } from "yup";
export default function () {
  // Validation messages
  const validation = {
    required: (field: string) => `${field} is required`,
    alphabet: (field: string) => `${field} should only contain alphabets`,
    url: (field: string) => `${field} should be a valid URL - https://...`,
    min: (field: string, limit?: number) =>
      `${field} must be at least ${limit} characters`,
    max: (field: string, limit?: number) =>
      `${field} must be at most ${limit} characters`,
    valid: (field: string) => `Please provide a valid ${field}`,
    password:
      "Provide a password with at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    password_confirmation: "Please ensure your passwords match"
  };

  // Validation schema
  const mainSchema = object({
    users: array()
      .of(mixed().required())
      .test(
        "length",
        "Channel should contain at least 1 member",
        (value: any) => value.length > 0
      )
      .test(
        "max",
        "Channel should not exceed 5 members",
        (value: any) => value.length <= 5
      )
      .required(validation.required("Members field"))
  });

  return { mainSchema };
}
