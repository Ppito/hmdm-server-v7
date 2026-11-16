import { Injectable } from '@angular/core';
import { TTableConfig } from 'hmdm-ui-kit';
import { VersionsActionCell } from '../components/versions-action-cell/versions-action-cell';
import { UrlCell } from '../components/url-cell/url-cell';
import { TVersionDTO } from '../../entity/application/types/version-dto.type';
import { SizeCell } from '../../files/components/size-cell/size-cell';

@Injectable()
export class ApplicationVersionsTableConfig {
  /**
   * @param sizeTitle Title (or translation key) of the Size column, may include the free storage quota.
   */
  getConfig(sizeTitle: string = 'table.heading.file.size'): TTableConfig {
    return {
      trackBy: (index: number, item: any) =>
        `${item.versionCode}-${item.version}-${item.url}-${item.urlArm64}-${item.urlArmeabi}`,
      columns: [
        {
          field: 'version',
          title: 'table.heading.application.version',
        },
        {
          field: 'versionCode',
          title: 'form.application.version.code',
        },
        {
          field: 'url',
          title: 'table.heading.application.url',
          cellRenderer: UrlCell,
        },
        {
          field: 'size',
          title: sizeTitle,
          cellRenderer: SizeCell,
          headerAlign: 'end',
          cellRendererParams: {
            // Common app files are stored in the master customer's directory and are not counted
            showZero: (data: TVersionDTO) => data.commonApplication,
          },
        },
        {
          field: 'actions',
          title: 'table.heading.application.actions',
          cellRenderer: VersionsActionCell,
          width: '120px',
          stickyEnd: true,
        },
      ],
    };
  }
}
