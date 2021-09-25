import { Component, h, Prop, State } from '@stencil/core';
import GraphQLService from '../../../services/graphql.service';
import NWGQLQuery from '../../../interfaces/graphql.interface';

@Component({
    tag: 'nw-war',
    styleUrl: 'nw-war.scss',
    shadow: true,
})
export class NwWar {
    @Prop() warId: string;
    @State() warDetail: any;
    @State() attackingCompany: any;
    @State() defendingCompany: any;
    @State() performance: any[];
    @State() mainArmy: any[];
    @State() standbyArmy: any[];
    private tabElement: any;

    async componentWillLoad() {
        const { data: { war = {} } = {} } = await GraphQLService.query(NWGQLQuery.warQuery(this.warId));

        this.warDetail = { ...war };
        const { companies, performance, army } = war;

        this.attackingCompany = companies.find(c => c.role.toLowerCase() === 'attacker');
        this.defendingCompany = companies.find(c => c.role.toLowerCase() === 'defender');
        this.performance = performance;
        this.mainArmy = army.filter(a => a.group.toLowerCase() !== 'standby');
        this.standbyArmy = army.filter(a => a.group.toLowerCase() === 'standby');
    }

    componentDidLoad() {
        this.tabElement.select('tab-detail');
    }

    private renderStandbyArmy(army) {
        return (
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-text color="light">
                            <h3>Standby List</h3>
                        </ion-text>
                    </ion-col>
                </ion-row>
                <ion-row>
                    {army.length > 0 ? (
                        army.map(a => {
                            return (
                                <ion-item color="secondary" lines="full">
                                    <ion-label>
                                        <ion-router-link href={`/member/${a.playerId}`} routerDirection="forward" class="underline" color="primary">
                                            {a.name}
                                        </ion-router-link>
                                    </ion-label>
                                </ion-item>
                            );
                        })
                    ) : (
                        <ion-item color="secondary" lines="full">
                            <ion-text color="danger">
                                <p>No Standby players</p>
                            </ion-text>
                        </ion-item>
                    )}
                </ion-row>
            </ion-grid>
        );
    }

    private renderMainArmy(army) {
        let armyObj = {};

        army.forEach(a => {
            if (!armyObj[a.group]) {
                armyObj[a.group] = [];
            }

            armyObj[a.group].push(a);
        });

        if (army.length > 0) {
            return (
                <ion-grid>
                    <ion-row>
                        {Object.keys(armyObj).map(group => {
                            if (parseInt(group) <= 5) {
                                return (
                                    <ion-col>
                                        <ion-card>
                                            <ion-card-header>
                                                <ion-card-title>Group {group}</ion-card-title>
                                            </ion-card-header>
                                            <ion-card-content>
                                                {armyObj[group].map(a => {
                                                    return (
                                                        <ion-item lines="none">
                                                            <ion-router-link href={`/member/${a.playerId}`} routerDirection="forward" class="underline" color="primary">
                                                                {a.name}
                                                            </ion-router-link>
                                                        </ion-item>
                                                    );
                                                })}
                                            </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                );
                            }
                        })}
                    </ion-row>
                    <ion-row>
                        {Object.keys(armyObj).map(group => {
                            if (parseInt(group) > 5) {
                                return (
                                    <ion-col>
                                        <ion-card>
                                            <ion-card-header>
                                                <ion-card-title>Group {group}</ion-card-title>
                                            </ion-card-header>
                                            <ion-card-content>
                                                {armyObj[group].map(a => {
                                                    return (
                                                        <ion-item lines="none">
                                                            <ion-router-link href={`/member/${a.playerId}`} routerDirection="forward" class="underline" color="primary">
                                                                {a.name}
                                                            </ion-router-link>
                                                        </ion-item>
                                                    );
                                                })}
                                            </ion-card-content>
                                        </ion-card>
                                    </ion-col>
                                );
                            }
                        })}
                    </ion-row>
                </ion-grid>
            );
        } else {
            return (
                <ion-item color="secondary" lines="full">
                    <ion-text color="danger">
                        <p>No players in groups</p>
                    </ion-text>
                </ion-item>
            );
        }
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/wars" />
                    </ion-buttons>
                    <ion-title>
                        {this.warDetail.warType.toLowerCase() === 'war' ? 'War Details' : 'Invasion Details'}: {this.attackingCompany.name} ({this.attackingCompany.faction}) v/s{' '}
                        {this.defendingCompany.name} ({this.defendingCompany.faction})
                    </ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding" overflow-scroll="false">
                <ion-tabs
                    ref={el => {
                        this.tabElement = el;
                    }}
                >
                    <ion-tab tab="tab-detail">
                        <ion-content class="ion-padding" overflow-scroll="false">
                            <section class="section  is-large">
                                <ion-nav></ion-nav>
                                <ion-grid>
                                    <ion-row>
                                        <ion-col>
                                            <ion-card>
                                                <ion-card-header>
                                                    <ion-card-title>
                                                        Attacker: {this.attackingCompany.name} ({this.attackingCompany.faction})
                                                    </ion-card-title>
                                                    <ion-card-subtitle>{this.attackingCompany.outcome}</ion-card-subtitle>
                                                </ion-card-header>
                                            </ion-card>
                                        </ion-col>
                                        <ion-col>
                                            <ion-card>
                                                <ion-card-header>
                                                    <ion-card-title>
                                                        Defender: {this.defendingCompany.name} ({this.defendingCompany.faction})
                                                    </ion-card-title>
                                                    <ion-card-subtitle>{this.defendingCompany.outcome}</ion-card-subtitle>
                                                </ion-card-header>
                                            </ion-card>
                                        </ion-col>
                                    </ion-row>
                                    {this.warDetail?.army.length > 0 && (
                                        <ion-row>
                                            <ion-col>
                                                <ion-card>
                                                    <ion-card-header>
                                                        <ion-card-title>Total Main Players</ion-card-title>
                                                        <ion-card-subtitle>{this.mainArmy.length}</ion-card-subtitle>
                                                    </ion-card-header>
                                                </ion-card>
                                            </ion-col>
                                            <ion-col>
                                                <ion-card>
                                                    <ion-card-header>
                                                        <ion-card-title>Total Standby Players</ion-card-title>
                                                        <ion-card-subtitle>{this.standbyArmy.length}</ion-card-subtitle>
                                                    </ion-card-header>
                                                </ion-card>
                                            </ion-col>
                                        </ion-row>
                                    )}
                                </ion-grid>
                            </section>
                        </ion-content>
                    </ion-tab>
                    {this.warDetail?.army?.length > 0 && (
                        <ion-tab tab="tab-roster">
                            <ion-content class="ion-padding" overflow-scroll="false">
                                <section class="section is-large">
                                    <ion-nav></ion-nav>
                                    {this.renderMainArmy(this.mainArmy)}
                                    {this.renderStandbyArmy(this.standbyArmy)}
                                </section>
                            </ion-content>
                        </ion-tab>
                    )}

                    {this.warDetail?.performance?.length > 0 && (
                        <ion-tab tab="tab-performance">
                            <ion-content class="ion-padding" overflow-scroll="false">
                                <table class="table" style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Player</th>
                                            <th>Score</th>
                                            <th>Kills</th>
                                            <th>Deaths</th>
                                            <th>Assists</th>
                                            <th>Healing</th>
                                            <th>Damage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.performance.map(p => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <ion-router-link href={`/member/${p.playerId}`} routerDirection="forward" class="underline" color="primary">
                                                            {p.name}
                                                        </ion-router-link>
                                                    </td>
                                                    <td>{p.score}</td>
                                                    <td>{p.kills}</td>
                                                    <td>{p.deaths}</td>
                                                    <td>{p.assists}</td>
                                                    <td>{p.healing}</td>
                                                    <td>{p.damage}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </ion-content>
                        </ion-tab>
                    )}

                    <ion-tab-bar slot="top">
                        <ion-tab-button tab="tab-detail">
                            <ion-icon name="game-controller-outline"></ion-icon>
                            <ion-label>Details</ion-label>
                        </ion-tab-button>
                        {this.warDetail?.army?.length > 0 && (
                            <ion-tab-button tab="tab-roster">
                                <ion-icon name="man-outline"></ion-icon>
                                <ion-label>Roster</ion-label>
                            </ion-tab-button>
                        )}
                        {this.warDetail?.performance?.length > 0 && (
                            <ion-tab-button tab="tab-performance">
                                <ion-icon name="stats-chart-outline"></ion-icon>
                                <ion-label>Performance Stats</ion-label>
                            </ion-tab-button>
                        )}
                    </ion-tab-bar>
                </ion-tabs>
            </ion-content>,
        ];
    }
}
