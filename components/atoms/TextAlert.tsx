interface IProps {
  message?: string;
}

export default function TextAlert({ message }: IProps) {
  return message ? <div className="text-sm text-red-600">{message}</div> : null;
}
