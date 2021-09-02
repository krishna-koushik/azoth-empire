import { Component, Prop, State, h } from '@stencil/core';
import { createWorker, PSM } from 'tesseract.js';
import { warRoster } from '../../helpers/utils';

@Component({
    tag: 'war-attendance',
    styleUrl: 'war-attendance.scss',
})
export class WarAttendance {
    @State() state = false;
    @Prop() name: string;

    private worker = createWorker({
        logger: m => console.log(m),
    });

    formattedName(): string {
        if (this.name) {
            return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
        }
        return '';
    }

    async startTesseract() {
        console.log(this.worker);
        await this.worker.load();
        await this.worker.loadLanguage('eng');
        await this.worker.initialize('eng');
        await this.worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK });
        const {
            data: { text },
        } = await this.worker.recognize('/assets/image/1.png', {});
        console.log(text);
        await this.worker.terminate();

        warRoster();
    }

    async componentDidLoad() {
        await this.startTesseract();
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>War Attendance</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <p>My name was passed in through a route param!</p>

                <ion-item>
                    <ion-label>Setting ({this.state.toString()})</ion-label>
                    <ion-toggle checked={this.state} onIonChange={ev => (this.state = ev.detail.checked)} />
                </ion-item>
            </ion-content>,
        ];
    }
}
