import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChainListenerService } from './services/chain-listener.service';
import { MainWindowManagerComponent } from './main-window-manager/main-window-manager.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RecentBlocksComponent } from './recent-blocks/recent-blocks.component';
import { OrderBlockByPipe } from './order-block-by.pipe';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentPriceComponent } from './current-price/current-price.component';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowManagerComponent,
    TopBarComponent,
    SearchBarComponent,
    FooterComponent,
    RecentBlocksComponent,
    OrderBlockByPipe,
    BlockDetailComponent,
    PriceChartComponent,
    CurrentPriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ChainListenerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
