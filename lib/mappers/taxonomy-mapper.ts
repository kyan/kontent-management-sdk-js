import { IResponse } from '@kentico/kontent-core';

import { TaxonomyContracts } from '../contracts';
import { TaxonomyModels, SharedModels } from '../models';
import { TaxonomyResponses as TaxonomyResponses } from '../responses';
import { BaseMapper } from './base-mapper';

export class TaxonomyMapper extends BaseMapper {
    mapListingTaxonomysResponse(
        response: IResponse<TaxonomyContracts.IListTaxonomyResponseContract>
    ): TaxonomyResponses.TaxonomyListResponse {
        let taxonomies: TaxonomyModels.Taxonomy[];
        let pagination: SharedModels.Pagination;

        // temporary mapping of taxonomies before API breaking change
        if (Array.isArray(response.data)) {
            taxonomies = response.data.map((m) => this.mapTaxonomy(m));
            pagination = new SharedModels.Pagination(null, null);
        } else {
            // new API response model
            taxonomies = response.data.taxonomies.map((m) => this.mapTaxonomy(m));
            pagination = super.mapPagination(response.data.pagination);
        }

        return new TaxonomyResponses.TaxonomyListResponse(super.mapResponseDebug(response), response.data, {
            pagination: pagination,
            items: taxonomies
        });
    }

    mapGetTaxonomyResponse(
        response: IResponse<TaxonomyContracts.IGetTaxonomyResponseContract>
    ): TaxonomyResponses.GetTaxonomyResponse {
        const taxonomy = this.mapTaxonomy(response.data);

        return new TaxonomyResponses.GetTaxonomyResponse(super.mapResponseDebug(response), response.data, taxonomy);
    }

    mapModifyTaxonomyResponse(
        response: IResponse<TaxonomyContracts.IModifyTaxonomyResponseContract>
    ): TaxonomyResponses.ModifyTaxonomyResponse {
        const taxonomy = this.mapTaxonomy(response.data);

        return new TaxonomyResponses.ModifyTaxonomyResponse(super.mapResponseDebug(response), response.data, taxonomy);
    }

    mapAddTaxonomyResponse(
        response: IResponse<TaxonomyContracts.IAddTaxonomyResponseContract>
    ): TaxonomyResponses.AddTaxonomyResponse {
        const taxonomy = this.mapTaxonomy(response.data);

        return new TaxonomyResponses.AddTaxonomyResponse(super.mapResponseDebug(response), response.data, taxonomy);
    }

    mapTaxonomy(rawTaxonomy: TaxonomyContracts.ITaxonomyContract): TaxonomyModels.Taxonomy {
        return new TaxonomyModels.Taxonomy({
            codename: rawTaxonomy.codename,
            id: rawTaxonomy.id,
            lastModified: new Date(rawTaxonomy.last_modified),
            name: rawTaxonomy.name,
            terms: rawTaxonomy.terms.map((m) => this.mapTaxonomy(m)),
            externalId: rawTaxonomy.external_id,
            _raw: rawTaxonomy
        });
    }
}

export const taxonomyMappper = new TaxonomyMapper();
