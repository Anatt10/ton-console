import { ComponentProps, FunctionComponent, useEffect, useState } from 'react';
import {
    Box,
    Center,
    Flex,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from '@chakra-ui/react';
import { H4, Overlay, usePrevious } from 'src/shared';
import {
    AnalyticsQueryCode,
    AnalyticsQueryGTPGeneration,
    AnalyticsQueryResults,
    analyticsQuerySQLRequestStore,
    analyticsQueryStore
} from 'src/features';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projectsStore } from 'src/entities';

const QueryPage: FunctionComponent<ComponentProps<typeof Box>> = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryId = searchParams.get('id');
    const [queryResolved, setQueryResolved] = useState(false);

    useEffect(() => {
        analyticsQueryStore.fetchAllTablesSchema();
    }, []);

    useEffect(() => {
        if (queryId) {
            setQueryResolved(false);
            analyticsQueryStore
                .loadQuery(queryId)
                .then(value => {
                    analyticsQuerySQLRequestStore.setRequest(value);
                    setQueryResolved(true);
                })
                .catch(() => setSearchParams({}));
        } else {
            analyticsQueryStore.clear();
            setQueryResolved(true);
        }
    }, []);

    const projectId = projectsStore.selectedProject?.id;
    const prevProjectId = usePrevious(projectId);

    useEffect(() => {
        if (prevProjectId !== undefined && projectId !== prevProjectId) {
            navigate('../history');
        }
    }, [prevProjectId, projectId]);

    return (
        <Overlay display="flex" flexDirection="column">
            <H4 mb="4">New Request</H4>
            {queryResolved ? (
                <Flex direction="column" flex="1">
                    <Tabs flexDir="column" flex="1" display="flex" mb="6">
                        <TabList w="auto" mx="-24px" px="6">
                            <Tab>SQL</Tab>
                            <Tab>ChatGPT</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel flex="1">
                                <AnalyticsQueryCode flex="1" type="sql" />
                            </TabPanel>
                            <TabPanel flex="1">
                                <Box w="100%">
                                    <AnalyticsQueryGTPGeneration mb="5" />
                                    <AnalyticsQueryCode flex="1" type="gpt" />
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <AnalyticsQueryResults flex="1" />
                </Flex>
            ) : (
                <Center h="300px">
                    <Spinner />
                </Center>
            )}
        </Overlay>
    );
};

export default QueryPage;
