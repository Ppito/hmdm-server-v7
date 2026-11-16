import { Component, computed, inject } from '@angular/core';
import { MatButtonModule, MatIconModule, Table } from 'hmdm-ui-kit';
import { ApplicationsTableConfig } from '../../configuration/applications-table.config';
import { ApplicationDialogService } from '../../services/application-dialog.service';
import { ApplicationFacadeService } from '../../services/application-facade.service';
import { SettingsFacadeService } from '../../../shared/services/settings-facade.service';

@Component({
  selector: 'core-applications-table',
  imports: [Table, MatIconModule, MatButtonModule],
  templateUrl: './applications-table.html',
  styleUrl: './applications-table.scss',
})
export class ApplicationsTable {
  private readonly applicationsTableConfig = inject(ApplicationsTableConfig);
  private readonly applicationFacadeService = inject(ApplicationFacadeService);
  private readonly applicationDialogService = inject(ApplicationDialogService);
  private readonly settingsFacadeService = inject(SettingsFacadeService);

  tableConfig = computed(() =>
    this.applicationsTableConfig.getConfig(this.settingsFacadeService.sizeColumnTitle()),
  );
  tableData = this.applicationFacadeService.applicationsTable;

  onAddApplicationClick(): void {
    this.applicationDialogService.openAddApplicationDialog();
  }
}
