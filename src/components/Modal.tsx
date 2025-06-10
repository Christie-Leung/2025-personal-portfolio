import { Dialog, DialogPanel, DialogProps, DialogTitle, Description } from "@headlessui/react"

type ModalProps =  DialogProps & {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  children: React.ReactNode;
}

const Modal = ({
  title,
  description,
  children,
  ...props
}: ModalProps) => {

  return (
    <Dialog
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      {...props}
    >
      <DialogPanel>
        <DialogTitle>{title}</DialogTitle>
        <Description>{description}</Description>
        {children}
      </DialogPanel>
    </Dialog>
  )
}

export default Modal;