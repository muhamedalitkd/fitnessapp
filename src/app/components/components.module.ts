import { LogoComponent } from './logo/logo.component';
import { StartComponent } from './start/start.component';
import { SlidesComponent } from './slides/slides.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent],
  exports: [SlidesComponent, StartComponent, LogoComponent],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
