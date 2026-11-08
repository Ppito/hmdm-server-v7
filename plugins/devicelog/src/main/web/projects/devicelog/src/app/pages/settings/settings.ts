import { Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  LoaderDirective,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  SearchContainer,
  TextInputComponent,
  TranslatePipe,
} from 'hmdm-ui-kit';
import { RulesTable } from '../../components/rules-table/rules-table';
import { RulesFacadeService } from '../../services/rules-facade.service';
import { SettingsService } from '../../services/settings.service';
import { RulesDialogService } from '../../services/rules-dialog.service';

@Component({
  selector: 'logs-settings',
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  imports: [
    MatCardModule,
    TextInputComponent,
    TranslatePipe,
    ReactiveFormsModule,
    MatButtonModule,
    RulesTable,
    MatIconModule,
    MatDividerModule,
    LoaderDirective,
  ],
})
export class Settings {
  private readonly settingsService = inject(SettingsService);
  private readonly rulesFacadeService = inject(RulesFacadeService);
  private readonly rulesDialogService = inject(RulesDialogService);

  preserveControl = new FormControl(0, { nonNullable: true });
  isLoadingRules = this.rulesFacadeService.isLoadingRules;

  constructor() {
    effect(() => {
      const period = this.rulesFacadeService.logsPreservePeriod();
      if (period !== null) {
        this.preserveControl.setValue(period);
      }
    });
  }

  onPreserve(): void {
    const days = this.preserveControl.value;
    this.settingsService
      .preserveMessages(days)
      .subscribe(() => this.rulesFacadeService.setLogsPreservePeriod(days));
  }

  onNewRuleClick(): void {
    this.rulesDialogService.openNewRuleDialog();
  }
}
