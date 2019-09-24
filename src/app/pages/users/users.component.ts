import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../services/user.model';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { OperatorService } from '../../services/operator.service';
import { Router } from '@angular/router';

interface IRowUser {
  id: string;
  username: string;
  name: string;
  operator: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit, AfterViewInit {

  users$: Observable<IUser[]>;

  displayedColumns: string[] = [ 'id', 'username', 'name', 'role', 'operator' ];
  dataSource = new MatTableDataSource<IRowUser>();

  pageSize = 10;
  pageSizeOptions = [ 10, 25, 50, 100 ];

  private userId2Operator = {};

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
              private router: Router,
              private operatorService: OperatorService) {
  }

  ngOnInit() {
    this.users$ = this.userService.getAll();
    this.operatorService.getAll().subscribe(operators => {
      operators.forEach(operator => {
        operator.users.forEach(user => {
          this.userId2Operator[ user.id ] = operator;
        });
      });
      this.users$.subscribe(users => this._setDataSourceData(users));
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(user: IRowUser) {
    const operatorId = this.userId2Operator[ user.id ].id;
    this.router.navigate([ 'operators', operatorId ],  { queryParams: { 'user': user.id }});
  }

// Private

  _setDataSourceData(users: IUser[]) {
    this.dataSource.data = users.map(user => {
      const operator = this.userId2Operator[ user.id ];
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        operator: `${operator.code} | ${operator.name}`
      };
    });
  }
}
