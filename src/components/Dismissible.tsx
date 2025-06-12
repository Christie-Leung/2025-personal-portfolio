import { Dialog, DialogPanel } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { MdCancel } from "react-icons/md";
import { useEffect, useRef } from "react";

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

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!storageKey) return;
    
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue === 'true') {
      setOpen(false);
    }
    console.log('page refresh', localStorage.getItem(storageKey));
  }, []);

  console.log(storageKey)

  const handleClose = () => {
    setOpen(false);
    console.log('onClose', storageKey);
    if (storageKey) {
      localStorage.setItem(storageKey, 'true');
      console.log(`Setting ${storageKey} to true`);
    }
    console.log('closing', localStorage.getItem(storageKey));
  }

  return (
    <Dialog 
      open={open} 
      onClose={() => setOpen(false)}
      className={twMerge(
        className,
        'absolute z-50 top-0 p-4 left-0 w-full flex justify-center',
      )}
      role="alertdialog"
      initialFocus={dialogRef}
    >
      <div className="none" ref={dialogRef}></div>
      <DialogPanel
        className={twMerge(
          'flex flex-row text-left items-center bg-main-opposite rounded p-2 shadow-lg max-w-lg w-full text-main',
        )}
      >
        <div>{children}</div>
        <Button
          variant="button-outline"
          size="small"
          onClick={handleClose}
          className="whitespace-nowrap"
        >
          Don't Show Again
        </Button>
        <Button
          variant="ghost"
          size="small"
          onClick={() => setOpen(false)}
        >
          <MdCancel />
        </Button>
      </DialogPanel>
    </Dialog>
  )
}

export default Dismissible;