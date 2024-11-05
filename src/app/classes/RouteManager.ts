import { ParseFlags } from "@angular/compiler";
import { Router } from "@angular/router";
import { RouteUnit } from "./RouteUnit";

export class RouteManager {

    Routes:RouteUnit[]
    constructor(
    ) {
        this.Routes = []
        this.Routes.push(new RouteUnit('mainPage',null))
    }

    getLastPage() {
        return this.Routes[this.Routes.length-1]
    }

    go(page:string,router:Router) {
        this.Routes.push(new RouteUnit (page,null))
        router.navigate([page])
    }

    goWithExtras(page:string,extra:any,router:Router) {
        this.Routes.push(new RouteUnit (page,extra))
        router.navigate([page,extra])
    }

    back(router:Router) {
        this.Routes.pop()
        if (this.getLastPage().extra == null) {
            router.navigate([this.getLastPage().page])
        }
        else {
            router.navigate([this.getLastPage().page,this.getLastPage().extra])
        }
    }

    backHome(router:Router) {
        this.Routes.forEach((r)=>{
            if (this.Routes.length > 1) {
                this.Routes.pop()
            }
        })
        if (this.getLastPage().extra == null) {
            router.navigate([this.getLastPage().page])
        }
        else {
            router.navigate([this.getLastPage().page,this.getLastPage().extra])
        }
    }
}