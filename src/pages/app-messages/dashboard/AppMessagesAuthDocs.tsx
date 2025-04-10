import { ComponentProps, FunctionComponent } from 'react';
import {
    Box,
    Button,
    Code,
    Flex,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    UnorderedList,
    useDisclosure
} from '@chakra-ui/react';
import { CopyPad, CardLink } from 'src/shared';
import {
    APP_MESSAGES_LINKS,
    appMessagesStore,
    MessagesTokenRegenerateConfirmation
} from 'src/features';
import { observer } from 'mobx-react-lite';

const AppMessagesAuthDocs: FunctionComponent<ComponentProps<typeof Box>> = props => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box {...props}>
            <Box px="6">
                <Text textStyle="body2" mb="2">
                    Token
                </Text>
                <Flex gap="3" mb="2">
                    <CopyPad
                        isLoading={!appMessagesStore.dappToken$.isResolved}
                        flex="1"
                        wordBreak="break-all"
                        text={appMessagesStore.dappToken$.value || ''}
                    />
                    <Button
                        h="auto"
                        isDisabled={!appMessagesStore.dappToken$.isResolved}
                        isLoading={appMessagesStore.regenerateDappToken.isLoading}
                        onClick={onOpen}
                        variant="secondary"
                    >
                        Generate
                    </Button>
                    <MessagesTokenRegenerateConfirmation isOpen={isOpen} onClose={onClose} />
                </Flex>
                <Text textStyle="body2" mb="4" color="text.secondary">
                    This token provides access to messages API, is should be used from backend side
                    and never exposed into client side of the project.
                    <br />
                    To send push notification please add Authorization header with token to your
                    push API request.
                </Text>
            </Box>
            <Tabs mb="4" isLazy={true}>
                <TabList pl="6">
                    <Tab>Message User</Tab>
                    <Tab>Message All Users</Tab>
                </TabList>

                <TabPanels px="6">
                    <TabPanel>
                        <Text textStyle="label2" mb="3">
                            Posting a message for user by wallet address with Curl:
                        </Text>
                        <CopyPad
                            isLoading={!appMessagesStore.dappToken$.isResolved}
                            whiteSpace="pre-wrap"
                            text={`curl -X POST 
    https://tonconsole.com/api/v1/services/messages/push
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer ${appMessagesStore.dappToken$.value}'
    -d 
    '{"message": "my_message", "addresses": ["EQ...ER", "EQ...ER"], "link": "http://my_dapp.com/event"}'`}
                            iconAlign="start"
                            mb="3"
                        />
                        <Box textStyle="body2" color="text.secondary">
                            <Box mb="1">Where body have properties:</Box>
                            <UnorderedList listStyleType={'"-"'} spacing="1">
                                <ListItem pl="1">
                                    <Code>address</Code> is user&apos;s wallet address
                                </ListItem>
                                <ListItem pl="1">
                                    <Code>message</Code> is call to action message for user
                                </ListItem>
                                <ListItem pl="1">
                                    <Code>link</Code> for user action, the link will be opened in
                                    Tonkeeper dApp Browser
                                </ListItem>
                            </UnorderedList>
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <Text textStyle="label2" mb="3">
                            Posting a message for all users with allow notifications with Curl:
                        </Text>
                        <CopyPad
                            isLoading={!appMessagesStore.dappToken$.isResolved}
                            whiteSpace="pre-wrap"
                            text={`curl -X POST 
    https://tonconsole.com/api/v1/services/messages/push
    -H 'Content-Type: application/json'
    -H 'Authorization: Bearer ${appMessagesStore.dappToken$.value}'
    -d 
    '{"message": "my_message", "link": "http://my_dapp.com/event"}'`}
                            iconAlign="start"
                            mb="3"
                        />
                        <Box textStyle="body2" color="text.secondary">
                            <Box mb="1">Where body have properties:</Box>
                            <UnorderedList listStyleType={'"-"'} spacing="1">
                                <ListItem pl="1">
                                    <Code>message</Code> is call to action message for user
                                </ListItem>
                                <ListItem pl="1">
                                    <Code>link</Code> for user action, the link will be opened in
                                    Tonkeeper dApp Browser
                                </ListItem>
                            </UnorderedList>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <CardLink href={APP_MESSAGES_LINKS.USAGE} mb="1" mx="6" />
        </Box>
    );
};

export default observer(AppMessagesAuthDocs);
