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
    private content: any;
    private amuletInput: any;
    private helmInput: any;
    private ringInput: any;
    private chestInput: any;
    private earringInput: any;
    private handInput: any;
    private bag1Input: any;
    private pantsInput: any;
    private bag2Input: any;
    private bootsInput: any;
    private bag3Input: any;
    private shieldInput: any;
    private primaryStatInput: any;
    private secondaryStatInput: any;
    private preferredWeightClassInput: any;

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
                console.log(this.member.gameData.weapons);
                if (this.member.gameData.weapons.length < 2) {
                    this.member.gameData.weapons = this.checkAndUpdateArray(this.member.gameData.weapons, value);
                    this.member = { ...this.member };
                } else {
                    this.presentAlert();
                }
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
            this.member.active = value === 'on';
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

    presentAlert() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Alert';
        // alert.subHeader = 'Subtitle';
        alert.message = 'You can only choose 2 weapons.';
        alert.buttons = ['OK'];
        console.log(alert);
        this.content.appendChild(alert);
        return alert.present();
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
                <ion-content
                    class="ion-padding"
                    overflow-scroll="false"
                    ref={el => {
                        this.content = el;
                    }}
                >
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
                                max="65"
                                type="number"
                                inputmode="numeric"
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
                                                    checked={this.member.gameData.weapons.includes('Sword & Shield')}
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
                                                    checked={this.member.gameData.weapons.includes('Rapier')}
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
                                                    checked={this.member.gameData.weapons.includes('Hatchet')}
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
                                                    checked={this.member.gameData.weapons.includes('Spear')}
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
                                                    checked={this.member.gameData.weapons.includes('War Hammer')}
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
                                                    checked={this.member.gameData.weapons.includes('Great Axe')}
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
                                                    checked={this.member.gameData.weapons.includes('Musket')}
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
                                                    checked={this.member.gameData.weapons.includes('Bow')}
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
                                                    checked={this.member.gameData.weapons.includes('Fire Staff')}
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
                                                    checked={this.member.gameData.weapons.includes('Life Staff')}
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
                                                    checked={this.member.gameData.weapons.includes('Ice Gauntlet')}
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
                                                    checked={this.member.gameData.teams.includes('PVP')}
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
                                                    checked={this.member.gameData.teams.includes('Crafters')}
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
                                                    checked={this.member.gameData.teams.includes('Siege Team')}
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
                                                    checked={this.member.gameData.teams.includes('Heal Team')}
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
                                                    checked={this.member.gameData.teams.includes('Vanguard Team')}
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
                                                    checked={this.member.gameData.teams.includes('Flank Team')}
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
                                                    checked={this.member.gameData.teams.includes('Friends/Family/Casual')}
                                                ></ion-checkbox>
                                            </ion-item>
                                        </ion-list>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
                        </ion-item>
                        <ion-item>
                            <ion-grid>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Amulet</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.amuletInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.amulet}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Helm</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.helmInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.helm}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Ring</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.ringInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.ring}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Chest</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.chestInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.chest}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Earring</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.earringInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.earring}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Hands</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.handInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.hands}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Bag 1</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.bag1Input = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.bag1}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Pants</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.pantsInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.pants}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Bag 2</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.bag2Input = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.bag2}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Boots</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.bootsInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.boots}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Bag 3</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.bag3Input = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.bag3}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Shield</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.shieldInput = el;
                                            }}
                                            max="999"
                                            type="number"
                                            inputmode="numeric"
                                            debounce={500}
                                            value={this.member.gameData.shield}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Primary Stat</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.primaryStatInput = el;
                                            }}
                                            max-length="250"
                                            debounce={500}
                                            value={this.member.gameData.primaryStat}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Secondary Stat</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.secondaryStatInput = el;
                                            }}
                                            max-length="250"
                                            debounce={500}
                                            value={this.member.gameData.secondaryStat}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-label>Preferred Weight class</ion-label>
                                        <ion-input
                                            ref={el => {
                                                this.preferredWeightClassInput = el;
                                            }}
                                            max-length="250"
                                            debounce={500}
                                            value={this.member.gameData.preferredWeightClass}
                                            clear-input={true}
                                        ></ion-input>
                                    </ion-col>
                                    <ion-col>
                                        <ion-label>Active</ion-label>
                                        <ion-toggle
                                            ref={el => {
                                                this.activeInput = el;
                                            }}
                                            slot="end"
                                            color="primary"
                                            style={{ border: '1px solid #CDCDCD' }}
                                        ></ion-toggle>
                                    </ion-col>
                                </ion-row>
                            </ion-grid>
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
