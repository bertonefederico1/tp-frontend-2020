import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
