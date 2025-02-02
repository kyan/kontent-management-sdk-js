

import { IManagementClientConfig } from '../../config';
import { AssetResponses } from '../../responses';
import { ContentManagementQueryService } from '../../services';
import { BaseListingQuery } from '../base-listing-query';

export class ListAssetsQuery extends BaseListingQuery<
    AssetResponses.AssetsListResponse,
    AssetResponses.AssetsListAllResponse
> {
    constructor(protected config: IManagementClientConfig, protected queryService: ContentManagementQueryService) {
        super(config, queryService);
    }

    toPromise(): Promise<AssetResponses.AssetsListResponse> {
        return this.queryService.listAssets(this.getUrl(), this.queryConfig);
    }

    protected getAction(): string {
        return this.apiEndpoints.listAssets();
    }

    protected allResponseFactory(
        items: any[],
        responses: AssetResponses.AssetsListResponse[]
    ): AssetResponses.AssetsListAllResponse {
        return new AssetResponses.AssetsListAllResponse({
            items: items,
            responses: responses
        });
    }
}
