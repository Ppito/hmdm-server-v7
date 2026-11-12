import { Injectable } from '@angular/core';
import { BooleanCell, TTableConfig } from 'hmdm-ui-kit';
import { TApplicationDTO } from '../../entity/application/types/application-dto.type';
import { AppNameCell } from '../components/app-name-cell/app-name-cell';
import { ApplicationActionCell } from '../components/application-action-cell/application-action-cell';
import { UrlCell } from '../components/url-cell/url-cell';
import { SizeCell } from '../../files/components/size-cell/size-cell';

@Injectable()
export class ApplicationsTableConfig {
  /**
   * @param sizeTitle Title (or translation key) of the Size column, may include the free storage quota.
   */
  getConfig(sizeTitle: string = 'table.heading.file.size'): TTableConfig {
    return {
      columns: [
        {
          field: 'pkg',
          title: 'table.heading.application.pkg',
          cellRenderer: AppNameCell,
          sortable: true,
        },
        {
          field: 'name',
          title: 'table.heading.application.name',
          sortable: true,
        },
        {
          field: 'version',
          title: 'table.heading.application.version',
          sortable: true,
        },
        {
          field: 'url',
          title: 'table.heading.application.url',
          cellRenderer: UrlCell,
        },
        {
          field: 'icon',
          title: 'table.heading.application.label',
          cellRenderer: BooleanCell,
          cellRendererParams: {
            isShow: (data: TApplicationDTO) => {
              return data.showIcon;
            },
          },
        },
        {
          field: 'size',
          title: sizeTitle,
          cellRenderer: SizeCell,
          headerAlign: 'end',
          cellRendererParams: {
            // Common app files are stored in the master customer's directory and are not counted
            showZero: (data: TApplicationDTO) => data.commonApplication,
          },
        },
        {
          field: 'actions',
          title: 'table.heading.application.actions',
          width: '200px',
          stickyEnd: true,
          cellRenderer: ApplicationActionCell,
        },
      ],
    };
  }
}
