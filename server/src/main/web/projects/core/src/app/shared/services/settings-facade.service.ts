import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { patternMessageValidator } from 'hmdm-ui-kit';
import { map, Observable, take, tap } from 'rxjs';
import { FileService } from '../../entity/file/services/file.service';
import { TLimitResponse } from '../../entity/file/types/limit-response.type';
import { SettingsService } from '../../entity/settings/services/settings.service';
import { TSettingsDTO } from '../../entity/settings/types/settings-dto.type';
import { REGEX } from '../const/regex.const';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacadeService {
  private readonly settingsService: SettingsService = inject(SettingsService);
  private readonly fileService: FileService = inject(FileService);
  private readonly translateService = inject(TranslateService);
  private readonly currentLang = toSignal(
    this.translateService.onLangChange.pipe(map((event) => event.lang)),
    {
      initialValue: this.translateService.getCurrentLang(),
    },
  );

  settings: WritableSignal<TSettingsDTO | null> = signal(null);
  storageLimit: WritableSignal<TLimitResponse | null> = signal(null);
  availableSpaceMb = computed(() => {
    const limit = this.storageLimit();
    if (!limit || limit.sizeLimit <= 0) return null;
    return Math.max(0, limit.sizeLimit - limit.sizeUsed);
  });
  /** Title of the Size column: translated "Size (<xx> MB free)" if the storage is limited, otherwise the translation key. */
  sizeColumnTitle = computed(() => {
    const free = this.availableSpaceMb();
    if (free === null) {
      return 'table.heading.file.size';
    }
    this.currentLang();
    return (
      this.translateService.instant('table.heading.file.size') +
      ' ' +
      this.translateService.instant('table.heading.size.free', { free })
    );
  });
  phoneMask = computed(() => {
    const settings = this.settings();

    if (!settings || settings.phoneNumberFormat == null) {
      return '';
    }

    return settings.phoneNumberFormat
      .split('')
      .map((char) => {
        if (Number.isInteger(parseInt(char, 10))) {
          return '0';
        }
        return char;
      })
      .join('');
  });

  fetchSettings(): Observable<void> {
    return this.settingsService.getSettings().pipe(
      take(1),
      tap((settings) => {
        this.settings.set(settings);
      }),
      map(() => void 0),
    );
  }

  fetchStorageLimit(): Observable<void> {
    return this.fileService.getStorageLimit().pipe(
      take(1),
      tap((limit) => {
        this.storageLimit.set(limit);
      }),
      map(() => void 0),
    );
  }

  getPasswordValidators(): ValidatorFn[] {
    const validators = [Validators.required];
    const settings = this.settings();

    if (!settings) {
      return validators;
    }

    if (settings.passwordLength > 0) {
      validators.push(Validators.minLength(settings.passwordLength));
    }

    if (settings.passwordStrength >= 1) {
      validators.push(
        patternMessageValidator(REGEX.hasLowercase, 'hasLowercase'),
        patternMessageValidator(REGEX.hasUppercase, 'hasUppercase'),
        patternMessageValidator(REGEX.hasDigit, 'hasDigit'),
      );
    }
    if (settings.passwordStrength >= 2) {
      validators.push(patternMessageValidator(REGEX.specialChar, 'specialChar'));
    }

    return validators;
  }

  getPasswordStrengthValidators(): ValidatorFn[] {
    const settings = this.settings();
    const validators: ValidatorFn[] = [];

    if (!settings) {
      return validators;
    }

    if (settings.passwordLength > 0) {
      validators.push(Validators.minLength(settings.passwordLength));
    }

    if (settings.passwordStrength >= 1) {
      validators.push(
        patternMessageValidator(REGEX.hasLowercase, 'hasLowercase'),
        patternMessageValidator(REGEX.hasUppercase, 'hasUppercase'),
        patternMessageValidator(REGEX.hasDigit, 'hasDigit'),
      );
    }
    if (settings.passwordStrength >= 2) {
      validators.push(patternMessageValidator(REGEX.specialChar, 'specialChar'));
    }

    return validators;
  }
}
