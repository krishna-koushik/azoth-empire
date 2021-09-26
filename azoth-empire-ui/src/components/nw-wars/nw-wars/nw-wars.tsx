import { Component, State, h } from '@stencil/core';
import NWGQLQuery, { IWarOrder, OrderDirection, WarOrderField } from '../../../interfaces/graphql.interface';
import GraphQLService from '../../../services/graphql.service';
import { convertToDisplayDate } from '../../../helpers/utils';

@Component({
    tag: 'nw-wars',
    styleUrl: 'nw-wars.scss',
})
export class NwWars {
    @State() warList: any[] = [];
    @State() totalWars: number = 0;
    @State() isLoading: boolean = false;
    @State() hasMoreWars: boolean = true;
    @State() filters: any = {
        find: '',
        location: 'all',
        active: 'all',
    };

    private fabButton: any;
    private contentElement: any;

    private searchInput: any;
    // private fabButton: any;
    private modalElement: any;

    private first: number = 25;
    private after: string = '';
    private before: string = '';
    private last: number;
    private orderBy: IWarOrder = {
        direction: OrderDirection.DESC,
        field: WarOrderField.WAR_TIME,
    };
    private infiniteScroll: any;
    private locationFilterInput: any;

    async componentWillLoad() {
        const wars = await this.fetchWars();
        this.warList = [...wars];
    }

    async fetchWars() {
        this.isLoading = true;
        const { data: { wars: { edges: wars = [], pageInfo = {} } = {} } = {} } = await GraphQLService.query(
            NWGQLQuery.warsQuery(this.first, this.after, this.last, this.before, this.orderBy),
        );

        this.totalWars = pageInfo.total || 0;
        this.after = pageInfo.endCursor;
        this.isLoading = false;
        this.hasMoreWars = pageInfo.hasNextPage || false;
        return wars.map(p => p.node);
    }

    componentDidLoad() {
        this.searchInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.filters.find = value;
            this.filters = { ...this.filters };
        });

        this.locationFilterInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.filters.location = value;
            this.filters = { ...this.filters };
        });

        this.fabButton.addEventListener('click', _e => {
            this.openAddWarReportModal();
        });
    }

    async infiniteScrollMembers(_e) {
        if (!!this.hasMoreWars) {
            const members = await this.fetchWars();
            (this.infiniteScroll as any).complete();
            this.warList = [...this.warList, ...members];
        } else {
            (this.infiniteScroll as any).disabled = true;
        }
    }

    private findWarsByCriteria(warList: any[], filters: any = {}) {
        const { find = '', location = 'all' } = filters;
        if (find.length > 0) {
            warList = warList.filter(w => {
                const { companies } = w;
                const attacker = companies.find(c => c.role.toLowerCase() === 'attacker');
                const defender = companies.find(c => c.role.toLowerCase() === 'defender');
                return (
                    attacker.name.toLowerCase().includes(find.toLowerCase()) ||
                    attacker.faction.toLowerCase().includes(find.toLowerCase()) ||
                    defender.name.toLowerCase().includes(find.toLowerCase()) ||
                    defender.faction.toLowerCase().includes(find.toLowerCase())
                );
            });
        }

        if (location !== 'all') {
            warList = warList.filter(m => m.location?.toLowerCase().includes(location.toLowerCase()));
        }

        return warList;
    }

    openAddWarReportModal() {
        // create the modal with the `modal-page` component
        this.modalElement = document.createElement('ion-modal');
        this.modalElement.component = 'war-report';
        this.modalElement.presentingElement = document.querySelector('ion-content');

        this.modalElement.addEventListener('closeButtonClicked', async _e => {
            await this.dismissModal();
        });

        this.modalElement.addEventListener('submitButtonClicked', async _e => {
            console.log(_e);
            await this.dismissModal();
        });

        // present the modal
        this.contentElement.appendChild(this.modalElement);
        return this.modalElement.present();
    }

    async dismissModal() {
        await this.modalElement.dismiss({
            dismissed: true,
        });

        this.modalElement.remove();
    }

    renderWarRow(war) {
        const { companies } = war;

        const attacker = companies.find(c => c.role.toLowerCase() === 'attacker');
        const defender = companies.find(c => c.role.toLowerCase() === 'defender');
        const winner = companies.find(c => c.outcome.toLowerCase() === 'victory');

        return (
            <tr>
                <td>
                    <ion-router-link href={`/war/${war._id}`} routerDirection="forward" class="underline" color="primary">
                        {attacker.name} ({attacker.faction}) v/s {defender.name} ({defender.faction})
                    </ion-router-link>
                </td>
                <td>{war.location}</td>
                <td>
                    {winner.name} ({winner.faction})
                </td>
                <td>{convertToDisplayDate(war.time)}</td>
            </tr>
        );
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/" />
                    </ion-buttons>
                    <ion-title>Wars</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content
                class="ion-padding"
                overflow-scroll="false"
                ref={el => {
                    this.contentElement = el;
                }}
            >
                <section class="section is-large">
                    <h2 class="subtitle">List of past wars</h2>
                    <div class="container">
                        <div class="block">
                            <ion-toolbar>
                                <ion-searchbar
                                    slot="start"
                                    ref={el => {
                                        this.searchInput = el;
                                    }}
                                    value={this.filters.find}
                                    placeholder="Find wars by Name"
                                    animated
                                    debounce={500}
                                    style={{ width: '500px' }}
                                ></ion-searchbar>
                                <ion-select
                                    slot="start"
                                    placeholder="Select Location Filter"
                                    interface="popover"
                                    value={this.filters.location}
                                    ref={el => {
                                        this.locationFilterInput = el;
                                    }}
                                >
                                    <ion-select-option value="all">All Locations</ion-select-option>
                                    <ion-select-option value="Fort Brightwood">Fort Brightwood</ion-select-option>
                                    <ion-select-option value="Fort Everfall">Fort Everfall</ion-select-option>
                                </ion-select>
                            </ion-toolbar>
                        </div>
                        <div class="block notification is-primary">
                            <ion-text color="dark">
                                <h5>Total Wars: {this.totalWars}</h5>
                            </ion-text>
                            <table class="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>War Name</th>
                                        <th>Location</th>
                                        <th>Winner</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.findWarsByCriteria(this.warList, this.filters).map(m => {
                                        return this.renderWarRow(m);
                                    })}
                                    <tr>
                                        <td colSpan={3}>
                                            <ion-infinite-scroll
                                                threshold="100px"
                                                ref={el => {
                                                    this.infiniteScroll = el;
                                                }}
                                                onIonInfinite={ev => {
                                                    return this.infiniteScrollMembers(ev);
                                                }}
                                            >
                                                <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more wars..."></ion-infinite-scroll-content>
                                            </ion-infinite-scroll>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
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
