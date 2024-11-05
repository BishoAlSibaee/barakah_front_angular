import { Component } from '@angular/core';
import { Product } from '../classes/Product';
import { AppComponent } from '../app.component';
import { Section } from '../classes/Section';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-section-products',
  templateUrl: './section-products.component.html',
  styleUrls: ['./section-products.component.css']
})
export class SectionProductsComponent {

  section:Section
  Products:Product[] = []

  constructor
  (
    private client:HttpClient,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.section = new Section(0,0,"","","","","")
  }

  ngOnInit() {
    this.route.params.subscribe(data =>{
      console.log(data['section'])
      AppComponent.Sections.forEach((sec)=>{
        if (sec.id == data['section']) {
          this.section = sec
        }
      })
      console.log(this.section)
    })
    this.getSectionProducts()
  }

  getSectionProducts() {
    let url = AppComponent.ProductasUrl + "getSectionProducts"
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    params.append("section_id", this.section.id.toString())
    this.client.post<Product[]>(url, params).subscribe({next:(result)=>{
        console.log(result)
        this.Products = result
    },error:(error)=>{
      console.log(error)
    }})
  }

  getSectionName() {
    if (AppComponent.Store.Language.code == "ar") {
      return this.section.local_name
    }
    else {
      return this.section.name
    }
  }

  getSectionDescription() {
    if (AppComponent.Store.Language.code == "ar") {
      return this.section.local_description
    }
    else {
      return this.section.description
    }
  }

  translateText(id:string) {
    return translates.translateText(id)  
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

}
