import {
  Directive,
  OnDestroy,
  Input,
  EventEmitter,
  HostListener,
  Renderer2,
  ElementRef,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[stateInProgress]',
})
export class StateInProgressDirective implements OnInit, OnDestroy {
  @Input() set stateInProgress(state: boolean) {
    this.stateInProgressSubject.next(state);
  }
  private stateInProgressSubject = new BehaviorSubject<boolean>(false);

  subscription!: Subscription;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('click')
  onClick(): void {
    this.setProperties();
  }

  ngOnInit(): void {
    this.subscription = this.stateInProgressSubject
      .pipe(
        tap((value) => (value ? this.setProperties() : this.removeProperties()))
      )
      .subscribe();
  }

  setProperties(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.renderer.addClass(this.el.nativeElement, '_disabled-loader');
  }

  removeProperties(): void {
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    this.renderer.removeClass(this.el.nativeElement, '_disabled-loader');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
