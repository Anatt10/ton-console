import { FunctionComponent, useContext } from 'react';
import { Box, Button, Center, Flex, Spinner, Td, Tr, useConst } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import {
    AnalyticsGraphQuery,
    analyticsHistoryTableStore,
    AnalyticsQuery,
    AnalyticsRepeatingQueryAggregated,
    isAnalyticsRepeatingQueryAggregated
} from '../../model';
import {
    TooltipHoverable,
    toTimeLeft,
    toDateTime,
    useCountup,
    Span,
    sliceAddress,
    InfoTooltip,
    useCountdown
} from 'src/shared';
import { toJS } from 'mobx';
import { AnalyticsHistoryTableContext } from './analytics-history-table-context';
import { AnalyticsQueryStatusBadge } from './AnalyticsQueryStatusBadge';
import { useNavigate } from 'react-router-dom';
import { formatRepeatInterval } from '../utils';

const LoadingRow: FunctionComponent<{ style: React.CSSProperties }> = ({
    style: { top, ...style }
}) => {
    const { rowHeight } = useContext(AnalyticsHistoryTableContext);
    return (
        <Tr
            top={parseFloat(top!.toString()) + parseFloat(rowHeight) + 'px'}
            h={rowHeight}
            maxH={rowHeight}
            style={style}
        >
            <Td pos="absolute" right="0" left="0" border="none" colSpan={4}>
                <Center>
                    <Spinner color="text.secondary" size="sm" />
                </Center>
            </Td>
        </Tr>
    );
};

const ItemRow: FunctionComponent<{
    query: AnalyticsQuery | AnalyticsRepeatingQueryAggregated | AnalyticsGraphQuery;
    style: React.CSSProperties;
}> = observer(({ query: q, style }) => {
    const navigate = useNavigate();
    const renderTime = useConst(Date.now());

    //  const { onCopy: onCopyRequest, hasCopied: hasCopiedRequest } = useClipboard(query.request);
    const { rowHeight } = useContext(AnalyticsHistoryTableContext);

    const isRepeating = isAnalyticsRepeatingQueryAggregated(q);

    const query = isRepeating ? q.lastQuery : q;

    const passedSeconds =
        query.status === 'executing'
            ? Math.floor((renderTime - query.creationDate.getTime()) / 1000)
            : 0;

    const durationSeconds = useCountup(passedSeconds);
    const formattedDuration = durationSeconds === 0 ? '' : toTimeLeft(durationSeconds * 1000);

    const onRowClick = (): void => {
        const path = query.type === 'graph' ? 'graph' : 'query';
        navigate(`../${path}?id=${query.id}`);
    };

    const repeatInterval = formatRepeatInterval(
        'repeatFrequencyMs' in q ? q.repeatFrequencyMs : undefined
    );

    const secondsBeforeNextRepetition = isRepeating
        ? Math.floor((q.lastQueryDate.getTime() + q.repeatFrequencyMs - renderTime) / 1000)
        : 0;

    const beforeNextRepetition = useCountdown(secondsBeforeNextRepetition);

    return (
        <Tr
            sx={{ td: { px: 2, py: 0 } }}
            pos="absolute"
            top={parseFloat(style.top!.toString()) + parseFloat(rowHeight) + 'px'}
            left="0"
            display="table-row"
            w="100%"
            h={rowHeight}
            maxH={rowHeight}
            cursor="pointer"
            onClick={onRowClick}
        >
            <Td
                minW="246px"
                h={rowHeight}
                maxH={rowHeight}
                borderLeft="1px"
                borderLeftColor="background.contentTint"
                boxSizing="content-box"
            >
                {isRepeating ? (
                    <Flex align="center" wrap="wrap" color="text.secondary">
                        Every {repeatInterval}
                        <InfoTooltip ml="2px">
                            <Box w="280px" color="text.primary">
                                <Flex justify="space-between" mb="3">
                                    <Span color="text.secondary">Periodicity</Span>
                                    <Span>Every {repeatInterval}</Span>
                                </Flex>
                                <Flex justify="space-between" mb="3">
                                    <Span color="text.secondary">Number of repetitions</Span>
                                    <Span>{q.totalRepetitions}</Span>
                                </Flex>
                                <Flex justify="space-between" mb="3">
                                    <Span color="text.secondary">Recent request</Span>
                                    <Span>{toDateTime(q.lastQueryDate)}</Span>
                                </Flex>
                                <Flex align="center">
                                    <Span color="text.secondary">Next</Span>
                                    <Box ml="auto">
                                        <Span>{toTimeLeft(beforeNextRepetition * 1000)}</Span>
                                        {beforeNextRepetition === 0 && (
                                            <Button
                                                ml="2"
                                                onClick={() =>
                                                    analyticsHistoryTableStore.loadFirstPage()
                                                }
                                                size="sm"
                                            >
                                                Refresh
                                            </Button>
                                        )}
                                    </Box>
                                </Flex>
                            </Box>
                        </InfoTooltip>
                        &nbsp;· {q.totalCost.stringCurrencyAmount}
                    </Flex>
                ) : query.status === 'success' || query.status === 'error' ? (
                    <Flex align="center" wrap="wrap" color="text.secondary">
                        {query.spentTimeMS < 1000 ? (
                            '≈1s'
                        ) : (
                            <Span>{toTimeLeft(query.spentTimeMS)}</Span>
                        )}
                        &nbsp;· {query.cost.stringCurrencyAmount}
                    </Flex>
                ) : (
                    formattedDuration
                )}
            </Td>
            <Td minW="108px" h={rowHeight} maxH={rowHeight} boxSizing="content-box">
                {query.status === 'error' ? (
                    <TooltipHoverable
                        canBeShown
                        host={<AnalyticsQueryStatusBadge status={query.status} />}
                    >
                        {query.errorReason}
                    </TooltipHoverable>
                ) : (
                    <AnalyticsQueryStatusBadge status={query.status} />
                )}
            </Td>
            <Td w="100%" minW="300px" h={rowHeight} maxH={rowHeight} boxSizing="content-box">
                <Box wordBreak="break-word" noOfLines={2}>
                    {query.type === 'graph' ? (
                        <>
                            Graph:&nbsp;
                            <Span color="accent.blue">
                                {query.addresses.map(a => sliceAddress(a.userFriendly)).join(', ')}
                            </Span>
                        </>
                    ) : (
                        query.gptPrompt || query.request
                    )}
                </Box>
            </Td>
            <Td
                w="120px"
                minW="120px"
                maxW="120px"
                h={rowHeight}
                maxH={rowHeight}
                color="text.secondary"
                textAlign="right"
                borderRight="1px"
                borderRightColor="background.contentTint"
                boxSizing="content-box"
            >
                {toDateTime(query.creationDate)}
            </Td>
        </Tr>
    );
});

const AnalyticsHistoryTableRow: FunctionComponent<{
    index: number;
    style: React.CSSProperties;
}> = ({ index, style }) => {
    if (analyticsHistoryTableStore.isItemLoaded(index)) {
        const query = toJS(analyticsHistoryTableStore.queries$.value[index]);
        const id = isAnalyticsRepeatingQueryAggregated(query) ? query.lastQuery.id : query.id;
        return <ItemRow key={id} style={style} query={query} />;
    }

    return <LoadingRow style={style} />;
};

export default observer(AnalyticsHistoryTableRow);
