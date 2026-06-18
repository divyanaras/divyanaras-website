export const EMAIL = "divyanarasimhan1@gmail.com";

const body = [
  "Hi Divya,",
  "",
  "I'm <name> — I found your profile interesting, let's talk. I'm free on <date and time>.",
  "",
  "Regards,",
  "<name>",
].join("\n");

export const MAILTO_LETS_TALK =
  `mailto:${EMAIL}?subject=${encodeURIComponent("Let's talk")}&body=${encodeURIComponent(body)}`;

export const MAILTO_PLAIN = `mailto:${EMAIL}`;
