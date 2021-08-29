import { Component, Host, h, Event, EventEmitter, State } from '@stencil/core';

@Component({
    tag: 'add-member',
    styleUrl: 'add-member.scss',
    shadow: true,
})
export class AddMember {
    @Event() submitButtonClicked: EventEmitter;
    @Event() closeButtonClicked: EventEmitter;

    private defaultMemberObjectValues = {
        name: '',
        discordId: '',
        guild: 'Unknown',
        gameData: {
            level: 0,
            weapons: [],
            teams: [],
        },
    };

    @State() member: any = this.defaultMemberObjectValues;

    private submitButton: any;
    private nameInput: any;
    private discordIdInput: any;
    private levelInput: any;
    private guildInput: any;
    private weaponInput: any[] = [];
    private teamInput: any[] = [];
    private activeInput: any;

    private dismissModal(e: any) {
        this.closeButtonClicked.emit(e.detail);
    }

    private onSubmitButtonClick(_e) {
        this.submitButtonClicked.emit(this.member);
    }

    componentWillLoad() {
        this.member = { ...this.member, ...this.defaultMemberObjectValues };
        this.weaponInput = [];
        this.teamInput = [];
    }

    componentDidLoad() {
        this.submitButton.addEventListener('click', e => {
            this.onSubmitButtonClick(e);
        });

        this.nameInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.member.name = value;
            this.member = { ...this.member };
        });

        this.discordIdInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.member.discordId = value;
            this.member = { ...this.member };
        });

        this.levelInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.member.gameData.level = value;
            this.member = { ...this.member };
        });

        this.guildInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.member.guild = value;
            this.member = { ...this.member };
        });

        this.weaponInput.map(weapon => {
            weapon.addEventListener('ionChange', e => {
                const { detail: { value = '' } = {} } = e;
                this.member.gameData.weapons = this.checkAndUpdateArray(this.member.gameData.weapons, value);
                this.member = { ...this.member };
            });
        });

        this.teamInput.map(team => {
            team.addEventListener('ionChange', e => {
                const { detail: { value = '' } = {} } = e;
                this.member.gameData.teams = this.checkAndUpdateArray(this.member.gameData.teams, value);
                this.member = { ...this.member };
            });
        });

        this.activeInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.member.active = value;
            this.member = { ...this.member };
        });
    }

    checkAndUpdateArray(data, value) {
        if (!data.includes(value)) {
            data.push(value);
        } else {
            const index = data.indexOf(value);
            data.splice(index, 1);
        }
        return data;
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
                    <div class="box">
                        <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input
                                ref={el => {
                                    this.nameInput = el;
                                }}
                                required={true}
                                max="250"
                                debounce={500}
                                value={this.member.name}
                                clear-input={true}
                            ></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-list-header>Guild</ion-list-header>
                            <ion-segment
                                ref={el => {
                                    this.guildInput = el;
                                }}
                                value={this.member.guild}
                            >
                                <ion-segment-button value="PAX">
                                    <ion-label>PAX</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Unbroken">
                                    <ion-label>Unbroken</ion-label>
                                </ion-segment-button>
                                <ion-segment-button value="Unknown">
                                    <ion-label>Unknown</ion-label>
                                </ion-segment-button>
                            </ion-segment>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Discord Id</ion-label>
                            <ion-input
                                ref={el => {
                                    this.discordIdInput = el;
                                }}
                                required={true}
                                max="250"
                                debounce={500}
                                value={this.member.discordId}
                                clear-input={true}
                            ></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Level</ion-label>
                            <ion-input
                                ref={el => {
                                    this.levelInput = el;
                                }}
                                required={true}
                                max="250"
                                debounce={500}
                                value={this.member.gameData.level}
                                clear-input={true}
                            ></ion-input>
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
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Sword & Shield"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Rapier</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Rapier"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Hatchet</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Hatchet"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Spear</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Spear"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>War Hammer</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="War Hammer"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Great Axe</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Great Axe"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Musket</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Musket"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Bow</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Bow"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Fire Staff</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Fire Staff"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Life Staff</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Life Staff"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Ice Gauntlet</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.weaponInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Ice Gauntlet"
                                                ></ion-checkbox>
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
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="PVP"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Crafters</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Crafters"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Siege Team</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Siege Team"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Heal Team</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Heal Team"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Vanguard Team</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Vanguard Team"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Flank Team</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Flank Team"
                                                ></ion-checkbox>
                                            </ion-item>
                                            <ion-item>
                                                <ion-label>Friends/Family/Casual</ion-label>
                                                <ion-checkbox
                                                    ref={el => {
                                                        this.teamInput.push(el);
                                                    }}
                                                    slot="end"
                                                    value="Friends/Family/Casual"
                                                ></ion-checkbox>
                                            </ion-item>
                                        </ion-list>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-item>
                        <ion-item>
                            <ion-label>Active</ion-label>
                            <ion-toggle
                                ref={el => {
                                    this.activeInput = el;
                                }}
                                slot="end"
                                color="primary"
                                style={{ border: '1px solid #CDCDCD' }}
                            ></ion-toggle>
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
                    </div>
                </ion-content>
            </Host>
        );
    }
}
