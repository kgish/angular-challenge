import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OperatorService } from '../../services/operator.service';
import { IOperator } from '../../services/operator.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn = false;
  operators;
  user;
  private authSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private operatorsService: OperatorService,
              private auth: AuthService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.changedToken.subscribe(token => {
      this.loggedIn = !!token;
      this.user = this.auth.getUser();
      this.operatorsService.getAll().subscribe(operators => this.operators = operators.sort((a, b) => {
        return a.code > b.code ? 1 : a.code < b.code ? -1 : 0;
      }));
    });

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSelectionChange(operator: IOperator) {
    this.router.navigate(['operators', operator.id]);
  }

  onLogout() {
    this.auth.logout();
  }
}
