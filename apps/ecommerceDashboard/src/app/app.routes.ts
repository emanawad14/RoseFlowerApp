import { Route } from '@angular/router';
 import { StatisticsComponent } from './features/pages/statistics.component';
import { addProductComponent } from './features/pages/addproduct/addproduct.component';
 
export const appRoutes: Route[] = [
    {path: '', component: StatisticsComponent},
    {path:"add", component:addProductComponent},
    {path:"edit/:id", component: addProductComponent},
];
