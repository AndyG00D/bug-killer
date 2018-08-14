import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {takeUntil, takeWhile, tap} from 'rxjs/operators';


@Component({
    selector: 'app-bug',
    templateUrl: './bug.component.html',
    styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit, OnDestroy {
    public isAlive = true;
    public tickStep = 10;
    public clickStep = 6;
    public maxHealth = 100;
    public scale = 20;
    public startPercents = 100;
    public destroy$: Subject<void> = new Subject<void>();
    public healthValue$: BehaviorSubject<number> = new BehaviorSubject(0);
    public timer = timer(1000, 1000)
        .pipe(
            takeWhile(() => this.isAlive),
            takeUntil(this.destroy$),
            tap(console.log)
        );

    public ngOnInit() {
        this.initGame();
    }

    public initGame() {
        this.isAlive = true;
        this.healthValue$.next(this.startPercents);
        this.timer.subscribe(() => this.tickHeath());
    }

    public get health$(): Observable<number> {
        return this.healthValue$.asObservable()
            .pipe(takeUntil(this.destroy$));
    }

    public tickHeath() {
        if ((this.healthValue$.value + this.tickStep) <= this.maxHealth) {
            this.healthValue$.next(this.healthValue$.value + this.tickStep);
        } else {
            this.healthValue$.next(this.maxHealth);
        }
    }

    public clickHealth() {
        if ((this.healthValue$.value - this.tickStep) > 0) {
            this.healthValue$.next(this.healthValue$.value - this.clickStep);
        } else {
            this.isAlive = false;
            this.healthValue$.next(0);
        }
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
