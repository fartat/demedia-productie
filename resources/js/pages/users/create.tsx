import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/users';
import { useForm } from 'laravel-precognition-react-inertia';
import { Loader, PlusIcon } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import AlertError from '@/components/alert-error';

type CreateUserDialogProps = {
    onCreated?: () => void;
};

export default function CreateUserDialog({ onCreated }: CreateUserDialogProps) {
    const [open, setOpen] = useState(false);
    const [formError, setFormError] = useState<string[]>([]);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        validate,
    } = useForm('post', store().url, {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    },{
        onValidationError: (errors) => {
            console.error('Validation errors:', errors);
        },
        onUnauthorized: () => {
            setFormError(['Nu ești autentificat. Te rugăm să te autentifici și să încerci din nou.']);
        },
        onForbidden: () => {
            setFormError(['Nu ai permisiunea de a crea utilizatori.']);
        }
    });


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(store().url, {
            preserveScroll: true,
            onSuccess: () => {
                onCreated?.();
                reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (data.name === '') {
            return reset('email');
        }
        const slug = data.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '.')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        setData('email', `${slug}@demedia.ro`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.name]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Adaugă utilizator
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Creează utilizator</DialogTitle>
                <DialogDescription>
                    Completează datele utilizatorului. Email-ul va fi generat
                    automat pe baza numelui.
                </DialogDescription>

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-4"
                    onError={(e) => console.log(e)}
                >
                    {formError.length > 0 && (
                        <AlertError title="Utilizatorul nu poate fi creat" errors={formError} />
                    )}
                    <div className="space-y-1">
                        <Label htmlFor="name">Nume</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            onBlur={() => validate('name')}
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            onBlur={() => validate('name')}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Parolă</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password_confirmation">
                            Confirmare parolă
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="link"
                                disabled={processing}
                                onClick={() => {
                                    reset();
                                }}
                            >
                                Anulează
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    Se creează...
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    Creează
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
