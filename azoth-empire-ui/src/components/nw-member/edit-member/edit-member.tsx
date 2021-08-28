import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'edit-member',
    styleUrl: 'edit-member.scss',
    shadow: true,
})
export class EditMember {
    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}
