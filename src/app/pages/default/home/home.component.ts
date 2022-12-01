import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, OnDestroy {
  timerSubscription: Subscription;

  invoiceNotification = [
    {
      avatar: './../../../../assets/png/faces/1.png',
      title: 'Invoice created & sent',
      text: 'Monday at 9:15am',
      isActive: true,
    },
    {
      avatar: './../../../../assets/png/faces/2.png',
      title: 'Invoice accepted',
      text: 'Monday at 4:55pm',
      isActive: false,
    },
    {
      avatar: './../../../../assets/png/faces/3.png',
      title: 'Converted to act',
      text: 'Yesterday at 10:20pm',
      isActive: false,
    },
    {
      avatar: './../../../../assets/png/faces/4.png',
      title: 'Invoice sent & delivered',
      text: 'Yesterday at 10:22pm',
      isActive: false,
    },
  ];

  constructor() {
    let timerIndex = 0;

    this.timerSubscription = interval(5000).subscribe((time) => {
      timerIndex++;

      if (timerIndex == this.invoiceNotification.length) {
        timerIndex = 0;
      }

      this.setActiveNotification(timerIndex);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  setActiveNotification(index: number): void {
    this.invoiceNotification.forEach((element) => {
      element.isActive = false;
    });

    this.invoiceNotification[index].isActive = true;
  }
}
