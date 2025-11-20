import { ImgHTMLAttributes } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

type AppLogoIconProps = ImgHTMLAttributes<HTMLImageElement> & {
    useFavicon?: boolean
}
export default function AppLogoIcon({useFavicon, ...props} :AppLogoIconProps) {
    const {logo,favicon} = usePage<SharedData>().props

    return (
        <img src={(
            useFavicon ? favicon : logo
        )} alt="Logo" {...props} />
    );
}
