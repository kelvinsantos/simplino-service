import bcrypt from "bcrypt";

class AuthUtils {
  public hashPassword(passwordString: string) {
    const saltRounds = 10;
    return bcrypt.hash(passwordString, saltRounds);
  }
}

export = AuthUtils;