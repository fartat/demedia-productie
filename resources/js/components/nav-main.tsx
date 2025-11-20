import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { NavEntry, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ group }: { group: NavEntry }) {
    const page = usePage();

    function isNavItemActive(currentUrl: string, href: string) {
        if (href === '/') {
            return currentUrl === '/';
        }

        return currentUrl === href || currentUrl.startsWith(href + '/');
    }

    const renderItem = (item: NavItem) => (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
                asChild
                isActive={isNavItemActive(page.url, resolveUrl(item.href))}
                tooltip={{ children: item.title }}
            >
                <Link href={item.href} prefetch>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );

    const items: NavItem[] = 'items' in group ? group.items : [group];

    return (
        <SidebarGroup className="px-2 py-0">
            {'items' in group && (
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarMenu>
                {items.map((item) => renderItem(item))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
