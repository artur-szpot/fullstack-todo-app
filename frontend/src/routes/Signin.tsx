import React, { useState } from "react";

export const Signin: React.FC<{}> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={handleEmailInput}
        placeholder="e-mail"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordInput}
        placeholder="password"
      />
      <input type="submit" value={"Sign in"} />
    </form>
  );
};
