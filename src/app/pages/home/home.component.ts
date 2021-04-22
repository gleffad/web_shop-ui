import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private jwt: JwtService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  connect(form) {
    this.jwt.login(form.value.account, form.value.password).subscribe(
      res => {
        console.log(res);
        
        this.router.navigate(['/details'])
      },
      error => console.log(error)
    );
    console.log(form.value);
  }

}
