"use client";

import { Button } from "@fluentui/react-components";
import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick: React.MouseEventHandler;
  className?: string;
}

export function PrimaryButton(props: PrimaryButtonProps) {
  const { onClick, label, className } = props;
  return (
    <>
      <Button
        className={className}
        shape="rounded"
        appearance="primary"
        onClick={onClick}
      >
        {label}
      </Button>
    </>
  );
}
