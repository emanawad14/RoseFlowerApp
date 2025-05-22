import { Signal } from "@angular/core";

export interface Gift {
    id:number,
    title:string,
    description:string,
    btnText:Signal<string>,
    bgImg:string
}
