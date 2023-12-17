// Assuming you have an array of emails
const emails = ["email1@example.com", "email2@example.com", "email3@example.com"];

// Assuming you have a person object with an email property
const person = { email: "email1@example.com" };

// Find the index of the person's email in the emails array
const index = emails.findIndex((email) => email === person.email);
console.log(index)
// Check if the email was found
if (index !== -1) {
  console.log(`Email found at index ${index}`);
} else {
  console.log("Email not found in the array");
}
