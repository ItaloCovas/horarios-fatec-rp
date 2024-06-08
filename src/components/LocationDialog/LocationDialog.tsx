import * as Dialog from '@radix-ui/react-dialog';

interface SignInDialogProps {
  open: boolean;
  openDialog(): void;
  closeDialog(): void;
}

export function LocationDialog({ open, closeDialog }: SignInDialogProps) {
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
            3º Andar - Sala 10
          </Dialog.Title>
          <img
            src="https://www.researchgate.net/publication/313665306/figure/fig1/AS:461406861565952@1487019376144/typical-floor-plan-of-typical-governmental-primary-school-and-selected-reference-case.png"
            alt="Mapa da FATEC"
            className="h-[70%]"
          />
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
