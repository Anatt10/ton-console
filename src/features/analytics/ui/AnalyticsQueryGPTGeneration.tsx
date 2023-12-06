import { ComponentProps, FunctionComponent, useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { analyticsGPTGenerationStore, analyticsQueryGPTRequestStore } from '../model';
import { Span, TextareaBody, TextareaFooter, TextareaGroup, useLocalStorage } from 'src/shared';

const SHOW_CONTEXT_CMD = 'run:show_context';
const HIDE_CONTEXT_CMD = 'run:hide_context';

const AnalyticsQueryGPTGeneration: FunctionComponent<ComponentProps<typeof Box>> = props => {
    const [message, setMessage] = useState('');
    const [context, setContext] = useState('');
    const [showContext, setShowContext] = useLocalStorage('analytics:showContext', false);

    const onGenerate = () => {
        if (message.startsWith('run:')) {
            if (message === SHOW_CONTEXT_CMD) {
                setMessage('');
                return setShowContext(true);
            }

            if (message === HIDE_CONTEXT_CMD) {
                setMessage('');
                return setShowContext(false);
            }

            return alert('Unknown command');
        }

        analyticsGPTGenerationStore.gptPrompt = message;
        analyticsQueryGPTRequestStore.clear();
        analyticsGPTGenerationStore.generateSQL(message, context || undefined);
    };

    let price = null;
    const gptPricing = analyticsGPTGenerationStore.gptPricing$.value;
    if (gptPricing) {
        if (gptPricing.freeRequestsNumber > gptPricing.usedFreeRequest) {
            price = `${
                gptPricing.freeRequestsNumber - gptPricing.usedFreeRequest
            } free requests left`;
        } else {
            price = gptPricing.requestPrice.toStringCurrencyAmount();
        }
    }

    return (
        <Box {...props}>
            {showContext && (
                <Textarea
                    mb="3"
                    resize="none"
                    autoComplete="off"
                    onChange={e => setContext(e.target.value)}
                    placeholder="GPT context"
                    rows={4}
                    spellCheck={false}
                />
            )}
            <TextareaGroup>
                <TextareaBody
                    resize="none"
                    autoComplete="off"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type message here…"
                    spellCheck={false}
                    rows={4}
                />
                <TextareaFooter
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="3"
                >
                    {!!price && (
                        <Span color="text.secondary" textStyle="label2">
                            {price}
                        </Span>
                    )}
                    <Button
                        isDisabled={!message}
                        isLoading={analyticsGPTGenerationStore.generateSQL.isLoading}
                        onClick={onGenerate}
                        size="sm"
                    >
                        Generate
                    </Button>
                </TextareaFooter>
            </TextareaGroup>
        </Box>
    );
};

export default observer(AnalyticsQueryGPTGeneration);
