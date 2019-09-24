import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { MaterialModule } from './modules/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChemicalsComponent } from './pages/chemicals/chemicals.component';
import { TableComponent } from './components/table/table.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { LoginComponent } from './pages/login/login.component';
import { TokenInterceptor } from './services/token.interceptor';
import { DragAndDropComponent } from './pages/drag-and-drop/drag-and-drop.component';
import { InfiniteScrollingComponent } from './pages/infinite-scrolling/infinite-scrolling.component';
import { PromptDialogComponent } from './dialogs/prompt-dialog/prompt-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './pages/users/users.component';
import { OperatorDetailComponent } from './pages/operators/operator-detail/operator-detail.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    TableComponent,
    ChemicalsComponent,
    OperatorsComponent,
    LoginComponent,
    DragAndDropComponent,
    InfiniteScrollingComponent,
    PromptDialogComponent,
    FooterComponent,
    UsersComponent,
    OperatorDetailComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    ScrollingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
