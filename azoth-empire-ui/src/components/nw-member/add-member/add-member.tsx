import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'add-member',
    styleUrl: 'add-member.css',
    shadow: true,
})
export class AddMember {
    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/members" />
                    </ion-buttons>
                    <ion-title>Add Member</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding">
                <div class="box">
                    <ion-item>
                        <ion-label position="floating">Name</ion-label>
                        <ion-input></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Guild</ion-label>
                        <ion-select placeholder="Select One">
                            <ion-select-option value="PAX">PAX</ion-select-option>
                            <ion-select-option value="Unbroken">Unbroken</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Discord Id</ion-label>
                        <ion-input></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="floating">Level</ion-label>
                        <ion-input></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-grid>
                            <ion-row align-items-start>
                                <ion-col>
                                    <ion-list-header>
                                        <ion-label position="stacked">Weapons</ion-label>
                                    </ion-list-header>
                                    <ion-list>
                                        <ion-item>
                                            <ion-label>Sword & Shield</ion-label>
                                            <ion-checkbox slot="end" value="Sword & Shield"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Rapier</ion-label>
                                            <ion-checkbox slot="end" value="Rapier"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Hatchet</ion-label>
                                            <ion-checkbox slot="end" value="Hatchet"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Spear</ion-label>
                                            <ion-checkbox slot="end" value="Spear"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>War Hammer</ion-label>
                                            <ion-checkbox slot="end" value="War Hammer"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Great Axe</ion-label>
                                            <ion-checkbox slot="end" value="Great Axe"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Musket</ion-label>
                                            <ion-checkbox slot="end" value="Musket"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Bow</ion-label>
                                            <ion-checkbox slot="end" value="Bow"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Fire Staff</ion-label>
                                            <ion-checkbox slot="end" value="Fire Staff"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Life Staff</ion-label>
                                            <ion-checkbox slot="end" value="Life Staff"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Ice Gauntlet</ion-label>
                                            <ion-checkbox slot="end" value="Ice Gauntlet"></ion-checkbox>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                                <ion-col>
                                    <ion-list-header>
                                        <ion-label position="stacked">Teams</ion-label>
                                    </ion-list-header>
                                    <ion-list>
                                        <ion-item>
                                            <ion-label>PVP</ion-label>
                                            <ion-checkbox slot="end" value="PVP"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Crafters</ion-label>
                                            <ion-checkbox slot="end" value="Crafters"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Siege Team</ion-label>
                                            <ion-checkbox slot="end" value="Siege Team"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Heal Team</ion-label>
                                            <ion-checkbox slot="end" value="Heal Team"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Vanguard Team</ion-label>
                                            <ion-checkbox slot="end" value="Vanguard Team"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Flank Team</ion-label>
                                            <ion-checkbox slot="end" value="Flank Team"></ion-checkbox>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Friends/Family/Casual</ion-label>
                                            <ion-checkbox slot="end" value="Friends/Family/Casual"></ion-checkbox>
                                        </ion-item>
                                    </ion-list>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-item>
                    <ion-item>
                        <ion-label>Active</ion-label>
                        <ion-toggle slot="end" color="primary" style={{ border: '1px solid #CDCDCD' }}></ion-toggle>
                    </ion-item>
                    <ion-item>
                        <ion-button>
                            <ion-button>Submit</ion-button>
                            <ion-button>Cancel</ion-button>
                        </ion-button>
                    </ion-item>
                </div>
            </ion-content>,
        ];
    }
}
