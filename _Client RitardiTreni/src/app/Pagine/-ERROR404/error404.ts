import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'error404',
    templateUrl: './error404.html'
})

export class Error404Component {
    constructor(private titleService: Title) {

    }

    ngOnInit() {
        this.setTitle("Ritardi treni - Error404");
    }

    private setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}

