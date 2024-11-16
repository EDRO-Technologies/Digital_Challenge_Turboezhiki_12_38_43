import { Request } from 'express';
import sanitizer from "sanitizer";

function signupHandler(req: Request) {
  if (!req.body.name || !req.body.surname || !req.body.password || !req.body.email || req.body.role === undefined) {
    return false;
  }
  if(req.body.role < 0 || req.body.role > 3)
    return false

  let name = sanitizer.sanitize(
    req.body.name.trim()
  );
  let surname = sanitizer.sanitize(
    req.body.surname.trim()
  );
  let middleName 
  console.log(req.body, req.body.role < 0 || req.body.role > 3)
  if(req.body.middleName) middleName = sanitizer.sanitize(
     req.body.middleName.trim()
  );
  let email = sanitizer.sanitize(
    req.body.email.trim().replace(/[^\x00-\x7F]/g, "")
  );
  let password = sanitizer.sanitize(
    req.body.password.trim().replace(/[^\x00-\x7F]/g, "")
  );
  if (
    !name ||
    !surname ||
    password.length < 8 ||
    !email.match(
      "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    )
  ) {
    return false;
  }
  return { name: name, surname: surname, middleName: middleName, password: password, email: email, role: req.body.role };
}

function signinHandler(req: Request) {
  if (!req.body.email || !req.body.password) {
    return false;
  }
  let email = sanitizer.sanitize(req.body.email);
  let password = sanitizer.sanitize(req.body.password);
  if (!email || password.length < 8) {
    return false;
  }
  return { email: email, password: password };
}

function passwordHandler(req: Request) {
  let password = sanitizer.sanitize(
    req.body.password.trim().replace(/[^\x00-\x7F]/g, "")
  );
  if (password.length < 8) return false;
  return password;
}

function defaultHandler(str: string) {
  if (!str) return false;
  const sanitizedString = sanitizer.sanitize(str.trim());

  return sanitizedString;
}

export default {
    signupHandler,
    signinHandler,
    defaultHandler,
    passwordHandler,
  };
