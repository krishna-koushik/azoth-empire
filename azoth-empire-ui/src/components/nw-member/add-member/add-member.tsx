import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'add-member',
    styleUrl: 'add-member.css',
    shadow: true,
})
export class AddMember {
    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
