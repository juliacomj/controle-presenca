"use client";

import { Button, Slot } from "@fluentui/react-components";
import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick: React.MouseEventHandler;
  className?: string;
  disabled?: boolean;
  icon?: Slot<"span">;
}

export function PrimaryButton(props: PrimaryButtonProps) {
  const { onClick, label, className, disabled, icon } = props;
  return (
    <>
      <Button
        disabled={disabled}
        className={className}
        shape="rounded"
        appearance="primary"
        onClick={onClick}
        icon={icon}
      >
        {label}
      </Button>
    </>
  );
}
