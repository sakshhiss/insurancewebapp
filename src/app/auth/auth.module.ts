import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {}
