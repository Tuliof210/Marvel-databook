import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'view-home',
  templateUrl: './home.template.html',
  styleUrls: ['./home.style.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  start(): void {
    this.router.navigate(['/list']);
  }
}
