import { Spinner } from "@fluentui/react-components";

type LoadingSize =
  | "medium"
  | "small"
  | "tiny"
  | "extra-small"
  | "medium"
  | "large"
  | "extra-large"
  | "huge"
  | "extra-tiny";

interface LoadingProps {
  label?: string;
  size?: LoadingSize;
}

export function Loading(props: LoadingProps) {
  const { label, size } = props;
  return (
    <Spinner
      label={label}
      labelPosition="below"
      size={size}
      appearance="primary"
    />
  );
}
