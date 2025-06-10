import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { MdCancel } from "react-icons/md";

type DismissibleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: string | React.ReactNode;
  className?: string;
}

const Dismissible = ({
  open = true,
  setOpen,
  children,
  className = '',
}: DismissibleProps) => {

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)}
      className={twMerge(
        className,
        'absolute z-50 top-0 p-4 left-0 w-full flex justify-center',
      )}
      role="alertdialog"
      autoFocus={false}
    >
      <DialogPanel
        className={twMerge(
          'flex flex-row text-left items-center bg-main-opposite rounded p-2 shadow-lg max-w-lg w-full',
        )}
      >
        <div>{children}</div>
        <Button
          variant="ghost"
          size="small"
        >
          <MdCancel />
        </Button>
      </DialogPanel>
    </Dialog>
  )
}

export default Dismissible;