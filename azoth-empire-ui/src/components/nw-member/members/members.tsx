import { Component, h, State } from '@stencil/core';

@Component({
    tag: 'nw-members',
    styleUrl: 'members.scss',
})
export class Members {
    @State() memberList: any[] = [];
    @State() findMember: string = '';
    @State() findBy: string = 'name';
    private searchInput: any;
    private findByInput: any;

    componentWillLoad() {
        this.memberList = [
            {
                _id: 1,
                name: 'Bodnapa',
                guild: 'Unbroken',
                active: true,
            },
            {
                _id: 2,
                name: 'Kin',
                guild: 'PAX',
                active: true,
            },
            {
                _id: 3,
                name: 'Sol',
                guild: 'PAX',
                active: true,
            },
            {
                _id: 3,
                name: 'PotatoSack',
                guild: 'Unbroken',
                active: false,
            },
        ];

        this.memberList.sort((a, b) => {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }

    componentDidLoad() {
        this.searchInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.findMember = value;
        });

        this.findByInput.addEventListener('ionChange', e => {
            const { detail: { value = '' } = {} } = e;
            this.findBy = value;
        });
    }

    private findMemberByCriteria(memberList: any[]) {
        if (this.findBy === 'name') {
            return memberList.filter(m => m.name.toLowerCase().includes(this.findMember.toLowerCase()));
        } else if (this.findBy === 'guild') {
            return memberList.filter(m => m.guild.toLowerCase().includes(this.findMember.toLowerCase()));
        } else if (this.findBy === 'isActive') {
            return memberList.filter(m => {
                return m.active === (this.findMember.toLowerCase() === 'yes');
            });
        }
        return memberList;
    }

    renderMemberRow(member) {
        return (
            <tr>
                <td>
                    <ion-router-link href={`/member/${member._id}`} routerDirection="forward" class="underline" color="primary">
                        {member.name}
                    </ion-router-link>
                </td>
                <td>{member.guild}</td>
                <td>{member.active === true ? <ion-badge color="success">Yes</ion-badge> : <ion-badge color="danger">No</ion-badge>}</td>
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
                    <ion-title>Members</ion-title>
                </ion-toolbar>
            </ion-header>,
            <ion-content class="ion-padding">
                <p>Members List</p>
                <ion-item>
                    <section class="section">
                        <h1 class="title">Member List</h1>
                        <h2 class="subtitle">List of New World members and the guilds they belong to</h2>
                        <div class="container">
                            <div class="block">
                                <ion-grid>
                                    <ion-row>
                                        <ion-col>
                                            <ion-searchbar
                                                ref={el => {
                                                    this.searchInput = el;
                                                }}
                                                placeholder="Find Members"
                                                animated
                                                debounce={500}
                                            ></ion-searchbar>
                                        </ion-col>
                                        <ion-col>
                                            <ion-list>
                                                <ion-item>
                                                    <ion-label>Filter By</ion-label>
                                                    <ion-select
                                                        placeholder="Select One"
                                                        value={this.findBy}
                                                        ref={el => {
                                                            this.findByInput = el;
                                                        }}
                                                    >
                                                        <ion-select-option value="name">Name</ion-select-option>
                                                        <ion-select-option value="guild">Guild</ion-select-option>
                                                        <ion-select-option value="isActive">Is Active</ion-select-option>
                                                    </ion-select>
                                                </ion-item>
                                            </ion-list>
                                        </ion-col>
                                    </ion-row>
                                </ion-grid>
                            </div>
                            <div class="block notification is-primary">
                                <ion-text color="dark">
                                    <h5>Total Members: {this.memberList.length}</h5>
                                </ion-text>
                                <table class="table is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Guild</th>
                                            <th>Is Active</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.findMember.length > 0
                                            ? this.findMemberByCriteria(this.memberList).map(m => {
                                                  return this.renderMemberRow(m);
                                              })
                                            : this.memberList.map(m => {
                                                  return this.renderMemberRow(m);
                                              })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </ion-item>
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button href="/member">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ];
    }
}
