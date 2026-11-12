import { Component, computed, inject } from '@angular/core';
import { Table } from 'hmdm-ui-kit';
import { FilesFacadeService } from '../../services/files-facade.service';
import { FilesTableConfig } from '../../configuration/files-table.config';
import { SettingsFacadeService } from '../../../shared/services/settings-facade.service';

@Component({
  selector: 'core-files-table',
  templateUrl: './files-table.html',
  styleUrl: './files-table.scss',
  imports: [Table],
})
export class FilesTable {
  private filesTableConfig = inject(FilesTableConfig);
  private filesFacadeService = inject(FilesFacadeService);
  private settingsFacadeService = inject(SettingsFacadeService);

  tableConfig = computed(() =>
    this.filesTableConfig.getConfig(this.settingsFacadeService.sizeColumnTitle()),
  );
  tableData = this.filesFacadeService.files;
}
