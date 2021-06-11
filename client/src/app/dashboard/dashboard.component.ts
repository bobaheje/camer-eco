import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route:ActivatedRoute, private authService:LoginService, private router:Router) { 
    if(!authService.isLoggedIn){ router.navigate(['/login']);};
  }

  ngOnInit(): void {
  }

}
