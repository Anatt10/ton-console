import { Icon, IconProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ProfileIcon24: FC<IconProps> = props => {
    return (
        <Icon
            w="24px"
            h="24px"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.9793 17.315C19.2364 15.9019 20 14.0401 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.0401 4.76365 15.9019 6.02068 17.315C7.73026 16.1687 9.78704 15.5 12 15.5C14.213 15.5 16.2697 16.1687 17.9793 17.315ZM16.8433 18.3678C15.4346 17.5004 13.7757 17 12 17C10.2243 17 8.56538 17.5004 7.15668 18.3678C8.50108 19.3919 10.1795 20 12 20C13.8205 20 15.4989 19.3919 16.8433 18.3678ZM12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5ZM12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5ZM12 14C13.933 14 15.5 12.433 15.5 10.5C15.5 8.567 13.933 7 12 7C10.067 7 8.5 8.567 8.5 10.5C8.5 12.433 10.067 14 12 14Z"
                fill="black"
            />
        </Icon>
    );
};
