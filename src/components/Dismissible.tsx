import { Dialog, DialogPanel } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useEffect } from "react";

type DismissibleProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: string | React.ReactNode;
  className?: string;
  storageKey?: string;
}

const Dismissible = ({
  open = true,
  setOpen,
  children,
  className = '',
  storageKey = '',
}: DismissibleProps) => {

  useEffect(() => {
    if (!storageKey) return;
    
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue === 'true') {
      setOpen(false);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (storageKey) {
      localStorage.setItem(storageKey, 'true');
    }
  }

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)}
      className={twMerge(
        className,
        'absolute z-50 top-0 p-4 left-0 w-full flex justify-center focus-visible:outline-none',
      )}
      role="alertdialog"
    >
      <DialogPanel
        className={twMerge(
          'flex flex-col md:flex-row text-left items-center bg-white rounded p-2 shadow-lg max-w-lg w-full text-black',
        )}
      >
        <div>{children}</div>
        <Button
          variant="button-outline"
          size="small"
          onClick={handleClose}
          className="whitespace-nowrap ml-auto"
        >
          Don't Show Again
        </Button>
      </DialogPanel>
    </Dialog>
  )
}

export default Dismissible;