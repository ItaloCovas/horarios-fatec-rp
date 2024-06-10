import * as Dialog from '@radix-ui/react-dialog';

interface SignInDialogProps {
  open: boolean;
  openDialog(): void;
  closeDialog(): void;
  title: string;
  imageURL: string;
}

export function LocationDialog({
  open,
  closeDialog,
  title,
  imageURL,
}: SignInDialogProps) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        !isOpen && closeDialog();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 " />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed z-[999] top-[50%] left-[50%] w-[90vw] md:w-[50vw] h-[400px] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col gap-y-10">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-bold text-center flex justify-center">
            {title}
          </Dialog.Title>
          <img src={imageURL} alt="Mapa da FATEC" className="h-[70%]" />
          <Dialog.Close asChild>
            <button
              className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full outline-none focus:shadow-none"
              aria-label="Close"
              onClick={closeDialog}
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
