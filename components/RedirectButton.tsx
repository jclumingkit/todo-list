import { Button, ButtonProps } from "@mantine/core";
import Link from "next/link";

type Props = {
  buttonProps?: ButtonProps;
  label: string;
  href: string;
};

export default function RedirectButton({ label, href, buttonProps }: Props) {
  return (
    <Link href={href}>
      <Button {...buttonProps} w="100%">
        {label}
      </Button>
    </Link>
  );
}
