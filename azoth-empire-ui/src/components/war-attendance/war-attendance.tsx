import { Component, Prop, State, h } from '@stencil/core';

@Component({
    tag: 'war-attendance',
    styleUrl: 'war-attendance.scss',
})
export class WarAttendance {
    @State() state = false;
    @Prop() name: string;
    private fabButton: any;
    private modalElement: any;

    componentDidLoad() {
        this.fabButton.addEventListener('click', _e => {
            this.openAddWarReportModal();
        });
    }

    openAddWarReportModal() {
        // create the modal with the `modal-page` component
        this.modalElement = document.createElement('ion-modal');
        this.modalElement.component = 'war-report';

        this.modalElement.addEventListener('closeButtonClicked', async _e => {
            await this.dismissModal();
        });

        this.modalElement.addEventListener('submitButtonClicked', async _e => {
            console.log(_e);
            await this.dismissModal();
        });

        // present the modal
        document.body.appendChild(this.modalElement);
        return this.modalElement.present();
    }

    async dismissModal() {
        await this.modalElement.dismiss({
            dismissed: true,
        });

        this.modalElement.remove();
    }

    formattedName(): string {
        if (this.name) {
            return this.name.substr(0, 1).toUpperCase() + this.name.substr(1).toLowerCase();
        }
        return '';
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
                <p>List of past wars. Please click on the fab icon in the bottom right corner to create new war report. You can add images there.</p>
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button
                        ref={el => {
                            this.fabButton = el;
                        }}
                    >
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ];
    }
}
