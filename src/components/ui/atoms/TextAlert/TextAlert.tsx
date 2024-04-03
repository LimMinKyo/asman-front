import classNames from 'classnames';

interface IProps {
  className?: string;
  message?: string;
}

export default function TextAlert({ message, className }: IProps) {
  return message ? (
    <div className={classNames('text-sm text-red-600', className)}>
      {message}
    </div>
  ) : null;
}
