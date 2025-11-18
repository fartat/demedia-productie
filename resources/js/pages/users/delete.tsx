import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { destroy } from '@/routes/users';
import { router } from '@inertiajs/react';
import { Loader, TrashIcon } from 'lucide-react';
import { useState } from 'react';

type DeleteUserProps = {
    user: User;
    onDeleted?: () => void;
};
export default function DeleteUser({ user, onDeleted }: DeleteUserProps) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);

        router.delete(destroy(user.id), {
            preserveScroll: true,
            onSuccess: () => {
                onDeleted?.();
            },
            onError: () => {},
            onFinish: () => {
                setDeleting(false);
                setOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <TrashIcon size={16} />
                    Sterge
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Sterge utilizatorul?</DialogTitle>
                <DialogDescription>
                    Esti sigur ca vrei sa stergi acest utilizator? Aceasta
                    actiune nu poate fi anulata.
                </DialogDescription>
                <div className="mt-4 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="link" disabled={deleting}>
                            Anuleaza
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Se șterge...
                            </>
                        ) : (
                            <>
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Șterge
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
