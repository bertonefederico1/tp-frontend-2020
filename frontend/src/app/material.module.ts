import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule
    ],
    exports: [
        MatSelectModule,
        MatDialogModule,
        MatTooltipModule
    ]
})


export class MaterialModule {

}
