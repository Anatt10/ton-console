import { Icon, IconProps, forwardRef } from '@chakra-ui/react';

export const GloubeIcon40 = forwardRef<IconProps, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="40px"
            h="40px"
            color="icon.primary"
            fill="none"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 35.5C20.0609 35.5 20.1218 35.4996 20.1826 35.4989C22.4209 35.1732 24.2254 28.8872 24.3662 21H15.6338C15.7746 28.8872 17.5791 35.1732 19.8174 35.4989C19.8782 35.4996 19.9391 35.5 20 35.5ZM15.6341 19C15.7803 10.9051 17.6791 4.5 20 4.5C22.3209 4.5 24.2197 10.9051 24.3659 19H15.6341ZM26.3665 21C26.2971 25.0266 25.8082 28.7145 25.0184 31.5137C24.6371 32.8652 24.1602 34.1023 23.5668 35.0876C30.0945 33.5503 35.0298 27.8863 35.4683 21H26.3665ZM35.4683 19H26.3663C26.2961 14.9781 25.8074 11.2949 25.0184 8.49854C24.6353 7.14054 24.1556 5.89802 23.5583 4.91036C30.0902 6.44472 35.0296 12.1107 35.4683 19ZM13.6337 19H4.53174C4.97042 12.1107 9.90983 6.44472 16.4417 4.91036C15.8444 5.89802 15.3647 7.14054 14.9816 8.49854C14.1926 11.2949 13.7039 14.9781 13.6337 19ZM4.53174 21H13.6335C13.7029 25.0266 14.1918 28.7145 14.9816 31.5137C15.3629 32.8652 15.8398 34.1023 16.4332 35.0876C9.90551 33.5503 4.97023 27.8863 4.53174 21ZM37.5 20C37.5 29.558 29.8374 37.3264 20.3202 37.4971C20.2158 37.507 20.1091 37.5122 20 37.5122C19.8909 37.5122 19.7842 37.507 19.6798 37.4971C10.1626 37.3264 2.5 29.558 2.5 20C2.5 10.335 10.335 2.5 20 2.5C29.665 2.5 37.5 10.335 37.5 20Z"
                fill="currentColor"
            />
        </Icon>
    );
});

GloubeIcon40.displayName = 'GloubeIcon40';
