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
    <CardFooter className="flex justify-between">
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">
            <Trash2 className="mr-2" />
            Delete
          </Button>
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
      <Link href={`/mail/${mailId}`}>
        <Button>
          Open
          <MoveRight className="ml-2" />
        </Button>
      </Link>
    </CardFooter>
  );
}
