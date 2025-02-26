import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../_shared/components/header/header.component";
import { FooterComponent } from "../../_shared/components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet]
})
export class MasterLayoutComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}

