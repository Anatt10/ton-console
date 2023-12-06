import { makeAutoObservable } from 'mobx';
import { apiClient, createImmediateReaction, Loadable, TonCurrencyAmount } from 'src/shared';
import { projectsStore } from 'src/entities';
import { GptGenerationPricing } from 'src/features';

class AnalyticsGPTGenerationStore {
    generatedSQL$ = new Loadable<string | null>(null);

    gptPricing$ = new Loadable<GptGenerationPricing | null>(null);

    gptPrompt = '';

    constructor() {
        makeAutoObservable(this);

        createImmediateReaction(
            () => projectsStore.selectedProject,
            project => {
                this.clear();

                if (project) {
                    this.fetchPrice();
                }
            }
        );
    }

    public fetchPrice = this.gptPricing$.createAsyncAction(async () => {
        const result = await apiClient.api.getStatsChatGptPrice({
            project_id: projectsStore.selectedProject!.id
        });
        return mapStatsChatGptPriceToGptGenerationPricing(result.data);
    });

    public generateSQL = this.generatedSQL$.createAsyncAction(
        async (message: string, context?: string) => {
            const result = await apiClient.api.statsChatGptRequest(
                {
                    project_id: projectsStore.selectedProject!.id
                },
                { message, context }
            );

            await this.fetchPrice();
            return result.data.message;
        }
    );

    public clear() {
        this.generateSQL.cancelAllPendingCalls();
        this.gptPricing$.clear();
        this.generatedSQL$.clear();
        this.gptPrompt = '';
    }
}

function mapStatsChatGptPriceToGptGenerationPricing(
    value: Awaited<ReturnType<typeof apiClient.api.getStatsChatGptPrice>>['data']
): GptGenerationPricing {
    return {
        freeRequestsNumber: value.free_requests,
        usedFreeRequest: value.used,
        requestPrice: new TonCurrencyAmount(value.price)
    };
}

export const analyticsGPTGenerationStore = new AnalyticsGPTGenerationStore();
