import * as contactService from "./contacts.js";
import { program } from "commander";

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "get":
      const contact = await contactService.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contactService.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "update":
      const updateContact = await contactService.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case "remove":
      const deleteContact = await contactService.deleteById(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action, <type> ", "choose action")
  .option("-i --id <type> ", "id")
  .option("-n, --name <type> ", "name")
  .option("-e, --email <type> ", "email")
  .option("-p, --phone <type> ", "phone");

program.parse();

const options = program.opts();

invokeAction(options);
