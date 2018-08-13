import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, interval, merge, Observable, Subject, timer} from 'rxjs';
import {debounce, delay, mergeMap, takeUntil, takeWhile, tap, mergeMapTo} from 'rxjs/operators';
import {tick} from '@angular/core/testing';
import {promise, until} from 'selenium-webdriver';
import map = promise.map;

@Component({
  selector: 'app-zombie',
  templateUrl: './zombie.component.html',
  styleUrls: ['./zombie.component.scss']
})
export class ZombieComponent implements OnInit, OnDestroy {
  @ViewChild('zombie') public zombie;
  public isAlive = true;
  private tickStep = 5;
  private clickStep = 6;
  public maxHealth = 100;
  public scale = 20;
  private startPercents = 100;
  private healthValue$: BehaviorSubject<number> = new BehaviorSubject(0);;
  private timer = timer(1000, 1000)
    .pipe(
      tap(console.log),
      takeWhile(() => this.isAlive),
    );
  private destroy: Subject<void> = new Subject<void>();

  public ngOnInit() {
    this.initGame();
  }

  public initGame() {
    this.isAlive = true;
    this.healthValue$.next(this.startPercents);
    // this.health$.subscribe();
    this.timer.subscribe(() => this.tickHeath());
  }

  public get health$(): Observable<number> {
    return this.healthValue$.asObservable();
  }

  public tickHeath() {
    if ((this.healthValue$.value + this.tickStep) < this.maxHealth) {
      this.healthValue$.next(this.healthValue$.value + this.tickStep);
    } else {
      this.healthValue$.next(this.maxHealth);
    }
  }

  public clickHealth() {
    console.log('clickHealth');
    if ((this.healthValue$.value - this.tickStep) >= 0) {
      this.healthValue$.next(this.healthValue$.value - this.clickStep);
    } else {
      this.healthValue$.next(0);
      this.isAlive = false;
    }
  }

  public onDead() {
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
