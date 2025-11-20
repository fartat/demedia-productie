import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';

import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import { index as roleIndex} from '@/routes/roles';

type Permission = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
    permissions: Permission[];
};

type PageProps = {
    roles: Role[];
    permissions: Permission[];
};

export default function RolesIndex() {
    const { roles, permissions } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Utilizatori',
            href: roleIndex().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Roluri & permisiuni</h1>

                <CreateRoleForm permissions={permissions} />

                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 text-left">Rol</th>
                            <th className="py-2 text-left">Permisiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id} className="border-b align-top">
                                <td className="py-2">{role.name}</td>
                                <td className="py-2">
                                    <RolePermissionsForm
                                        role={role}
                                        allPermissions={permissions}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

function CreateRoleForm({ permissions }: { permissions: Permission[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(route('roles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-3">
            <div className="space-y-1">
                <Label htmlFor="name">Nume rol</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} />
            </div>

            <div className="space-y-1">
                <Label>Permisiuni</Label>
                <select
                    multiple
                    className="w-full rounded border px-2 py-1 text-sm"
                    value={data.permissions}
                    onChange={(e) =>
                        setData(
                            'permissions',
                            Array.from(e.target.selectedOptions).map(
                                (o) => o.value,
                            ),
                        )
                    }
                >
                    {permissions.map((perm) => (
                        <option key={perm.id} value={perm.name}>
                            {perm.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button type="submit" disabled={processing}>
                Creează rol
            </Button>
        </form>
    );
}

function RolePermissionsForm({
    role,
    allPermissions,
}: {
    role: Role;
    allPermissions: Permission[];
}) {
    const { data, setData, put, processing } = useForm({
        permissions: role.permissions.map((p) => p.name),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('roles.update', role.id), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <select
                multiple
                className="w-full rounded border px-2 py-1 text-sm"
                value={data.permissions}
                onChange={(e) =>
                    setData(
                        'permissions',
                        Array.from(e.target.selectedOptions).map(
                            (o) => o.value,
                        ),
                    )
                }
            >
                {allPermissions.map((perm) => (
                    <option key={perm.id} value={perm.name}>
                        {perm.name}
                    </option>
                ))}
            </select>

            <Button type="submit" size="sm" disabled={processing}>
                Salvează
            </Button>
        </form>
    );
}
