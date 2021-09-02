import { Component, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { createWorker, PSM } from 'tesseract.js';
import { warRoster } from '../../helpers/utils';

@Component({
    tag: 'war-report',
    styleUrl: 'war-report.scss',
    shadow: true,
})
export class WarReport {
    @State() report: any = {};
    @State() processingImages: any = {};

    private imageProcessor = createWorker({
        logger: m => {
            console.log(m);
            const { progress, workerId } = m;
            this.processingImages[workerId] = progress;

            this.processingImages = { ...this.processingImages };
            console.log(this.processingImages);
        },
    });

    private imageAttendenceInput: any;
    private submitButton: any;

    @Event() submitButtonClicked: EventEmitter;
    @Event() closeButtonClicked: EventEmitter;
    private nameInput: any;

    async startTesseract(image) {
        console.log(this.imageProcessor);
        await this.imageProcessor.load();
        await this.imageProcessor.loadLanguage('eng');
        await this.imageProcessor.initialize('eng');
        await this.imageProcessor.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK });
        const { data } = await this.imageProcessor.recognize(image, {});
        console.log(data);

        warRoster();
    }

    async disconnectedCallback() {
        await this.imageProcessor.terminate();
    }

    async componentDidLoad() {
        this.submitButton.addEventListener('click', e => {
            this.onSubmitButtonClick(e);
        });

        this.imageAttendenceInput.addEventListener('change', async e => {
            console.log(e);
            const {
                target: { files },
            } = e;
            const file = files[0];
            this.processingImages = [...[]];
            await this.startTesseract(file);
        });

        this.imageAttendenceInput.addEventListener('click', async e => {
            console.log(e);
        });
    }

    private dismissModal(e: any) {
        this.closeButtonClicked.emit(e.detail);
    }
    private onSubmitButtonClick(_e) {
        this.submitButtonClicked.emit();
    }

    getProgress(processingImages) {
        const keys = Object.keys(processingImages);
        let progress: number[] = [];
        keys.forEach(k => {
            progress.push(processingImages[k]);
        });
        console.log(Math.min(...progress));
        return Math.min(...progress);
    }

    render() {
        return (
            <Host>
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Modal Header</ion-title>
                        <ion-buttons slot="primary">
                            <ion-button onClick={ev => this.dismissModal(ev)}>
                                <ion-icon slot="icon-only" name="close"></ion-icon>
                            </ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding" overflow-scroll="false">
                    <ion-item>
                        <ion-label position="floating">Report Name</ion-label>
                        <ion-input
                            ref={el => {
                                this.nameInput = el;
                            }}
                            required={true}
                            max="250"
                            debounce={500}
                            value={this.report.name}
                            clear-input={true}
                        ></ion-input>
                    </ion-item>
                    {Object.keys(this.processingImages).length > 0 && (
                        <ion-item>
                            <ion-progress-bar value={this.getProgress(this.processingImages)}></ion-progress-bar>
                        </ion-item>
                    )}
                    <ion-item>
                        <ion-button
                            color="secondary"
                            fill="outline"
                            onClick={_ev => {
                                this.imageAttendenceInput.click();
                            }}
                        >
                            <ion-icon slot="start" name="image-outline"></ion-icon>
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                ref={el => {
                                    this.imageAttendenceInput = el;
                                }}
                            />
                            War roster
                        </ion-button>
                    </ion-item>
                    <ion-item>
                        <ion-button
                            slot="end"
                            ref={el => {
                                this.submitButton = el;
                            }}
                            fill="solid"
                        >
                            Submit
                        </ion-button>
                    </ion-item>
                </ion-content>
            </Host>
        );
    }
}
