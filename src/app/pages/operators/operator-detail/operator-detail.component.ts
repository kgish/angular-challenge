import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSelect, MatSort, MatTableDataSource } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';
import { OperatorService } from '../../../services/operator.service';
import { IOperator } from '../../../services/operator.model';
import { IUser } from '../../../services/user.model';

interface IRowLogging {
  id: string;
  value: string;
  method: string;
  code: string;
}

@Component({
  selector: 'app-operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: [ './operator-detail.component.scss' ]
})
export class OperatorDetailComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [ 'id', 'value', 'method', 'code' ];
  dataSource = new MatTableDataSource<IRowLogging>();

  pageSize = 10;
  pageSizeOptions = [ 10, 25, 50, 100 ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('selectUser') selectUser: MatSelect;

  operator: IOperator;
  users: IUser[] = [];
  user: IUser;
  avatar;
  id = 0;

  logging: IRowLogging[] = [];

  private avatars = [
    'Amy',
    'Bender',
    'Calculon',
    'Farnsworth',
    'Fry',
    'Hermes',
    'Kif',
    'Leela',
    'Nibbler',
    'Scruffy',
    'Space-ghost',
    'Zapp',
    'Zoidberg'
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private operatorService: OperatorService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.operatorService.getById(params.id).subscribe(operator => {
          this.operator = operator;
          if (this.operator.users.length) {
            this.users = operator.users;
            this.user = this.users[ 0 ];
            this.avatar = this._getAvatar();
          }
          this.route.queryParams.subscribe(query => {
            if (query.user) {
              const id = query.user;
              this.user = this.users.find(user => user.id === id);
            }
          });
        });
      }
    });
    for (let i = 1; i <= 500; i++) {
      this.logging.push({
        id: ('' + i).padStart(5, '0'),
        value: this._getRandomValue(),
        method: this._getRandomMethod(),
        code: this._getRandomCode()
      });
    }
    this.dataSource.data = this.logging;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSelectionChange(user: IUser) {
    this.user = user;
    this.avatar = this._getAvatar();
  }

  selectRow(logging: IRowLogging) {
    console.log(logging);
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  _getAvatar() {
    return `assets/images/users/${this.avatars[ Math.floor(Math.random() * this.avatars.length) ]}.png`;
  }

  _getRandomValue() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 50; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  _getRandomMethod() {
    const methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTION' ];
    return methods[ Math.floor(Math.random() * methods.length) ];
  }

  _getRandomCode() {
    const codes = [ '200', '200', '200', '202', '404', '200', '200', '200', '210', '500' ];
    return codes[ Math.floor(Math.random() * codes.length) ];
  }
}
