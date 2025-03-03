import {
  AlertDialog,    
  AlertDialogAction,    
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

export function Warning({ isAlertDialogOpen,dialogMessage,closeDialog }: { isAlertDialogOpen: boolean,dialogMessage:string,closeDialog:()=>void }) {
 
  return (
    <AlertDialog open={isAlertDialogOpen}>
        <AlertDialogTrigger asChild>
        <Button variant="outline"></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bilgilendirme</AlertDialogTitle>
          <AlertDialogDescription>
           {dialogMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={closeDialog} >Tamam</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
