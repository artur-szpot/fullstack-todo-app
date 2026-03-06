export interface UserProps {
  id: string;
  username: string;
  email: string;
}

export class User implements UserProps {
  id: string;
  username: string;
  email: string;

  constructor(args: { id: string; username: string; email: string }) {
    const { id, username, email } = args;
    this.id = id;
    this.username = username;
    this.email = email;
    this.toString.bind(this);
  }

  static fromProps(props: UserProps) {
    return new User({
      id: props.id,
      email: props.email,
      username: props.username,
    });
  }

  public toString() {
    return this.username;
  }
}
