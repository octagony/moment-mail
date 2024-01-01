import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { IActionButtons } from "./ActionButton.interface";
export default function ActionButton({ mailId, deleteMail }: IActionButtons) {
  return (
    <CardFooter className="flex flex-col lg:flex-row gap-4 justify-between">
      <AlertDialog>
        <AlertDialogTrigger className="flex w-full justify-center border py-2 px-4 rounded-md">
          <Trash2 className="mr-2" />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              email
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteMail(mailId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button className="w-full">
        <Link className="flex items-center" href={`/mail/${mailId}`}>
          Open
          <MoveRight className="ml-2" />
        </Link>
      </Button>
    </CardFooter>
  );
}
