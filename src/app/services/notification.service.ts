import { Inject, Injectable } from '@angular/core';
import { TuiNotification, TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    @Inject(TuiAlertService)
    private readonly notificationsService: TuiAlertService
  ) {}

  success(message?: string, title?: string): void {
    this.notificationsService
      .open(message || '', {
        label: title || 'Успешно',
        status: TuiNotification.Success,
        autoClose: true,
        hasCloseButton: true,
      })
      .subscribe();
  }

  error(message?: string, title?: string): void {
    this.notificationsService
      .open(message || '', {
        label: title || 'Ошибка',
        status: TuiNotification.Error,
        autoClose: true,
        hasCloseButton: true,
      })
      .subscribe();
  }

  info(message?: string, title?: string): void {
    this.notificationsService
      .open(message || '', {
        label: title || 'Информация',
        status: TuiNotification.Info,
        autoClose: true,
        hasCloseButton: true,
      })
      .subscribe();
  }

  warning(message?: string, title?: string): void {
    this.notificationsService
      .open(message || '', {
        label: title || 'Предупреждение',
        status: TuiNotification.Warning,
        autoClose: true,
        hasCloseButton: true,
      })
      .subscribe();
  }
}
