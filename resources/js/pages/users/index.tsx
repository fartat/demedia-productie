import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import userRoute from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';

import { Table, TableCell, TableHeadCell, TableHeader, TableRow, TableBody } from '@/components/ui/table';

type User = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type UsersProps = {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: userRoute.index().url,
    },
];

export default function Users({ users }: UsersProps) {
    const { errors } = usePage().props;

    const handleDelete = (user: User) => {
        router.delete(userRoute.destroy(user.id), {
            preserveScroll: true,
        });
    };

    useEcho('users',
       [
           'UserCreated',
           'UserDeleted',
       ],
        (e) =>{
        console.log(e)
        }
    )

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="relative h-full w-full overflow-auto p-4">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-sidebar-border/70 bg-neutral-950/5 dark:bg-neutral-50/5">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Created at</th>
                                    <th className="px-4 py-2 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sidebar-border/60">
                                {users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-neutral-950/5 dark:hover:bg-neutral-50/5"
                                    >
                                        <td className="px-4 py-2 text-xs text-neutral-500">
                                            {user.id}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-2 text-xs text-neutral-500">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 text-right">
                                            <button
                                                onClick={() =>
                                                    handleDelete(user)
                                                }
                                                className="text-xs font-medium text-red-500 underline underline-offset-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {users.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-4 py-6 text-center text-sm text-neutral-500"
                                            colSpan={5}
                                        >
                                            Nu există utilizatori.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
