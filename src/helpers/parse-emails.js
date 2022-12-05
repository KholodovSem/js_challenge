const regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

export default function parseEmails(content, url) {
  if (!content) {
    return
  }
  const emails = content.match(regexp);
  console.log("Emails on page: " + url, emails);
  return emails
}