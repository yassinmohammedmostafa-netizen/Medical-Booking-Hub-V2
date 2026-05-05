
import { comparePassword, hashPassword } from "../artifacts/api-server/src/lib/auth";

async function test() {
  const password = "admin123";
  const hash = "$2b$12$dO0iudJFXbu0GR.JGJkA9eQxGGe/OwSBQMlUVMUcRIwehazjrxml2"; // from check_users.ts
  const valid = await comparePassword(password, hash);
  console.log("Password valid:", valid);
  
  const newHash = await hashPassword(password);
  console.log("New hash valid:", await comparePassword(password, newHash));
}

test().catch(console.error);
