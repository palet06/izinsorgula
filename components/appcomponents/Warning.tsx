import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Warning({
  isAlertDialogOpen,
  dialogMessage,
  closeDialog,
}: {
  isAlertDialogOpen: boolean;
  dialogMessage: string;
  closeDialog: () => void;
}) {
  return (
    <AlertDialog open={isAlertDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bilgilendirme</AlertDialogTitle>
          <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeDialog}>Tamam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
