import {
  OnInit,
  Component,
  ElementRef,
  Inject,
  ViewChild
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

 constructor(private router: Router){}

 public ngOnInit() {
/* code for login overlap with home */
   const ob = this;
   window.onpopstate = function(event)
	   {
	     console.log("----------------HELLO-------------------");
	     console.log(ob.router.url);
	     if(ob.router.url.toString() == "/home")
		      {
		        ob.router.navigate(['/**']);
		      }
	   }
 }
}