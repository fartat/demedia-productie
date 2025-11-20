import AppLayout from '@/layouts/app-layout';
import {index as userIndex} from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {debounce} from 'lodash'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import DeleteUser from '@/pages/users/delete';
import { useEffect, useMemo } from 'react';
import CreateUserDialog from '@/pages/users/create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilizatori',
        href: userIndex().url,
    },
];

export default function Users({ users }: Users) {
    const reloadUsers = useMemo(
        () =>
            debounce(() => {
                router.reload({ only: ['users'] });
            }, 300),
        []
    )

    useEcho('users', ['UserCreated', 'UserDeleted','UserUpdated'], reloadUsers);

    useEffect(() => {
        return () => {
            reloadUsers.cancel();
        };
    }, [reloadUsers]);

    const renderItem = (user: User, index: number) => {
        return (
            <TableRow key={index}>
                <TableCell className="text-sm font-normal text-foreground">
                    {user.id}
                </TableCell>
                <TableCell className="text-sm font-normal text-foreground">
                    {user.name}
                </TableCell>
                <TableCell className="text-sm font-normal text-foreground">
                    {user.email}
                </TableCell>
                <TableCell className="text-sm font-normal text-neutral-500">
                    {new Date(user.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm font-normal text-neutral-500">
                    <DeleteUser user={user}/>
                </TableCell>
            </TableRow>
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Utilizatori</CardTitle>
                        <CreateUserDialog/>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-accent/60">
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nume</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Data adaugari</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-6 text-center text-sm text-neutral-500"
                                        >
                                            Nu există utilizatori.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {users.data.map((user: User, index: number) =>
                                    renderItem(user, index),
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
