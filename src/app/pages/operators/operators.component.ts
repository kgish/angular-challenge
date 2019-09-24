import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OperatorService } from '../../services/operator.service';
import { IOperator } from '../../services/operator.model';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

interface IRowOperator {
  id: string;
  code: string;
  name: string;
  users: number;
}

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: [ './operators.component.scss' ]
})
export class OperatorsComponent implements OnInit, AfterViewInit {

  operators$: Observable<IOperator[]>;

  displayedColumns: string[] = [ 'id', 'code', 'name', 'users' ];
  dataSource = new MatTableDataSource<IRowOperator>();

  pageSize = 10;
  pageSizeOptions = [ 10, 25, 50, 100 ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private operatorService: OperatorService,
              private router: Router) {
  }

  ngOnInit() {
    this.operators$ = this.operatorService.getAll();
    this.operators$.subscribe(operators => this._setDataSourceData(operators));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUserNames(operator: IOperator): string[] {
    return operator.users.map(user => user.name);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(operator: IRowOperator) {
    this.router.navigate(['operators', operator.id]);
  }

// Private

  _setDataSourceData(operators: IOperator[]) {
    this.dataSource.data = operators.map(operator => {
      return {
        id: operator.id,
        code: operator.code,
        name: operator.name,
        users: operator.users.length
      };
    });
  }
}
