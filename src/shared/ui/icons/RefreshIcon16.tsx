import { Icon, forwardRef, IconProps } from '@chakra-ui/react';

export const RefreshIcon16 = forwardRef<IconProps, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="16px"
            h="16px"
            color="icon.secondary"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.25 5.75C13.6642 5.75 14 5.41421 14 5V1.75C14 1.33579 13.6642 1 13.25 1C12.8358 1 12.5 1.33579 12.5 1.75V2.96888C11.3063 1.90056 9.7292 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 8.41421 1.58579 8.75 2 8.75C2.41421 8.75 2.75 8.41421 2.75 8C2.75 5.1005 5.10051 2.75 8 2.75C9.43006 2.75 10.7269 3.32139 11.6743 4.25H10C9.58584 4.25 9.25005 4.58579 9.25005 5C9.25005 5.41421 9.58584 5.75 10 5.75H13.25ZM14 7.25C14.4142 7.25 14.75 7.58579 14.75 8C14.75 11.7279 11.7279 14.75 8 14.75C6.2708 14.75 4.69373 14.0994 3.5 13.0311V14.25C3.5 14.6642 3.16421 15 2.75 15C2.33579 15 2 14.6642 2 14.25V11C2 10.5858 2.33579 10.25 2.75 10.25H5.99995C6.41416 10.25 6.74995 10.5858 6.74995 11C6.74995 11.4142 6.41416 11.75 5.99995 11.75H4.32566C5.27314 12.6786 6.56994 13.25 8 13.25C10.8995 13.25 13.25 10.8995 13.25 8C13.25 7.58579 13.5858 7.25 14 7.25Z"
                fill="currentColor"
            />
        </Icon>
    );
});

RefreshIcon16.displayName = 'RefreshIcon16';
