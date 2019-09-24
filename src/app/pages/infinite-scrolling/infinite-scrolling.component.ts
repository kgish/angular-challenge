import { Component, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { OperatorService } from '../../services/operator.service';
import { IOperator } from '../../services/operator.model';

@Component({
  selector: 'app-infinite-scrolling',
  templateUrl: './infinite-scrolling.component.html',
  styleUrls: [ './infinite-scrolling.component.scss' ]
})
export class InfiniteScrollingComponent {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  operators: IOperator[];

  constructor(private operatorServive: OperatorService) {
    const batchMap = this.offset.pipe(
      throttleTime(1000),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return {...acc, ...batch};
      }, {})
    );

    this.operatorServive.getAll().subscribe(operators => {
      this.operators = operators.sort((a, b) => {
        if (a.code < b.code) { return -1; }
        if (a.code > b.code) { return 1; }
        return 0;
      });
      this.infinite = batchMap.pipe(map(v => Object.values(v)));
    });
  }

  getBatch(offset): Observable<{}> {
    return of(this.operators.splice(offset));
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.offset.next(offset);
    }
  }
}
